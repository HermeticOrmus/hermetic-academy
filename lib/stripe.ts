// Stripe utility library for Hermetic Academy
// Ethical monetization: Cosmetics, QoL, and voluntary support only

import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_TEST_MODE === 'true'
  ? process.env.STRIPE_SECRET_KEY_TEST
  : process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    'Missing Stripe secret key. Please set STRIPE_SECRET_KEY or STRIPE_SECRET_KEY_TEST in .env.local'
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Get publishable key for client-side
export function getStripePublishableKey(): string {
  const key = process.env.STRIPE_TEST_MODE === 'true'
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!key) {
    throw new Error('Missing Stripe publishable key');
  }

  return key;
}

// ============================================
// PRODUCT TYPES
// ============================================

export type ProductType = 'cosmetic' | 'qol' | 'support' | 'tip';

export interface CheckoutSessionParams {
  userId: string;
  userEmail: string;
  productType: ProductType;
  productId: string;
  productName: string;
  amount: number; // in cents
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface SubscriptionParams {
  userId: string;
  userEmail: string;
  amount: number; // in cents per month
  currency?: string;
  displayName?: string;
  showOnWall?: boolean;
  successUrl: string;
  cancelUrl: string;
}

// ============================================
// CHECKOUT SESSION CREATION
// ============================================

/**
 * Create a Stripe Checkout session for one-time purchases
 * (cosmetics, QoL features, tips)
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const {
    userId,
    userEmail,
    productType,
    productId,
    productName,
    amount,
    currency = 'usd',
    successUrl,
    cancelUrl,
    metadata = {},
  } = params;

  // Create line item
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency,
        product_data: {
          name: productName,
          description: `${productType === 'cosmetic' ? 'Cosmetic Item' : productType === 'qol' ? 'Quality of Life Feature' : 'Support Contribution'}`,
          metadata: {
            type: productType,
            productId,
          },
        },
        unit_amount: amount,
      },
      quantity: 1,
    },
  ];

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail,
    client_reference_id: userId,
    metadata: {
      userId,
      productType,
      productId,
      ...metadata,
    },
    payment_intent_data: {
      metadata: {
        userId,
        productType,
        productId,
      },
    },
  });

  return session;
}

/**
 * Create a Stripe Checkout session for recurring support subscriptions
 * (voluntary monthly support)
 */
export async function createSupportSubscription(
  params: SubscriptionParams
): Promise<Stripe.Checkout.Session> {
  const {
    userId,
    userEmail,
    amount,
    currency = 'usd',
    displayName,
    showOnWall = false,
    successUrl,
    cancelUrl,
  } = params;

  // Create or retrieve customer
  let customer: Stripe.Customer;
  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    customer = existingCustomers.data[0];
  } else {
    customer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        userId,
      },
    });
  }

  // Create checkout session for subscription
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customer.id,
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: 'Voluntary Support',
            description: 'Help keep Hermetic Academy free for everyone',
          },
          recurring: {
            interval: 'month',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      productType: 'support',
      displayName: displayName || '',
      showOnWall: showOnWall.toString(),
    },
    subscription_data: {
      metadata: {
        userId,
        displayName: displayName || '',
        showOnWall: showOnWall.toString(),
      },
    },
  });

  return session;
}

/**
 * Create a Stripe Customer Portal session
 * (for users to manage their subscriptions)
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

// ============================================
// REFUND MANAGEMENT
// ============================================

/**
 * Process a refund (30-day no-questions-asked Gold Hat policy)
 */
export async function processRefund(
  paymentIntentId: string,
  reason?: string
): Promise<Stripe.Refund> {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason: 'requested_by_customer',
    metadata: {
      refundReason: reason || 'Customer request',
      refundDate: new Date().toISOString(),
    },
  });

  return refund;
}

// ============================================
// WEBHOOK VERIFICATION
// ============================================

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_TEST_MODE === 'true'
    ? process.env.STRIPE_WEBHOOK_SECRET_TEST
    : process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing Stripe webhook secret');
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format amount from cents to dollars
 */
export function formatAmount(amountInCents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amountInCents / 100);
}

/**
 * Get product type display name
 */
export function getProductTypeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    cosmetic: 'Cosmetic Item',
    qol: 'Quality of Life Feature',
    support: 'Voluntary Support',
    tip: 'Support Contribution',
  };
  return labels[type] || 'Purchase';
}

/**
 * Validate purchase amount (minimum $0.50, maximum $999.99)
 */
export function validatePurchaseAmount(amountInCents: number): boolean {
  return amountInCents >= 50 && amountInCents <= 99999;
}
