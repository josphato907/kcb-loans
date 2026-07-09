# PayHero Payment Integration Troubleshooting

## Error: "fetch failed"

This error occurs when the API cannot reach the PayHero server or the request fails at the network level.

### Possible Causes and Solutions

#### 1. **Incorrect PayHero Endpoint**

The current endpoint being used is:
```
https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push
```

**Solution:**
- Contact PayHero support to verify the correct STK push endpoint for your account
- Different PayHero accounts might use different endpoints

#### 2. **Invalid Authentication Credentials**

**Solution:**
- Verify your PayHero credentials are correct:
  - Go to your PayHero dashboard
  - Check Settings → API Credentials
  - Ensure PAYHERO_API_USERNAME and PAYHERO_API_PASSWORD are correct
  - Verify PAYHERO_CHANNEL_ID matches your merchant channel

#### 3. **Environment Variables Not Set**

**Solution:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify all three variables are set:
  - `PAYHERO_API_USERNAME`
  - `PAYHERO_API_PASSWORD`
  - `PAYHERO_CHANNEL_ID`
- After adding/updating, **redeploy** your project

#### 4. **Network/Firewall Issues**

**Solution:**
- Test using the diagnostic endpoint: `https://kcb-loans.vercel.app/api/payment/diagnostic`
- Check the response to see if PayHero API is reachable
- Verify your internet connection if testing locally

#### 5. **PayHero Account Not Activated**

**Solution:**
- Log in to your PayHero merchant account
- Verify your account is active and not suspended
- Ensure M-Pesa STK push is enabled for your channel
- Check your account balance/credits

### Debug Steps

1. **Check Diagnostic Endpoint:**
   ```
   curl https://kcb-loans.vercel.app/api/payment/diagnostic
   ```
   This will show if environment variables are properly configured.

2. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click "Functions" tab
   - Look for logs in `/api/payment/initiate-stk`
   - Look for error details with "[v0]" prefix

3. **Test Locally:**
   ```bash
   # Make sure .env.local has correct credentials
   npm run dev
   # Then test payment on http://localhost:3000
   ```

### Common PayHero Issues

**Issue:** "Invalid credentials"
- Solution: Re-check username and password in PayHero dashboard

**Issue:** "Channel not found"
- Solution: Verify PAYHERO_CHANNEL_ID matches exactly (e.g., 6086)

**Issue:** "Phone number invalid"
- Solution: Ensure phone number is formatted as: 254712345678 (with country code, no +)

**Issue:** "Insufficient balance"
- Solution: Add credits to your PayHero merchant account

### Getting Help

1. **Check PayHero Documentation:** https://payhero.io/documentation
2. **Contact PayHero Support:** support@payhero.io
3. **Review Your Vercel Logs** for detailed error messages
4. **Check the API Response** in browser DevTools Network tab for PayHero error details

### Testing Payment Without PayHero

If you want to test the application flow without real PayHero credentials:
- Remove or clear the PayHero environment variables
- The system will automatically switch to **mock mode**
- You can test the complete payment flow with a simulated STK push

### Advanced: Debugging with cURL

Test PayHero connection directly:

```bash
curl -X POST https://api.payhero.io/api/v2/payments/mobile/mpesa/stk-push \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "phone_number": "254712345678",
    "channel_id": 6086,
    "merchant_reference": "LOAN-123456"
  }'
```

Replace `username`, `password`, `channel_id`, and `phone_number` with your actual values.
