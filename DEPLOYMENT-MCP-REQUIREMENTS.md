# 🚀 Complete Deployment MCP Requirements

## Current Stack Analysis

**Hermetic Academy** is a Next.js webapp with:
- Frontend: Next.js 14 + React + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + Edge Functions)
- Hosting: **TBD** (Vercel recommended)
- Repository: GitHub (already automated ✅)

---

## 🎯 Required MCPs for Full Autonomous Deployment

### 1. **Vercel MCP** (Critical - Frontend Hosting)

**What We Need**:
- Create Vercel project
- Link to GitHub repository
- Configure environment variables
- Trigger deployments
- Manage custom domains
- Access deployment logs

**Available Tools** (checking current MCP list):
- ❓ Need to verify if Vercel MCP exists
- Alternative: Vercel CLI + API

**Automation Script** (if no MCP):
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (requires Vercel token)
export VERCEL_TOKEN="..."
vercel --prod \
  --token $VERCEL_TOKEN \
  --env NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL \
  --env NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
```

**Vercel API Alternative**:
```bash
# Create project
curl -X POST https://api.vercel.com/v9/projects \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -d '{
    "name": "hermetic-academy",
    "framework": "nextjs",
    "gitRepository": {
      "repo": "HermeticOrmus/hermetic-academy",
      "type": "github"
    }
  }'

# Set environment variables
curl -X POST https://api.vercel.com/v9/projects/$PROJECT_ID/env \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -d '{
    "key": "NEXT_PUBLIC_SUPABASE_URL",
    "value": "https://...",
    "type": "encrypted",
    "target": ["production", "preview"]
  }'
```

**Priority**: 🔴 **CRITICAL** - Required for hosting

---

### 2. **Email MCP** (High Priority - Authentication)

**What We Need**:
- Send password reset emails
- Send magic link authentication
- Send community notifications (optional)
- Welcome emails

**Options**:
- **Supabase built-in SMTP** (simplest, use what we have)
- **Resend MCP** (modern, developer-friendly)
- **SendGrid MCP** (enterprise-grade)

**Recommendation**: Start with **Supabase SMTP** (zero additional setup), add dedicated email service later if needed.

**Supabase Email Setup** (via Dashboard or API):
```bash
# Configure SMTP in Supabase Dashboard
# Settings → Auth → SMTP Settings
# Or use default Supabase email (limited to 3 emails/hour in free tier)
```

**Priority**: 🟡 **HIGH** - Required for auth, can use Supabase defaults initially

---

### 3. **Stripe MCP** (Medium Priority - Donations)

**What We Need**:
- Create donation products (cosmetic unlocks)
- Process one-time payments
- Handle webhooks for payment confirmation
- Unlock cosmetics after successful payment

**Available Tools** (need to check):
- ❓ Stripe MCP availability
- Alternative: Stripe API directly

**Stripe API Integration**:
```bash
# Create product
curl https://api.stripe.com/v1/products \
  -u $STRIPE_SECRET_KEY: \
  -d name="Sacred Geometry Theme" \
  -d description="Beautiful cosmic theme unlock"

# Create payment link
curl https://api.stripe.com/v1/payment_links \
  -u $STRIPE_SECRET_KEY: \
  -d "line_items[0][price]=$PRICE_ID" \
  -d "line_items[0][quantity]=1"
```

**Priority**: 🟠 **MEDIUM** - Can launch without, add later

---

### 4. **Analytics MCP** (Low Priority - Privacy-First)

**What We Need**:
- Track page views (aggregate, not individual)
- Monitor principle completion rates
- Measure interactive experience engagement
- **NO user tracking or surveillance**

**Options**:
- **Vercel Analytics** (built-in, privacy-respecting)
- **Plausible MCP** (privacy-first, GDPR compliant)
- **Simple Analytics** (no cookies, privacy-first)

**Recommendation**: **Vercel Analytics** (automatic, privacy-first, zero setup)

**Priority**: 🟢 **LOW** - Nice to have, not required for launch

---

### 5. **Domain/DNS MCP** (Optional - Custom Domain)

**What We Need**:
- Register custom domain (e.g., `hermetic.academy`)
- Configure DNS records
- SSL certificate (automatic with Vercel)

**Options**:
- **Vercel Domains** (simplest, automatic DNS)
- **Cloudflare MCP** (if we want their CDN/DDoS protection)
- **Namecheap/GoDaddy API** (traditional registrars)

**Recommendation**: Use Vercel's free `.vercel.app` domain initially, add custom domain later via Vercel Domains.

**Priority**: 🟢 **LOW** - Can use hermetic-academy.vercel.app

---

### 6. **Error Tracking MCP** (Medium Priority - Production Debugging)

**What We Need**:
- Catch client-side errors
- Track API failures
- Monitor performance issues
- Alert on critical failures

**Options**:
- **Sentry MCP** (industry standard)
- **Vercel Error Tracking** (built-in, simpler)

**Recommendation**: **Vercel Error Tracking** initially (automatic), upgrade to Sentry if needed.

**Priority**: 🟠 **MEDIUM** - Important for production, not required for MVP

---

## 📋 MCP Priority Matrix

### Phase 1: MVP Launch (Required)
1. ✅ **GitHub MCP** - Repository management (DONE)
2. ✅ **Supabase MCP** - Database + Auth (DONE)
3. 🔴 **Vercel MCP/API** - Frontend hosting (CRITICAL NEXT)

### Phase 2: Full Features
4. 🟡 **Email** - Use Supabase SMTP initially
5. 🟠 **Stripe MCP** - Donations for cosmetics

### Phase 3: Production Polish
6. 🟢 **Analytics** - Vercel Analytics (automatic)
7. 🟢 **Error Tracking** - Vercel errors (automatic)
8. 🟢 **Custom Domain** - Vercel Domains (optional)

---

## 🔍 Checking Available MCPs

Let me search current MCP configuration for Vercel support:

**Available in Current Session**:
- ✅ `mcp__github__*` (repository management)
- ✅ `mcp__supabase__*` (database management)
- ✅ `mcp__filesystem__*` (file operations)
- ✅ `mcp__fetch__*` (web requests)
- ❌ `mcp__vercel__*` (NOT FOUND - need to check)

**Action Needed**: Check if Vercel MCP exists or if we need to use Vercel CLI/API directly.

---

## 🛠️ Vercel Deployment Options

### Option A: Vercel MCP (Ideal - If Exists)
```typescript
// Hypothetical - need to verify if available
mcp__vercel__create_project({
  name: "hermetic-academy",
  framework: "nextjs",
  gitRepository: {
    type: "github",
    repo: "HermeticOrmus/hermetic-academy"
  }
})

