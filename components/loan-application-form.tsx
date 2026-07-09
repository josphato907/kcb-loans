'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const loanApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanTerm: z.string().min(1, 'Loan term is required'),
  purpose: z.string().min(1, 'Loan purpose is required'),
  employment: z.string().min(1, 'Employment status is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  idNumber: z.string().min(1, 'ID number is required'),
})

type LoanApplicationFormData = z.infer<typeof loanApplicationSchema>

export function LoanApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoanApplicationFormData>({
    resolver: zodResolver(loanApplicationSchema),
  })

  const onSubmit = async (data: LoanApplicationFormData) => {
    try {
      console.log('[v0] Form submitted:', data)
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('[v0] Form submission error:', error)
    }
  }

  if (submitted) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Application Submitted!</h2>
          <p className="text-foreground/70 mb-8">
            Thank you for applying. We&apos;ll review your application and contact you shortly.
          </p>
          <Link href="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition">
            Back to Home
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Apply for a Loan</h1>
          <p className="text-foreground/70">Complete the form below to apply for up to KSh 100,000</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-card p-8 rounded-2xl border border-border/30"
        >
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+254712345678"
                  className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ID Number</label>
              <input
                {...register('idNumber')}
                type="text"
                placeholder="12345678"
                className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.idNumber && <p className="text-destructive text-sm mt-1">{errors.idNumber.message}</p>}
            </div>
          </div>

          {/* Loan Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Loan Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Loan Amount (KSh)</label>
                <input
                  {...register('loanAmount')}
                  type="number"
                  placeholder="50000"
                  className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
                {errors.loanAmount && <p className="text-destructive text-sm mt-1">{errors.loanAmount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Loan Term (Months)</label>
                <select
                  {...register('loanTerm')}
                  className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                  <option value="">Select term</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
                {errors.loanTerm && <p className="text-destructive text-sm mt-1">{errors.loanTerm.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Purpose of Loan</label>
              <select
                {...register('purpose')}
                className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              >
                <option value="">Select purpose</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="home">Home Improvement</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
              </select>
              {errors.purpose && <p className="text-destructive text-sm mt-1">{errors.purpose.message}</p>}
            </div>
          </div>

          {/* Employment & Income */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Employment & Income</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Employment Status</label>
              <select
                {...register('employment')}
                className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
              {errors.employment && <p className="text-destructive text-sm mt-1">{errors.employment.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Monthly Income (KSh)</label>
              <input
                {...register('monthlyIncome')}
                type="number"
                placeholder="50000"
                className="w-full px-4 py-3 rounded-lg border border-border/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
              {errors.monthlyIncome && <p className="text-destructive text-sm mt-1">{errors.monthlyIncome.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Submit Application
          </motion.button>

          <p className="text-center text-sm text-foreground/60">
            Your information is secure and will only be used for loan processing.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
