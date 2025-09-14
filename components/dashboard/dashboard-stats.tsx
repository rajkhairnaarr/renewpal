"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface StatsData {
  totalRenewals: number
  totalValue: number
  upcomingRenewals: number
  overdueRenewals: number
  completedThisMonth: number
  valueThisMonth: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      // Fetch all renewals
      const { data, error } = await supabase
        .from("renewals")
        .select("*")
      if (error) {
        setStats(null)
        setLoading(false)
        return
      }
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      const in30Days = new Date(now)
      in30Days.setDate(now.getDate() + 30)

      const totalRenewals = data.length
      const totalValue = data.reduce((sum, r) => sum + (r.amount || 0), 0)
      const upcomingRenewals = data.filter(r => {
        const d = new Date(r.renewal_date)
        return d > now && d <= in30Days
      }).length
      const overdueRenewals = data.filter(r => {
        const d = new Date(r.renewal_date)
        return d < now && r.status !== "completed"
      }).length
      const completedThisMonth = data.filter(r => {
        const d = new Date(r.renewal_date)
        return r.status === "completed" && d >= startOfMonth && d <= endOfMonth
      }).length
      const valueThisMonth = data.filter(r => {
        const d = new Date(r.renewal_date)
        return d >= startOfMonth && d <= endOfMonth
      }).reduce((sum, r) => sum + (r.amount || 0), 0)

      setStats({
        totalRenewals,
        totalValue,
        upcomingRenewals,
        overdueRenewals,
        completedThisMonth,
        valueThisMonth,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading || !stats) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard stats...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Renewals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Renewals</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRenewals}</div>
          <p className="text-xs text-muted-foreground">
            Active renewals in your account
          </p>
        </CardContent>
      </Card>

      {/* Total Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.totalValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Combined value of all renewals
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Renewals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingRenewals}</div>
          <p className="text-xs text-muted-foreground">
            Due in next 30 days
          </p>
        </CardContent>
      </Card>

      {/* Overdue Renewals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <CheckCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.overdueRenewals}
          </div>
          <p className="text-xs text-muted-foreground">
            Past due date
          </p>
        </CardContent>
      </Card>

      {/* This Month's Activity */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{stats.completedThisMonth}</div>
              <p className="text-xs text-muted-foreground">Renewals completed</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.valueThisMonth)}
              </div>
              <p className="text-xs text-muted-foreground">Value processed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you stay on top of renewals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">View Calendar</span>
            </button>
            <button className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Check Alerts</span>
            </button>
            <button className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
            <button className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Manage Team</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 