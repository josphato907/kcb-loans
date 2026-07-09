'use client'

import { Navigation } from '@/components/navigation'
import { ContactFooter } from '@/components/contact-footer'
import { ThemeProvider } from 'next-themes'
import { SelectAmountForm } from '@/components/select-amount-form'

export default function SelectAmountPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <SelectAmountForm />
        </main>
        <ContactFooter />
      </div>
    </ThemeProvider>
  )
}
