# Hermetic Academy Community Analysis Platform
## Technical Specification & Implementation Plan

**Date**: 2025-11-10
**Status**: Design Complete, Ready for Implementation

---

## 🎯 Core Concept

**"Reddit for Hermetic Analysis"** - A community-driven platform where users analyze movies, games, businesses, relationships, politics, and life situations through the lens of the 7 Hermetic Principles.

**Two Tiers**:
1. **Community Analyses** - Open source, anyone can publish, community curates
2. **Expert Analyses** - Recognized quality examples featured on principle pages

---

## 🎮 Principle-Specific Voting System

**Innovative Feature**: Instead of generic upvote/downvote, users vote on **which specific principles this content helped them LEARN**.

### How It Works

**On Each Analysis/Comment, Users See 7 Principle Voting Buttons:**

```
Did this help you learn:
🧠 Mentalism?        ↑ 234  ↓ 12  "Finally understood Mentalism through this!"
🔄 Correspondence?   ↑ 189  ↓ 8   "Now I see Correspondence everywhere"
⚡ Vibration?        ↑ 267  ↓ 15  "Vibration clicked for me here"
⚖️ Polarity?         ↑ 201  ↓ 22  "This explained Polarity perfectly"
🌊 Rhythm?           ↑ 145  ↓ 31  "Got Rhythm from this example"
🎯 Cause & Effect?   ↑ 312  ↓ 7   "Best Cause & Effect explanation yet"
⚥ Gender?           ↑ 178  ↓ 19  "Gender principle finally makes sense"
```

**Users can upvote/downvote EACH principle independently:**
- ✅ Upvote Mentalism: "This helped me understand Mentalism!"
- ✅ Upvote Cause & Effect: "The causation chain made it clear!"
- ❌ Downvote Gender: "Didn't help me learn Gender principle"
- 🤷 Don't vote on others (neutral/already understood)

### Why This Is Genius

**1. Educational Gamification**
- Forces readers to actually understand each principle
- "Did they demonstrate Correspondence well?" requires knowing what Correspondence IS
- Learning becomes active (evaluate) not passive (consume)

**2. Granular Feedback**
- Authors learn: "I'm strong at Mentalism, weak at Gender"
- Community curates: "This analysis excels at Polarity specifically"
- Trends emerge: "Trump decodes always rate high on Cause & Effect"

**3. Skill Progression Tracking**
- User profiles show principle-specific karma:
  - "Mentalism Master: 2,456 upvotes"
  - "Struggling with Rhythm: 234 upvotes"
- Encourages users to study principles they're weak at
- Creates specialization: "Go to Jane for Polarity analyses"

**4. Discovery & Filtering**
- "Show me the best Correspondence analyses"
- "What's trending in Rhythm this week?"
- "Find analyses where Vibration + Mentalism both score high"
- Enables principle-specific browsing

**5. Competitive Learning**
- Leaderboards per principle
- Badges: "Correspondence Grandmaster" (10K+ principle upvotes)
- Monthly challenges: "Best Gender principle application this month"
- Drives engagement through friendly competition

**6. Quality Curation at Scale**
- Generic upvotes = popularity contest
- Principle-specific votes = expertise curation
- An analysis can be popular (high views) but poorly demonstrate principles (low principle votes)
- Separates entertainment from education

### Implementation Details

**Vote Weighting:**
```typescript
totalScore = sum of all principle upvotes - sum of all principle downvotes

// Example:
Analysis scores:
- Mentalism: +234, -12 = 222
- Correspondence: +189, -8 = 181
- Vibration: +267, -15 = 252
...
Total Score = 222 + 181 + 252 + ... = 1,547
```

**User Karma Calculation:**
```typescript
userKarma = {
  total: sum of all principle upvotes received across all content,
  byPrinciple: {
    mentalism: total mentalism upvotes received,
    correspondence: total correspondence upvotes received,
    // ... etc
  },
  specializations: principles where user has 3x more upvotes than average
}
```

**Sorting Algorithms:**
- **Hot**: Principle votes weighted by recency
- **Top**: Highest principle vote total in timeframe
- **Controversial**: High principle upvotes + high principle downvotes
- **Principle-Specific**: Filter by specific principle scores

