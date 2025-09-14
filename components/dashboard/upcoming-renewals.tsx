"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle, Clock } from "lucide-react"
import { formatDate, calculateRenewalStatus, getStatusColor } from "@/lib/utils"

// Mock data for upcoming renewals
const upcomingRenewals = [
  {
    id: "1",
    title: "Adobe Creative Suite",
    vendor: "Adobe Inc.",
    renewalDate: "2024-02-15",
    amount: 1200,
    category: "Software License",
  },
  {
    id: "2",
    title: "AWS Cloud Services",
    vendor: "Amazon Web Services",
    renewalDate: "2024-02-20",
    amount: 2500,
    category: "Cloud Service",
  },
  {
    id: "3",
    title: "Office 365 Business",
    vendor: "Microsoft",
    renewalDate: "2024-02-25",
    amount: 800,
    category: "Software License",
  },
  {
    id: "4",
    title: "Business Insurance",
    vendor: "State Farm",
    renewalDate: "2024-03-01",
    amount: 5000,
    category: "Insurance",
  },
]

export function UpcomingRenewals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Renewals</span>
        </CardTitle>
        <CardDescription>
          Renewals due in the next 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingRenewals.map((renewal) => {
            const status = calculateRenewalStatus(new Date(renewal.renewalDate))
            
            return (
              <div
                key={renewal.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{renewal.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(status.status)}`}
                    >
                      {status.daysUntil === 0 ? "Due today" : `${status.daysUntil} days`}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{renewal.vendor}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{renewal.category}</span>
                    <span>${renewal.amount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            )
          })}
          
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              View All Renewals
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 