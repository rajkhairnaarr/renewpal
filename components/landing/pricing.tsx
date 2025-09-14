import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams getting started with renewal management.",
      features: [
        "Up to 50 renewals",
        "Basic notifications",
        "Email support",
        "Standard reports",
        "Team collaboration (up to 5 users)"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing organizations with more complex renewal needs.",
      features: [
        "Up to 500 renewals",
        "Advanced notifications",
        "Priority support",
        "Advanced analytics",
        "Team collaboration (up to 25 users)",
        "Custom workflows",
        "API access"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "per month",
      description: "For large organizations with enterprise-level requirements.",
      features: [
        "Unlimited renewals",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "Unlimited team members",
        "Custom reporting",
        "SLA guarantees",
        "On-premise option"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that's right for your organization. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-green-500 shadow-xl' : 'hover:shadow-lg'} transition-all duration-300`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-slate-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-900 hover:bg-slate-800'} text-white`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Need a custom plan? Contact our sales team for enterprise pricing.
          </p>
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}

