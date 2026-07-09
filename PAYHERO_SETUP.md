# PayHero Setup Guide for KCB Loans

## Overview
This guide explains how to configure PayHero API credentials for M-Pesa STK push payments.

## Prerequisites
- Active PayHero merchant account (https://payhero.io)
- Vercel project deployed
- Admin access to both PayHero and Vercel dashboards

## Step 1: Get PayHero API Credentials

1. Log in to your PayHero merchant dashboard
2. Navigate to **Settings** → **API Credentials** or **Integrations**
3. Copy your:
   - **API Username** (merchant username for authentication)
   - **API Password** (merchant password for authentication)
   - **Channel ID** (your PayHero channel/merchant ID for STK push)

## Step 2: Configure Environment Variables on Vercel

1. Go to https://vercel.com/dashboard
2. Select your project (kcb-loans-m4fy)
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar
5. Add the following variables:

### Required Variables:

**PAYHERO_API_USERNAME**
- Value: Your PayHero API Username
- Type: Sensitive
- Environment: Production, Preview, Development

**PAYHERO_API_PASSWORD**
- Value: Your PayHero API Password
- Type: Sensitive
- Environment: Production, Preview, Development

**PAYHERO_CHANNEL_ID**
- Value: Your PayHero Channel ID (e.g., 6086)
- Type: Plain (numbers only)
- Environment: Production, Preview, Development

**NEXT_PUBLIC_BASE_URL**
- Value: Your Vercel deployment URL (e.g., https://kcb-loans.vercel.app)
- Type: Plain
- Environment: Production

6. Click **Save** for each variable

## Step 3: Redeploy Your Project

1. After adding environment variables, your project will automatically trigger a redeploy
2. Wait for the deployment to complete (check the Deployments tab)
3. Once deployment is successful, the M-Pesa STK push will be live

## Step 4: Test the Payment Flow

1. Visit your deployed site: https://kcb-loans-m4fy.vercel.app
2. Complete the application form and select a loan amount
3. Fill in payment details with a valid M-Pesa registered phone number
4. Click "Pay now"
5. You should receive an M-Pesa prompt on your phone within seconds

## Troubleshooting

### Issue: Still seeing "Mock mode" in console
**Solution:** 
- Verify PAYHERO_API_KEY is set in Vercel environment variables
- Check that the key is spelled exactly as shown above
- Ensure you copied the correct API key from PayHero

### Issue: "Payment service authentication failed" error
**Solution:**
- Your PAYHERO_API_KEY might be incorrect or expired
- Generate a new API key from PayHero dashboard
- Update the variable in Vercel

### Issue: M-Pesa prompt not appearing
**Solution:**
- Verify NEXT_PUBLIC_BASE_URL is set to your Vercel domain
- Check that the phone number is in correct format (e.g., +254712345678 or 0712345678)
- Confirm your M-Pesa number is properly registered with your phone

### Issue: "Failed to initiate payment" error
**Solution:**
- Check your PayHero account balance or transaction limits
- Verify the amount is within PayHero's allowed range
- Ensure your PayHero account is active and not suspended

## API Endpoints

The application uses these endpoints:

- **POST** `/api/payment/initiate-stk` - Initiates the M-Pesa STK push
- **POST** `/api/payment/webhook` - Receives PayHero payment notifications

## Security Notes

- Never commit your API keys to the repository
- Always use Vercel's "Sensitive" setting for secret credentials
- Rotate API keys periodically for security
- The webhook secret key is used to verify incoming webhook requests

## Support

For PayHero-specific issues:
- Visit https://payhero.io/docs
- Contact PayHero support through their dashboard

For deployment issues:
- Check Vercel deployment logs
- Verify environment variables are correctly set
- Check browser console for error messages
