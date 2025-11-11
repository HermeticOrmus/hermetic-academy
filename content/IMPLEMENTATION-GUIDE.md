# Implementation Guide - Principle Descriptions V2

**Quick Reference**: Exact code changes needed for `lib/constants.ts`

---

## Copy-Paste Ready Replacements

### Principle 1: MENTALISM

```typescript
{
  id: 1,
  slug: "mentalism",
  title: "Mentalism",
  subtitle: "The All is Mind",
  ancientTruth: "The Universe is Mental—held in the Mind of THE ALL. Reality is a mental creation.",
  teenTranslation: "Your mental framework determines what you notice and how you interpret events. Change your lens, change your experience.",
  description: "Your brain filters reality through expectations. Anxious? You notice threats. Curious? You spot opportunities. Same event, different mental filter = different experience. Psychology, not magic.",
  experienceType: "Mind Map Builder",
  experienceDescription: "Create a mind map starting with a single thought. Watch how one idea connects to another, then another. See how changing a core belief reshapes everything connected to it.",
  color: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    gradient: "from-purple-600 to-purple-400",
  },
  icon: "brain-circuit",
  keywords: ["consciousness", "thoughts", "reality", "mind", "creation", "focus"],
}
```

---

### Principle 2: CORRESPONDENCE

```typescript
{
  id: 2,
  slug: "correspondence",
  title: "Correspondence",
  subtitle: "As Above, So Below",
  ancientTruth: "As above, so below; as below, so above. Patterns repeat across all scales of existence.",
  teenTranslation: "Patterns repeat at different scales. How you organize your desk mirrors how you organize your life. Same structure, different size.",
  description: "How you handle small things mirrors how you handle big things. Same patterns at different scales. Fractals prove this mathematically—one equation describes trees, rivers, lungs, galaxies.",
  experienceType: "Fractal Zoom Explorer",
  experienceDescription: "Zoom from atomic to cosmic scales. See the same geometric patterns repeat: spirals in galaxies, in hurricanes, in seashells, in DNA. Watch how structure mirrors across magnitudes.",
  color: {
    primary: "#06B6D4",
    secondary: "#22D3EE",
    gradient: "from-cyan-600 to-cyan-400",
  },
  icon: "nested-circles",
  keywords: ["patterns", "fractals", "scales", "mirroring", "microcosm", "macrocosm"],
}
```

---

### Principle 3: VIBRATION

```typescript
{
  id: 3,
  slug: "vibration",
  title: "Vibration",
  subtitle: "Nothing Rests",
  ancientTruth: "Nothing rests; everything moves; everything vibrates. Different rates of vibration create different forms.",
  teenTranslation: "Nothing is static. Your mood shifts, markets fluctuate, energy cycles between states. Recognizing state changes gives you leverage.",
  description: "Nothing stays still. Your mood shifts, markets cycle, atoms literally vibrate. Recognizing these state changes lets you work with momentum instead of fighting it. Physics + psychology, not magic.",
  experienceType: "Frequency Visualizer",
  experienceDescription: "Use your microphone to see sound waves as visual patterns. Watch how different frequencies create different shapes. Play with tones and watch reality respond in real-time.",
  color: {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    gradient: "from-amber-600 to-amber-400",
  },
  icon: "waveform",
  keywords: ["frequency", "energy", "motion", "vibrations", "resonance", "sound"],
}
```

---

### Principle 4: POLARITY

```typescript
{
  id: 4,
  slug: "polarity",
  title: "Polarity",
  subtitle: "Everything is Dual",
  ancientTruth: "Everything is Dual; everything has poles. Opposites are identical in nature but different in degree.",
  teenTranslation: "Hot and cold are the same thing (temperature) at different intensities. Opposites are degrees on a spectrum, not separate categories.",
  description: "Hot and cold aren't opposites—they're the same thing (temperature) at different levels. Same with emotions, behaviors, traits. Understanding this spectrum makes you adaptable. You can shift.",
  experienceType: "Perspective Flip Game",
  experienceDescription: "Explore real situations from opposite viewpoints. See how the same event looks completely different from each side. Practice moving your consciousness between poles to find balance.",
  color: {
    primary: "#10B981",
    secondary: "#34D399",
    gradient: "from-green-600 to-green-400",
  },
  icon: "yin-yang",
  keywords: ["duality", "opposites", "balance", "perspective", "poles", "spectrum"],
}
```

---

### Principle 5: RHYTHM

