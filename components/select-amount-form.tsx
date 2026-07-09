'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, Check } from 'lucide-react'

const LOAN_AMOUNTS = [
  { value: 10000, label: 'KSh 10,000' },
  { value: 25000, label: 'KSh 25,000' },
  { value: 50000, label: 'KSh 50,000' },
  { value: 75000, label: 'KSh 75,000' },
  { value: 100000, label: 'KSh 100,000' },
  { value: 150000, label: 'KSh 150,000' },
]

export function SelectAmountForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedAmount) return
    setSubmitted(true)
    setTimeout(() => {
      // Could navigate to next page or show confirmation
    }, 1500)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-green-50 dark:bg-green-950/30 rounded-3xl p-8 md:p-12 border border-primary/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
          >
            Amount Selected!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-semibold text-primary mb-6"
          >
            {LOAN_AMOUNTS.find(a => a.value === selectedAmount)?.label}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/70 mb-8"
          >
            Your loan application is being processed. You will receive a confirmation call shortly.
          </motion.p>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-full font-bold hover:bg-primary/90 transition"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-card rounded-3xl p-6 md:p-10 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/apply" className="p-2 hover:bg-muted rounded-lg transition">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Select Loan Amount
          </h1>
        </div>

        <p className="text-foreground/70 mb-8 text-lg">
          Choose the loan amount you need. You can borrow between KSh 10,000 and KSh 150,000.
        </p>

        {/* Amount Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {LOAN_AMOUNTS.map((amount, index) => (
            <motion.button
              key={amount.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAmount(amount.value)}
              className={`relative p-4 md:p-6 rounded-2xl font-bold text-base md:text-lg transition-all ${
                selectedAmount === amount.value
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground border-2 border-transparent hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {amount.label}
              {selectedAmount === amount.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-primary/10 dark:bg-primary/5 rounded-2xl p-4 md:p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-3">Quick Facts:</h3>
          <ul className="space-y-2 text-sm md:text-base text-foreground/80">
            <li>• Interest rate: 5.5% - 8.5% depending on amount</li>
            <li>• Repayment period: 6 to 36 months</li>
            <li>• Funds disbursed within 24 hours</li>
            <li>• No hidden charges or fees</li>
          </ul>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={selectedAmount ? { scale: 1.02 } : {}}
          whileTap={selectedAmount ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={!selectedAmount}
          className={`w-full py-4 px-6 rounded-full font-bold text-lg transition ${
            selectedAmount
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
          }`}
        >
          Continue with {selectedAmount ? LOAN_AMOUNTS.find(a => a.value === selectedAmount)?.label : 'Selected Amount'}
        </motion.button>

        {/* Info Text */}
        <p className="text-center text-sm text-foreground/60 mt-6">
          Your information is secure and encrypted. We never share your data with third parties.
        </p>
      </div>
    </motion.div>
  )
}
