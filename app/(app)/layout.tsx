import { AppHeader } from "@/components/app/app-header"
import { AppSidebar } from "@/components/app/app-sidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <AppHeader />
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}