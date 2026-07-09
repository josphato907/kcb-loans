import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, loanAmount, firstName, lastName, email } = await request.json()

    // Validate inputs
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Phone number and processing fee are required' },
        { status: 400 }
      )
    }

    // amount is the processing fee to be charged
    // loanAmount is the total loan amount (for reference/logging only)
    const processingFee = amount

    // Check for required environment variables
    const hasCredentials = process.env.PAYHERO_API_USERNAME && process.env.PAYHERO_API_PASSWORD && process.env.PAYHERO_CHANNEL_ID
    const usesMockMode = !hasCredentials
    
    console.log('[v0] Payment Mode:', {
      mode: usesMockMode ? 'MOCK (Testing)' : 'PRODUCTION (PayHero Live)',
      hasCredentials: hasCredentials,
      hasUsername: !!process.env.PAYHERO_API_USERNAME,
      hasPassword: !!process.env.PAYHERO_API_PASSWORD,
      hasChannelId: !!process.env.PAYHERO_CHANNEL_ID,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      environment: process.env.NODE_ENV,
    })
    
    if (usesMockMode) {
      console.warn('[v0] ⚠️ Running in MOCK payment mode. Configure PAYHERO_API_USERNAME, PAYHERO_API_PASSWORD, and PAYHERO_CHANNEL_ID for real M-Pesa STK push.')
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
    // Using PayHero's REST API with username/password authentication
    const auth = Buffer.from(
      `${process.env.PAYHERO_API_USERNAME}:${process.env.PAYHERO_API_PASSWORD}`
    ).toString('base64')

    const payloadData = {
      amount: processingFee,
      phone_number: formattedPhone,
      channel_id: parseInt(process.env.PAYHERO_CHANNEL_ID || '0'),
      merchant_reference: `LOAN-${Date.now()}`,
      first_name: firstName || 'Customer',
      last_name: lastName || 'Loan',
      email: email || 'noreply@kcbloans.com',
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/webhook`,
    }

    console.log('[v0] Calling PayHero API with payload:', {
      processingFee: processingFee,
      loanAmount: loanAmount,
      phone_number: '***' + formattedPhone.slice(-4),
      timestamp: new Date().toISOString(),
    })

    let payheroResponse
    
    // Try multiple PayHero endpoint variations
    const endpointVariations = [
      'https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push',
      'https://api.payhero.io/v2/payments/mobile/mpesa/stk-push',
      'https://api.payhero.io/payments/mobile/mpesa/stk-push',
      'https://api.payhero.io/v2/stk-push',
    ]
    
    let lastError: any = null
    let successfulEndpoint: string | null = null
    
    for (const apiUrl of endpointVariations) {
      try {
        console.log('[v0] Attempting PayHero API call to:', apiUrl)
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(payloadData),
        })
        
        // If we get any response, store it
        if (response) {
          payheroResponse = response
          successfulEndpoint = apiUrl
          console.log('[v0] PayHero endpoint reachable at:', apiUrl, 'Status:', response.status)
          break
        }
      } catch (fetchError) {
        const errorMsg = fetchError instanceof Error ? fetchError.message : String(fetchError)
        console.log(`[v0] Failed to reach ${apiUrl}: ${errorMsg}`)
        lastError = fetchError
        continue
      }
    }
    
    if (!payheroResponse) {
      const errorMsg = lastError instanceof Error ? lastError.message : String(lastError)
      console.error('[v0] PayHero API unreachable with all endpoint variations:', {
        error: errorMsg,
        attemptedEndpoints: endpointVariations,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        { 
          error: 'Payment service is currently unavailable. Please verify your PayHero API configuration and try again.',
          code: 'PAYHERO_UNREACHABLE'
        },
        { status: 503 }
      )
    }

    if (!payheroResponse.ok) {
      let errorData: any = {}
      try {
        errorData = await payheroResponse.json()
      } catch (e) {
        errorData = { error: 'Unable to parse error response' }
      }
      
      console.error('[v0] PayHero API error:', {
        status: payheroResponse.status,
        statusText: payheroResponse.statusText,
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
          { error: errorData.error || errorData.message || 'Invalid payment request. Please check your details.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: errorData.error || errorData.message || 'Failed to initiate payment. Please try again.' },
        { status: payheroResponse.status }
      )
    }

    const data = await payheroResponse.json()
    console.log('[v0] STK push initiated successfully:', {
      transactionId: data.id || data.reference,
      successfulEndpoint: successfulEndpoint,
      success: true,
    })

    return NextResponse.json({
      success: true,
      transactionId: data.id || data.reference || `STK-${Date.now()}`,
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
