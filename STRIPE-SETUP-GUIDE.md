# 🔑 Stripe Setup Guide for Hermetic Academy

## Quick Start

### 1. Get Stripe API Keys

**If you already have a Stripe account:**

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**

**For testing (recommended first):**
- Toggle "View test data" in the top right
- Copy test keys (they start with `pk_test_` and `sk_test_`)

**For production:**
- Copy live keys (they start with `pk_live_` and `sk_live_`)

---

### 2. Add Keys to `.env.local`

Edit your `.env.local` file and add these variables:

```bash
# Stripe Test Keys (for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST=pk_test_your_key_here
STRIPE_SECRET_KEY_TEST=sk_test_your_key_here

# Stripe Live Keys (for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here

# Set to true to use test mode, false for live
STRIPE_TEST_MODE=true
```

---

### 3. Set Up Webhook Endpoint

Stripe sends events (successful payments, refunds, etc.) to your webhook endpoint.

**Local Development (using Stripe CLI):**

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhooks
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET_TEST=whsec_your_secret_here
   ```

**Production Deployment:**

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your production URL: `https://hermetic-academy.vercel.app/api/stripe/webhooks`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `charge.refunded`
5. Copy the signing secret
6. Add to your production environment variables (Vercel):
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_your_live_secret_here
   ```

---

### 4. Run Database Migration

The Stripe tables need to be added to your Supabase database:

**Option A: Using Supabase Dashboard**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Create a new query
5. Copy the contents of `supabase/migrations/20250110_stripe_tables.sql`
6. Paste and run it

**Option B: Using Supabase CLI** (if you have it installed)

```bash
supabase db push
```

---

### 5. Test the Integration

**Run the dev server:**
```bash
npm run dev
```

**Test purchases:**
1. Navigate to `/shop` (when it's built)
2. Try purchasing a cosmetic item
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any 3-digit CVC

**Verify in Stripe Dashboard:**
- Go to **Payments** to see test transactions
- Check **Customers** to see created customers
- View **Webhooks** to see event logs

---

## Stripe Test Cards

Use these for testing different scenarios:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Payment declined |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

All test cards:
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

---

## Environment Variables Summary

```bash
# === YOUR EXISTING KEYS ===
NEXT_PUBLIC_SUPABASE_URL=your_existing_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_existing_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# === STRIPE TEST KEYS (Development) ===
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST=pk_test_...
STRIPE_SECRET_KEY_TEST=sk_test_...
STRIPE_WEBHOOK_SECRET_TEST=whsec_...

# === STRIPE LIVE KEYS (Production) ===
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# === CONFIG ===
STRIPE_TEST_MODE=true  # Set to false in production
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production
```

---

## Setting Up in Vercel (Production)

1. Go to your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add all the Stripe live keys:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
4. Add config variables:
   - `STRIPE_TEST_MODE=false`
   - `NEXT_PUBLIC_SITE_URL=https://hermetic-academy.vercel.app`
5. Redeploy the app

---

## Testing Webhooks Locally

When developing locally, Stripe can't reach your localhost. Use the Stripe CLI:

**Terminal 1 (Your dev server):**
```bash
npm run dev
```

**Terminal 2 (Stripe webhook forwarding):**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

You'll see webhook events in real-time as you test payments!

---

## Troubleshooting

### "Invalid API Key"
- Check that keys match the mode (test vs. live)
- Verify `STRIPE_TEST_MODE` is set correctly
- Make sure no extra spaces in `.env.local`

### "Webhook signature verification failed"
- Webhook secret must match the endpoint
- For local dev, use the secret from `stripe listen`
- For production, use the secret from Stripe Dashboard

### "Missing Stripe publishable key"
- Ensure `.env.local` has the correct `NEXT_PUBLIC_` prefix
- Restart the dev server after adding variables
- Check Vercel environment variables for production

### Database errors
- Make sure migration ran successfully
- Check Supabase SQL editor for errors
- Verify RLS policies are created

---

## Going Live Checklist

Before switching to live mode:

- [ ] Test all purchase flows in test mode
- [ ] Verify webhooks are working locally
- [ ] Set up production webhook endpoint in Stripe Dashboard
- [ ] Add live keys to Vercel environment variables
- [ ] Set `STRIPE_TEST_MODE=false` in production
- [ ] Test a small live transaction (buy yourself a $1 cosmetic)
- [ ] Verify refund process works
- [ ] Check that purchases show up in Supabase database
- [ ] Test customer portal for subscription management
- [ ] Review Stripe Dashboard for any errors

---

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe CLI Guide](https://stripe.com/docs/stripe-cli)
- [Webhook Events Reference](https://stripe.com/docs/api/events/types)

---

## Gold Hat Reminder 🌟

**This monetization system is designed to empower, not extract:**

- All educational content remains free
- Cosmetics give zero learning advantage
- Refunds honored within 30 days
- Subscriptions cancel anytime
- Transparent pricing
- No dark patterns

**If you find yourself wanting to add pressure tactics, urgency, or paywalls... STOP. Review the Gold Hat philosophy in STRIPE-INTEGRATION-STRATEGY.md**

---

*Built with integrity. Monetized with transparency. Deployed with love.*
