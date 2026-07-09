'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, ChevronLeft } from 'lucide-react'

const paymentSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export function PaymentForm({ amount }: { amount: number }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  })

  const processingFee = Math.ceil(amount * 0.005) // 0.5% processing fee

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setIsProcessing(true)
      console.log('[v0] Payment submitted:', { ...data, amount, processingFee })
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      setTimeout(() => {
        router.push('/payment-success')
      }, 2000)
    } catch (error) {
      console.error('[v0] Payment error:', error)
      setIsProcessing(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white dark:bg-card rounded-3xl p-8 md:p-12"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              KSh {amount.toLocaleString()}
            </h1>
            <p className="text-primary font-semibold mb-6">BY LOANS</p>
            <p className="text-foreground/70 text-lg">
              Processing your payment...
            </p>
          </motion.div>

          {/* Right Side - Success Message */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-center bg-white dark:bg-card rounded-3xl p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
            >
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Processing Payment</h2>
            <p className="text-foreground/70 text-center">
              Your payment is being processed. Please wait...
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Info */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-background/50 dark:to-background p-8 md:p-12 flex flex-col justify-between"
        >
          <Link href="/select-amount" className="inline-flex items-center text-primary hover:opacity-70 transition mb-8 font-semibold self-start">
            <ChevronLeft className="w-5 h-5" />
            Back
          </Link>

          <div>
            <div className="w-12 h-12 bg-white dark:bg-card rounded-lg flex items-center justify-center mb-8">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              KSh {amount.toLocaleString()}
            </h1>
            <p className="text-primary font-semibold mb-6">BY LOANS</p>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Pay for processing fee and receive your loan instantly
            </p>
          </div>

          <div className="bg-white/50 dark:bg-background/50 rounded-2xl p-6 border border-white/20 dark:border-border">
            <p className="text-sm text-foreground/60 mb-4 font-semibold">Secured by</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-2xl font-bold text-primary">M-PESA</div>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1434CB"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#EB001B"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF5F00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
              <Lock className="w-5 h-5 text-foreground/40" />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-card p-8 md:p-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  First name
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-background"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Last name
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-background"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-background"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Phone number
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 border border-border/30 rounded-lg bg-white dark:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>+254</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="Phone number"
                  className="flex-1 px-4 py-3 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-background"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Amount
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-3 border border-border/30 rounded-lg bg-white dark:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-semibold">
                  <option>KES</option>
                </select>
                <input
                  type="text"
                  value={amount.toLocaleString()}
                  disabled
                  className="flex-1 px-4 py-3 border border-border/30 rounded-lg bg-muted text-foreground/50 font-semibold"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-2">
                Processing fee included: KSh {processingFee.toLocaleString()}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={!isProcessing ? { scale: 1.02 } : {}}
              whileTap={!isProcessing ? { scale: 0.98 } : {}}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-lg transition text-lg"
            >
              {isProcessing ? 'Processing...' : 'Pay now'}
            </motion.button>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-2 text-xs text-foreground/60">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}
