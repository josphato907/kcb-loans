import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, firstName, lastName, email } = await request.json()

    // Validate inputs
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      )
    }

    // Format phone number - remove +, ensure starts with 254
    let formattedPhone = phoneNumber.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1)
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone
    }

    // Call PayHero API to initiate STK push
    const payheroResponse = await fetch('https://api.payhero.io/api/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYHERO_API_KEY}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'KES',
        phone_number: formattedPhone,
        merchant_reference: `LOAN-${Date.now()}`,
        first_name: firstName || 'Customer',
        last_name: lastName || 'Loan',
        email: email || 'noreply@kcbloans.com',
        payment_channel: 'MPESA',
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/webhook`,
      }),
    })

    if (!payheroResponse.ok) {
      const errorData = await payheroResponse.json()
      console.error('[v0] PayHero API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to initiate payment' },
        { status: payheroResponse.status }
      )
    }

    const data = await payheroResponse.json()
    console.log('[v0] STK push initiated:', data)

    return NextResponse.json({
      success: true,
      transactionId: data.id,
      message: 'Payment prompt sent to your phone',
    })
  } catch (error) {
    console.error('[v0] Payment initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment request' },
      { status: 500 }
    )
  }
}
