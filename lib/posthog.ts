import posthog from 'posthog-js'

// Client-side PostHog
export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      autocapture: true,
    })
  }
}

// Server-side PostHog (only import on server)
let posthogServer: any = null
if (typeof window === 'undefined') {
  // Dynamic import to avoid client-side bundling
  import('posthog-node').then(({ PostHog }) => {
    posthogServer = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      }
    )
  }).catch(console.error)
}

// Utility functions for tracking events
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', { page })
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties)
  }
}

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.register(properties)
  }
}

// Server-side tracking
export const trackServerEvent = async (
  event: string,
  userId: string,
  properties?: Record<string, any>
) => {
  if (typeof window === 'undefined' && posthogServer) {
    try {
      await posthogServer.capture({
        event,
        distinctId: userId,
        properties,
      })
    } catch (error) {
      console.error('PostHog server tracking error:', error)
    }
  }
}

// Common events for RenewalPal
export const RenewalPalEvents = {
  // User lifecycle
  USER_SIGNED_UP: 'user_signed_up',
  USER_SIGNED_IN: 'user_signed_in',
  USER_ONBOARDED: 'user_onboarded',
  
  // Organization
  ORGANIZATION_CREATED: 'organization_created',
  TEAM_MEMBER_INVITED: 'team_member_invited',
  TEAM_MEMBER_JOINED: 'team_member_joined',
  
  // Renewals
  RENEWAL_CREATED: 'renewal_created',
  RENEWAL_UPDATED: 'renewal_updated',
  RENEWAL_DELETED: 'renewal_deleted',
  RENEWAL_EXPIRED: 'renewal_expired',
  
  // Notifications
  NOTIFICATION_SENT: 'notification_sent',
  NOTIFICATION_READ: 'notification_read',
  
  // Features
  FEATURE_USED: 'feature_used',
  EXPORT_USED: 'export_used',
  IMPORT_USED: 'import_used',
  
  // Billing
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_UPDATED: 'subscription_updated',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  
  // Errors
  ERROR_OCCURRED: 'error_occurred',
} as const 