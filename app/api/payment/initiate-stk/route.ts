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

    // Check for required environment variables
    const usesMockMode = !process.env.PAYHERO_API_KEY
    
    if (usesMockMode) {
      console.log('[v0] Running in mock payment mode (testing). Configure PAYHERO_API_KEY for production.')
    }

    // Format phone number - remove +, ensure starts with 254
    let formattedPhone = phoneNumber.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1)
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone
    }

    console.log('[v0] Initiating STK push with:', {
      phoneNumber: formattedPhone,
      amount: amount,
      firstName: firstName || 'Customer',
      mockMode: usesMockMode,
    })

    // In mock mode, simulate successful payment initiation with realistic delay
    if (usesMockMode) {
      console.log('[v0] Mock payment initiated - simulating STK push with 2 second delay')
      // Simulate network delay for STK push
      await new Promise(resolve => setTimeout(resolve, 2000))
      return NextResponse.json({
        success: true,
        transactionId: `MOCK-${Date.now()}`,
        message: 'Mock payment prompt sent to your phone',
        isMock: true,
      })
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
      console.error('[v0] PayHero API error:', {
        status: payheroResponse.status,
        error: errorData,
      })
      
      // Provide specific error messages based on response
      if (payheroResponse.status === 401) {
        return NextResponse.json(
          { error: 'Payment service authentication failed. Invalid API credentials.' },
          { status: 401 }
        )
      } else if (payheroResponse.status === 400) {
        return NextResponse.json(
          { error: errorData.error || 'Invalid payment request. Please check your details.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: errorData.error || 'Failed to initiate payment. Please try again.' },
        { status: payheroResponse.status }
      )
    }

    const data = await payheroResponse.json()
    console.log('[v0] STK push initiated successfully:', data)

    return NextResponse.json({
      success: true,
      transactionId: data.id || data.reference,
      message: 'Payment prompt sent to your phone',
    })
  } catch (error) {
    console.error('[v0] Payment initiation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process payment request' },
      { status: 500 }
    )
  }
}
