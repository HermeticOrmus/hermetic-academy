# Deployment Fix Plan - Remove Gaming Language + Simplify

**Created**: November 2025
**Priority**: URGENT - Current deployment has issues
**Status**: Ready to execute

---

## Issues to Fix

### 1. Gaming Language (Revert to Professional)

**Problem**: Current deployment uses gaming lingo (League, Fortnite, WoW, "Level Up IRL", "Seeker I", etc.)
**Solution**: Revert to professional/philosophical language

**Files to update**:
- `app/page.tsx` - Homepage hero
- `app/layout.tsx` - Meta tags
- `app/game-preview/page.tsx` - Preview page
- `app/heart-preview/page.tsx` - Preview page
- `app/support/page.tsx` - Support messaging

**Changes**:
```
OLD: "Level Up IRL"
NEW: "Master Reality Through Hermetic Wisdom"

OLD: "You've mastered League, Fortnite, WoW. Apply that same skill to reality."
NEW: "Ancient principles. Modern application. Transform how you see reality."

OLD: "Start at Seeker I"
NEW: "Begin Your Journey"

OLD: "AAA polish. Gaming mechanics."
NEW: "Professional platform. Timeless wisdom."
```

### 2. Remove Interactive Mini-Games

**Problem**: Ambitious interactive features (mind map builder, fractal zoom explorer, frequency visualizer) not feasible for current build/budget
**Solution**: Remove all interactive experiences, replace with simple content displays

**Files to simplify/remove**:
- `components/experiences/MentalismExperience.tsx`
- `components/experiences/CorrespondenceExperience.tsx`
- `components/experiences/VibrationExperience.tsx`
- `components/experiences/PolarityExperience.tsx`
- `components/experiences/RhythmExperience.tsx`
- `components/experiences/CauseEffectExperience.tsx`
- `components/experiences/GenderExperience.tsx`
- `components/principles/PrincipleExperience.tsx` (loader component)

**Replace with**:
Simple content section showing:
- Principle description
- Key concepts
- Real-world applications
- Examples

No interactive features, just clean educational content.

### 3. Rename "Wiki" → "The Codex"

**Problem**: "Wiki" feels technical/detached, not aligned with experience
**Solution**: Rename to "The Codex" throughout

**Files to update**:
- `app/wiki/page.tsx` → Keep file path (URL structure) but update all displayed text
- `app/wiki/[...slug]/page.tsx` → Same
- Any navigation references to "wiki"
- Meta tags/descriptions

**Changes**:
```
OLD: "Wiki" / "Knowledge Base"
NEW: "The Codex"

OLD: "Browse the Wiki"
NEW: "Explore the Codex"

OLD: "Wiki Articles"
NEW: "Codex Articles"
```

### 4. Fix Codex Formatting

**Problem**: Missing colors + insufficient spacing for readability
**Solution**: Improve typography and spacing

**Issues**:
- Text colors too dim/uniform (needs hierarchy)
- Insufficient spacing between sections
- Headings not distinct enough
- Need better visual rhythm

**Fixes**:
```css
/* Heading hierarchy */
H1: text-3xl font-bold text-gray-100 mb-6 (main title)
H2: text-2xl font-semibold text-gray-200 mb-4 mt-8 (section headers)
H3: text-xl font-medium text-gray-300 mb-3 mt-6 (subsections)

/* Body text */
Paragraphs: text-gray-400 mb-4 leading-relaxed (readable spacing)
Lists: text-gray-400 space-y-2 ml-4 (clear list items)

/* Section spacing */
Between sections: space-y-8 (generous breathing room)
Between subsections: space-y-6 (clear visual breaks)

/* Colors */
Primary text: text-gray-200
Secondary text: text-gray-400
Links: text-cosmic-purple hover:text-cosmic-gold
Code/emphasis: text-cosmic-gold
```

---

## Execution Order

**Phase 1**: Remove gaming language (highest visibility)
1. `app/page.tsx` - Homepage
2. `app/layout.tsx` - Meta tags
3. Preview pages

**Phase 2**: Simplify interactive features
1. Create simple PrincipleContent component
2. Replace PrincipleExperience with PrincipleContent
3. Remove all /experiences/ components

**Phase 3**: Rename Wiki → Codex
1. Update all displayed text
2. Navigation components
3. Meta tags

**Phase 4**: Fix Codex formatting
1. Update wiki page styles
2. Improve heading hierarchy
3. Add proper spacing

**Phase 5**: Test & Deploy
1. Local testing
2. Build verification
3. Commit changes
4. Deploy to production

