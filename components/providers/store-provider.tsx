"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createJSONStorage } from "zustand/middleware"

// Store types
interface AppState {
  // UI State
  sidebarOpen: boolean
  theme: "light" | "dark" | "system"
  
  // User preferences
  dashboardLayout: Record<string, boolean>
  notifications: {
    email: boolean
    sms: boolean
    inApp: boolean
    slack: boolean
  }
  
  // Onboarding state
  onboardingStep: number
  onboardingCompleted: boolean
  
  // Actions
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark" | "system") => void
  updateDashboardLayout: (widgetId: string, enabled: boolean) => void
  updateNotificationSettings: (type: keyof AppState["notifications"], enabled: boolean) => void
  setOnboardingStep: (step: number) => void
  completeOnboarding: () => void
  resetStore: () => void
}

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: false,
      theme: "system",
      dashboardLayout: {
        upcomingRenewals: true,
        renewalValue: true,
        categoryBreakdown: true,
        recentActivity: true,
        teamOverview: false,
        notifications: true,
      },
      notifications: {
        email: true,
        sms: false,
        inApp: true,
        slack: false,
      },
      onboardingStep: 1,
      onboardingCompleted: false,

      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme) => set({ theme }),
      
      updateDashboardLayout: (widgetId, enabled) =>
        set((state) => ({
          dashboardLayout: {
            ...state.dashboardLayout,
            [widgetId]: enabled,
          },
        })),
      
      updateNotificationSettings: (type, enabled) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: enabled,
          },
        })),
      
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      
      completeOnboarding: () => set({ onboardingCompleted: true }),
      
      resetStore: () => set({
        sidebarOpen: false,
        dashboardLayout: {
          upcomingRenewals: true,
          renewalValue: true,
          categoryBreakdown: true,
          recentActivity: true,
          teamOverview: false,
          notifications: true,
        },
        notifications: {
          email: true,
          sms: false,
          inApp: true,
          slack: false,
        },
        onboardingStep: 1,
        onboardingCompleted: false,
      }),
    }),
    {
      name: "renewalpal-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        dashboardLayout: state.dashboardLayout,
        notifications: state.notifications,
        onboardingStep: state.onboardingStep,
        onboardingCompleted: state.onboardingCompleted,
      }),
    }
  )
)

// Store provider component
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 