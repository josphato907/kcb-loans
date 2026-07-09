'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PaymentForm } from '@/components/payment-form'
import { Navigation } from '@/components/navigation'

function PaymentPageContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '50000'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-background dark:to-background flex items-center justify-center px-4 py-8">
      <PaymentForm amount={parseInt(amount)} />
    </main>
  )
}

export default function PaymentPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentPageContent />
      </Suspense>
    </>
  )
}
