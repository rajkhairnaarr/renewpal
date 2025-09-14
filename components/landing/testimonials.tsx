import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechFlow Inc",
      image: "/avatars/sarah.jpg",
      content: "RenewPal has completely transformed how we manage our software renewals. We've saved over $50K annually by avoiding auto-renewals and negotiating better terms.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "VP of Operations",
      company: "GrowthCorp",
      image: "/avatars/michael.jpg",
      content: "The automated notifications and team collaboration features have made our renewal process 10x more efficient. Highly recommended for any growing company.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Finance Director",
      company: "InnovateLabs",
      image: "/avatars/emily.jpg",
      content: "The analytics and reporting capabilities are incredible. We now have complete visibility into our renewal spending and can make data-driven decisions.",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by thousands of businesses
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what our customers have to say about how RenewPal has transformed their renewal management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">10,000+</div>
              <div className="text-sm text-slate-600">Active Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">$50M+</div>
              <div className="text-sm text-slate-600">Renewals Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">99.9%</div>
              <div className="text-sm text-slate-600">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">4.9/5</div>
              <div className="text-sm text-slate-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

