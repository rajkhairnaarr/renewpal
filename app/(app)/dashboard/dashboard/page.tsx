import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Stats Cards */}
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardStats />
          </Suspense>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Charts */}
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardCharts />
              </Suspense>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <Suspense fallback={<LoadingSpinner />}>
                <UpcomingRenewals />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner />}>
                <RecentActivity />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 