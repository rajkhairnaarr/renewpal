"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutDashboard,
  RefreshCw,
  Users,
  Bell,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  CreditCard,
  Building,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut
} from "lucide-react"
import { useAppStore } from "@/components/providers/store-provider"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigationSections: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Overview and analytics"
      },
      {
        title: "Renewals",
        href: "/renewals",
        icon: RefreshCw,
        badge: "12",
        description: "Manage all renewals"
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
        description: "View renewal timeline"
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        description: "Reports and insights"
      }
    ]
  },
  {
    title: "Team",
    items: [
      {
        title: "Team Members",
        href: "/team",
        icon: Users,
        description: "Manage team access"
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
        badge: "3",
        description: "Alert center"
      },
      {
        title: "Files",
        href: "/files",
        icon: FileText,
        description: "Document storage"
      }
    ]
  },
  {
    title: "Organization",
    items: [
      {
        title: "Organization",
        href: "/organization",
        icon: Building,
        description: "Company settings"
      },
      {
        title: "Billing",
        href: "/billing",
        icon: CreditCard,
        description: "Subscription & payments"
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "App preferences"
      }
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-white border-r border-slate-200 transition-all duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200">
            {!isCollapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-900">RenewPal</span>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleCollapse}
              className="hidden lg:flex h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-b border-slate-200">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Renewal
              </Button>
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      
                      return (
                        <Link key={item.href} href={item.href}>
                          <div className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            "hover:bg-slate-100",
                            isActive 
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                              : "text-slate-700"
                          )}>
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            
                            {!isCollapsed && (
                              <>
                                <div className="flex-1">
                                  <div className="font-medium">{item.title}</div>
                                  {item.description && (
                                    <div className="text-xs text-slate-500">{item.description}</div>
                                  )}
                                </div>
                                
                                {item.badge && (
                                  <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  
                  {!isCollapsed && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            {!isCollapsed ? (
              <div className="space-y-2">
                <Link href="/help">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </div>
                </Link>
                
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors w-full">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full h-8 p-0">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-full h-8 p-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}