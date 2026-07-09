import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-payhero-signature')

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.warn('[v0] Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    console.log('[v0] Payment webhook received:', body)

    const { status, id, amount, phone_number } = body

    if (status === 'completed' || status === 'success') {
      // Payment successful
      console.log('[v0] Payment successful:', { id, amount, phone_number })
      // Store payment record in database if needed
      return NextResponse.json({ success: true, message: 'Payment confirmed' })
    } else if (status === 'failed' || status === 'cancelled') {
      // Payment failed
      console.log('[v0] Payment failed:', { id, status })
      return NextResponse.json({ success: false, message: 'Payment failed' })
    } else if (status === 'pending') {
      // Payment still pending
      console.log('[v0] Payment pending:', { id })
      return NextResponse.json({ success: false, message: 'Payment pending' })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

function verifyWebhookSignature(body: any, signature: string | null): boolean {
  if (!signature || !process.env.PAYHERO_SECRET_KEY) {
    return false
  }

  const payload = JSON.stringify(body)
  const hash = crypto
    .createHmac('sha256', process.env.PAYHERO_SECRET_KEY)
    .update(payload)
    .digest('hex')

  return hash === signature
}
