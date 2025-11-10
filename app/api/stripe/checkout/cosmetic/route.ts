// API route: Create Stripe checkout session for cosmetic items
// POST /api/stripe/checkout/cosmetic

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
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
    const { cosmeticId } = body;

    if (!cosmeticId) {
      return NextResponse.json(
        { error: 'Missing cosmeticId' },
        { status: 400 }
      );
    }

    // Get cosmetic item from database
    const { data: cosmetic, error: cosmeticError } = await supabase
      .from('cosmetic_catalog')
      .select('*')
      .eq('id', cosmeticId)
      .eq('active', true)
      .single();

    if (cosmeticError || !cosmetic) {
      return NextResponse.json(
        { error: 'Cosmetic item not found' },
        { status: 404 }
      );
    }

    // Check if user already owns this cosmetic
    const { data: existing } = await supabase
      .from('user_cosmetics')
      .select('id')
      .eq('user_id', user.id)
      .eq('cosmetic_id', cosmeticId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'You already own this cosmetic item' },
        { status: 400 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create checkout session
    const session = await createCheckoutSession({
      userId: user.id,
      userEmail: user.email!,
      productType: 'cosmetic',
      productId: cosmeticId,
      productName: cosmetic.name,
      amount: cosmetic.price,
      successUrl: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/shop?cancelled=true`,
      metadata: {
        cosmeticType: cosmetic.type,
      },
    });

    // Return checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
