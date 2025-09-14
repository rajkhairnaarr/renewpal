"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Bell, Settings, Search } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { user } = useUser()
  
  const firstName = user?.firstName || "there"
  const currentTime = new Date()
  const hour = currentTime.getHours()
  
  let greeting = "Good morning"
  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon"
  } else if (hour >= 17) {
    greeting = "Good evening"
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">RenewalPal</span>
            </div>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-900">
                {greeting}, {firstName}! 👋
              </h1>
              <p className="text-sm text-gray-600">
                Here's what's happening with your renewals today
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            <Link href="/renewals/new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Renewal
              </Button>
            </Link>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 