'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>

      <motion.div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold">Sustainable Banking</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get Up To{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                $50,000
              </span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Fast eco-friendly loans with competitive interest rates. Get approved in minutes, not days. Support sustainable projects.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground/80">Low interest rates from 5.5% APR for qualified borrowers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground/80">Quick approval process - get funds in your account same day</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-foreground/80">100% transparent pricing - no hidden fees</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#application">
                <Button className="w-full sm:w-auto bg-primary hover:bg-accent text-white h-12 text-lg group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="#calculator">
                <Button variant="outline" className="w-full sm:w-auto h-12 text-lg">
                  Try Calculator
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden md:block"
          >
            <div className="relative">
              <motion.div
                className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 border border-primary/20 backdrop-blur"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="space-y-6">
                  <div className="bg-white/80 dark:bg-card/80 rounded-2xl p-6 backdrop-blur">
                    <p className="text-sm text-foreground/60 mb-2">Loan Amount</p>
                    <p className="text-4xl font-bold text-primary">$25,000</p>
                  </div>
                  <div className="bg-white/80 dark:bg-card/80 rounded-2xl p-6 backdrop-blur">
                    <p className="text-sm text-foreground/60 mb-2">Interest Rate</p>
                    <p className="text-4xl font-bold text-accent">5.5%</p>
                  </div>
                  <div className="bg-white/80 dark:bg-card/80 rounded-2xl p-6 backdrop-blur">
                    <p className="text-sm text-foreground/60 mb-2">Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary">$495</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6">
                    <p className="text-sm text-foreground/60 mb-2">Total Interest</p>
                    <p className="text-2xl font-bold text-foreground">$3,240</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
