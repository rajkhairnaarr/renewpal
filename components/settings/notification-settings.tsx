"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, MessageCircle, MessageSquare } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <Label htmlFor="email-notifications" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-green-600" />
                <div>
                  <Label htmlFor="in-app-notifications" className="text-base font-medium">
                    In-App Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Show notifications within the app
                  </p>
                </div>
              </div>
              <Switch id="in-app-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <Label htmlFor="sms-notifications" className="text-base font-medium">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive text message alerts
                  </p>
                </div>
              </div>
              <Switch id="sms-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div>
                  <Label htmlFor="slack-notifications" className="text-base font-medium">
                    Slack Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Send notifications to Slack
                  </p>
                </div>
              </div>
              <Switch id="slack-notifications" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Timing</CardTitle>
          <CardDescription>
            When should you be notified about renewals?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">30 days before</Label>
                <p className="text-sm text-gray-500">Early warning for planning</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">7 days before</Label>
                <p className="text-sm text-gray-500">Reminder to take action</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">1 day before</Label>
                <p className="text-sm text-gray-500">Final reminder</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">On due date</Label>
                <p className="text-sm text-gray-500">Same day notification</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">After due date</Label>
                <p className="text-sm text-gray-500">Overdue alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Choose which types of notifications to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Renewal reminders</Label>
                <p className="text-sm text-gray-500">When renewals are due</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Team activity</Label>
                <p className="text-sm text-gray-500">When team members make changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">System updates</Label>
                <p className="text-sm text-gray-500">Product updates and maintenance</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Billing notifications</Label>
                <p className="text-sm text-gray-500">Payment and subscription updates</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Notification Settings</Button>
      </div>
    </div>
  )
} 