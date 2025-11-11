/**
 * Hermetic Brand Color System
 *
 * Unified color system shared between Hermetic Ormus and Hermetic Academy.
 * The 7 Hermetic Principles use the first 7 colors from the 9 Angelic Realms.
 *
 * Color progression represents spiritual ascension:
 * Red (root/foundation) → Violet (crown/integration)
 */

export interface ColorSet {
  primary: string;
  secondary: string;
  dark: string;
  subtle: string;        // 10% opacity (very subtle backgrounds)
  glow: string;          // 30% opacity (glows and shadows)
  opacity30: string;     // 30% opacity (overlays, disabled states)
  opacity60: string;     // 60% opacity (hover states, semi-transparent elements)
  gradient: string;
  tailwind: string;
}

export interface PrincipleColorMap {
  mentalism: ColorSet;
  correspondence: ColorSet;
  vibration: ColorSet;
  polarity: ColorSet;
  rhythm: ColorSet;
  causeEffect: ColorSet;
  gender: ColorSet;
}

/**
 * The 7 Sacred Colors for the 7 Hermetic Principles
 * Aligned with Hermetic Ormus's 9 Angelic Realms
 */
export const HERMETIC_COLORS: PrincipleColorMap = {
  // Principle 1: Mentalism - Angels (Foundation - Red)
  mentalism: {
    primary: "#E63946",      // Realm 1 primary
    secondary: "#FF6B75",    // Realm 1 light
    dark: "#B82E38",         // Realm 1 dark
    subtle: "rgba(230, 57, 70, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(230, 57, 70, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(230, 57, 70, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(230, 57, 70, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-red-600 to-red-400",
    tailwind: "red"
  },

  // Principle 2: Correspondence - Archangels (Creativity - Orange)
  correspondence: {
    primary: "#FF6B35",      // Realm 2 primary
    secondary: "#FF9668",    // Realm 2 light
    dark: "#CC5629",         // Realm 2 dark
    subtle: "rgba(255, 107, 53, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(255, 107, 53, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(255, 107, 53, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(255, 107, 53, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-orange-600 to-orange-400",
    tailwind: "orange"
  },

  // Principle 3: Vibration - Principalities (Power - Yellow/Gold)
  vibration: {
    primary: "#FFD93D",      // Realm 3 primary
    secondary: "#FFEB8C",    // Realm 3 light
    dark: "#CCAE31",         // Realm 3 dark
    subtle: "rgba(255, 217, 61, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(255, 217, 61, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(255, 217, 61, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(255, 217, 61, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-yellow-600 to-yellow-400",
    tailwind: "yellow"
  },

  // Principle 4: Polarity - Powers (Compassion - Green)
  polarity: {
    primary: "#10B981",      // Realm 4 primary
    secondary: "#34D399",    // Realm 4 light
    dark: "#059669",         // Realm 4 dark
    subtle: "rgba(16, 185, 129, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(16, 185, 129, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(16, 185, 129, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(16, 185, 129, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-green-600 to-green-400",
    tailwind: "green"
  },

  // Principle 5: Rhythm - Virtues (Truth - Blue)
  rhythm: {
    primary: "#4CC9F0",      // Realm 5 primary
    secondary: "#7DD9F5",    // Realm 5 light
    dark: "#3BA1C0",         // Realm 5 dark
    subtle: "rgba(76, 201, 240, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(76, 201, 240, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(76, 201, 240, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(76, 201, 240, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-blue-500 to-blue-400",
    tailwind: "blue"
  },

  // Principle 6: Cause & Effect - Dominions (Vision - Purple)
  causeEffect: {
    primary: "#9D4EDD",      // Realm 6 primary
    secondary: "#C18EED",    // Realm 6 light
    dark: "#7E3EB1",         // Realm 6 dark
    subtle: "rgba(157, 78, 221, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(157, 78, 221, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(157, 78, 221, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(157, 78, 221, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-purple-600 to-purple-400",
    tailwind: "purple"
  },

  // Principle 7: Gender - Thrones (Justice - Violet)
  gender: {
    primary: "#9333EA",      // Realm 7 primary
    secondary: "#B870F0",    // Realm 7 light
    dark: "#7629BB",         // Realm 7 dark
    subtle: "rgba(147, 51, 234, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(147, 51, 234, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(147, 51, 234, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(147, 51, 234, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-violet-600 to-violet-400",
    tailwind: "violet"
  }
};

/**
 * Foundation colors from Hermetic Ormus
 * Used for backgrounds, text, and base UI elements
 */
export const FOUNDATION_COLORS = {
  // Dark spectrum (backgrounds)
  voidBlack: "#0A0A0A",
  shadowDeep: "#1A1A1A",
  shadowMedium: "#2A2A2A",
  shadowLight: "#3A3A3A",

  // Sacred Gold (unified accent across both brands)
  goldDivine: "#D4AF37",
  goldRadiant: "#F4E4C1",
  goldDeep: "#9A7E2E",

  // Text spectrum
  textPrimary: "#FFFFFF",
  textSecondary: "#F5F5F5",
  textTertiary: "#C0C0C0",
  textDisabled: "#808080"
};

/**
 * Get color set for a principle by ID (1-7)
 */
export function getPrincipleColorById(id: number): ColorSet | undefined {
  const principleMap: { [key: number]: keyof PrincipleColorMap } = {
    1: 'mentalism',
    2: 'correspondence',
    3: 'vibration',
    4: 'polarity',
    5: 'rhythm',
    6: 'causeEffect',
    7: 'gender'
  };

  const principleKey = principleMap[id];
  return principleKey ? HERMETIC_COLORS[principleKey] : undefined;
}

