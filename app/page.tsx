'use client'

import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { ContactFooter } from '@/components/contact-footer'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <Features />
        <ContactFooter />
      </main>
    </ThemeProvider>
  )
}