```typescript
{
  id: 5,
  slug: "rhythm",
  title: "Rhythm",
  subtitle: "Everything Flows",
  ancientTruth: "Everything flows out and in; everything has its tides. The pendulum-swing manifests in everything.",
  teenTranslation: "Everything moves in cycles. Day/night, seasons, your energy, attention span. Fighting natural rhythms burns you out. Working with them creates flow.",
  description: "Everything cycles: day/night, seasons, your energy (90-min focus periods), markets. Your biology has built-in rhythms. Fighting them wastes energy. Working with them multiplies output. Science.",
  experienceType: "Cycle Tracker",
  experienceDescription: "Visualize natural cycles: day/night, seasons, moon phases, energy levels. Track your own rhythms (sleep, focus, mood) and see how they sync with larger patterns.",
  color: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    gradient: "from-blue-600 to-blue-400",
  },
  icon: "sine-wave",
  keywords: ["cycles", "rhythm", "seasons", "flow", "tides", "pendulum"],
}
```

---

### Principle 6: CAUSE & EFFECT

```typescript
{
  id: 6,
  slug: "cause-effect",
  title: "Cause & Effect",
  subtitle: "Every Cause Has Its Effect",
  ancientTruth: "Every Cause has its Effect; every Effect has its Cause. Nothing happens by chance.",
  teenTranslation: "Every action creates ripples. Small choices compound over time. Understanding cause-effect chains gives you predictive power.",
  description: "Actions chain into consequences. Skip breakfast → low focus → missed deadline → stress → poor sleep. Small causes compound into big effects. Understanding chains gives you control, not just reaction.",
  experienceType: "Chain Reaction Simulator",
  experienceDescription: "Make a small choice. Watch it cascade into consequences. See how one action triggers another, then another. Replay scenarios with different starting choices to understand your power.",
  color: {
    primary: "#EF4444",
    secondary: "#F87171",
    gradient: "from-red-600 to-red-400",
  },
  icon: "chain-links",
  keywords: ["causality", "consequences", "ripples", "karma", "actions", "chain"],
}
```

---

### Principle 7: GENDER

```typescript
{
  id: 7,
  slug: "gender",
  title: "Gender",
  subtitle: "Gender is in Everything",
  ancientTruth: "Gender is in everything; everything has its Masculine and Feminine Principles. Balance creates generation.",
  teenTranslation: "Different situations need different modes. Active vs receptive. Analytical vs intuitive. Structured vs flowing. Balance both instead of favoring one.",
  description: "Not biological—cognitive modes. Your brain has two systems: fast/intuitive (System 1) and slow/analytical (System 2). Different tasks need different modes. Best results? Know when to use which.",
  experienceType: "Balance Visualizer",
  experienceDescription: "Explore activities and qualities as masculine or feminine energies. Drag them onto a balance scale. See how different situations require different balances. Find your personal equilibrium.",
  color: {
    primary: "#EC4899",
    secondary: "#F472B6",
    gradient: "from-pink-600 to-pink-400",
  },
  icon: "balance-scale",
  keywords: ["masculine", "feminine", "balance", "energy", "integration", "wholeness"],
}
```

---

## Testing Checklist

After implementing, verify:

- [ ] All descriptions display correctly in UI cards
- [ ] Character limits don't cause overflow
- [ ] Tone is consistent across all 7 principles
- [ ] No gaming jargon in main descriptions
- [ ] Scientific grounding feels natural, not forced
- [ ] Casey (skeptical teen) would respect this
- [ ] Tyler (gamer) still finds value
- [ ] Sam (spiritual seeker) isn't alienated

---

## A/B Test Recommendation

If you want to validate before full commit:

**Test Group A (Control)**: Original gaming-heavy descriptions
**Test Group B (Treatment)**: New universal descriptions

**Metrics to Track**:
1. Time on principle page (engagement)
2. Completion rate (did they finish reading?)
3. Quiz scores (understanding)
4. Sharing rate (resonance)
5. Persona distribution (who drops off?)

**Expected Results**:
- Group B should show higher engagement across non-gamer personas
- Group B should maintain gamer engagement (not drop)
- Group B should show better comprehension scores
- Group B should have lower skeptic drop-off rate

**Decision Threshold**: If Group B shows 10%+ improvement on any metric without hurting others, ship it.

---

## Rollback Plan

If user feedback is negative:

1. Keep V2 in `content/principle-descriptions-v2.md`
2. Revert `lib/constants.ts` to git history
3. Analyze feedback for specific pain points
4. Iterate V2 based on feedback
5. Test again with smaller cohort

---

## File Locations

**Main Implementation**: C:\Users\ormus\projects\01-ACTIVE\hermetic-academy\lib\constants.ts
**V2 Descriptions**: C:\Users\ormus\projects\01-ACTIVE\hermetic-academy\content\principle-descriptions-v2.md
**This Guide**: C:\Users\ormus\projects\01-ACTIVE\hermetic-academy\content\IMPLEMENTATION-GUIDE.md

---

**Ready to ship.** 🚀
