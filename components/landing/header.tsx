import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">R</span>
            </div>
            <span className="font-bold text-xl text-slate-900">RenewPal</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
              About
            </Link>
            <Link href="/sign-in" className="text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

