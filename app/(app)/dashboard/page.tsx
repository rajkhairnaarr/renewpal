import { Suspense } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Settings,
  RefreshCw,
  BarChart3
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back! Here's what's happening with your renewals today.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Renewal
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Due This Week</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-xs text-green-600">↑ 2 from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Overdue</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-red-600">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-slate-900">28</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-slate-900">$45K</p>
                <p className="text-xs text-purple-600">Active renewals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats and Charts */}
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardStats />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardCharts />
          </Suspense>
        </div>
        
        {/* Right Column - Renewals and Activity */}
        <div className="space-y-8">
          <Suspense fallback={<LoadingSpinner />}>
            <UpcomingRenewals />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Overview
              </CardTitle>
              <CardDescription>
                Recent team activity and collaboration metrics
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 rounded-lg border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Documents</h4>
              <p className="text-2xl font-bold text-slate-900 mb-1">156</p>
              <p className="text-sm text-slate-600">files uploaded this month</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Savings</h4>
              <p className="text-2xl font-bold text-slate-900 mb-1">$12,450</p>
              <p className="text-sm text-slate-600">saved this month</p>
            </div>
            
            <div className="text-center p-6 bg-slate-50 rounded-lg border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Automations</h4>
              <p className="text-2xl font-bold text-slate-900 mb-1">23</p>
              <p className="text-sm text-slate-600">active automation rules</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}