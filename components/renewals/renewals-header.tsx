"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { RenewalForm } from "./renewal-form"
import { BulkOperations } from "./bulk-operations"
import { Plus, Search, FileDown } from "lucide-react"

export function RenewalsHeader() {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    // Trigger a refresh of the renewals list
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Renewals</h1>
        <p className="text-slate-600">
          Manage all your upcoming and active renewals.
        </p>
      </div>

      {/* Actions and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search by name, category, or owner..."
            className="w-full md:w-96 pl-10 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="due-soon">Due Soon</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <BulkOperations onRefresh={() => window.location.reload()} />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Renewal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Renewal</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new renewal to your account.
                </DialogDescription>
              </DialogHeader>
              <RenewalForm
                onSuccess={handleSuccess}
                onCancel={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}