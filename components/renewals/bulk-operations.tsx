'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Download, Upload, FileText, Trash2, Edit3 } from 'lucide-react'
import { supabase } from '@/lib/db'
import { RenewalPalEvents, trackEvent } from '@/lib/posthog'

interface BulkOperationsProps {
  onRefresh: () => void
}

export function BulkOperations({ onRefresh }: BulkOperationsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'bulk-edit' | 'bulk-delete'>('import')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Import state
  const [importData, setImportData] = useState('')
  const [importType, setImportType] = useState<'csv' | 'json'>('csv')

  // Export state
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv')
  const [exportFilters, setExportFilters] = useState({
    category: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  })

  // Bulk edit state
  const [bulkEditField, setBulkEditField] = useState('')
  const [bulkEditValue, setBulkEditValue] = useState('')
  const [selectedRenewals, setSelectedRenewals] = useState<string[]>([])

  // Bulk delete state
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleImport = async () => {
    if (!importData.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide data to import',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      let renewals: any[] = []

      if (importType === 'csv') {
        // Parse CSV data
        const lines = importData.trim().split('\n')
        const headers = lines[0].split(',').map(h => h.trim())
        
        renewals = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim())
          const renewal: any = {}
          headers.forEach((header, index) => {
            renewal[header.toLowerCase().replace(/\s+/g, '_')] = values[index]
          })
          return renewal
        })
      } else {
        // Parse JSON data
        renewals = JSON.parse(importData)
      }

      // Insert renewals into database
      const { data, error } = await supabase
        .from('renewals')
        .insert(renewals.map(renewal => ({
          name: renewal.name || renewal.title,
          description: renewal.description || '',
          category: renewal.category || 'other',
          value: parseFloat(renewal.value) || 0,
          currency: renewal.currency || 'USD',
          expiry_date: renewal.expiry_date || renewal.expiry || renewal.expires,
          status: renewal.status || 'active',
          vendor: renewal.vendor || renewal.supplier || '',
          auto_renew: renewal.auto_renew === 'true' || renewal.auto_renew === true,
          notes: renewal.notes || ''
        })))

      if (error) throw error

      trackEvent(RenewalPalEvents.FEATURE_USED, {
        feature: 'bulk_import',
        count: renewals.length,
        format: importType
      })

      toast({
        title: 'Success',
        description: `Imported ${renewals.length} renewals successfully`,
      })

      onRefresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Import error:', error)
      toast({
        title: 'Error',
        description: 'Failed to import renewals. Please check your data format.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    setIsLoading(true)
    try {
      // Build query based on filters
      let query = supabase.from('renewals').select('*')
      
      if (exportFilters.category) {
        query = query.eq('category', exportFilters.category)
      }
      if (exportFilters.status) {
        query = query.eq('status', exportFilters.status)
      }
      if (exportFilters.dateFrom) {
        query = query.gte('expiry_date', exportFilters.dateFrom)
      }
      if (exportFilters.dateTo) {
        query = query.lte('expiry_date', exportFilters.dateTo)
      }

      const { data, error } = await query

      if (error) throw error

      let content = ''
      let filename = 'renewals'
      let mimeType = ''

      if (exportFormat === 'csv') {
        const headers = ['Name', 'Description', 'Category', 'Value', 'Currency', 'Expiry Date', 'Status', 'Vendor', 'Auto Renew', 'Notes']
        const csvData = data?.map(renewal => [
          renewal.name,
          renewal.description,
          renewal.category,
          renewal.value,
          renewal.currency,
          renewal.expiry_date,
          renewal.status,
          renewal.vendor,
          renewal.auto_renew,
          renewal.notes
        ]) || []

        content = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
        filename += '.csv'
        mimeType = 'text/csv'
      } else if (exportFormat === 'json') {
        content = JSON.stringify(data, null, 2)
        filename += '.json'
        mimeType = 'application/json'
      } else {
        // PDF export would require a PDF library
        content = JSON.stringify(data, null, 2)
        filename += '.json'
        mimeType = 'application/json'
      }

      // Download file
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      trackEvent(RenewalPalEvents.EXPORT_USED, {
        format: exportFormat,
        count: data?.length || 0
      })

      toast({
        title: 'Success',
        description: `Exported ${data?.length || 0} renewals to ${exportFormat.toUpperCase()}`,
      })

      setIsOpen(false)
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: 'Error',
        description: 'Failed to export renewals',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBulkEdit = async () => {
    if (!bulkEditField || !bulkEditValue || selectedRenewals.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select renewals and provide field/value to edit',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      const updates = selectedRenewals.map(id => ({
        id,
        [bulkEditField]: bulkEditValue
      }))

      const { error } = await supabase
        .from('renewals')
        .upsert(updates)

      if (error) throw error

      trackEvent(RenewalPalEvents.FEATURE_USED, {
        feature: 'bulk_edit',
        count: selectedRenewals.length,
        field: bulkEditField
      })

      toast({
        title: 'Success',
        description: `Updated ${selectedRenewals.length} renewals`,
      })

      onRefresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Bulk edit error:', error)
      toast({
        title: 'Error',
        description: 'Failed to update renewals',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    if (deleteConfirmation !== 'DELETE' || selectedRenewals.length === 0) {
      toast({
        title: 'Error',
        description: 'Please type DELETE to confirm bulk deletion',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('renewals')
        .delete()
        .in('id', selectedRenewals)

      if (error) throw error

      trackEvent(RenewalPalEvents.FEATURE_USED, {
        feature: 'bulk_delete',
        count: selectedRenewals.length
      })

      toast({
        title: 'Success',
        description: `Deleted ${selectedRenewals.length} renewals`,
      })

      onRefresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Bulk delete error:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete renewals',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Edit3 className="h-4 w-4" />
          Bulk Operations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Bulk Operations</DialogTitle>
        </DialogHeader>
        
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === 'import' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('import')}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant={activeTab === 'export' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('export')}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            variant={activeTab === 'bulk-edit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('bulk-edit')}
            className="gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Bulk Edit
          </Button>
          <Button
            variant={activeTab === 'bulk-delete' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('bulk-delete')}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Bulk Delete
          </Button>
        </div>

        {activeTab === 'import' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="import-type">Import Format</Label>
              <Select value={importType} onValueChange={(value: 'csv' | 'json') => setImportType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="import-data">Data</Label>
              <Textarea
                id="import-data"
                placeholder={importType === 'csv' ? 'name,description,category,value,expiry_date...' : '{"name": "Example", "value": 100, ...}'}
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={8}
              />
            </div>
            <Button onClick={handleImport} disabled={isLoading} className="w-full">
              {isLoading ? 'Importing...' : 'Import Renewals'}
            </Button>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="export-format">Export Format</Label>
              <Select value={exportFormat} onValueChange={(value: 'csv' | 'json' | 'pdf') => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="export-category">Category Filter</Label>
                <Input
                  id="export-category"
                  placeholder="All categories"
                  value={exportFilters.category}
                  onChange={(e) => setExportFilters(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="export-status">Status Filter</Label>
                <Input
                  id="export-status"
                  placeholder="All statuses"
                  value={exportFilters.status}
                  onChange={(e) => setExportFilters(prev => ({ ...prev, status: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="export-date-from">Date From</Label>
                <Input
                  id="export-date-from"
                  type="date"
                  value={exportFilters.dateFrom}
                  onChange={(e) => setExportFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="export-date-to">Date To</Label>
                <Input
                  id="export-date-to"
                  type="date"
                  value={exportFilters.dateTo}
                  onChange={(e) => setExportFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                />
              </div>
            </div>
            <Button onClick={handleExport} disabled={isLoading} className="w-full">
              {isLoading ? 'Exporting...' : 'Export Renewals'}
            </Button>
          </div>
        )}

        {activeTab === 'bulk-edit' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bulk-edit-field">Field to Edit</Label>
              <Select value={bulkEditField} onValueChange={setBulkEditField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="auto_renew">Auto Renew</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bulk-edit-value">New Value</Label>
              <Input
                id="bulk-edit-value"
                placeholder="Enter new value"
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
              />
            </div>
            <div>
              <Label>Selected Renewals</Label>
              <div className="text-sm text-muted-foreground">
                {selectedRenewals.length} renewals selected
              </div>
            </div>
            <Button onClick={handleBulkEdit} disabled={isLoading || selectedRenewals.length === 0} className="w-full">
              {isLoading ? 'Updating...' : 'Update Renewals'}
            </Button>
          </div>
        )}

        {activeTab === 'bulk-delete' && (
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold text-destructive mb-2">⚠️ Danger Zone</h4>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. All selected renewals will be permanently deleted.
              </p>
            </div>
            <div>
              <Label htmlFor="delete-confirmation">Type DELETE to confirm</Label>
              <Input
                id="delete-confirmation"
                placeholder="DELETE"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="border-destructive focus:border-destructive"
              />
            </div>
            <div>
              <Label>Selected Renewals</Label>
              <div className="text-sm text-muted-foreground">
                {selectedRenewals.length} renewals selected
              </div>
            </div>
            <Button 
              onClick={handleBulkDelete} 
              disabled={isLoading || selectedRenewals.length === 0 || deleteConfirmation !== 'DELETE'}
              variant="destructive"
              className="w-full"
            >
              {isLoading ? 'Deleting...' : 'Delete Renewals'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 