### UI/UX Design

**Compact View (Analysis List):**
```
🧠 234  🔄 189  ⚡ 267  ⚖️ 201  🌊 145  🎯 312  ⚥ 178
```

**Expanded View (Individual Analysis):**
```
Rate this analysis on how well it demonstrates each principle:

🧠 Mentalism               [↑ 234] [↓ 12]  88% approval
🔄 Correspondence          [↑ 189] [↓ 8]   96% approval
⚡ Vibration               [↑ 267] [↓ 15]  94% approval
⚖️ Polarity                [↑ 201] [↓ 22]  90% approval
🌊 Rhythm                  [↑ 145] [↓ 31]  82% approval
🎯 Cause & Effect          [↑ 312] [↓ 7]   98% approval ⭐ STRONGEST
⚥ Gender                  [↑ 178] [↓ 19]  90% approval

Your votes: [Mentalism ↑] [Cause & Effect ↑] [Not rated: 5 principles]
```

### Permissions

**Everyone Can:**
- ✅ Read all analyses and comments
- ✅ Vote on principles (requires account)
- ✅ Comment on any analysis (requires account)
- ✅ Reply to comments (nested threads)

**Account Required For:**
- Voting (prevents spam)
- Commenting (prevents spam)
- Submitting analyses

**No Account Required For:**
- Reading everything
- Sharing links
- Browsing community

---

## 🗺️ URL Structure

```
/community
├── /analyses (main feed - all analyses)
├── /analyses/new (submit new analysis)
├── /analyses/[slug] (individual analysis page)
├── /experts (featured expert analyses)
└── /leaderboard (top contributors)
```

**Individual Analysis URL Format**: `/community/analyses/inception-mentalism-reality-layers`

---

## 📊 Data Schema

### Analysis Model
```typescript
interface Analysis {
  id: string;
  slug: string;
  title: string; // "Inception: Reality Layers as Mentalism"
  author: {
    id: string;
    username: string;
    karma: number;
    expertBadge: boolean;
  };
  subject: string; // "Inception (Movie)"
  domain: 'movies' | 'games' | 'business' | 'relationships' | 'politics' | 'life' | 'other';
  principles: ('mentalism' | 'correspondence' | 'vibration' | 'polarity' | 'rhythm' | 'cause-effect' | 'gender')[];

  // Content
  summary: string; // 2-3 sentence hook
  analysis: string; // Full markdown analysis
  insight: string; // Key takeaway
  application: string; // How to apply this in your life

  // Principle-Specific Voting (NEW - Gamifies learning!)
  principleVotes: {
    mentalism: { up: number; down: number; };
    correspondence: { up: number; down: number; };
    vibration: { up: number; down: number; };
    polarity: { up: number; down: number; };
    rhythm: { up: number; down: number; };
    causeEffect: { up: number; down: number; };
    gender: { up: number; down: number; };
  };

  // Overall Community Engagement
  totalUpvotes: number; // Sum of all principle upvotes
  totalDownvotes: number; // Sum of all principle downvotes
  score: number; // totalUpvotes - totalDownvotes
  helpfulCount: number; // "This helped me understand [principle]" clicks
  commentCount: number;

  // Meta
  featured: boolean; // Expert analysis
  commentsOpen: boolean; // Default: true (anyone can comment)
  createdAt: Date;
  updatedAt: Date;

  // Moderation
  reported: boolean;
  reportCount: number;
  moderatorNotes?: string;
}
```