---

## Professional Language Replacements

### Homepage

**OLD**:
```
Hero: "Level Up IRL"
Subtitle: "You've mastered League, Fortnite, WoW. Apply that same skill to reality."
Tagline: "Ancient wisdom. Gaming language. AAA polish. Free forever."
CTA: "Start at Seeker I"
```

**NEW**:
```
Hero: "Master Reality Through Hermetic Wisdom"
Subtitle: "Ancient principles meet modern clarity. Transform how you understand yourself and the world."
Tagline: "Seven timeless laws. Infinite applications. Free forever."
CTA: "Begin Your Journey"
```

### Meta Tags

**OLD**:
```
title: "Hermetic Academy | Level Up IRL"
description: "Ancient wisdom for gamers. You've mastered League, Fortnite, WoW. Apply that same skill to reality. AAA gamification. Free forever."
```

**NEW**:
```
title: "Hermetic Academy | Ancient Wisdom, Modern Clarity"
description: "Learn the 7 Hermetic Principles that explain how reality works. Transform your understanding of yourself, others, and the world. Free forever."
```

### Support Page

**OLD**:
```
"Reach More Seekers"
```

**NEW**:
```
"Reach More Truth-Seekers"
```

---

## Simple Content Structure (Replaces Interactive)

Instead of complex interactive experiences, each principle page will have:

```tsx
<PrincipleContent principle={principle}>
  {/* Principle Overview */}
  <section>
    <h2>Understanding {principle.title}</h2>
    <p>{principle.description}</p>
  </section>

  {/* Key Concepts */}
  <section>
    <h2>Key Concepts</h2>
    <ul>
      {principle.keyConcepts.map(concept => (
        <li>{concept}</li>
      ))}
    </ul>
  </section>

  {/* Real-World Applications */}
  <section>
    <h2>How This Appears in Life</h2>
    {principle.examples.map(example => (
      <div>
        <h3>{example.title}</h3>
        <p>{example.description}</p>
      </div>
    ))}
  </section>

  {/* Reflection Prompts */}
  <section>
    <h2>Questions to Contemplate</h2>
    <ul>
      {principle.reflections.map(q => (
        <li>{q}</li>
      ))}
    </ul>
  </section>
</PrincipleContent>
```

Clean, professional, educational. No interactive gimmicks.

---

## Codex Typography Improvements

**Current issues**:
- All text same gray (no hierarchy)
- Tight spacing (hard to read)
- Headings don't stand out

**New structure**:
```tsx
<article className="prose prose-invert max-w-none">
  <div className="space-y-8">
    {/* H1 - Article Title */}
    <h1 className="text-3xl font-bold text-gray-100 border-b border-gray-800 pb-4">
      {title}
    </h1>

    {/* H2 - Major Sections */}
    <h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
      {sectionTitle}
    </h2>

    {/* H3 - Subsections */}
    <h3 className="text-xl font-medium text-gray-300 mt-6 mb-3">
      {subsectionTitle}
    </h3>

    {/* Paragraphs */}
    <p className="text-gray-400 mb-4 leading-relaxed">
      {content}
    </p>

    {/* Lists */}
    <ul className="text-gray-400 space-y-2 ml-6 list-disc">
      <li>{item}</li>
    </ul>

    {/* Links */}
    <a className="text-cosmic-purple hover:text-cosmic-gold transition-colors underline">
      {linkText}
    </a>

    {/* Code/Emphasis */}
    <code className="text-cosmic-gold bg-gray-900 px-2 py-1 rounded text-sm">
      {codeText}
    </code>
  </div>
</article>
```

**Key improvements**:
- Clear heading hierarchy (3 levels, distinct sizes/colors)
- Generous spacing (mb-4, mt-8, space-y-8)
- Color hierarchy (gray-100 → gray-200 → gray-300 → gray-400)
- Readable line-height (leading-relaxed)
- Clear visual breaks between sections

---

## Testing Checklist

**Before commit**:
- [ ] Homepage loads, no gaming language visible
- [ ] All 7 principle pages load without errors
- [ ] Codex pages display with proper formatting
- [ ] Navigation shows "The Codex" instead of "Wiki"
- [ ] No console errors
- [ ] Build completes successfully
- [ ] All pages load in under 2 seconds

**After deploy**:
- [ ] Production homepage correct
- [ ] All principle pages accessible
- [ ] Codex readable and well-formatted
- [ ] No broken links
- [ ] Meta tags updated

---

**Next Steps**: Execute Phase 1 (remove gaming language from homepage)
