'use client'

import { Navigation } from '@/components/navigation'
import { LoanApplicationForm } from '@/components/loan-application-form'
import { ContactFooter } from '@/components/contact-footer'
import { ThemeProvider } from 'next-themes'

export default function ApplyPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-background">
        <Navigation />
        <LoanApplicationForm />
        <ContactFooter />
      </main>
    </ThemeProvider>
  )
}
