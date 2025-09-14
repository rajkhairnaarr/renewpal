// Application Configuration
export const APP_CONFIG = {
  name: "RenewalPal",
  description: "Track and manage renewals for your business",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  supportEmail: "support@renewalpal.com",
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxAttachmentsPerRenewal: 5,
  defaultCurrency: "USD",
  defaultTimezone: "UTC",
  defaultDateFormat: "MM/DD/YYYY",
} as const

// Subscription Plans and Limits
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    renewalLimit: 5,
    memberLimit: 1,
    features: [
      "Basic renewal tracking",
      "Email notifications",
      "Basic dashboard",
      "CSV export",
    ],
    stripePriceId: null,
  },
  pro: {
    name: "Pro",
    price: 15,
    renewalLimit: 100,
    memberLimit: 5,
    features: [
      "Advanced renewal tracking",
      "Email & SMS notifications",
      "Advanced analytics",
      "Calendar integration",
      "File attachments",
      "Custom fields",
      "Priority support",
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  team: {
    name: "Team",
    price: 49,
    renewalLimit: 1000,
    memberLimit: 25,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Role-based permissions",
      "Advanced reporting",
      "Slack integration",
      "API access",
      "White-label options",
    ],
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID,
  },
  enterprise: {
    name: "Enterprise",
    price: null, // Custom pricing
    renewalLimit: -1, // Unlimited
    memberLimit: -1, // Unlimited
    features: [
      "Everything in Team",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantees",
      "Advanced security",
      "Custom branding",
      "On-premise options",
    ],
    stripePriceId: null,
  },
} as const

// Renewal Categories
export const RENEWAL_CATEGORIES = [
  "Software License",
  "Cloud Service",
  "Domain Registration",
  "SSL Certificate",
  "Insurance",
  "Maintenance Contract",
  "Professional Service",
  "Hardware Lease",
  "Office Space",
  "Vehicle Lease",
  "Equipment Rental",
  "Membership",
  "Subscription",
  "Other",
] as const

// Notification Settings
export const NOTIFICATION_DAYS = [1, 7, 14, 30, 60, 90] as const
export const DEFAULT_NOTIFICATION_DAYS = [30, 7, 1] as const

export const NOTIFICATION_TYPES = {
  email: {
    name: "Email",
    icon: "mail",
    enabled: true,
  },
  sms: {
    name: "SMS",
    icon: "message-circle",
    enabled: false,
  },
  in_app: {
    name: "In-App",
    icon: "bell",
    enabled: true,
  },
  slack: {
    name: "Slack",
    icon: "message-square",
    enabled: false,
  },
} as const

// Dashboard Widgets
export const DASHBOARD_WIDGETS = {
  upcomingRenewals: {
    id: "upcomingRenewals",
    name: "Upcoming Renewals",
    description: "Show renewals due in the next 30 days",
    defaultEnabled: true,
  },
  renewalValue: {
    id: "renewalValue",
    name: "Renewal Value",
    description: "Total value of renewals by month",
    defaultEnabled: true,
  },
  categoryBreakdown: {
    id: "categoryBreakdown",
    name: "Category Breakdown",
    description: "Renewals by category",
    defaultEnabled: true,
  },
  recentActivity: {
    id: "recentActivity",
    name: "Recent Activity",
    description: "Latest renewal updates",
    defaultEnabled: true,
  },
  teamOverview: {
    id: "teamOverview",
    name: "Team Overview",
    description: "Team member activity",
    defaultEnabled: false,
  },
  notifications: {
    id: "notifications",
    name: "Notifications",
    description: "Recent notifications",
    defaultEnabled: true,
  },
} as const

// API Rate Limits
export const RATE_LIMITS = {
  auth: {
    signIn: { requests: 5, window: "1m" },
    signUp: { requests: 3, window: "1h" },
    passwordReset: { requests: 3, window: "1h" },
  },
  api: {
    renewals: { requests: 100, window: "1m" },
    notifications: { requests: 50, window: "1m" },
    uploads: { requests: 10, window: "1m" },
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: "Invalid email or password",
    emailExists: "An account with this email already exists",
    weakPassword: "Password must be at least 8 characters long",
    invalidEmail: "Please enter a valid email address",
  },
  renewal: {
    notFound: "Renewal not found",
    unauthorized: "You don't have permission to access this renewal",
    invalidDate: "Please enter a valid renewal date",
    invalidAmount: "Please enter a valid amount",
  },
  organization: {
    notFound: "Organization not found",
    unauthorized: "You don't have permission to access this organization",
    slugExists: "This organization slug is already taken",
  },
  file: {
    tooLarge: "File size must be less than 10MB",
    invalidType: "File type not supported",
    uploadFailed: "Failed to upload file",
  },
  general: {
    serverError: "Something went wrong. Please try again.",
    networkError: "Network error. Please check your connection.",
    validationError: "Please check your input and try again.",
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  renewal: {
    created: "Renewal created successfully",
    updated: "Renewal updated successfully",
    deleted: "Renewal deleted successfully",
  },
  organization: {
    created: "Organization created successfully",
    updated: "Organization updated successfully",
    memberAdded: "Member added successfully",
    memberRemoved: "Member removed successfully",
  },
  notification: {
    sent: "Notification sent successfully",
    scheduled: "Notification scheduled successfully",
  },
  file: {
    uploaded: "File uploaded successfully",
    deleted: "File deleted successfully",
  },
} as const

// Onboarding Steps
export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Welcome to RenewalPal",
    description: "Let's get you set up in just a few minutes",
    component: "WelcomeStep",
  },
  {
    id: 2,
    title: "Your Organization",
    description: "Tell us about your company",
    component: "OrganizationStep",
  },
  {
    id: 3,
    title: "Your Role",
    description: "How will you be using RenewalPal?",
    component: "RoleStep",
  },
  {
    id: 4,
    title: "Add Your First Renewal",
    description: "Let's add your first renewal to track",
    component: "FirstRenewalStep",
  },
  {
    id: 5,
    title: "You're All Set!",
    description: "Welcome to RenewalPal",
    component: "CompleteStep",
  },
] as const

// Feature Flags
export const FEATURE_FLAGS = {
  aiNotifications: true,
  slackIntegration: true,
  advancedAnalytics: true,
  teamCollaboration: true,
  customFields: true,
  fileAttachments: true,
  calendarIntegration: true,
  apiAccess: false,
  whiteLabel: false,
} as const

// Export types
export type Plan = keyof typeof PLANS
export type RenewalCategory = typeof RENEWAL_CATEGORIES[number]
export type NotificationType = keyof typeof NOTIFICATION_TYPES
export type DashboardWidget = keyof typeof DASHBOARD_WIDGETS
export type OnboardingStep = typeof ONBOARDING_STEPS[number] 