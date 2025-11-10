-- Hermetic Academy Database Schema
-- Initial migration: Core tables for principles, progress, community

-- PostgreSQL 13+ has gen_random_uuid() built-in, no extension needed

-- ============================================================================
-- PROFILES
-- Extended user data beyond Supabase Auth
-- ============================================================================

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  theme_preference TEXT DEFAULT 'dark',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20),
  CONSTRAINT username_format CHECK (username ~* '^[a-zA-Z0-9_]+$')
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can read all profiles, but only update their own
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- PRINCIPLE PROGRESS
-- Track which principles users have completed
-- ============================================================================

CREATE TABLE principle_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  principle_id INT NOT NULL CHECK (principle_id >= 1 AND principle_id <= 7),
  completed BOOLEAN DEFAULT false,
  reflection TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, principle_id)
);

ALTER TABLE principle_progress ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see and manage their own progress
CREATE POLICY "Users can view own progress"
  ON principle_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON principle_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON principle_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- COMMUNITY REFLECTIONS
-- Public sharing of insights (with anonymous option)
-- ============================================================================

CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  principle_id INT NOT NULL CHECK (principle_id >= 1 AND principle_id <= 7),
  content TEXT NOT NULL CHECK (char_length(content) >= 10 AND char_length(content) <= 1000),
  is_anonymous BOOLEAN DEFAULT false,
  wisdom_count INT DEFAULT 0,
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read non-flagged reflections, users can manage their own
CREATE POLICY "Reflections are viewable by everyone"
  ON reflections FOR SELECT
  USING (is_flagged = false);

CREATE POLICY "Users can insert own reflections"
  ON reflections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reflections"
  ON reflections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reflections"
  ON reflections FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- WISDOM REACTIONS
-- Users can mark reflections as wise (not "likes")
-- ============================================================================

CREATE TABLE wisdom_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection_id UUID REFERENCES reflections(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(reflection_id, user_id)
);

ALTER TABLE wisdom_reactions ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can view, users can manage their own reactions
CREATE POLICY "Wisdom reactions are viewable by everyone"
  ON wisdom_reactions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own wisdom reactions"
  ON wisdom_reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wisdom reactions"
  ON wisdom_reactions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- COSMETIC UNLOCKS
-- Track earned/purchased cosmetic items
-- ============================================================================

CREATE TABLE cosmetic_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cosmetic_type TEXT NOT NULL CHECK (cosmetic_type IN ('theme', 'badge', 'avatar')),
  cosmetic_id TEXT NOT NULL,
  unlocked_via TEXT NOT NULL CHECK (unlocked_via IN ('achievement', 'donation')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, cosmetic_type, cosmetic_id)
);

ALTER TABLE cosmetic_unlocks ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see and manage their own unlocks
CREATE POLICY "Users can view own cosmetic unlocks"
  ON cosmetic_unlocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert cosmetic unlocks"
  ON cosmetic_unlocks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Update wisdom_count when reactions change
CREATE OR REPLACE FUNCTION update_wisdom_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reflections
    SET wisdom_count = wisdom_count + 1
    WHERE id = NEW.reflection_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reflections
    SET wisdom_count = wisdom_count - 1
    WHERE id = OLD.reflection_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update wisdom_count
CREATE TRIGGER wisdom_count_trigger
  AFTER INSERT OR DELETE ON wisdom_reactions
  FOR EACH ROW
  EXECUTE FUNCTION update_wisdom_count();

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at on tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_principle_progress_updated_at
  BEFORE UPDATE ON principle_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reflections_updated_at
  BEFORE UPDATE ON reflections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INDEXES
-- Optimize common queries
-- ============================================================================

CREATE INDEX idx_principle_progress_user_id ON principle_progress(user_id);
CREATE INDEX idx_reflections_principle_id ON reflections(principle_id);
CREATE INDEX idx_reflections_created_at ON reflections(created_at DESC);
CREATE INDEX idx_wisdom_reactions_reflection_id ON wisdom_reactions(reflection_id);

-- ============================================================================
-- INITIAL DATA (Optional achievements)
-- Could be loaded separately if needed
-- ============================================================================

-- Achievement-based cosmetics will be defined in application logic
-- and unlocked via API calls when users complete certain actions
