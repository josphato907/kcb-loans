'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, Check, Heart } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactFooter() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 4000)
    } catch (error) {
      console.error('Error:', error)
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
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/50 backdrop-blur">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-foreground/70 text-lg">
              Have questions? Our team is here to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-foreground/80">support@ecobank.com</p>
            </div>

            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-foreground/80">1-800-ECOBANK</p>
            </div>

            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Address</h3>
              <p className="text-foreground/80">San Francisco, CA</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-background rounded-2xl border border-border p-8 space-y-6">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-700 dark:text-green-300">
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-foreground font-semibold mb-2">Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-foreground font-semibold mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Subject</label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Message</label>
                <textarea
                  {...register('message')}
                  placeholder="Tell us more..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-accent text-white h-12 text-lg font-semibold flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <Send className="w-5 h-5" />}
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 font-bold text-2xl mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  E
                </div>
                EcoBank
              </div>
              <p className="text-background/70 text-sm">
                Fast eco-friendly loans for sustainable living
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/70 hover:text-background transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-background/20 hover:bg-background/30 rounded-lg flex items-center justify-center transition" title="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.5v8.5h2.5v-4.34c0-.77.62-1.4 1.4-1.4.77 0 1.4.63 1.4 1.4v4.34h2.5M7 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-background/20 hover:bg-background/30 rounded-lg flex items-center justify-center transition" title="Twitter">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 1 1-10 6.05A4.5 4.5 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-background/20 hover:bg-background/30 rounded-lg flex items-center justify-center transition" title="LinkedIn">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h6M9 9a3 3 0 0 1 6 0"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/60">
              <p>&copy; 2024 EcoBank. All rights reserved.</p>
              <p>Helping build a sustainable future</p>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  )
}
