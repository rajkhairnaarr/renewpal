import { z } from "zod"

// User and Organization Schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  imageUrl: z.string().url().optional(),
})

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Organization name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(50).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  plan: z.enum(["free", "pro", "team", "enterprise"]).default("free"),
  settings: z.record(z.any()).optional(),
})

export const organizationMemberSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.enum(["admin", "member", "viewer"]).default("member"),
  permissions: z.record(z.any()).optional(),
})

// Renewal Schemas
export const renewalSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  category: z.string().min(1, "Category is required"),
  vendor: z.string().min(1, "Vendor is required").max(100),
  amount: z.number().min(0, "Amount must be positive"),
  currency: z.string().default("USD"),
  renewalDate: z.string().min(1, "Renewal date is required"),
  notificationDays: z.array(z.number().min(1).max(365)).default([30, 7, 1]),
  status: z.enum(["active", "cancelled", "completed"]).default("active"),
  customFields: z.record(z.any()).optional(),
  attachments: z.array(z.string()).optional(),
  assignedTo: z.string().optional(),
})

export const renewalUpdateSchema = renewalSchema.partial().omit({ organizationId: true })

export const renewalFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  vendor: z.string().optional(),
  status: z.enum(["active", "cancelled", "completed"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  assignedTo: z.string().optional(),
  sortBy: z.enum(["title", "renewalDate", "amount", "vendor", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

// Notification Schemas
export const notificationSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  renewalId: z.string(),
  userId: z.string(),
  type: z.enum(["email", "sms", "in_app", "slack"]),
  status: z.enum(["pending", "sent", "failed", "acknowledged"]).default("pending"),
  scheduledAt: z.string(),
  sentAt: z.string().optional(),
  content: z.record(z.any()),
})

export const notificationUpdateSchema = notificationSchema.partial().omit({ organizationId: true, renewalId: true })

// File Upload Schemas
export const fileUploadSchema = z.object({
  organizationId: z.string(),
  renewalId: z.string(),
  file: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB"),
  originalName: z.string(),
  mimeType: z.string(),
})

// Subscription and Billing Schemas
export const subscriptionSchema = z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  stripeSubscriptionId: z.string(),
  stripeCustomerId: z.string(),
  plan: z.enum(["free", "pro", "team", "enterprise"]),
  status: z.enum(["active", "canceled", "past_due", "unpaid"]),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean().default(false),
})

// Form Schemas for UI
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organizationName: z.string().min(1, "Organization name is required"),
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const onboardingSchema = z.object({
  step: z.number().min(1).max(5),
  organizationName: z.string().min(1, "Organization name is required"),
  industry: z.string().optional(),
  teamSize: z.enum(["1-10", "11-50", "51-200", "200+"]).optional(),
  role: z.enum(["admin", "manager", "member"]).optional(),
  integrations: z.array(z.string()).optional(),
  sampleData: z.boolean().default(true),
})

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().optional(),
})

export const organizationSettingsSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slug: z.string().min(1, "Slug is required").max(50).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  settings: z.object({
    timezone: z.string().default("UTC"),
    dateFormat: z.string().default("MM/DD/YYYY"),
    currency: z.string().default("USD"),
    defaultNotificationDays: z.array(z.number()).default([30, 7, 1]),
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    slackWebhook: z.string().url().optional(),
  }).optional(),
})

// API Response Schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
})

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  total: z.number().optional(),
  totalPages: z.number().optional(),
})

// Search and Filter Schemas
export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  filters: z.record(z.any()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

// Webhook Schemas
export const stripeWebhookSchema = z.object({
  id: z.string(),
  object: z.string(),
  api_version: z.string(),
  created: z.number(),
  data: z.record(z.any()),
  livemode: z.boolean(),
  pending_webhooks: z.number(),
  request: z.record(z.any()),
  type: z.string(),
})

export const clerkWebhookSchema = z.object({
  data: z.record(z.any()),
  object: z.string(),
  type: z.string(),
})

// Export types
export type User = z.infer<typeof userSchema>
export type Organization = z.infer<typeof organizationSchema>
export type OrganizationMember = z.infer<typeof organizationMemberSchema>
export type Renewal = z.infer<typeof renewalSchema>
export type RenewalUpdate = z.infer<typeof renewalUpdateSchema>
export type RenewalFilter = z.infer<typeof renewalFilterSchema>
export type Notification = z.infer<typeof notificationSchema>
export type NotificationUpdate = z.infer<typeof notificationUpdateSchema>
export type FileUpload = z.infer<typeof fileUploadSchema>
export type Subscription = z.infer<typeof subscriptionSchema>
export type SignUp = z.infer<typeof signUpSchema>
export type SignIn = z.infer<typeof signInSchema>
export type Onboarding = z.infer<typeof onboardingSchema>
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>
export type OrganizationSettings = z.infer<typeof organizationSettingsSchema>
export type ApiResponse = z.infer<typeof apiResponseSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type Search = z.infer<typeof searchSchema>
export type StripeWebhook = z.infer<typeof stripeWebhookSchema>
export type ClerkWebhook = z.infer<typeof clerkWebhookSchema> 