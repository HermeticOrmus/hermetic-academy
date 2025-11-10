/**
 * The 7 Hermetic Principles - Complete Data
 *
 * These constants define everything about each principle:
 * - Core teaching (ancient wisdom)
 * - Teen-friendly translation
 * - Interactive experience description
 * - Visual identity (colors, icons)
 */

export interface Principle {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  ancientTruth: string;
  teenTranslation: string;
  description: string;
  experienceType: string;
  experienceDescription: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  icon: string; // Icon identifier for components
  keywords: string[];
}

export const PRINCIPLES: Principle[] = [
  {
    id: 1,
    slug: "mentalism",
    title: "Mentalism",
    subtitle: "The All is Mind",
    ancientTruth: "The Universe is Mental—held in the Mind of THE ALL. Reality is a mental creation.",
    teenTranslation: "Your thoughts shape your reality. Change your mind, change your world.",
    description: "Everything begins in consciousness. The thoughts you hold create the reality you experience. Not instantly, not magically—but through focus, attention, and the cascading effects of what you choose to think about.",
    experienceType: "Mind Map Builder",
    experienceDescription: "Create a mind map starting with a single thought. Watch how one idea connects to another, then another. See how changing a core belief reshapes everything connected to it.",
    color: {
      primary: "#8B5CF6", // Purple
      secondary: "#A78BFA",
      gradient: "from-purple-600 to-purple-400",
    },
    icon: "brain-circuit",
    keywords: ["consciousness", "thoughts", "reality", "mind", "creation", "focus"],
  },
  {
    id: 2,
    slug: "correspondence",
    title: "Correspondence",
    subtitle: "As Above, So Below",
    ancientTruth: "As above, so below; as below, so above. Patterns repeat across all scales of existence.",
    teenTranslation: "Same patterns everywhere—atoms like solar systems, cells like cities. Micro mirrors macro.",
    description: "The same patterns appear at every level of reality. How you organize your room reflects how you organize your mind. How ants build colonies mirrors how neurons connect. Understanding one scale helps you understand all scales.",
    experienceType: "Fractal Zoom Explorer",
    experienceDescription: "Zoom from atomic to cosmic scales. See the same geometric patterns repeat: spirals in galaxies, in hurricanes, in seashells, in DNA. Watch how structure mirrors across magnitudes.",
    color: {
      primary: "#06B6D4", // Cyan
      secondary: "#22D3EE",
      gradient: "from-cyan-600 to-cyan-400",
    },
    icon: "nested-circles",
    keywords: ["patterns", "fractals", "scales", "mirroring", "microcosm", "macrocosm"],
  },
  {
    id: 3,
    slug: "vibration",
    title: "Vibration",
    subtitle: "Nothing Rests",
    ancientTruth: "Nothing rests; everything moves; everything vibrates. Different rates of vibration create different forms.",
    teenTranslation: "You're vibrating right now. So is everything else. Different vibes = different experiences.",
    description: "Everything is in constant motion at different frequencies. Matter is vibrating energy. Thoughts are vibrations. Emotions are vibrations. Change your frequency, change what you attract and experience.",
    experienceType: "Frequency Visualizer",
    experienceDescription: "Use your microphone to see sound waves as visual patterns. Watch how different frequencies create different shapes. Play with tones and watch reality respond in real-time.",
    color: {
      primary: "#F59E0B", // Amber/Gold
      secondary: "#FBBF24",
      gradient: "from-amber-600 to-amber-400",
    },
    icon: "waveform",
    keywords: ["frequency", "energy", "motion", "vibrations", "resonance", "sound"],
  },
  {
    id: 4,
    slug: "polarity",
    title: "Polarity",
    subtitle: "Everything is Dual",
    ancientTruth: "Everything is Dual; everything has poles. Opposites are identical in nature but different in degree.",
    teenTranslation: "Hot and cold are the same thing (temperature). Love and hate closer than you think. See both sides.",
    description: "Opposites aren't separate—they're different degrees of the same thing. Light and darkness are both light at different intensities. Every quality contains its opposite. Understanding both sides gives you mastery.",
    experienceType: "Perspective Flip Game",
    experienceDescription: "Explore real situations from opposite viewpoints. See how the same event looks completely different from each side. Practice moving your consciousness between poles to find balance.",
    color: {
      primary: "#10B981", // Green
      secondary: "#34D399",
      gradient: "from-green-600 to-green-400",
    },
    icon: "yin-yang",
    keywords: ["duality", "opposites", "balance", "perspective", "poles", "spectrum"],
  },
  {
    id: 5,
    slug: "rhythm",
    title: "Rhythm",
    subtitle: "Everything Flows",
    ancientTruth: "Everything flows out and in; everything has its tides. The pendulum-swing manifests in everything.",
    teenTranslation: "Life has seasons. You can't bloom 24/7. Rest is part of growth. Honor the cycles.",
    description: "Everything moves in cycles—rise and fall, growth and rest, expansion and contraction. Fighting natural rhythms causes suffering. Working with them creates flow. Even your worst moments will pass; so will your best. This is law.",
    experienceType: "Cycle Tracker",
    experienceDescription: "Visualize natural cycles: day/night, seasons, moon phases, energy levels. Track your own rhythms (sleep, focus, mood) and see how they sync with larger patterns.",
    color: {
      primary: "#3B82F6", // Blue
      secondary: "#60A5FA",
      gradient: "from-blue-600 to-blue-400",
    },
    icon: "sine-wave",
    keywords: ["cycles", "rhythm", "seasons", "flow", "tides", "pendulum"],
  },
  {
    id: 6,
    slug: "cause-effect",
    title: "Cause & Effect",
    subtitle: "Every Cause Has Its Effect",
    ancientTruth: "Every Cause has its Effect; every Effect has its Cause. Nothing happens by chance.",
    teenTranslation: "Your choices matter. Small actions create big consequences (good or bad). Nothing is random.",
    description: "Everything is connected in chains of cause and effect. Your actions ripple outward, creating effects you may not see immediately. Becoming conscious of these chains gives you power to shape outcomes.",
    experienceType: "Chain Reaction Simulator",
    experienceDescription: "Make a small choice. Watch it cascade into consequences. See how one action triggers another, then another. Replay scenarios with different starting choices to understand your power.",
    color: {
      primary: "#EF4444", // Red
      secondary: "#F87171",
      gradient: "from-red-600 to-red-400",
    },
    icon: "chain-links",
    keywords: ["causality", "consequences", "ripples", "karma", "actions", "chain"],
  },
  {
    id: 7,
    slug: "gender",
    title: "Gender",
    subtitle: "Gender is in Everything",
    ancientTruth: "Gender is in everything; everything has its Masculine and Feminine Principles. Balance creates generation.",
    teenTranslation: "Everyone has both energies. Logic + intuition. Doing + being. Balance both = real power.",
    description: "Not about biological sex—about energy types. Masculine: active, analytical, structured. Feminine: receptive, intuitive, flowing. Everything contains both. Balanced integration creates wholeness and creative power.",
    experienceType: "Balance Visualizer",
    experienceDescription: "Explore activities and qualities as masculine or feminine energies. Drag them onto a balance scale. See how different situations require different balances. Find your personal equilibrium.",
    color: {
      primary: "#EC4899", // Pink
      secondary: "#F472B6",
      gradient: "from-pink-600 to-pink-400",
    },
    icon: "balance-scale",
    keywords: ["masculine", "feminine", "balance", "energy", "integration", "wholeness"],
  },
];

/**
 * Get a principle by ID
 */
export function getPrincipleById(id: number): Principle | undefined {
  return PRINCIPLES.find((p) => p.id === id);
}

/**
 * Get a principle by slug
 */
export function getPrincipleBySlug(slug: string): Principle | undefined {
  return PRINCIPLES.find((p) => p.slug === slug);
}

/**
 * Get next principle (circular)
 */
export function getNextPrinciple(currentId: number): Principle {
  const nextId = currentId === 7 ? 1 : currentId + 1;
  return PRINCIPLES[nextId - 1];
}

/**
 * Get previous principle (circular)
 */
export function getPrevPrinciple(currentId: number): Principle {
  const prevId = currentId === 1 ? 7 : currentId - 1;
  return PRINCIPLES[prevId - 1];
}

/**
 * Get user-friendly progress text
 */
export function getProgressText(completed: number[]): string {
  const count = completed.length;
  if (count === 0) return "Begin your journey";
  if (count === 7) return "Journey complete! 🌟";
  return `${count} of 7 principles explored`;
}
