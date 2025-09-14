import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, DollarSign, Users, BarChart3 } from "lucide-react"

export function ProductShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Powerful Dashboard for Renewal Management
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get a bird's eye view of all your renewals with our intuitive dashboard. 
            Track spending, monitor deadlines, and optimize costs in real-time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-slate-900 rounded-lg p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white text-sm">RenewPal Dashboard</div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">24</div>
                    <div className="text-xs text-slate-400">Active Renewals</div>
                  </div>
                  <div className="bg-slate-800 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">$45K</div>
                    <div className="text-xs text-slate-400">Monthly Spend</div>
                  </div>
                  <div className="bg-slate-800 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">3</div>
                    <div className="text-xs text-slate-400">Due This Week</div>
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded p-4">
                  <div className="text-sm text-slate-300 mb-3">Recent Renewals</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Adobe Creative Suite</span>
                      <Badge variant="secondary" className="bg-green-900 text-green-300 text-xs">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Slack Pro</span>
                      <Badge variant="secondary" className="bg-yellow-900 text-yellow-300 text-xs">Due Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">AWS Services</span>
                      <Badge variant="secondary" className="bg-red-900 text-red-300 text-xs">Overdue</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Notifications</h3>
                <p className="text-slate-600 mb-3">
                  Get notified at the perfect time with intelligent alerts based on renewal type and value.
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Email, SMS, and Slack notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Customizable reminder schedules
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Escalation workflows
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics & Insights</h3>
                <p className="text-slate-600 mb-3">
                  Track spending patterns and identify cost optimization opportunities with detailed analytics.
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Real-time spending analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cost optimization insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Executive dashboards
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Team Collaboration</h3>
                <p className="text-slate-600 mb-3">
                  Work together seamlessly with role-based access, comments, and approval workflows.
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Role-based permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Approval workflows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Activity tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