/**
 * Get color set for a principle by slug
 */
export function getPrincipleColorBySlug(slug: string): ColorSet | undefined {
  const slugMap: { [key: string]: keyof PrincipleColorMap } = {
    'mentalism': 'mentalism',
    'correspondence': 'correspondence',
    'vibration': 'vibration',
    'polarity': 'polarity',
    'rhythm': 'rhythm',
    'cause-effect': 'causeEffect',
    'gender': 'gender'
  };

  const principleKey = slugMap[slug];
  return principleKey ? HERMETIC_COLORS[principleKey] : undefined;
}

/**
 * Get Tailwind class for principle color
 */
export function getPrincipleTailwindClass(
  principleId: number,
  variant: 'bg' | 'text' | 'border' | 'shadow' = 'bg',
  intensity: 'light' | 'default' | 'dark' = 'default'
): string {
  const color = getPrincipleColorById(principleId);
  if (!color) return '';

  const intensityMap = {
    light: '400',
    default: '600',
    dark: '800'
  };

  if (variant === 'shadow') {
    return `shadow-realm-${principleId}`;
  }

  return `${variant}-${color.tailwind}-${intensityMap[intensity]}`;
}

/**
 * Generate CSS variables for a principle
 * Useful for dynamic styling
 */
export function getPrincipleCSSVars(principleId: number): Record<string, string> {
  const color = getPrincipleColorById(principleId);
  if (!color) return {};

  return {
    '--principle-primary': color.primary,
    '--principle-secondary': color.secondary,
    '--principle-dark': color.dark,
    '--principle-subtle': color.subtle,
    '--principle-glow': color.glow,
    '--principle-opacity30': color.opacity30,
    '--principle-opacity60': color.opacity60,
  };
}

/**
 * Sacred Gem configurations for visual representations
 */
export const PRINCIPLE_GEMS = {
  mentalism: {
    shape: 'triangle',
    name: 'Ruby of Consciousness',
    description: 'Points upward to divine mind'
  },
  correspondence: {
    shape: 'double-pyramid',
    name: 'Carnelian Mirror',
    description: 'As above, so below'
  },
  vibration: {
    shape: 'circle-wave',
    name: 'Citrine Resonator',
    description: 'Eternal vibration and frequency'
  },
  polarity: {
    shape: 'split-gem',
    name: 'Emerald Balance',
    description: 'Duality in unity'
  },
  rhythm: {
    shape: 'flowing-curves',
    name: 'Sapphire Flow',
    description: 'The eternal tide'
  },
  causeEffect: {
    shape: 'chain-links',
    name: 'Amethyst Chain',
    description: 'Every action, every consequence'
  },
  gender: {
    shape: 'balanced-scales',
    name: 'Fluorite Harmony',
    description: 'Divine masculine and feminine'
  }
};

/**
 * Export complete color system for Tailwind config
 */
export const TAILWIND_COLORS = {
  void: {
    black: FOUNDATION_COLORS.voidBlack,
    deep: FOUNDATION_COLORS.shadowDeep,
    medium: FOUNDATION_COLORS.shadowMedium,
    light: FOUNDATION_COLORS.shadowLight,
  },
  gold: {
    divine: FOUNDATION_COLORS.goldDivine,
    radiant: FOUNDATION_COLORS.goldRadiant,
    deep: FOUNDATION_COLORS.goldDeep,
  },
  realm: {
    1: HERMETIC_COLORS.mentalism.primary,
    '1-light': HERMETIC_COLORS.mentalism.secondary,
    '1-dark': HERMETIC_COLORS.mentalism.dark,
    2: HERMETIC_COLORS.correspondence.primary,
    '2-light': HERMETIC_COLORS.correspondence.secondary,
    '2-dark': HERMETIC_COLORS.correspondence.dark,
    3: HERMETIC_COLORS.vibration.primary,
    '3-light': HERMETIC_COLORS.vibration.secondary,
    '3-dark': HERMETIC_COLORS.vibration.dark,
    4: HERMETIC_COLORS.polarity.primary,
    '4-light': HERMETIC_COLORS.polarity.secondary,
    '4-dark': HERMETIC_COLORS.polarity.dark,
    5: HERMETIC_COLORS.rhythm.primary,
    '5-light': HERMETIC_COLORS.rhythm.secondary,
    '5-dark': HERMETIC_COLORS.rhythm.dark,
    6: HERMETIC_COLORS.causeEffect.primary,
    '6-light': HERMETIC_COLORS.causeEffect.secondary,
    '6-dark': HERMETIC_COLORS.causeEffect.dark,
    7: HERMETIC_COLORS.gender.primary,
    '7-light': HERMETIC_COLORS.gender.secondary,
    '7-dark': HERMETIC_COLORS.gender.dark,
  }
};

/**
 * Export shadow configurations for Tailwind
 */
export const TAILWIND_SHADOWS = {
  'realm-1': `0 4px 12px ${HERMETIC_COLORS.mentalism.glow}`,
  'realm-2': `0 4px 12px ${HERMETIC_COLORS.correspondence.glow}`,
  'realm-3': `0 4px 12px ${HERMETIC_COLORS.vibration.glow}`,
  'realm-4': `0 4px 12px ${HERMETIC_COLORS.polarity.glow}`,
  'realm-5': `0 4px 12px ${HERMETIC_COLORS.rhythm.glow}`,
  'realm-6': `0 4px 12px ${HERMETIC_COLORS.causeEffect.glow}`,
  'realm-7': `0 4px 12px ${HERMETIC_COLORS.gender.glow}`,
  'gold': `0 4px 12px rgba(212, 175, 55, 0.3)`,
};