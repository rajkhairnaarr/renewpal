import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { Features } from "@/components/landing/features"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { CommunitySection } from "@/components/landing/community-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Features />
        <Testimonials />
        <Pricing />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
} 