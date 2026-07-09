# PayHero API Connection Troubleshooting

## Current Issue: "Payment service is currently unavailable"

This error means the application cannot reach the PayHero API server.

## Step 1: Verify Your Configuration

Visit: `https://kcb-loans.vercel.app/api/payment/diagnostic`

You should see something like:
```json
{
  "environment": {
    "hasUsername": true,
    "hasPassword": true,
    "hasChannelId": true
  },
  "payheroApi": {
    "channelId": "6086",
    "healthCheck": {
      "reachable": true
    }
  }
}
```

If any are `false` or `reachable` is `false`, continue below.

## Step 2: Check Your PayHero Credentials

**Go to your Vercel Dashboard:**

1. Visit: https://vercel.com/dashboard
2. Select your **kcb-loans** project
3. Click **Settings** → **Environment Variables**
4. Verify these three variables are set:
   - `PAYHERO_API_USERNAME` - Your PayHero merchant username
   - `PAYHERO_API_PASSWORD` - Your PayHero merchant password
   - `PAYHERO_CHANNEL_ID` - Your channel ID (e.g., 6086)

**If any are missing:**
1. Add them with the correct values
2. Click **Save**
3. Vercel will automatically redeploy

## Step 3: Find Your Correct PayHero API Endpoint

The app currently tries these endpoints (in order):
1. `https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push`
2. `https://api.payhero.io/v2/payments/mobile/mpesa/stk-push`
3. `https://api.payhero.io/payments/mobile/mpesa/stk-push`
4. `https://api.payhero.io/v2/stk-push`
5. `https://payhero.io/api/v2/payments/mobile/mpesa/stk-push`
6. `https://payhero.io/payments/mobile/mpesa/stk-push`
7. `https://api.payhero.io/stk-push`
8. `https://api.payhero.io/mpesa/stk-push`

**If none of these work, contact PayHero support and ask for:**
- The exact API endpoint URL for STK push with your credentials
- Confirm your username/password are correct
- Verify your channel ID is correct
- Check if your PayHero account is activated

## Step 4: Common Causes & Solutions

### Cause 1: Network/Firewall Blocking
**Solution:** 
- PayHero API might be blocked by Vercel's network
- Contact Vercel support: https://vercel.com/help
- Ask if api.payhero.io is accessible from their servers

### Cause 2: Wrong Credentials
**Solution:**
- Double-check your PayHero merchant username (not email)
- Verify password is correct and hasn't expired
- Check Channel ID matches your PayHero account settings

### Cause 3: PayHero Account Not Activated
**Solution:**
- Log in to PayHero dashboard
- Go to Settings → API Integration
- Ensure STK push is enabled
- Verify account status is active (not suspended)

### Cause 4: Incorrect Endpoint
**Solution:**
- Contact PayHero technical support
- Ask for the exact endpoint URL for M-Pesa STK push
- Provide them with your channel ID

## Step 5: Testing the Connection

Once you believe the issue is fixed:

1. Visit: `https://kcb-loans.vercel.app/api/payment/diagnostic`
2. Check that `reachable` is `true`
3. Try making a test payment on: `https://kcb-loans.vercel.app/payment?amount=5000`
4. Check your phone for M-Pesa prompt

## Step 6: Check Vercel Logs (Advanced)

1. Go to: https://vercel.com/dashboard
2. Click on **kcb-loans** project
3. Go to **Deployments** → latest deployment
4. Click **Functions**
5. Look for `/api/payment/initiate-stk` and check recent logs for errors

The logs will show which endpoint succeeded or why they all failed.

## PayHero Support Contact

- Website: https://payhero.io
- Email: support@payhero.io
- Support requires: Channel ID, Username, and which endpoint error you're getting

## Next Steps

1. Verify all environment variables in Vercel
2. Run the diagnostic endpoint
3. Contact PayHero if the issue persists
4. Share the diagnostic output with PayHero support team
