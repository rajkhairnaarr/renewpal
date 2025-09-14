"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Check, Crown } from "lucide-react"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Pro Plan</h3>
                <p className="text-sm text-gray-500">$15/month</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>100 renewals</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>5 team members</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Priority support</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment methods and billing address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-gray-600" />
              <div>
                <h3 className="font-medium">•••• •••• •••• 4242</h3>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Pro Plan - January 2024</h4>
                <p className="text-sm text-gray-500">Jan 1, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">$15.00</span>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Pro Plan - December 2023</h4>
                <p className="text-sm text-gray-500">Dec 1, 2023</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">$15.00</span>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm">
              View All Invoices
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Cancel Subscription</CardTitle>
          <CardDescription>
            Cancel your subscription at any time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Canceling your subscription will stop all billing and you'll lose access to Pro features at the end of your current billing period.
          </p>
          <Button variant="destructive" size="sm">
            Cancel Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 