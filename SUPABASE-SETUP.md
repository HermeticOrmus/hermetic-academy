# ⚡ Supabase Database Setup

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard

2. **Create New Project**:
   - Name: `hermetic-academy`
   - Database Password: *Create a strong password* (save it!)
   - Region: Choose closest to your users
   - Pricing Plan: Free tier is perfect for start

3. **Wait 2-3 minutes** for project provisioning

---

### Step 2: Run Database Migration

**Option A: SQL Editor (Manual)**

1. In Supabase Dashboard → SQL Editor
2. Open `C:/Users/ormus/projects/01-ACTIVE/hermetic-academy/supabase/migrations/001_initial_schema.sql`
3. Copy ALL content
4. Paste into SQL Editor
5. Click "Run"
6. ✅ Verify: Tables → You should see 5 tables (principles, experiences, user_progress, etc.)

**Option B: Supabase MCP (If Configured)**

```bash
# Claude will use mcp__supabase__apply_migration
# This requires the Supabase MCP to be configured with your project
```

---

### Step 3: Get API Credentials

1. **In Supabase Dashboard**:
   - Settings → API

2. **Copy These Values**:
   - Project URL: `https://xxxxxxxxxxxxx.supabase.co`
   - `anon` public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)

---

### Step 4: Create Environment File

1. **In your project**:
   ```bash
   cd C:/Users/ormus/projects/01-ACTIVE/hermetic-academy
   ```

2. **Create `.env.local`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Replace** `xxxxxxxxxxxxx` with YOUR actual values

---

### Step 5: Verify Connection

```bash
cd C:/Users/ormus/projects/01-ACTIVE/hermetic-academy
npm run dev
```

Open http://localhost:3000

**Check browser console**:
- ✅ No Supabase errors
- ✅ Homepage loads all 7 principles
- ✅ No connection warnings

---

## Database Schema Overview

Your database now has:

### Tables

1. **principles** (7 rows)
   - Core data for each Hermetic Principle
   - Includes: name, title, subtitle, description, color, etc.

2. **experiences** (7+ rows)
   - Interactive experiences for each principle
   - Config for games, simulators, trackers

3. **user_progress** (empty initially)
   - Tracks which principles users complete
   - Includes reflections and timestamps

4. **reflections** (empty initially)
   - User insights and discoveries
   - Shareable community wisdom

5. **wisdom_reactions** (empty initially)
   - Emoji reactions to shared reflections
   - Community engagement (positive only)

### Row-Level Security (RLS)

✅ Enabled on all tables
✅ Public read access (principles, experiences)
✅ Authenticated write (user_progress, reflections)
✅ Privacy-respecting (users control their data)

---

## Testing the Database

### Option 1: Supabase SQL Editor

```sql
-- Verify principles loaded
SELECT id, name, title FROM principles ORDER BY id;

-- Should return 7 rows:
-- 1. Mentalism
-- 2. Correspondence
-- 3. Vibration
-- 4. Polarity
-- 5. Rhythm
-- 6. Cause-Effect
-- 7. Gender
```

### Option 2: Next.js App

Run `npm run dev` and check:
- Homepage shows all 7 principle cards
- Each card has title, subtitle, color
- Clicking a card navigates to `/principles/[slug]`

---

## Troubleshooting

### "Failed to fetch"
- ❌ Check `.env.local` exists
- ❌ Check URL and key are correct (no spaces, full strings)
- ❌ Restart dev server (`Ctrl+C`, then `npm run dev`)

### "Relation does not exist"
- ❌ Migration didn't run successfully
- ✅ Re-run SQL from `supabase/migrations/001_initial_schema.sql`
- ✅ Check SQL Editor for errors

### "Invalid API key"
- ❌ Wrong key copied (use `anon` public key, not `service_role`)
- ✅ Re-copy from Settings → API → `anon public`

---

## Next Steps

### Enable Authentication (Optional - Phase 2)

1. Supabase Dashboard → Authentication → Providers
2. Enable Email (for simple auth) or Google/GitHub (for social)
3. Configure in your app (patterns in HANDOFF-REPORT.md)

### Seed Initial Data

Principles and experiences are auto-seeded in the migration. ✅

### Set Up Supabase MCP (Advanced)

If you want Claude Code to manage your database:

1. Configure MCP with project URL and service role key
2. Claude can then run migrations, queries, etc. automatically

---

## Verify Success

✅ Supabase project created
✅ Database migration run successfully
✅ 5 tables exist with proper RLS
✅ `.env.local` configured
✅ `npm run dev` runs without errors
✅ Homepage displays all 7 principles

---

**Status**: Database ready for development! ⚡

Continue to: Test the app locally, then build interactive experiences!
