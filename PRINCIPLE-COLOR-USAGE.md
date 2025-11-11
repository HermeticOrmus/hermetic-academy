# 🎨 Hermetic Principle Color Usage Guide

**Version:** 1.0
**Date:** 2025-11-11
**Purpose:** Ensure consistent color presence for all 7 Hermetic Principles across the entire Hermetic Academy

---

## 🌟 Core Philosophy

**"Anytime we see these principles, these colors are present at some level in some way."**

Every interaction with a principle should carry its sacred color signature. This creates:
- **Instant Recognition** - Users subconsciously associate colors with principles
- **Memory Enhancement** - Color-coding aids learning and recall
- **Visual Coherence** - Consistent experience across all touchpoints
- **Sacred Connection** - Colors carry energetic meaning

---

## 📊 Opacity Levels & Their Uses

### **100% Opacity (Full Color)**
**Use for:** Primary actions, headlines, active states
```css
background: var(--principle-primary);    /* #E63946 for Mentalism */
color: var(--principle-primary);
border-color: var(--principle-primary);
```

**Examples:**
- Principle title headers
- Active navigation items
- Primary CTAs for that principle
- Selected states
- Progress indicators when complete

### **60% Opacity (Semi-Transparent)**
**Use for:** Interactive elements, hover states, medium emphasis
```css
background: var(--principle-opacity60);  /* rgba(230, 57, 70, 0.6) for Mentalism */
```

**Examples:**
- Hover overlays on cards
- Semi-transparent panels
- Active but not primary elements
- Glass-morphism effects
- Loading states
- Disabled but visible buttons

### **30% Opacity (Light Touch)**
**Use for:** Backgrounds, overlays, shadows, glows
```css
background: var(--principle-opacity30);  /* rgba(230, 57, 70, 0.3) for Mentalism */
background: var(--principle-glow);       /* Same as opacity30, for shadows */
```

**Examples:**
- Card backgrounds
- Section backgrounds
- Shadow/glow effects
- Overlay screens
- Divider lines
- Watermarks

### **10% Opacity (Very Subtle)**
**Use for:** Page backgrounds, very light touches
```css
background: var(--principle-subtle);     /* rgba(230, 57, 70, 0.1) for Mentalism */
```

**Examples:**
- Full page backgrounds
- Subtle section differentiation
- Hover state on white backgrounds
- Alternating row colors in tables
- Very light borders

---

## 🎯 Implementation Patterns

### Pattern 1: Principle Cards
```tsx
// Every principle card should have its color at multiple levels
<div className="principle-card" style={{
  backgroundColor: principleColor.subtle,        // 10% - Base background
  borderColor: principleColor.opacity30,         // 30% - Border
}}>
  <div className="card-header" style={{
    backgroundColor: principleColor.opacity30,   // 30% - Header background
  }}>
    <h3 style={{ color: principleColor.primary }}>  {/* 100% - Title */}
      {principle.title}
    </h3>
  </div>

  <div className="card-body">
    <div className="principle-icon" style={{
      backgroundColor: principleColor.opacity60,  // 60% - Icon background
      boxShadow: `0 4px 12px ${principleColor.glow}` // 30% - Glow
    }}>
      {/* Icon */}
    </div>
  </div>

  <button className="learn-more" style={{
    backgroundColor: principleColor.primary,     // 100% - CTA
  }}>
    Explore {principle.title}
  </button>
</div>
```

### Pattern 2: Principle Pages
```tsx
// Full principle page should be bathed in its color
<div className="principle-page">
  {/* Background gradient using principle color */}
  <div style={{
    background: `linear-gradient(180deg,
      ${principleColor.subtle} 0%,           // 10% at top
      transparent 50%,
      ${principleColor.subtle} 100%)`        // 10% at bottom
  }}>

    {/* Hero section with stronger presence */}
    <section className="hero" style={{
      backgroundColor: principleColor.opacity30,  // 30% overlay
      borderBottom: `2px solid ${principleColor.primary}` // 100% accent
    }}>
      <h1 style={{ color: principleColor.primary }}>
        {principle.title}
      </h1>
    </section>

    {/* Content sections with varied opacity */}
    <section className="content">
      {/* Highlight boxes */}
      <div className="highlight" style={{
        backgroundColor: principleColor.subtle,   // 10% background
        borderLeft: `4px solid ${principleColor.primary}` // 100% accent
      }}>
        Key insight here...
      </div>

      {/* Interactive elements */}
      <div className="interactive-demo" style={{
        backgroundColor: principleColor.opacity30, // 30% background
      }}>
        {/* Demo content */}
      </div>
    </section>
  </div>
</div>
```

