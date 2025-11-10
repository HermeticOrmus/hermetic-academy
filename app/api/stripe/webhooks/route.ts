// API route: Handle Stripe webhook events
// POST /api/stripe/webhooks

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyWebhookSignature } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Get Supabase client (service role for webhook processing)
    const supabase = await createClient();

    // Log webhook event
    await supabase.from('stripe_webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event.data as any,
      processed: false,
    });

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, supabase);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription, supabase);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, supabase);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge, supabase);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// ============================================
// WEBHOOK EVENT HANDLERS
// ============================================

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: any
) {
  const userId = session.metadata?.userId;
  const productType = session.metadata?.productType;
  const productId = session.metadata?.productId;

  if (!userId || !productType || !productId) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  // Record purchase
  const { error: purchaseError } = await supabase.from('purchases').insert({
    user_id: userId,
    item_type: productType,
    item_id: productId,
    item_name: session.metadata?.productName || 'Unknown',
    amount: session.amount_total || 0,
    currency: session.currency || 'usd',
    stripe_payment_id: session.payment_intent,
    stripe_session_id: session.id,
    status: 'completed',
  });

  if (purchaseError) {
    console.error('Error recording purchase:', purchaseError);
    return;
  }

  // Handle different product types
  if (productType === 'cosmetic') {
    // Add cosmetic to user's inventory
    const { error: cosmeticError } = await supabase.from('user_cosmetics').insert({
      user_id: userId,
      cosmetic_id: productId,
      cosmetic_type: session.metadata?.cosmeticType || 'unknown',
    });

    if (cosmeticError) {
      console.error('Error adding cosmetic to inventory:', cosmeticError);
    }
  } else if (productType === 'qol') {
    // Add QoL feature to user's account
    const { error: qolError } = await supabase.from('user_qol_features').insert({
      user_id: userId,
      feature_id: productId,
      purchase_type: 'one_time',
      active: true,
    });

    if (qolError) {
      console.error('Error adding QoL feature:', qolError);
    }
  } else if (productType === 'support' && session.mode === 'subscription') {
    // Create supporter record
    const { error: supporterError } = await supabase.from('supporters').insert({
      user_id: userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      amount: session.amount_total || 0,
      currency: session.currency || 'usd',
      status: 'active',
      display_name: session.metadata?.displayName || null,
      show_on_wall: session.metadata?.showOnWall === 'true',
    });

    if (supporterError) {
      console.error('Error creating supporter record:', supporterError);
    }
  }

  console.log(`Checkout completed for user ${userId}: ${productType} - ${productId}`);
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: any
) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('Missing userId in subscription metadata:', subscription.id);
    return;
  }

  // Update supporter status
  const { error } = await supabase
    .from('supporters')
    .update({
      status: subscription.status,
      amount: subscription.items.data[0]?.price.unit_amount || 0,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating supporter status:', error);
  }

  console.log(`Subscription updated for user ${userId}: ${subscription.status}`);
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: any
) {
  // Update supporter status to cancelled
  const { error } = await supabase
    .from('supporters')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating cancelled subscription:', error);
  }

  console.log(`Subscription cancelled: ${subscription.id}`);
}

async function handleRefund(charge: Stripe.Charge, supabase: any) {
  const paymentIntentId = charge.payment_intent as string;

  if (!paymentIntentId) {
    console.error('Missing payment_intent in charge:', charge.id);
    return;
  }

  // Update purchase status
  const { error } = await supabase
    .from('purchases')
    .update({
      status: 'refunded',
      refunded_at: new Date().toISOString(),
      refund_reason: 'Customer request',
    })
    .eq('stripe_payment_id', paymentIntentId);

  if (error) {
    console.error('Error updating refunded purchase:', error);
  }

  console.log(`Refund processed for payment: ${paymentIntentId}`);
}
