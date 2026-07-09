'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle } from 'lucide-react'

export function EligibilityChecker() {
  const [age, setAge] = useState('')
  const [income, setIncome] = useState('')
  const [creditScore, setCreditScore] = useState('')
  const [result, setResult] = useState<'eligible' | 'maybe' | 'not-eligible' | null>(null)

  const checkEligibility = () => {
    const ageNum = parseInt(age)
    const incomeNum = parseInt(income)
    const creditNum = parseInt(creditScore)

    let eligible = true
    let requirements: string[] = []

    if (ageNum < 21) {
      eligible = false
      requirements.push('Must be at least 21 years old')
    }
    if (incomeNum < 25000) {
      eligible = false
      requirements.push('Annual income must be at least $25,000')
    }
    if (creditNum < 580) {
      eligible = false
      requirements.push('Credit score should be at least 580')
    }

    if (!eligible) {
      setResult('not-eligible')
    } else if (creditNum >= 700 && incomeNum >= 50000) {
      setResult('eligible')
    } else {
      setResult('maybe')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="eligibility" className="py-20 bg-card/50 backdrop-blur">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Check Your Eligibility</h2>
          <p className="text-foreground/70 text-lg">
            Find out in seconds if you qualify for our loans
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="bg-background rounded-2xl border border-border p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {/* Age */}
              <div>
                <label className="block text-foreground font-semibold mb-3">
                  What is your age?
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  min="18"
                  max="120"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Annual Income */}
              <div>
                <label className="block text-foreground font-semibold mb-3">
                  Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-foreground/60">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter annual income"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-foreground font-semibold mb-3">
                  Credit Score (estimated)
                </label>
                <select
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select your credit score range</option>
                  <option value="580">580 - 620</option>
                  <option value="650">620 - 680</option>
                  <option value="700">680 - 740</option>
                  <option value="750">740 - 800</option>
                  <option value="800">800+</option>
                </select>
              </div>

              <Button
                onClick={checkEligibility}
                disabled={!age || !income || !creditScore}
                className="w-full bg-primary hover:bg-accent text-white h-12 text-lg font-semibold"
              >
                Check Eligibility
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {result === 'eligible' && (
              <div className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8">
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                      Great News!
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      You appear to be eligible for our loans with competitive rates.
                    </p>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Your potential benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Low interest rates from 5.5% APR
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Up to $50,000 loan amount
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Flexible repayment terms
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Apply Now
                </Button>
              </div>
            )}

            {result === 'maybe' && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      You May Qualify
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300">
                      Your profile looks promising. Let&apos;s get you approved.
                    </p>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Next steps:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Complete your full application
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Provide supporting documents
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Get approval within 24 hours
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Application
                </Button>
              </div>
            )}

            {result === 'not-eligible' && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-50/50 dark:from-orange-950/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-8">
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-2">
                      Not Quite Yet
                    </h3>
                    <p className="text-orange-700 dark:text-orange-300">
                      We recommend addressing the items below to improve your eligibility.
                    </p>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Ways to improve:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      Increase your annual income
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      Improve your credit score
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      Check back after 6 months
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Learn More
                </Button>
              </div>
            )}

            {!result && (
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-foreground/60 mb-4">
                    Fill in the form to check your eligibility
                  </p>
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto"></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