mcp__vercel__set_env_vars({
  projectId: "...",
  envVars: [
    { key: "NEXT_PUBLIC_SUPABASE_URL", value: "..." },
    { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: "..." }
  ]
})

mcp__vercel__deploy({ projectId: "..." })
```

### Option B: Vercel CLI (Fallback - Works Today)
```bash
# Install Vercel CLI
npm install -g vercel

# Login with token
export VERCEL_TOKEN="vercel_token_here"

# Deploy automatically
vercel --prod --token $VERCEL_TOKEN \
  --env NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL \
  --env NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY \
  --yes
```

### Option C: Vercel API (Full Control)
```bash
# Get Vercel Token: https://vercel.com/account/tokens

# 1. Create project
curl -X POST "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "hermetic-academy",
    "framework": "nextjs",
    "gitRepository": {
      "type": "github",
      "repo": "HermeticOrmus/hermetic-academy"
    }
  }'

# 2. Create deployment
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -d '{
    "name": "hermetic-academy",
    "gitSource": {
      "type": "github",
      "repo": "HermeticOrmus/hermetic-academy",
      "ref": "main"
    },
    "projectSettings": {
      "framework": "nextjs"
    },
    "target": "production"
  }'
```

---

## 🎯 Recommended Autonomous Deployment Flow

### Immediate (This Session)
1. **Get Vercel Token** - Create at https://vercel.com/account/tokens
2. **Use Vercel API** - Most reliable for automation
3. **Set Environment Variables** - Supabase URL + Key
4. **Deploy to Production** - Get live URL

### Near Future (Phase 2)
1. **Configure Supabase SMTP** - Enable password reset emails
2. **Add Stripe Integration** - For donation-based cosmetics
3. **Monitor Vercel Analytics** - Track usage (privacy-first)

### Future Enhancements
1. **Custom Domain** - `hermetic.academy` via Vercel Domains
2. **Sentry Error Tracking** - Advanced debugging
3. **Plausible Analytics** - If we want more detailed (still private) analytics

---

## 📝 Action Items for Full Autonomy

### Required Now
- [ ] **Vercel Token** - Get from https://vercel.com/account/tokens
- [ ] **Vercel API Integration** - Create project + deployment scripts
- [ ] **Environment Variables** - Automate via API

### Optional But Recommended
- [ ] **Supabase SMTP Config** - Enable auth emails
- [ ] **Error Monitoring** - Vercel built-in (automatic)
- [ ] **Analytics Setup** - Vercel Analytics (automatic)

### Future Phases
- [ ] **Stripe Integration** - For cosmetic donations
- [ ] **Custom Domain** - When ready for branding
- [ ] **Advanced Monitoring** - Sentry if needed

---

## 💡 Key Insights

### What Makes Deployment Autonomous?
1. **API-First Tools** - Everything via API calls
2. **Token-Based Auth** - No interactive logins
3. **Environment Variables** - Secrets via env vars, not hardcoded
4. **Idempotent Operations** - Safe to re-run scripts
5. **Verification Steps** - Check each step succeeded

### Vercel is Perfect for This Because:
- ✅ Next.js native support
- ✅ GitHub integration (automatic deployments)
- ✅ Environment variables via API
- ✅ Free tier for personal projects
- ✅ Built-in analytics + error tracking
- ✅ SSL certificates automatic
- ✅ Global CDN included

### Recommended: Vercel API over CLI
**Why?**
- More reliable in scripts (no interactive prompts)
- Better error handling
- Easier to integrate with other automation
- Full control over every parameter

---

## 🚀 Next Steps

1. **You provide**: Vercel token
2. **I automate**: Project creation + deployment via Vercel API
3. **Result**: Live production URL in ~3 minutes
4. **Then**: Sol continues building Phase 2 features

**Ready to get Vercel token and complete the deployment automation?**
