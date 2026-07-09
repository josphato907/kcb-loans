import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      hasUsername: !!process.env.PAYHERO_API_USERNAME,
      hasPassword: !!process.env.PAYHERO_API_PASSWORD,
      hasChannelId: !!process.env.PAYHERO_CHANNEL_ID,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      nodeEnv: process.env.NODE_ENV,
    },
    payheroApi: {
      endpoint: 'https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push',
      authMethod: 'Basic Auth (username:password)',
      channelId: process.env.PAYHERO_CHANNEL_ID || 'NOT SET',
    },
    message: 'To verify your configuration is correct, check if all environment variables are properly set in Vercel.',
  }

  // Try to test connectivity to PayHero
  if (process.env.PAYHERO_API_USERNAME && process.env.PAYHERO_API_PASSWORD) {
    const auth = Buffer.from(
      `${process.env.PAYHERO_API_USERNAME}:${process.env.PAYHERO_API_PASSWORD}`
    ).toString('base64')

    try {
      const testResponse = await fetch('https://api.payhero.io/api/v2/health', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      })

      diagnostics.payheroApi.healthCheck = {
        status: testResponse.status,
        statusText: testResponse.statusText,
        reachable: testResponse.ok,
      }
    } catch (error) {
      diagnostics.payheroApi.healthCheck = {
        error: error instanceof Error ? error.message : String(error),
        reachable: false,
      }
    }
  }

  return NextResponse.json(diagnostics)
}