### Comment Model
```typescript
interface Comment {
  id: string;
  analysisId: string;
  author: {
    id: string;
    username: string;
    karma: number;
    expertBadge?: boolean;
  };
  content: string; // Markdown

  // Principle-Specific Voting (NEW - High Value Feature!)
  principleVotes: {
    mentalism: { up: number; down: number; };
    correspondence: { up: number; down: number; };
    vibration: { up: number; down: number; };
    polarity: { up: number; down: number; };
    rhythm: { up: number; down: number; };
    causeEffect: { up: number; down: number; };
    gender: { up: number; down: number; };
  };

  // Overall voting (sum of principle votes)
  totalUpvotes: number;
  totalDownvotes: number;
  score: number;

  // Meta
  createdAt: Date;
  updatedAt: Date;
  parentCommentId?: string; // For nested replies
  isExpertComment: boolean; // Highlighted if from expert

  // Moderation
  reported: boolean;
  reportCount: number;
}
```

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;

  // Reputation
  karma: number; // Total upvotes received across all content
  analysisCount: number;
  commentCount: number;
  helpfulCount: number; // Total "helpful" clicks received

  // Status
  expertBadge: boolean;
  joinedAt: Date;

  // Activity
  upvotedAnalyses: string[]; // Analysis IDs user has upvoted
  downvotedAnalyses: string[]; // Analysis IDs user has downvoted
}
```

---

## 🎨 UI/UX Design

### Main Feed (`/community/analyses`)

```
┌─────────────────────────────────────────────────────────────┐
│ Hermetic Academy / Community / Analyses                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Filter by Principle ▼] [Filter by Domain ▼] [Sort: Hot ▼]│
│  [Submit New Analysis]                                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ↑ 247  Inception: Reality Layers as Mentalism         │ │
│  │ ↓      by @consciousness_seeker • 2 days ago          │ │
│  │                                                        │ │
│  │ 🏷️ Mentalism • Movies                                 │ │
│  │ 💬 45 comments • 🎯 "Helped 189 people"               │ │
│  │                                                        │ │
│  │ Summary: The dream-within-a-dream structure of        │ │
│  │ Inception perfectly demonstrates how mind creates     │ │
│  │ reality across multiple nested layers...              │ │
│  │                                                        │ │
│  │ [Read Full Analysis →]                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ↑ 156  League of Legends: Rhythm in Ranked Climbing  │ │
│  │ ↓      by @gamer_philosopher • 5 days ago ⭐ EXPERT   │ │
│  │                                                        │ │
│  │ 🏷️ Rhythm • Gaming                                    │ │
│  │ 💬 32 comments • 🎯 "Helped 98 people"                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Individual Analysis Page (`/community/analyses/[slug]`)

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Analyses                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──┐  Inception: Reality Layers as Mentalism              │
│  │↑ │  by @consciousness_seeker • 2 days ago               │
│  │247                                                       │
│  │↓ │  🏷️ Mentalism • Movies                               │
│  └──┘  🎯 This helped me understand Mentalism [+1]          │
│                                                              │
│  ═══════════════════════════════════════════════════════   │
│                                                              │
│  ## What I'm Analyzing                                       │
│  Inception (2010) - Christopher Nolan's film about dream    │
│  infiltration and the malleable nature of perceived reality.│
│                                                              │
│  ## The Hermetic Principle                                   │
│  **Mentalism**: "THE ALL is MIND; The Universe is Mental"  │
│                                                              │
│  ## The Analysis                                             │
│  [Full markdown content...]                                  │
│                                                              │
│  ## The Insight                                              │
│  [Key takeaway...]                                           │
│                                                              │
│  ## Real-World Application                                   │
│  [How to use this insight...]                                │
│                                                              │
│  ═══════════════════════════════════════════════════════   │
│                                                              │
│  💬 45 Comments                        [Sort: Top ▼]        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ↑ 23  @dream_weaver • 2 days ago                      │ │
│  │ ↓                                                      │ │
│  │ This is brilliant! The scene where Cobb explains      │ │
│  │ "you never remember the beginning of a dream" is pure│ │
│  │ Mentalism - consciousness creates continuity...       │ │
│  │                                                        │ │
│  │ [Reply]                                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Submit New Analysis (`/community/analyses/new`)

