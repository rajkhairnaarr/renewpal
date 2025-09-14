'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Filter, X, Save } from 'lucide-react'
import { RENEWAL_CATEGORIES } from '@/lib/constants'

interface FilterState {
  search: string
  category: string
  status: string
  vendor: string
  valueMin: string
  valueMax: string
  dateFrom: string
  dateTo: string
  autoRenew: boolean | null
  hasAttachments: boolean
}

interface AdvancedFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onSaveFilter?: (name: string, filters: FilterState) => void
  savedFilters?: Array<{ name: string; filters: FilterState }>
}

export function AdvancedFilters({ 
  filters, 
  onFiltersChange, 
  onSaveFilter,
  savedFilters = []
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    setIsOpen(false)
  }

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      category: '',
      status: '',
      vendor: '',
      valueMin: '',
      valueMax: '',
      dateFrom: '',
      dateTo: '',
      autoRenew: null,
      hasAttachments: false
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const handleSaveFilter = () => {
    if (!filterName.trim()) return
    onSaveFilter?.(filterName, localFilters)
    setFilterName('')
  }

  const handleLoadFilter = (savedFilter: { name: string; filters: FilterState }) => {
    setLocalFilters(savedFilter.filters)
    onFiltersChange(savedFilter.filters)
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== null && value !== false
  ).length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name, description, or notes..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={localFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {RENEWAL_CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={localFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vendor */}
          <div>
            <Label htmlFor="vendor">Vendor</Label>
            <Input
              id="vendor"
              placeholder="Filter by vendor..."
              value={localFilters.vendor}
              onChange={(e) => handleFilterChange('vendor', e.target.value)}
            />
          </div>

          {/* Value Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value-min">Min Value</Label>
              <Input
                id="value-min"
                type="number"
                placeholder="0"
                value={localFilters.valueMin}
                onChange={(e) => handleFilterChange('valueMin', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="value-max">Max Value</Label>
              <Input
                id="value-max"
                type="number"
                placeholder="No limit"
                value={localFilters.valueMax}
                onChange={(e) => handleFilterChange('valueMax', e.target.value)}
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date-from">From Date</Label>
              <Input
                id="date-from"
                type="date"
                value={localFilters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date-to">To Date</Label>
              <Input
                id="date-to"
                type="date"
                value={localFilters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>

          {/* Auto Renew */}
          <div>
            <Label htmlFor="auto-renew">Auto Renew</Label>
            <Select 
              value={localFilters.autoRenew === null ? '' : localFilters.autoRenew ? 'true' : 'false'} 
              onValueChange={(value) => handleFilterChange('autoRenew', value === '' ? null : value === 'true')}
            >
              <SelectTrigger>
                <SelectValue placeholder="All renewals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All renewals</SelectItem>
                <SelectItem value="true">Auto renew enabled</SelectItem>
                <SelectItem value="false">Auto renew disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Has Attachments */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has-attachments"
              checked={localFilters.hasAttachments}
              onCheckedChange={(checked) => handleFilterChange('hasAttachments', checked)}
            />
            <Label htmlFor="has-attachments">Has attachments</Label>
          </div>

          {/* Saved Filters */}
          {savedFilters.length > 0 && (
            <div>
              <Label>Saved Filters</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {savedFilters.map((savedFilter, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleLoadFilter(savedFilter)}
                  >
                    {savedFilter.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Save Filter */}
          {onSaveFilter && (
            <div className="flex gap-2">
              <Input
                placeholder="Filter name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <Button onClick={handleSaveFilter} disabled={!filterName.trim()}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 