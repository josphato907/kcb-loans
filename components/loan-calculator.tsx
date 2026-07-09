'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(5.5)

  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="calculator" className="py-20 bg-card/50 backdrop-blur">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Loan Calculator</h2>
          <p className="text-foreground/70 text-lg">
            See your monthly payment and total interest instantly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Input Section */}
          <motion.div
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-background rounded-2xl border border-border p-8 space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-foreground font-semibold">Loan Amount</label>
                  <span className="text-2xl font-bold text-primary">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-foreground/60 mt-2">
                  <span>$1,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-foreground font-semibold">Loan Term</label>
                  <span className="text-2xl font-bold text-accent">
                    {loanTerm} months
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="12"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-sm text-foreground/60 mt-2">
                  <span>1 year</span>
                  <span>10 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-foreground font-semibold">Interest Rate</label>
                  <span className="text-2xl font-bold text-primary">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-foreground/60 mt-2">
                  <span>3%</span>
                  <span>15%</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-accent text-white h-12 text-lg">
                Get Pre-Approved
              </Button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/20 to-transparent rounded-2xl border border-primary/20 p-6">
              <p className="text-foreground/70 text-sm mb-2">Monthly Payment</p>
              <p className="text-4xl font-bold text-primary">${monthlyPayment.toFixed(0)}</p>
            </div>

            <div className="bg-gradient-to-br from-accent/20 to-transparent rounded-2xl border border-accent/20 p-6">
              <p className="text-foreground/70 text-sm mb-2">Total Interest</p>
              <p className="text-3xl font-bold text-accent">${totalInterest.toFixed(0)}</p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6">
              <p className="text-foreground/70 text-sm mb-2">Total Amount Paid</p>
              <p className="text-2xl font-bold text-foreground">${totalPayment.toFixed(0)}</p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-6">
              <p className="text-foreground/70 text-sm mb-2">Savings vs 10% Rate</p>
              <p className="text-2xl font-bold text-green-600">
                ${(loanAmount * 0.045 * (loanTerm / 12)).toFixed(0)}
              </p>
            </div>

            <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg py-3 font-semibold transition">
              View Full Breakdown →
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