```
┌─────────────────────────────────────────────────────────────┐
│ Submit New Analysis                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  What are you analyzing?                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Inception (Movie)                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Domain                                                      │
│  ○ Movies  ○ Games  ○ Business  ○ Relationships            │
│  ○ Politics  ○ Life Situation  ○ Other                      │
│                                                              │
│  Which Hermetic Principles apply? (select all)              │
│  ☑ Mentalism  ☐ Correspondence  ☐ Vibration  ☐ Polarity   │
│  ☐ Rhythm  ☐ Cause & Effect  ☐ Gender                      │
│                                                              │
│  Analysis Title                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Inception: Reality Layers as Mentalism               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Summary (2-3 sentences to hook readers)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ The dream-within-a-dream structure of Inception      │  │
│  │ perfectly demonstrates how mind creates reality      │  │
│  │ across multiple nested layers...                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Full Analysis (Markdown supported)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ## How the Principle Shows Up                        │  │
│  │ [Your analysis here...]                               │  │
│  │                                                       │  │
│  │ ## The Insight                                        │  │
│  │ [Key takeaway...]                                     │  │
│  │                                                       │  │
│  │ ## Real-World Application                             │  │
│  │ [How to apply this...]                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Preview]  [Submit Analysis]                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Features & Mechanics

### Voting System
- **Upvote**: "+1 to score, +1 karma to author"
- **Downvote**: "-1 to score, -1 karma to author"
- **One vote per user per analysis**
- Score = upvotes - downvotes
- Sorting algorithms use score + recency

### "This Helped Me" Button
- Separate from voting system
- Tracks educational value specifically
- "+1 to helpfulCount, +2 karma to author"
- Displayed prominently: "🎯 Helped 189 people"

### Karma System
- **Earning Karma**:
  - +1 per upvote on analysis
  - +1 per upvote on comment
  - +2 per "helpful" click on analysis
  - +5 for featured expert analysis
- **Losing Karma**:
  - -1 per downvote on analysis/comment
  - -10 if analysis is removed by moderators

### Expert Badge
- **Criteria**:
  - 500+ karma
  - 10+ analyses published
  - 5+ analyses with 50+ upvotes
  - Nominated by community OR selected by admin
- **Benefits**:
  - ⭐ EXPERT badge on all content
  - Analyses eligible for featuring on principle pages
  - Access to expert-only discussion channel

### Sorting Options
- **Hot**: Score / (time since created)^1.5 - trending recent content
- **Top**: Pure score, filter by: today, week, month, year, all time
- **New**: Chronological, newest first
- **Controversial**: High engagement (upvotes + downvotes) but close to 50/50 split

### Filtering
- **By Principle**: Show only analyses tagged with specific principle
- **By Domain**: Show only movies, games, business, etc.
- **Combined**: "Show me Mentalism analyses of Movies"

---

## 🔐 Moderation & Safety

### Report System
- Users can report analyses/comments
- Reasons: Spam, Harassment, Misinformation, Off-topic
- After 5 reports, content is flagged for review
- Moderators can: Remove, Keep, Ban user

### Content Guidelines
**Allowed**:
- Hermetic analysis of any topic
- Disagreement and debate
- Questions and clarifications
- Alternative interpretations

**Not Allowed**:
- Spam or self-promotion
- Harassment or personal attacks
- Misinformation presented as fact
- Content unrelated to Hermetic principles

### User Banning
- Temporary bans: 7 days, 30 days
- Permanent ban for severe violations
- Banned users cannot post/comment/vote

---

## 🎯 Featured Expert Analyses

### Integration with Wiki
Each principle page gets a "Featured Analyses" section:

```markdown
## Featured Community Analyses

**Expert analyses demonstrating deep understanding of Mentalism:**

1. [Inception: Reality Layers as Mentalism](/community/analyses/inception-mentalism-reality-layers)
   - by @consciousness_seeker • 🎯 Helped 189 people

2. [Your Startup Failed Because of Your Mindset](/community/analyses/startup-mindset-mentalism)
   - by @entrepreneur_philosopher • 🎯 Helped 156 people

3. [Depression as Unconscious Mental Creation](/community/analyses/depression-mentalism-responsibility)
   - by @healing_seeker • 🎯 Helped 203 people

