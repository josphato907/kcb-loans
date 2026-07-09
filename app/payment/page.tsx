'use client'

import { useSearchParams } from 'next/navigation'
import { PaymentForm } from '@/components/payment-form'
import { Navigation } from '@/components/navigation'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '50000'

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-background dark:to-background flex items-center justify-center px-4 py-8">
        <PaymentForm amount={parseInt(amount)} />
      </main>
    </>
  )
}
