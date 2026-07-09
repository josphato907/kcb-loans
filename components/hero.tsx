'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="bg-background pt-8 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-12 md:p-16 text-primary-foreground mb-12 shadow-lg"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Get Up To<br />KSh 100,000
          </h1>
          <p className="text-lg md:text-xl opacity-95">
            Low 5.5% interest rates for qualified borrowers
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
          {[
            { number: '1', label: 'Apply' },
            { number: '2', label: 'Approve' },
            { number: '3', label: 'Receive' },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mb-4 ${
                index === 0 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {step.number}
              </div>
              <p className="text-foreground font-semibold text-center text-sm md:text-base">{step.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Apply Now Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-bold text-lg hover:bg-primary/90 transition shadow-lg"
        >
          Apply Now →
        </motion.button>
      </div>
    </section>
  )
}
