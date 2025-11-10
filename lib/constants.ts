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
    teenTranslation: "Your mental game determines your rank. Tilt = lose. Focus = win. Same in League, same IRL.",
    description: "Your mindset is your build. Go into any ranked match tilted and you're hardstuck. Same with life—your mental determines what reality raid boss you're facing. Not magic. Just how the game works.",
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
    teenTranslation: "Same mechanics everywhere. Lane phase mirrors teamfight. Your jungle pathing reflects your life strategy. Patterns stack.",
    description: "Every system uses the same mechanics at different scales. How you cs in lane = how you handle IRL goals. Team coordination in WoW raids = how you coordinate projects. Master one level, understand all levels.",
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
    teenTranslation: "Energy is momentum. High energy = aggressive plays. Low energy = defensive rotations. You control the tempo.",
    description: "Everything has momentum and frequency. Aggressive playstyle vs defensive playstyle—same game, different frequency. Tilt is low-frequency chaos. Flow state is high-frequency clarity. You shift the vibe, you shift the game.",
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
    teenTranslation: "Aggro and passive are the same stat (risk). Win streaks and lose streaks both teach. Every strength has a counter.",
    description: "Opposites are just different settings on the same slider. Full tank build vs full damage—both extremes on the survivability spectrum. Understanding both makes you adaptable. Best players slide between poles mid-match.",
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
    teenTranslation: "Can't grind 24/7. Burnout kills your rank harder than one bad game. Clean rotation = peak + rest. Pros know this.",
    description: "Everything runs in cycles—win streaks and lose streaks, grind sessions and cooldowns, meta shifts and off-meta. Fighting the rhythm burns you out. Working with it keeps you climbing. Even Faker takes breaks. This is law.",
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
    teenTranslation: "Every input creates an output. One bad positioning = lost teamfight = lost game. Chain reactions. Nothing is RNG except the loot table.",
    description: "Every action chains into consequences. Miss one cs, lose lane pressure, lose tower, lose map control. Or: ward river, spot jungler, ping team, win fight. Mastering cause-effect means you control the game instead of reacting to it.",
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
    teenTranslation: "Need both modes. Analyze the VOD (logic) + trust your instincts in-game (intuition). Grind + rest. Solo queue + touch grass.",
    description: "Not biological—it's about playstyle balance. Aggressive push (masculine) + patient farm (feminine). Shotcall (masculine) + adapt (feminine). Mechanical skill + game sense. One-tricks lack this. Complete players balance both.",
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
