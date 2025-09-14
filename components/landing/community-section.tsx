import { Button } from "@/components/ui/button"

export function CommunitySection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-8">
            <div className="text-2xl">🤝</div>
          </div>
          
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Join thousands of businesses
            <span className="text-green-400 block">staying compliant</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Connect with other business owners, share compliance tips, and get expert advice in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-medium transition-colors">
              Join Community
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 rounded-lg font-medium transition-colors">
              Browse Resources
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl text-white mb-2">5,000+</div>
              <div className="text-sm text-slate-400">Members</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-2">50+</div>
              <div className="text-sm text-slate-400">Industries</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-2">24/7</div>
              <div className="text-sm text-slate-400">Support</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-2">100%</div>
              <div className="text-sm text-slate-400">Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

