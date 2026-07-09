'use client'

import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { LoanCalculator } from '@/components/loan-calculator'
import { LoanApplication } from '@/components/loan-application'
import { EligibilityChecker } from '@/components/eligibility-checker'
import { FAQTestimonials } from '@/components/faq-testimonials'
import { ContactFooter } from '@/components/contact-footer'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <LoanCalculator />
        <EligibilityChecker />
        <LoanApplication />
        <FAQTestimonials />
        <ContactFooter />
      </main>
    </ThemeProvider>
  )
}
