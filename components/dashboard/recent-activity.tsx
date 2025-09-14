"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

// Mock data for recent activity
const recentActivity = [
  {
    id: "1",
    type: "created",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    },
    action: "created a new renewal",
    target: "Adobe Creative Suite",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    type: "updated",
    user: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: null,
    },
    action: "updated renewal details",
    target: "AWS Cloud Services",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    type: "notification",
    user: {
      name: "System",
      email: "system@renewalpal.com",
      avatar: null,
    },
    action: "sent reminder for",
    target: "Office 365 Business",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: "4",
    type: "completed",
    user: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: null,
    },
    action: "marked as completed",
    target: "Domain Registration",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: "5",
    type: "overdue",
    user: {
      name: "System",
      email: "system@renewalpal.com",
      avatar: null,
    },
    action: "flagged as overdue",
    target: "SSL Certificate",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "created":
      return <Plus className="h-4 w-4 text-green-600" />
    case "updated":
      return <Edit className="h-4 w-4 text-blue-600" />
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "notification":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Plus className="h-4 w-4 text-gray-600" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "created":
      return "bg-green-100 text-green-800"
    case "updated":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "notification":
      return "bg-orange-100 text-orange-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar || undefined} />
                  <AvatarFallback>
                    {activity.user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {activity.user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {activity.action}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {activity.target}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getActivityColor(activity.type)}`}
                  >
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 