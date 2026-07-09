'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FileText, Check } from 'lucide-react'

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  annualIncome: z.string().min(1, 'Annual income is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to terms'),
})

type ApplicationForm = z.infer<typeof applicationSchema>

export function LoanApplication() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationForm) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
      reset()
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
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
    <section id="application" className="py-20 bg-background">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Loan Application</h2>
          <p className="text-foreground/70 text-lg">
            Complete your application in 5 minutes. Get approved instantly.
          </p>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">Application Submitted!</p>
              <p className="text-green-700 dark:text-green-300">
                We&apos;ll review your application and contact you within 24 hours.
              </p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl border border-border p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Phone Number *
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Desired Loan Amount *
              </label>
              <input
                {...register('loanAmount')}
                type="number"
                placeholder="25000"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.loanAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
              )}
            </div>

            {/* Loan Purpose */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Loan Purpose *
              </label>
              <select
                {...register('loanPurpose')}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select purpose</option>
                <option value="home-improvement">Home Improvement</option>
                <option value="debt-consolidation">Debt Consolidation</option>
                <option value="business">Business Expansion</option>
                <option value="education">Education</option>
                <option value="vehicle">Vehicle Purchase</option>
                <option value="other">Other</option>
              </select>
              {errors.loanPurpose && (
                <p className="text-red-500 text-sm mt-1">{errors.loanPurpose.message}</p>
              )}
            </div>

            {/* Employment Status */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Employment Status *
              </label>
              <select
                {...register('employmentStatus')}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
              {errors.employmentStatus && (
                <p className="text-red-500 text-sm mt-1">{errors.employmentStatus.message}</p>
              )}
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Annual Income *
              </label>
              <input
                {...register('annualIncome')}
                type="number"
                placeholder="50000"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.annualIncome && (
                <p className="text-red-500 text-sm mt-1">{errors.annualIncome.message}</p>
              )}
            </div>

            {/* Credit Score */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Credit Score (estimated) *
              </label>
              <select
                {...register('creditScore')}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select range</option>
                <option value="600-650">600 - 650</option>
                <option value="650-700">650 - 700</option>
                <option value="700-750">700 - 750</option>
                <option value="750+">750+</option>
              </select>
              {errors.creditScore && (
                <p className="text-red-500 text-sm mt-1">{errors.creditScore.message}</p>
              )}
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-3">
            <input
              {...register('agreeToTerms')}
              type="checkbox"
              id="terms"
              className="mt-1 w-5 h-5 rounded border-border cursor-pointer accent-primary"
            />
            <label htmlFor="terms" className="text-foreground/80">
              I agree to the terms and conditions, privacy policy, and consent to receive promotional emails
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-accent text-white h-12 text-lg font-semibold"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </motion.div>
    </section>
  )
}
