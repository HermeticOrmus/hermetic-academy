// API route: Create Stripe checkout session for voluntary support
// POST /api/stripe/checkout/support

import { NextRequest, NextResponse } from 'next/server';
import { createSupportSubscription, createCheckoutSession } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { amount, recurring, displayName, showOnWall } = body;

    if (!amount || amount < 300) { // Minimum $3
      return NextResponse.json(
        { error: 'Amount must be at least $3.00' },
        { status: 400 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    let session;

    if (recurring) {
      // Create recurring subscription
      session = await createSupportSubscription({
        userId: user.id,
        userEmail: user.email!,
        amount,
        displayName,
        showOnWall: showOnWall || false,
        successUrl: `${baseUrl}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/support?cancelled=true`,
      });
    } else {
      // Create one-time tip
      session = await createCheckoutSession({
        userId: user.id,
        userEmail: user.email!,
        productType: 'tip',
        productId: 'one-time-tip',
        productName: 'Support Contribution',
        amount,
        successUrl: `${baseUrl}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/support?cancelled=true`,
      });
    }

    // Return checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating support checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
