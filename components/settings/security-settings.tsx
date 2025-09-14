"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Activity } from "lucide-react"

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium">Authenticator App</h3>
                <p className="text-sm text-gray-500">Use an app like Google Authenticator</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Enabled
              </Badge>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-gray-500">Chrome on MacBook Pro • San Francisco, CA</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Current
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="font-medium">Previous Session</h4>
                  <p className="text-sm text-gray-500">Safari on iPhone • San Francisco, CA</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Revoke All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Production API Key</h4>
                  <p className="text-sm text-gray-500">Created 2 months ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Active</Badge>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="font-medium">Test API Key</h4>
                  <p className="text-sm text-gray-500">Created 1 month ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Active</Badge>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Create New API Key
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Download your data or delete your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Export Your Data</h4>
            <p className="text-sm text-gray-600 mb-3">
              Download all your data including renewals, settings, and activity logs.
            </p>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 text-red-600">Delete Account</h4>
            <p className="text-sm text-gray-600 mb-3">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 