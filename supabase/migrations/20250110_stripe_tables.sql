-- Stripe Integration Tables for Hermetic Academy
-- Ethical monetization: Cosmetics, QoL, and voluntary support only

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PURCHASES TABLE
-- ============================================
-- Tracks all purchases (cosmetics, QoL, support)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('cosmetic', 'qol', 'support', 'tip')),
  item_id TEXT NOT NULL,
  item_name TEXT,
  amount INTEGER NOT NULL, -- in cents (USD)
  currency TEXT DEFAULT 'usd',
  stripe_payment_id TEXT UNIQUE,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  refunded_at TIMESTAMPTZ,
  refund_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_item_type ON purchases(item_type);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_payment_id ON purchases(stripe_payment_id);

-- ============================================
-- 2. COSMETIC CATALOG TABLE
-- ============================================
-- All available cosmetic items
CREATE TABLE IF NOT EXISTS cosmetic_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('theme', 'avatar', 'border', 'badge', 'xp_bar', 'animation', 'sound', 'font', 'background', 'bundle')),
  price INTEGER NOT NULL, -- in cents
  original_price INTEGER, -- for bundles/sales
  preview_url TEXT,
  preview_images JSONB DEFAULT '[]', -- array of image URLs
  metadata JSONB DEFAULT '{}', -- CSS variables, asset URLs, etc.
  tags TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cosmetic_catalog_type ON cosmetic_catalog(type);
CREATE INDEX IF NOT EXISTS idx_cosmetic_catalog_active ON cosmetic_catalog(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_cosmetic_catalog_featured ON cosmetic_catalog(featured) WHERE featured = TRUE;

-- ============================================
-- 3. USER COSMETICS INVENTORY
-- ============================================
-- What cosmetics each user owns and has equipped
CREATE TABLE IF NOT EXISTS user_cosmetics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cosmetic_id TEXT REFERENCES cosmetic_catalog(id) ON DELETE CASCADE NOT NULL,
  cosmetic_type TEXT NOT NULL,
  equipped BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cosmetic_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_cosmetics_user_id ON user_cosmetics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cosmetics_equipped ON user_cosmetics(user_id, equipped) WHERE equipped = TRUE;

-- ============================================
-- 4. QOL FEATURES CATALOG
-- ============================================
CREATE TABLE IF NOT EXISTS qol_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  feature_type TEXT NOT NULL CHECK (feature_type IN ('offline', 'analytics', 'export', 'sync', 'notes', 'support', 'early_access', 'bundle')),
  price INTEGER NOT NULL, -- in cents (one-time)
  subscription_price INTEGER, -- in cents/month (optional recurring)
  benefits JSONB DEFAULT '[]', -- array of benefit descriptions
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. USER QOL FEATURES
-- ============================================
CREATE TABLE IF NOT EXISTS user_qol_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_id TEXT REFERENCES qol_catalog(id) ON DELETE CASCADE NOT NULL,
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('one_time', 'subscription')),
  active BOOLEAN DEFAULT TRUE,
  stripe_subscription_id TEXT,
  expires_at TIMESTAMPTZ, -- NULL for one-time purchases, future date for subscriptions
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_qol_user_id ON user_qol_features(user_id);
CREATE INDEX IF NOT EXISTS idx_user_qol_active ON user_qol_features(user_id, active) WHERE active = TRUE;

-- ============================================
-- 6. SUPPORTERS TABLE
-- ============================================
-- Voluntary recurring support (buy me a coffee style)
CREATE TABLE IF NOT EXISTS supporters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- in cents/month
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'paused')),
  show_on_wall BOOLEAN DEFAULT FALSE, -- opt-in public recognition
  display_name TEXT, -- custom name for supporters wall
  supporter_since TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_supporters_user_id ON supporters(user_id);
