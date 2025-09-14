"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { OrganizationSettings } from "./organization-settings"
import { NotificationSettings } from "./notification-settings"
import { BillingSettings } from "./billing-settings"
import { SecuritySettings } from "./security-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>
      
      <TabsContent value="organization">
        <OrganizationSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="billing">
        <BillingSettings />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
} 