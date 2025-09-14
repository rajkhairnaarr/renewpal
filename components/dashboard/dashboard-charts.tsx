"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

// Mock data for charts
const monthlyData = [
  { month: "Jan", renewals: 4, value: 25000 },
  { month: "Feb", renewals: 6, value: 35000 },
  { month: "Mar", renewals: 3, value: 20000 },
  { month: "Apr", renewals: 8, value: 45000 },
  { month: "May", renewals: 5, value: 30000 },
  { month: "Jun", renewals: 7, value: 40000 },
]

const categoryData = [
  { name: "Software", value: 35, color: "#3B82F6" },
  { name: "Cloud Services", value: 25, color: "#10B981" },
  { name: "Insurance", value: 20, color: "#F59E0B" },
  { name: "Hardware", value: 15, color: "#EF4444" },
  { name: "Other", value: 5, color: "#8B5CF6" },
]

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Renewal Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Renewal Trends</CardTitle>
          <CardDescription>
            Monthly renewal activity and value over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="renewals"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Renewals"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Value ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Renewals by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Renewals</CardTitle>
            <CardDescription>
              Number of renewals per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="renewals" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 