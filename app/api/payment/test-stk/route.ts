import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount } = await request.json()

    console.log('[v0] TEST STK PUSH - Starting', {
      phoneNumber,
      amount,
      timestamp: new Date().toISOString(),
    })

    // Check credentials
    const username = process.env.PAYHERO_API_USERNAME
    const password = process.env.PAYHERO_API_PASSWORD
    const channelId = process.env.PAYHERO_CHANNEL_ID

    console.log('[v0] Credentials check:', {
      hasUsername: !!username,
      hasPassword: !!password,
      hasChannelId: !!channelId,
      channelId: channelId,
    })

    if (!username || !password || !channelId) {
      return NextResponse.json({
        error: 'Missing PayHero credentials',
        details: {
          hasUsername: !!username,
          hasPassword: !!password,
          hasChannelId: !!channelId,
        },
      })
    }

    // Format phone number
    let formattedPhone = phoneNumber.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1)
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone
    }

    console.log('[v0] Formatted phone:', formattedPhone)

    // Create auth header
    const auth = Buffer.from(`${username}:${password}`).toString('base64')

    const payload = {
      amount: amount,
      phone_number: formattedPhone,
      channel_id: parseInt(channelId),
      merchant_reference: `TEST-${Date.now()}`,
      first_name: 'Test',
      last_name: 'User',
      email: 'test@test.com',
    }

    console.log('[v0] Payload:', {
      ...payload,
      phone_number: '***' + formattedPhone.slice(-4),
    })

    // Test all endpoints
    const endpoints = [
      'https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push',
      'https://api.payhero.io/v2/payments/mobile/mpesa/stk-push',
      'https://api.payhero.io/payments/mobile/mpesa/stk-push',
    ]

    const results = []

    for (const endpoint of endpoints) {
      console.log(`[v0] Testing endpoint: ${endpoint}`)

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(payload),
        })

        const responseText = await response.text()

        console.log(`[v0] Response from ${endpoint}:`, {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get('content-type'),
          textLength: responseText.length,
          text: responseText.substring(0, 500),
        })

        results.push({
          endpoint,
          status: response.status,
          statusText: response.statusText,
          success: response.ok,
          responseLength: responseText.length,
          response: responseText.substring(0, 200),
        })

        if (response.ok) {
          break
        }
      } catch (error) {
        console.error(`[v0] Error testing ${endpoint}:`, error)
        results.push({
          endpoint,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return NextResponse.json({
      message: 'Test completed',
      results: results,
    })
  } catch (error) {
    console.error('[v0] Test error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
