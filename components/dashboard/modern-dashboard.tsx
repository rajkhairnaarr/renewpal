import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  CalendarDays, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  TrendingUp,
  Plus,
  Bell,
  Search,
  MoreHorizontal
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'

const chartData = [
  { month: 'Jan', renewals: 4, revenue: 30000 },
  { month: 'Feb', renewals: 6, revenue: 45000 },
  { month: 'Mar', renewals: 3, revenue: 22000 },
  { month: 'Apr', renewals: 8, revenue: 60000 },
  { month: 'May', renewals: 5, revenue: 38000 },
  { month: 'Jun', renewals: 7, revenue: 52000 },
]

const upcomingRenewals = [
  { id: 1, company: "Adobe Inc.", type: "Software License", amount: "$1,200", daysLeft: 5, status: "urgent" },
  { id: 2, company: "Amazon Web Services", type: "Cloud Service", amount: "$2,500", daysLeft: 12, status: "warning" },
  { id: 3, company: "Microsoft", type: "Software License", amount: "$800", daysLeft: 18, status: "normal" },
  { id: 4, company: "Slack", type: "Software License", amount: "$450", daysLeft: 25, status: "normal" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'urgent': return 'destructive'
    case 'warning': return 'secondary'
    default: return 'outline'
  }
}

const getDaysLeftColor = (days: number) => {
  if (days <= 7) return 'text-red-600'
  if (days <= 14) return 'text-amber-600'
  return 'text-green-600'
}

export default function ModernDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-10">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RenewPal
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="search"
                placeholder="Search renewals..."
                className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Renewal
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening with your renewals today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Due This Week</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">12</div>
              <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-300">
                <TrendingUp className="h-3 w-3" />
                +2 from last week
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full -mr-8 -mt-8 opacity-20" />
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">3</div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                Needs attention
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 dark:bg-amber-800 rounded-full -mr-8 -mt-8 opacity-20" />
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">28</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">
                This month
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-200 dark:bg-emerald-800 rounded-full -mr-8 -mt-8 opacity-20" />
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">$45K</div>
              <div className="text-xs text-purple-700 dark:text-purple-300">
                Active renewals
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full -mr-8 -mt-8 opacity-20" />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Renewal Trends
              </CardTitle>
              <CardDescription>Monthly renewal activity and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="renewalsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="renewals" orientation="left" />
                    <YAxis yAxisId="revenue" orientation="right" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' 
                      }} 
                    />
                    <Area
                      yAxisId="renewals"
                      type="monotone"
                      dataKey="renewals"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#renewalsGradient)"
                    />
                    <Line
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Renewals */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Upcoming Renewals
                </span>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingRenewals.map((renewal) => (
                <div key={renewal.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{renewal.company}</div>
                    <div className="text-xs text-gray-500">{renewal.type}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(renewal.status)} className="text-xs">
                        {renewal.daysLeft} days
                      </Badge>
                      <span className="text-sm font-medium">{renewal.amount}</span>
                    </div>
                  </div>
                  <div className={`text-right ${getDaysLeftColor(renewal.daysLeft)}`}>
                    <div className="text-lg font-bold">{renewal.daysLeft}</div>
                    <div className="text-xs">days</div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                View All Renewals
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>Track your renewal management progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Renewals Processed</span>
                  <span>28/35</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue Secured</span>
                  <span>$45K/$60K</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>On-time Rate</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}