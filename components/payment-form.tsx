import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function PaymentForm({ amount }: { amount: number }) {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const processingFee = Math.ceil(amount * 0.005)
  const totalAmount = amount + processingFee

  const initiateSTKPush = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phoneNumber || !firstName || !lastName || !email) {
      setErrorMessage('Please fill in all fields')
      return
    }

    if (phoneNumber.length < 10) {
      setErrorMessage('Invalid phone number')
      return
    }

    setIsProcessing(true)
    setStatus('processing')
    setErrorMessage('')

    try {
      const response = await fetch('/api/payment/initiate-stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          amount: processingFee,
          loanAmount: amount,
          firstName,
          lastName,
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate payment')
      }

      setTransactionId(data.transactionId)
      
      // Keep spinner visible for longer while STK push is being sent to phone
      // Then show success message before redirecting
      setTimeout(() => {
        setStatus('success')
        
        // Redirect after showing success for 3 seconds
        setTimeout(() => {
          router.push('/payment-success')
        }, 3000)
      }, 5000) // Show spinner for 5 seconds total to simulate STK push send time
    } catch (error) {
      console.error('[v0] Payment error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Payment initiation failed')
      setStatus('error')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto relative"
    >
      {/* Spinning Loader Overlay */}
      {status === 'processing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 rounded-3xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full" />
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-2">Initiating Payment</p>
              <p className="text-white/70 text-sm">Check your phone for M-Pesa prompt...</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side - Amount Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-between"
        >
          <div>
            <Link href="/select-amount" className="inline-flex items-center text-primary hover:opacity-70 transition mb-8 font-semibold">
              <ChevronLeft className="w-5 h-5" />
              Back
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              KSh {amount.toLocaleString()}
            </h1>
            <p className="text-2xl font-semibold text-foreground/70 mb-8">
              BY LOANS
            </p>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Pay for processing fee and receive your loan instantly
            </p>

            {/* Payment Details */}
            <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Loan Amount:</span>
                  <span className="font-semibold">KSh {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Processing Fee:</span>
                  <span className="font-semibold">KSh {processingFee.toLocaleString()}</span>
                </div>
                <div className="h-px bg-border/30"></div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-primary text-lg">KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/60">Payment Methods:</span>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="text-sm text-foreground/60">
            <p>Secured by PayHero</p>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {status === 'success' ? (
            <div className="bg-white dark:bg-card rounded-3xl p-8 md:p-12 text-center h-full flex flex-col justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="mb-6"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Payment Initiated!
              </h2>
              <p className="text-foreground/70 mb-6">
                Check your phone for the M-Pesa payment prompt. Enter your PIN to complete the payment.
              </p>
              <p className="text-sm text-foreground/60 mb-4">
                Transaction ID: {transactionId}
              </p>
              <p className="text-sm text-foreground/60">
                Redirecting to confirmation page...
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-card rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {status === 'error' ? 'Payment Failed' : 'Complete Payment'}
              </h2>

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
                >
                  <div className="flex gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">Payment Error</p>
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setErrorMessage('')
                    }}
                    className="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
                  >
                    Try again
                  </button>
                </motion.div>
              )}

              <form onSubmit={initiateSTKPush} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    Phone Number (M-Pesa)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+254712345678"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    The phone number linked to your M-Pesa account
                  </p>
                </div>

                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 mt-6">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">Amount to Pay:</span>
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    KSh {totalAmount.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground font-bold py-4 px-6 rounded-full hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay now'
                  )}
                </button>

                <p className="text-xs text-center text-foreground/60 mt-4">
                  Your payment information is secure and encrypted
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
