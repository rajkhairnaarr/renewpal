import { Suspense } from "react"
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <SettingsTabs />
        </Suspense>
      </div>
    </div>
  )
} 