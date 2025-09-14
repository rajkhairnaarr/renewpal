import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/providers/query-provider"
import { StoreProvider } from "@/components/providers/store-provider"
import { PostHogProvider } from "@/components/providers/posthog-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RenewalPal - Track and Manage Renewals",
    template: "%s | RenewalPal",
  },
  description: "Track and manage renewals for your business. Never miss a renewal deadline again with RenewalPal's comprehensive renewal management platform.",
  keywords: ["renewal management", "subscription tracking", "business renewals", "contract management", "license tracking"],
  authors: [{ name: "RenewalPal Team" }],
  creator: "RenewalPal",
  publisher: "RenewalPal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "RenewalPal - Track and Manage Renewals",
    description: "Track and manage renewals for your business. Never miss a renewal deadline again.",
    siteName: "RenewalPal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RenewalPal - Renewal Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RenewalPal - Track and Manage Renewals",
    description: "Track and manage renewals for your business. Never miss a renewal deadline again.",
    images: ["/og-image.png"],
    creator: "@renewalpal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <StoreProvider>
                <PostHogProvider>
                  {children}
                  <Toaster />
                </PostHogProvider>
              </StoreProvider>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 