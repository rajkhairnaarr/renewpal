"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Settings } from "lucide-react"

export function OrganizationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Update your organization information and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                defaultValue="Acme Corporation"
                placeholder="Enter organization name"
              />
            </div>
            
            <div>
              <Label htmlFor="orgSlug">Organization URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  renewalpal.com/
                </span>
                <Input
                  id="orgSlug"
                  defaultValue="acme-corp"
                  placeholder="organization-slug"
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="industry">Industry</Label>
              <select
                id="industry"
                className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="technology"
              >
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <select
                id="teamSize"
                className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="11-50"
              >
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team Members</span>
          </CardTitle>
          <CardDescription>
            Manage your team members and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Admin</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-medium text-sm">SW</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Wilson</p>
                  <p className="text-sm text-gray-500">sarah@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Member</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 