[View All Community Analyses of Mentalism →](/community/analyses?principle=mentalism)
```

### Selection Criteria
- **High Quality**: Well-written, clear, insightful
- **Educational**: Helps others understand principle
- **Evidence**: 100+ upvotes OR 50+ "helpful" clicks
- **Expert Author**: Written by expert-badged user
- **Diverse Examples**: Cover different domains

---

## 🚀 Implementation Phases

### Phase 1: MVP (Week 1-2)
**Goal**: Basic posting and viewing

- [ ] Database schema setup (Supabase)
- [ ] User authentication (email + Google OAuth)
- [ ] Create analysis form
- [ ] View individual analysis page
- [ ] Main feed with basic sorting (new/top)
- [ ] Upvote/downvote functionality
- [ ] Comments (single level, no nesting yet)

**Tech Stack**:
- Next.js 14 (App Router)
- Supabase (PostgreSQL database + Auth)
- Tailwind CSS
- React Markdown for analysis display

### Phase 2: Community Features (Week 3-4)
**Goal**: Reddit-like engagement

- [ ] Karma system tracking
- [ ] User profiles (/community/users/[username])
- [ ] "This helped me" button
- [ ] Nested comment replies
- [ ] Filtering by principle/domain
- [ ] Advanced sorting (hot/controversial)
- [ ] Report system (basic)

### Phase 3: Expert System (Week 5-6)
**Goal**: Quality curation

- [ ] Expert badge system
- [ ] Featured analyses on principle pages
- [ ] Expert nomination workflow
- [ ] Leaderboard page
- [ ] Enhanced user profiles
- [ ] Notification system (replies, upvotes, badges)

### Phase 4: Polish & Scale (Week 7-8)
**Goal**: Production ready

- [ ] Moderation dashboard for admins
- [ ] Search functionality (Algolia or similar)
- [ ] Email notifications (optional)
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] SEO optimization (every analysis = SEO content!)

---

## 📁 File Structure

```
app/
├── community/
│   ├── page.tsx                    # Community landing
│   ├── analyses/
│   │   ├── page.tsx                # Main feed
│   │   ├── new/
│   │   │   └── page.tsx            # Submit form
│   │   └── [slug]/
│   │       ├── page.tsx            # Individual analysis
│   │       └── edit/
│   │           └── page.tsx        # Edit analysis
│   ├── experts/
│   │   └── page.tsx                # Featured experts
│   ├── leaderboard/
│   │   └── page.tsx                # Top contributors
│   └── users/
│       └── [username]/
│           └── page.tsx            # User profile

components/
├── community/
│   ├── AnalysisCard.tsx            # Feed item
│   ├── AnalysisFull.tsx            # Full analysis display
│   ├── AnalysisForm.tsx            # Submission form
│   ├── CommentThread.tsx           # Comment display
│   ├── CommentForm.tsx             # Comment input
│   ├── VoteButtons.tsx             # Upvote/downvote
│   ├── HelpfulButton.tsx           # "Helpful" button
│   ├── FilterBar.tsx               # Principle/domain filters
│   ├── SortMenu.tsx                # Sorting dropdown
│   ├── UserBadge.tsx               # Username + karma display
│   └── ExpertBadge.tsx             # Expert indicator

lib/
├── supabase/
│   ├── client.ts                   # Supabase client
│   ├── analyses.ts                 # Analysis CRUD operations
│   ├── comments.ts                 # Comment operations
│   ├── votes.ts                    # Voting operations
│   ├── users.ts                    # User operations
│   └── moderation.ts               # Report/ban operations

types/
└── community.ts                    # TypeScript interfaces
```

---

## 🗄️ Database Schema (Supabase)

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  karma INTEGER DEFAULT 0,
  analysis_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  expert_badge BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analyses
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  domain TEXT NOT NULL,
  principles TEXT[] NOT NULL,

  summary TEXT NOT NULL,
  analysis TEXT NOT NULL,
  insight TEXT,
  application TEXT,

  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,

  featured BOOLEAN DEFAULT FALSE,
  reported BOOLEAN DEFAULT FALSE,
  report_count INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Votes (prevent duplicate voting)
CREATE TABLE votes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL, -- analysis_id or comment_id
  target_type TEXT NOT NULL, -- 'analysis' or 'comment'
  vote_type TEXT NOT NULL, -- 'up' or 'down'
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, target_id)
);

-- Helpful clicks
CREATE TABLE helpful_clicks (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, analysis_id)
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL, -- 'analysis' or 'comment'
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_analyses_score ON analyses(score DESC);
CREATE INDEX idx_analyses_created ON analyses(created_at DESC);
CREATE INDEX idx_analyses_featured ON analyses(featured) WHERE featured = TRUE;
CREATE INDEX idx_analyses_principle ON analyses USING GIN(principles);
CREATE INDEX idx_comments_analysis ON comments(analysis_id);
CREATE INDEX idx_votes_target ON votes(target_id, target_type);
```