CREATE INDEX IF NOT EXISTS idx_supporters_status ON supporters(status);
CREATE INDEX IF NOT EXISTS idx_supporters_wall ON supporters(show_on_wall) WHERE show_on_wall = TRUE AND status = 'active';

-- ============================================
-- 7. STRIPE WEBHOOK EVENTS LOG
-- ============================================
-- Track all Stripe webhook events for debugging
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_webhook_events_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed ON stripe_webhook_events(processed);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cosmetics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_qol_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;

-- Purchases: Users can only see their own purchases
CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User Cosmetics: Users can manage their own inventory
CREATE POLICY "Users can view own cosmetics"
  ON user_cosmetics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cosmetics"
  ON user_cosmetics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cosmetics"
  ON user_cosmetics FOR UPDATE
  USING (auth.uid() = user_id);

-- User QoL Features: Users can view their own features
CREATE POLICY "Users can view own qol features"
  ON user_qol_features FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own qol features"
  ON user_qol_features FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Supporters: Users can view their own supporter status
CREATE POLICY "Users can view own supporter status"
  ON supporters FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own supporter record"
  ON supporters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own supporter record"
  ON supporters FOR UPDATE
  USING (auth.uid() = user_id);

-- Public read access to catalogs
CREATE POLICY "Anyone can view cosmetic catalog"
  ON cosmetic_catalog FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Anyone can view qol catalog"
  ON qol_catalog FOR SELECT
  USING (active = TRUE);

-- Public read access to supporters wall (only if opted in)
CREATE POLICY "Anyone can view supporters wall"
  ON supporters FOR SELECT
  USING (show_on_wall = TRUE AND status = 'active');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cosmetic_catalog_updated_at
  BEFORE UPDATE ON cosmetic_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_cosmetics_updated_at
  BEFORE UPDATE ON user_cosmetics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qol_catalog_updated_at
  BEFORE UPDATE ON qol_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_qol_updated_at
  BEFORE UPDATE ON user_qol_features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supporters_updated_at
  BEFORE UPDATE ON supporters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA: Sample Cosmetic Items
-- ============================================

-- Themes
INSERT INTO cosmetic_catalog (id, name, description, type, price, preview_url, metadata) VALUES
('theme-cosmic-dark', 'Cosmic Dark', 'Deep space aesthetic with nebula effects', 'theme', 299, '/cosmetics/themes/cosmic-dark.png', '{"css": {"--bg-primary": "#0A0A0A", "--accent": "#4CC9F0"}}'),
('theme-neon-cyber', 'Neon Cyber', 'Electric neon gradients with cyberpunk vibes', 'theme', 299, '/cosmetics/themes/neon-cyber.png', '{"css": {"--bg-primary": "#1A0033", "--accent": "#FF006E"}}'),
('theme-ethereal-gold', 'Ethereal Gold', 'Sacred gold accents with divine luminescence', 'theme', 399, '/cosmetics/themes/ethereal-gold.png', '{"css": {"--bg-primary": "#1A1410", "--accent": "#D4AF37"}}'),
('theme-mystic-purple', 'Mystic Purple', 'Deep purple realm with arcane energy', 'theme', 299, '/cosmetics/themes/mystic-purple.png', '{"css": {"--bg-primary": "#1A0A2E", "--accent": "#9D4EDD"}}'),
('theme-nature-green', 'Nature Green', 'Living green tones with organic flow', 'theme', 299, '/cosmetics/themes/nature-green.png', '{"css": {"--bg-primary": "#0A1A0A", "--accent": "#10B981"}}')
ON CONFLICT (id) DO NOTHING;

