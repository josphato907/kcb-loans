'use client'

import { motion } from 'framer-motion'

export function ContactFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About MPESA-KCB LOANS</h3>
            <p className="opacity-90">
              Quick and easy loan approvals for M-PESA users. Get funds when you need them with transparent terms and competitive rates.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 opacity-90">
              <li>
                <a href="#" className="hover:opacity-70 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 opacity-90">
              <li>Email: support@kcb.co.ke</li>
              <li>Phone: +254 711 000 000</li>
              <li>Hours: Mon-Fri 9AM-5PM EAT</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90"
        >
          <p>&copy; 2026 MPESA-KCB LOANS Kenya. Licensed by CBK.</p>
        </motion.div>
      </div>
    </footer>
  )
}
