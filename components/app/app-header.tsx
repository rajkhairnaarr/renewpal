"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search,
  Bell,
  Menu,
  Plus,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Moon,
  Sun,
  Command
} from "lucide-react"
import { useAppStore } from "@/components/providers/store-provider"
import { useTheme } from "next-themes"

export function AppHeader() {
  const { toggleSidebar } = useAppStore()
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - replace with actual user data from Clerk
  const user = {
    name: "John Doe",
    email: "john@company.com",
    avatar: "/avatars/john-doe.jpg",
    initials: "JD"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search renewals, teams, or settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 bg-slate-50 border-slate-200 focus:bg-white"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600">
                <Command className="h-3 w-3" />
                K
              </kbd>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="hidden lg:flex items-center gap-2">
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Renewal
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Search */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Notifications</p>
                  <p className="text-xs leading-none text-slate-500">
                    You have 3 unread notifications
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="max-h-80 overflow-y-auto">
                {/* Notification Items */}
                <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-medium">Adobe Creative Suite renewal due</p>
                    <Badge variant="outline" className="text-xs">Due in 3 days</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    Your Adobe Creative Suite subscription expires on March 15th
                  </p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-medium">Team member added</p>
                    <Badge variant="outline" className="text-xs">2 hours ago</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    Sarah Johnson was added to the Marketing team
                  </p>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-medium">Monthly report ready</p>
                    <Badge variant="outline" className="text-xs">1 day ago</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    Your February renewal report is ready for review
                  </p>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-slate-500">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}