### Pattern 3: Navigation & Menus
```tsx
// Principle navigation should always show color hints
<nav className="principle-nav">
  {principles.map(p => (
    <a
      href={`/principles/${p.slug}`}
      className={activeId === p.id ? 'active' : ''}
      style={{
        // Inactive: subtle hint
        backgroundColor: activeId !== p.id
          ? p.color.subtle                    // 10% when inactive
          : p.color.opacity30,                 // 30% when active

        // Border always present
        borderLeft: `3px solid ${
          activeId === p.id
            ? p.color.primary                 // 100% when active
            : p.color.opacity30                // 30% when inactive
        }`,

        // Text color
        color: activeId === p.id
          ? p.color.primary                   // 100% when active
          : 'inherit'
      }}
      onMouseEnter={(e) => {
        // Hover state
        e.currentTarget.style.backgroundColor = p.color.opacity30; // 30%
      }}
      onMouseLeave={(e) => {
        // Return to default
        e.currentTarget.style.backgroundColor =
          activeId === p.id ? p.color.opacity30 : p.color.subtle;
      }}
    >
      <span className="principle-number" style={{
        color: p.color.primary                // Always 100% for number
      }}>
        {p.id}
      </span>
      <span>{p.title}</span>
    </a>
  ))}
</nav>
```

### Pattern 4: Tags & Badges
```tsx
// Principle tags should always be recognizable
<div className="principle-tags">
  {usedPrinciples.map(p => (
    <span
      className="tag"
      style={{
        backgroundColor: p.color.opacity30,    // 30% background
        color: p.color.primary,                // 100% text
        border: `1px solid ${p.color.opacity60}` // 60% border
      }}
    >
      {p.title}
    </span>
  ))}
</div>
```

### Pattern 5: Progress Indicators
```tsx
// Show completion with color intensity
<div className="principle-progress">
  {principles.map(p => {
    const isComplete = completedIds.includes(p.id);
    const isInProgress = currentId === p.id;

    return (
      <div
        className="progress-item"
        style={{
          // Base state
          backgroundColor: p.color.subtle,      // 10% always present

          // Progress state
          ...(isInProgress && {
            backgroundColor: p.color.opacity30,  // 30% in progress
            boxShadow: `0 0 20px ${p.color.glow}` // 30% glow
          }),

          // Complete state
          ...(isComplete && {
            backgroundColor: p.color.primary,    // 100% when complete
          })
        }}
      >
        <span style={{
          color: isComplete ? 'white' : p.color.primary
        }}>
          {p.id}
        </span>
      </div>
    );
  })}
</div>
```

---

## 🎨 Color Presence Rules

### Rule 1: Never Colorless
**Every principle reference must have its color present**
- Minimum: 10% opacity background
- Never just gray/neutral when discussing a principle

### Rule 2: Intensity = Importance
**Color intensity should match content importance**
- 100% = Primary focus (titles, CTAs, active states)
- 60% = Interactive/important (hovers, semi-active)
- 30% = Supporting/ambient (backgrounds, glows)
- 10% = Subtle presence (page backgrounds)

### Rule 3: Multiple Layers
**Use multiple opacity levels in the same component**
- Creates depth and visual hierarchy
- Example: 10% background + 30% border + 100% title

### Rule 4: Transitions
**Smooth transitions between opacity levels**
```css
.principle-element {
  transition: background-color 0.3s ease;
}
```

### Rule 5: Accessibility
**Ensure sufficient contrast**
- Light text on 60%+ backgrounds
- Dark text on 30% or less backgrounds
- Always test with accessibility tools

---

## 📱 Responsive Considerations

