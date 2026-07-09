'use client'

import { motion } from 'framer-motion'
import { Clock, Briefcase, Shield, Lock, CheckCircle2, Key } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Clock,
      title: 'Quick Approval',
      description: 'Get pre-approved in minutes with our streamlined digital process.',
    },
    {
      icon: Briefcase,
      title: 'Flexible Terms',
      description: 'Choose options that fit your needs.',
    },
    {
      icon: Shield,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprises. Know exactly what you will pay.',
    },
  ]

  const security = [
    { icon: Lock, label: 'Secure' },
    { icon: CheckCircle2, label: 'Trusted' },
    { icon: Key, label: 'Encrypted' },
  ]

  return (
    <section className="bg-background px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Features Cards */}
        <div className="space-y-4 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/30 shadow-sm"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-secondary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {security.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-secondary w-20 h-20 mx-auto rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-10 h-10 text-secondary-foreground" />
              </div>
              <p className="font-semibold text-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
