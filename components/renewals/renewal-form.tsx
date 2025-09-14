"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { supabase } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Calendar, DollarSign, FileText, User } from "lucide-react"

const renewalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  vendor: z.string().min(1, "Vendor is required"),
  amount: z.number().min(0, "Amount must be positive"),
  currency: z.string().default("USD"),
  renewal_date: z.string().min(1, "Renewal date is required"),
  status: z.enum(["active", "cancelled", "completed"]).default("active"),
  notification_days: z.array(z.number()).default([30, 7, 1]),
})

type RenewalFormData = z.infer<typeof renewalSchema>

interface RenewalFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: Partial<RenewalFormData>
}

const categories = [
  "Software License",
  "Cloud Service",
  "Hardware",
  "Insurance",
  "Contract",
  "Subscription",
  "Domain",
  "SSL Certificate",
  "Other",
]

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "C$" },
]

export function RenewalForm({ onSuccess, onCancel, initialData }: RenewalFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RenewalFormData>({
    resolver: zodResolver(renewalSchema),
    defaultValues: {
      currency: "USD",
      status: "active",
      notification_days: [30, 7, 1],
      ...initialData,
    },
  })

  const onSubmit = async (data: RenewalFormData) => {
    setLoading(true)
    try {
      // For now, use a mock organization_id - in production this would come from auth context
      const organization_id = "org_1"
      const created_by = "user_1" // This would come from auth context

      const { error } = await supabase.from("renewals").insert({
        organization_id,
        title: data.title,
        description: data.description || null,
        category: data.category,
        vendor: data.vendor,
        amount: data.amount,
        currency: data.currency,
        renewal_date: data.renewal_date,
        status: data.status,
        notification_days: data.notification_days,
        created_by,
        assigned_to: null,
        custom_fields: {},
        attachments: [],
      })

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Renewal created successfully",
      })

      onSuccess?.()
    } catch (error) {
      console.error("Error creating renewal:", error)
      toast({
        title: "Error",
        description: "Failed to create renewal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Adobe Creative Suite"
              className="pl-10"
            />
          </div>
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Vendor */}
        <div>
          <Label htmlFor="vendor">Vendor *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="vendor"
              {...register("vendor")}
              placeholder="e.g., Adobe Inc."
              className="pl-10"
            />
          </div>
          {errors.vendor && (
            <p className="text-sm text-red-600 mt-1">{errors.vendor.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <Label htmlFor="amount">Amount *</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              placeholder="0.00"
              className="pl-10"
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-600 mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Currency */}
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select onValueChange={(value) => setValue("currency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Renewal Date */}
        <div>
          <Label htmlFor="renewal_date">Renewal Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="renewal_date"
              type="date"
              {...register("renewal_date")}
              className="pl-10"
            />
          </div>
          {errors.renewal_date && (
            <p className="text-sm text-red-600 mt-1">{errors.renewal_date.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => setValue("status", value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Additional details about this renewal..."
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Renewal"}
        </Button>
      </div>
    </form>
  )
} 