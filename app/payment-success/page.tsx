'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Clock } from 'lucide-react'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 8000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-background dark:to-background flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-white dark:bg-card rounded-3xl p-8 md:p-12 shadow-xl">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Clock className="w-20 h-20 text-blue-500" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-3"
            >
              Payment Pending Approval
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-foreground/70 mb-6 text-lg"
            >
              Your payment has been submitted and is awaiting approval. We will process your loan application and notify you shortly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 mb-8"
            >
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-foreground">Reference ID:</span> LN-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-xs text-foreground/60 mt-3">
                <span className="font-semibold block mb-1">What happens next:</span>
                We will review your payment and notify you via SMS and email within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Link href="/">
                <button className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition">
                  Back to Home
                </button>
              </Link>
              <p className="text-xs text-foreground/60">
                Redirecting in 8 seconds...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
