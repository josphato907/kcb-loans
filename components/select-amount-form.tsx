'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, Sparkles } from 'lucide-react'

const LOAN_AMOUNTS = [
  { value: 5000, label: 'KSh 5,000', fee: 'ksh.25', repay: '6 months' },
  { value: 10000, label: 'KSh 10,000', fee: 'ksh.50', repay: '6 months' },
  { value: 15000, label: 'KSh 15,000', fee: 'ksh.75', repay: '6 months' },
  { value: 20000, label: 'KSh 20,000', fee: 'ksh.100', repay: '6 months' },
  { value: 25000, label: 'KSh 25,000', fee: 'ksh.125', repay: '6 months' },
  { value: 30000, label: 'KSh 30,000', fee: 'ksh.150', repay: '6 months' },
  { value: 40000, label: 'KSh 40,000', fee: 'ksh.175', repay: '6 months' },
  { value: 50000, label: 'KSh 50,000', fee: 'ksh.200', repay: '6 months' },
  { value: 75000, label: 'KSh 75,000', fee: 'ksh.225', repay: '6 months' },
  { value: 100000, label: 'KSh 100,000', fee: 'ksh.250', repay: '6 months' },
]

export function SelectAmountForm() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount)
    setTimeout(() => {
      router.push(`/payment?amount=${amount}`)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-card rounded-3xl p-6 md:p-10 md:p-16">
        {/* Back Button */}
        <Link href="/apply" className="inline-flex items-center text-primary hover:opacity-70 transition mb-8 font-semibold">
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>

        {/* Header with Icon */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            You&apos;re approved!
          </h1>
          <p className="text-foreground/70 text-lg">
            Great news! Pick the loan amount that works best for you.
          </p>
        </div>

        {/* Amount Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {LOAN_AMOUNTS.map((amount, index) => (
            <motion.div
              key={amount.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAmount(amount.value)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedAmount === amount.value
                  ? 'border-primary bg-primary/10 dark:bg-primary/20'
                  : 'border-border/30 hover:border-primary/50 bg-white dark:bg-background'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{amount.label}</h3>
              <p className="text-foreground/70 text-sm">
                Repay over {amount.repay}, processing fee is {amount.fee}
              </p>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(amount.value)
                }}
                className="w-full mt-4 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-full hover:bg-primary/90 transition text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SELECT
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-foreground/60 text-sm mb-4">
            Tap on an amount to see the full breakdown,<br />
            including any processing fee.
          </p>
          <Link href="/apply" className="text-primary font-semibold hover:opacity-70 transition">
            Back to form
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