---

## 🎨 Design System Integration

**Colors** (using existing Hermetic Academy theme):
- Background: `bg-cosmic-black`
- Cards: `bg-gray-900/30 border border-gray-800`
- Text: `text-white` (headings), `text-gray-300` (body)
- Accent: `text-gold-divine` (links, buttons)
- Upvote: `text-green-500`
- Downvote: `text-red-500`
- Expert badge: `text-gold-radiant`

**Typography**:
- Matches wiki styling
- Markdown rendering uses same prose classes
- Code blocks, lists, quotes all styled consistently

---

## 📈 Success Metrics

### Engagement Metrics
- **Daily Active Users (DAU)**
- **Analyses published per week**
- **Comments per analysis (average)**
- **Upvote/downvote engagement rate**
- **"Helpful" click rate**

### Quality Metrics
- **Expert badge holders (count)**
- **Featured analyses (count)**
- **Average karma of top 10% users**
- **Report rate (low = healthy community)**

### Growth Metrics
- **New users per week**
- **Returning user rate**
- **User retention (30-day, 90-day)**
- **Viral coefficient** (new users from shared analyses)

### SEO Metrics
- **Indexed analyses pages**
- **Organic traffic from analyses**
- **Backlinks from shared analyses**
- **"[Topic] hermetic analysis" search rankings**

---

## 🚢 Launch Strategy

### Soft Launch (Invite-Only, 2 weeks)
1. Invite 20-30 engaged users from existing community
2. Seed with 10 expert analyses (written by Ormus)
3. Gather feedback on UX/features
4. Fix critical bugs
5. Refine content guidelines

### Public Launch
1. Announce on homepage
2. Email announcement to email list
3. Social media posts
4. Create 50 seed analyses to show diversity
5. Weekly featured analysis highlights

### Growth Tactics
1. **SEO Play**: Every analysis = long-tail keyword content
2. **Social Sharing**: "Share your analysis" encourages virality
3. **Expert Recognition**: Badge gamification drives quality
4. **Wiki Integration**: Analyses linked from principle pages
5. **Email Digest**: "Top analyses this week" newsletter

---

## 🛡️ Risk Mitigation

### Problem: Spam/Low Quality Content
**Solution**:
- Karma requirements to post (25 karma minimum)
- Downvote system naturally suppresses low quality
- Report system catches spam
- Moderator review of reported content

### Problem: Toxic Community
**Solution**:
- Clear community guidelines
- Report system with teeth
- Temporary/permanent bans
- Expert badge holders set positive tone

### Problem: Inactive Community
**Solution**:
- Seed with 50+ high-quality analyses
- Ormus + team contribute regularly
- Weekly features to highlight great content
- Email reminders to engaged users

### Problem: Technical Scaling
**Solution**:
- Supabase handles scaling automatically
- Next.js static generation for performance
- CDN for global speed
- Database indexes for query performance

---

## 💡 Future Enhancements (Post-Launch)

1. **Analysis Collections**: Users can create curated collections
2. **Following System**: Follow favorite analysts
3. **Private Messaging**: Direct discussion between users
4. **Markdown Templates**: Starter templates for different domains
5. **Video Analyses**: Support video uploads (YouTube embeds)
6. **Collaborative Analyses**: Multiple authors co-write
7. **Translation System**: Community translates analyses
8. **Mobile App**: Native iOS/Android experience
9. **API Access**: Developers can build on platform
10. **Bounty System**: Reward users for analyzing specific topics

---

## ✅ Ready to Build

**Decision made**: `/community/analyses` architecture with Reddit-style mechanics

**Phase 1 MVP** can be built in 1-2 weeks and provide immediate value.

**Next step**: Start implementation with database schema + basic posting/viewing.

---

**Created**: 2025-11-10
**Status**: Complete Specification, Ready for Development
**Owner**: Hermetic Ormus