### Mobile (Small Screens)
- Increase opacity slightly for better visibility
- 10% → 15%, 30% → 35%, etc.

### Dark Mode
- Reduce opacity for better contrast
- 60% → 50%, 30% → 25%

### High Contrast Mode
- Fallback to solid colors
- Use borders instead of backgrounds

---

## 🔧 Technical Implementation

### CSS Custom Properties
```css
/* Add to your global CSS */
.principle-mentalism {
  --color-primary: #E63946;
  --color-subtle: rgba(230, 57, 70, 0.1);
  --color-glow: rgba(230, 57, 70, 0.3);
  --color-opacity30: rgba(230, 57, 70, 0.3);
  --color-opacity60: rgba(230, 57, 70, 0.6);
}

/* Usage */
.principle-card {
  background: var(--color-subtle);
  border: 2px solid var(--color-opacity30);
}

.principle-card:hover {
  background: var(--color-opacity30);
  box-shadow: 0 4px 20px var(--color-glow);
}
```

### React Component Example
```tsx
import { getPrincipleColorById } from '@/lib/brand-colors';

function PrincipleElement({ principleId, children }) {
  const colors = getPrincipleColorById(principleId);

  return (
    <div
      className="principle-element"
      style={{
        '--principle-primary': colors.primary,
        '--principle-subtle': colors.subtle,
        '--principle-opacity30': colors.opacity30,
        '--principle-opacity60': colors.opacity60,
        '--principle-glow': colors.glow,
      }}
    >
      {children}
    </div>
  );
}
```

### Tailwind Utilities
```tsx
// Dynamic Tailwind classes with safelist
<div className={`
  bg-realm-${principleId}/10     /* 10% opacity */
  hover:bg-realm-${principleId}/30  /* 30% on hover */
  border-realm-${principleId}/60    /* 60% border */
  text-realm-${principleId}         /* 100% text */
  shadow-realm-${principleId}       /* 30% shadow */
`}>
  {content}
</div>
```

---

## ✅ Implementation Checklist

### Phase 1: Core Components
- [ ] Update PrincipleCard component with all opacity levels
- [ ] Add color presence to PrincipleNavigator
- [ ] Update principle detail pages with color backgrounds
- [ ] Add color to all principle badges/tags

### Phase 2: Navigation & Layout
- [ ] Color-code main navigation when on principle pages
- [ ] Add subtle color to breadcrumbs
- [ ] Color sidebar items based on active principle
- [ ] Add principle color to page headers

### Phase 3: Interactive Elements
- [ ] Color progress indicators
- [ ] Add color to loading states
- [ ] Color tooltips when hovering principle content
- [ ] Add color transitions to all interactions

### Phase 4: Content Areas
- [ ] Background tints for principle sections
- [ ] Color-coded quote boxes
- [ ] Principle-colored dividers
- [ ] Color highlights in text

### Phase 5: Micro-Interactions
- [ ] Cursor color changes (where supported)
- [ ] Selection color based on principle
- [ ] Focus rings in principle colors
- [ ] Scroll indicators with principle colors

---

## 🎯 Success Metrics

**Visual Consistency**
- No principle appears without its color
- Colors are instantly recognizable
- Smooth transitions between states

**User Experience**
- Colors aid navigation and orientation
- Visual hierarchy is clear
- Accessibility standards met

**Learning Enhancement**
- Users associate colors with principles
- Color aids memory and recall
- Visual system supports understanding

---

## 📝 Quick Reference

| Opacity | Use Case | Example |
|---------|----------|---------|
| **100%** | Primary elements | Titles, CTAs, active states |
| **60%** | Interactive/hover | Hover states, semi-active elements |
| **30%** | Backgrounds/glows | Cards, overlays, shadows |
| **10%** | Subtle presence | Page backgrounds, very light touches |

**Remember:** Every principle, every time, some color presence. This is non-negotiable.

---

*"Color is the keyboard, the eyes are the harmonies, the soul is the piano with many strings."*
**— Wassily Kandinsky**

*Applied to Hermetic Academy:*
*"The 7 colors are the keys, the principles are the harmonies, the student's understanding is the symphony."*