-- XP Bar Skins
INSERT INTO cosmetic_catalog (id, name, description, type, price, preview_url, metadata) VALUES
('xp-holographic', 'Holographic XP', 'Shifting rainbow holographic progress bar', 'xp_bar', 199, '/cosmetics/xp-bars/holographic.png', '{"gradient": "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1)"}'),
('xp-liquid-gold', 'Liquid Gold XP', 'Flowing molten gold progress animation', 'xp_bar', 249, '/cosmetics/xp-bars/liquid-gold.png', '{"gradient": "linear-gradient(90deg, #9A7E2E, #D4AF37, #F4E4C1)"}'),
('xp-cosmic-nebula', 'Cosmic Nebula XP', 'Swirling space dust effect', 'xp_bar', 199, '/cosmetics/xp-bars/cosmic.png', '{"gradient": "linear-gradient(90deg, #1A1A2E, #4CC9F0, #9D4EDD)"}')
ON CONFLICT (id) DO NOTHING;

-- Profile Borders
INSERT INTO cosmetic_catalog (id, name, description, type, price, preview_url, metadata) VALUES
('border-gold-frame', 'Gold Frame', 'Elegant gold border with ornate corners', 'border', 199, '/cosmetics/borders/gold-frame.png', '{"borderColor": "#D4AF37", "borderWidth": "3px"}'),
('border-rainbow-glow', 'Rainbow Glow', 'Animated rainbow gradient border', 'border', 299, '/cosmetics/borders/rainbow-glow.png', '{"animation": "rainbow-rotation 3s linear infinite"}'),
('border-sacred-geometry', 'Sacred Geometry', 'Metatron''s Cube pattern border', 'border', 349, '/cosmetics/borders/sacred-geo.png', '{"pattern": "metatrons-cube"}')
ON CONFLICT (id) DO NOTHING;

-- Bundles
INSERT INTO cosmetic_catalog (id, name, description, type, price, original_price, preview_url, metadata, featured) VALUES
('bundle-starter', 'Starter Customization Pack', 'Theme + XP Bar + Border bundle', 'bundle', 999, 1497, '/cosmetics/bundles/starter.png', '{"includes": ["theme-cosmic-dark", "xp-holographic", "border-gold-frame"]}', TRUE),
('bundle-ultimate', 'Ultimate Sacred Bundle', 'Everything currently available', 'bundle', 1999, 3500, '/cosmetics/bundles/ultimate.png', '{"includes": ["all"]}', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED DATA: QoL Features
-- ============================================

INSERT INTO qol_catalog (id, name, description, feature_type, price, subscription_price, benefits) VALUES
('qol-offline', 'Offline Mode', 'Download principles for offline study', 'offline', 499, NULL, '["Download all principle content", "Study without internet", "Sync progress when online", "Works on all devices"]'),
('qol-analytics', 'Advanced Analytics', 'Detailed learning insights and progress tracking', 'analytics', 999, NULL, '["Time spent analysis", "Learning pattern insights", "Progress predictions", "Custom reports"]'),
('qol-export', 'Export Features', 'Download your progress, notes, and certificates', 'export', 299, NULL, '["PDF progress reports", "Certificate generation", "Note exports", "Data portability"]'),
('qol-bundle', 'Quality of Life Bundle', 'All convenience features at a discount', 'bundle', 1499, NULL, '["Offline mode", "Advanced analytics", "Export features", "Priority support", "Early access"]'),
('qol-subscription', 'QoL Subscription (Optional)', 'All current and future QoL features', 'bundle', NULL, 299, '["All QoL features", "Future features included", "Cancel anytime", "No commitment"]')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE purchases IS 'All purchases made by users - cosmetics, QoL features, support contributions';
COMMENT ON TABLE cosmetic_catalog IS 'Available cosmetic items for purchase';
COMMENT ON TABLE user_cosmetics IS 'Cosmetic items owned and equipped by each user';
COMMENT ON TABLE qol_catalog IS 'Quality of Life features available for purchase';
COMMENT ON TABLE user_qol_features IS 'QoL features owned by users (one-time or subscription)';
COMMENT ON TABLE supporters IS 'Users who provide voluntary recurring support';
COMMENT ON TABLE stripe_webhook_events IS 'Log of all Stripe webhook events for debugging';
