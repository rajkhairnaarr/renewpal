"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tree, TreeItem } from "@/components/ui/tree"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Stepper } from "@/components/ui/stepper"
import { Timeline } from "@/components/ui/timeline"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Folder, 
  File, 
  Calendar, 
  Bell, 
  Users, 
  Settings, 
  Check,
  AlertCircle,
  Clock,
  Star
} from "lucide-react"

export default function ComponentsDemoPage() {
  const [treeItems, setTreeItems] = useState([
    {
      id: "1",
      label: "Renewals",
      icon: <Folder className="h-4 w-4" />,
      isOpen: true,
      children: [
        {
          id: "1-1",
          label: "Software Licenses",
          icon: <File className="h-4 w-4" />,
          isSelected: true,
        },
        {
          id: "1-2",
          label: "Subscriptions",
          icon: <File className="h-4 w-4" />,
        },
        {
          id: "1-3",
          label: "Contracts",
          icon: <File className="h-4 w-4" />,
        },
      ],
    },
    {
      id: "2",
      label: "Team",
      icon: <Users className="h-4 w-4" />,
      children: [
        {
          id: "2-1",
          label: "Members",
          icon: <File className="h-4 w-4" />,
        },
        {
          id: "2-2",
          label: "Roles",
          icon: <File className="h-4 w-4" />,
        },
      ],
    },
  ])

  const stepperSteps = [
    {
      id: "1",
      title: "Setup Organization",
      description: "Create your organization profile",
      status: "completed" as const,
    },
    {
      id: "2",
      title: "Add Team Members",
      description: "Invite your team to collaborate",
      status: "completed" as const,
    },
    {
      id: "3",
      title: "Configure Notifications",
      description: "Set up your notification preferences",
      status: "current" as const,
    },
    {
      id: "4",
      title: "Add First Renewal",
      description: "Start tracking your renewals",
      status: "pending" as const,
    },
  ]

  const timelineItems = [
    {
      id: "1",
      title: "Renewal Created",
      description: "Adobe Creative Suite license added",
      date: "2 hours ago",
      status: "success" as const,
      icon: <Check className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "Notification Sent",
      description: "Reminder sent to team members",
      date: "1 hour ago",
      status: "success" as const,
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Due Soon",
      description: "Slack Pro subscription expires in 5 days",
      date: "30 minutes ago",
      status: "warning" as const,
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ]

  const handleTreeToggle = (item: any) => {
    setTreeItems(prev => 
      prev.map(treeItem => {
        if (treeItem.id === item.id) {
          return { ...treeItem, isOpen: !treeItem.isOpen }
        }
        return treeItem
      })
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Enhanced Components Demo
        </h1>
        <p className="text-gray-600">
          Showcasing modern components inspired by SHSF UI and Origin UI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tree Component */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Tree Component
            </CardTitle>
            <CardDescription>
              Hierarchical navigation with smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tree
              items={treeItems}
              onToggle={handleTreeToggle}
              className="border rounded-lg p-4"
            />
          </CardContent>
        </Card>

        {/* Accordion Component */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Accordion Component
            </CardTitle>
            <CardDescription>
              Collapsible content with smooth transitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Renewal Management</AccordionTrigger>
                <AccordionContent>
                  Track and manage all your business renewals in one place. Get smart notifications, 
                  team collaboration, and powerful analytics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Team Collaboration</AccordionTrigger>
                <AccordionContent>
                  Work together with role-based permissions and team features. Share renewals, 
                  assign tasks, and track progress.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Analytics & Reporting</AccordionTrigger>
                <AccordionContent>
                  Get insights into your renewal patterns and costs. Export reports, 
                  track spending, and optimize your renewals.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Slider Component */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Slider Component
            </CardTitle>
            <CardDescription>
              Interactive sliders with value display
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Notification Days</label>
              <Slider
                defaultValue={[7]}
                max={30}
                step={1}
                showValue
                formatValue={(value) => `${value} days`}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Budget Range</label>
              <Slider
                defaultValue={[1000, 5000]}
                max={10000}
                step={100}
                showValue
                formatValue={(value) => `$${value.toLocaleString()}`}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stepper Component */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Stepper Component
            </CardTitle>
            <CardDescription>
              Progress tracking with status indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={stepperSteps}
              currentStep={2}
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Previous</Button>
              <Button size="sm">Next</Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Component */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timeline Component
            </CardTitle>
            <CardDescription>
              Activity timeline with status indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline items={timelineItems} />
          </CardContent>
        </Card>

        {/* Tooltip Component */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
            <CardDescription>
              Interactive tooltips with different variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default">Default Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a default tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Success Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Success message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Warning Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Warning message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Error Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Error message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 