'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'

export function FAQTestimonials() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How quickly can I get approved?',
      answer:
        'Our fast-track approval process typically takes 15-30 minutes for most applications. You can receive funds within 24 hours of approval.',
    },
    {
      question: 'What is the minimum credit score required?',
      answer:
        'While we work with credit scores starting from 580, we offer the best rates for scores of 700+. Even with lower scores, you may still qualify.',
    },
    {
      question: 'What can I use the loan for?',
      answer:
        'MPESA-KCB loans can be used for home improvement, debt consolidation, education, business expansion, vehicle purchase, emergency expenses, and any other personal needs.',
    },
    {
      question: 'What are the repayment terms?',
      answer:
        'Loan terms range from 6 to 60 months. You can choose the term that best fits your budget and repayment capacity.',
    },
    {
      question: 'Are there any hidden fees?',
      answer:
        'No hidden fees with MPESA-KCB LOANS. We provide transparent pricing upfront including processing fees, interest rates, and any other charges. Only the processing fee is charged via M-Pesa.',
    },
    {
      question: 'Can I pay off my loan early?',
      answer:
        'Yes! There are no prepayment penalties. You can pay off your loan anytime without any extra charges.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Small Business Owner',
      rating: 5,
      text: 'MPESA-KCB LOANS made it incredibly easy to get funding for my business. The entire process took just 30 minutes!',
      initials: 'SJ',
    },
    {
      name: 'Michael Chen',
      title: 'Homeowner',
      rating: 5,
      text: 'I got the loan approved instantly and received it in my M-Pesa wallet. Best rates in the market. Highly satisfied.',
      initials: 'MC',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Professional',
      rating: 5,
      text: 'The loan calculator helped me understand my repayment options perfectly. Transparent and honest service. Recommended!',
      initials: 'ER',
    },
    {
      name: 'David Park',
      title: 'Entrepreneur',
      rating: 5,
      text: 'Approved in 30 minutes and funded the same day. This is how modern lending should work. Highly recommend!',
      initials: 'DP',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 bg-background">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70 text-lg">
            Find answers to common questions about our loan products
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* FAQ */}
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden"
                whileHover={{ borderColor: 'var(--color-primary)' }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <span className="text-left font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-foreground/60 flex-shrink-0" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-border bg-muted/30">
                    <p className="text-foreground/80">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">Average Processing Time</p>
              <p className="text-3xl font-bold text-primary">15 min</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">Approval Rate</p>
              <p className="text-3xl font-bold text-accent">87%</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">Satisfied Customers</p>
              <p className="text-3xl font-bold text-foreground">45K+</p>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h3>
            <p className="text-foreground/70">
              Join thousands of satisfied borrowers
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition"
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-foreground/80 mb-6">{testimonial.text}</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-foreground/60 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
