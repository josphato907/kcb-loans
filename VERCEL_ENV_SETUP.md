# Vercel Environment Variables Setup - QUICK START

## To Enable Real M-Pesa Payments:

### 1. Get Your PayHero Credentials
- Log in to https://payhero.io
- Go to Settings → API Keys
- Copy your API Key and Secret Key

### 2. Add to Vercel (Choose One Method)

**Method A: Via Vercel Dashboard (Recommended)**
1. Go to: https://vercel.com/dashboard
2. Select your project: `kcb-loans-m4fy`
3. Click: **Settings** → **Environment Variables**
4. Add these 3 variables:

| Name | Value |
|------|-------|
| `PAYHERO_API_KEY` | Your API Key from PayHero |
| `PAYHERO_SECRET_KEY` | Your Secret Key from PayHero |
| `NEXT_PUBLIC_BASE_URL` | `https://kcb-loans-m4fy.vercel.app` |

5. Click **Save**
6. Redeploy by clicking **Deployments** → **Redeploy**

**Method B: Via Vercel CLI**
```bash
vercel env add PAYHERO_API_KEY
# Enter your API key when prompted

vercel env add PAYHERO_SECRET_KEY
# Enter your secret key when prompted

vercel env add NEXT_PUBLIC_BASE_URL
# Enter: https://kcb-loans-m4fy.vercel.app

vercel deploy --prod
```

### 3. Verify Setup
1. Visit: https://kcb-loans-m4fy.vercel.app
2. Fill application form → Select amount → Click Pay
3. Check browser console (F12) for payment mode
4. You should see: `Payment Mode: PRODUCTION (PayHero Live)`
5. You'll receive M-Pesa prompt on your phone

## Troubleshooting

**Problem: Still seeing "MOCK" mode in console**
- Environment variables not yet deployed
- Redeploy your project after adding variables
- Wait 2-3 minutes for deployment to propagate

**Problem: "Payment service authentication failed"**
- PAYHERO_API_KEY is incorrect or invalid
- Generate a new key from PayHero dashboard
- Update the environment variable

**Problem: M-Pesa prompt not appearing**
- Verify phone number is correct (e.g., +254712345678)
- Check PayHero account balance
- Ensure account is active and not suspended

## Current Deployment Status

- **Live URL**: https://v0-project-beryl-six.vercel.app
- **Alt URL**: https://kcb-loans-m4fy.vercel.app
- **Environment**: Production
- **Payment Mode**: Mock (waiting for PayHero credentials)

Once you add the PayHero credentials, the payment mode will automatically switch to Production and M-Pesa STK push will be active.
