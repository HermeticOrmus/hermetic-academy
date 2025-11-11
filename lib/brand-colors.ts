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

  // Principle 5: Rhythm - Virtues (Truth - Deep Blue)
  rhythm: {
    primary: "#2563EB",      // Deeper blue (was #4CC9F0)
    secondary: "#3B82F6",    // Medium blue
    dark: "#1E40AF",         // Dark blue
    subtle: "rgba(37, 99, 235, 0.1)",     // 10% - Very subtle backgrounds
    glow: "rgba(37, 99, 235, 0.3)",       // 30% - Glows and shadows
    opacity30: "rgba(37, 99, 235, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(37, 99, 235, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-blue-600 to-blue-500",
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

  // Principle 7: Gender - Thrones (Divine Light Purple - Almost White)
  gender: {
    primary: "#E9D5FF",      // Very light purple, almost white (was #9333EA)
    secondary: "#F3E8FF",    // Even lighter purple
    dark: "#C084FC",         // Medium purple for contrast
    subtle: "rgba(233, 213, 255, 0.1)",    // 10% - Very subtle backgrounds
    glow: "rgba(233, 213, 255, 0.3)",      // 30% - Glows and shadows
    opacity30: "rgba(233, 213, 255, 0.3)",  // 30% - Overlays, glass effects
    opacity60: "rgba(233, 213, 255, 0.6)",  // 60% - Hover states, active elements
    gradient: "from-purple-200 to-purple-100",
    tailwind: "purple"
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
    1: "#E63946",           // Mentalism - Red
    '1-light': "#FF6B75",
    '1-dark': "#B82E38",
    2: "#FF6B35",           // Correspondence - Orange
    '2-light': "#FF9668",
    '2-dark': "#CC5629",
    3: "#FFD93D",           // Vibration - Yellow/Gold
    '3-light': "#FFEB8C",
    '3-dark': "#CCAE31",
    4: "#10B981",           // Polarity - Green
    '4-light': "#34D399",
    '4-dark': "#059669",
    5: "#2563EB",           // Rhythm - Deep Blue (updated)
    '5-light': "#3B82F6",
    '5-dark': "#1E40AF",
    6: "#9D4EDD",           // Cause & Effect - Purple
    '6-light': "#C18EED",
    '6-dark': "#7E3EB1",
    7: "#E9D5FF",           // Gender - Light Purple/Almost White (updated)
    '7-light': "#F3E8FF",
    '7-dark': "#C084FC",
  }
};

/**
 * Export shadow configurations for Tailwind
 */
export const TAILWIND_SHADOWS = {
  'realm-1': `0 4px 12px rgba(230, 57, 70, 0.3)`,      // Mentalism
  'realm-2': `0 4px 12px rgba(255, 107, 53, 0.3)`,     // Correspondence
  'realm-3': `0 4px 12px rgba(255, 217, 61, 0.3)`,     // Vibration
  'realm-4': `0 4px 12px rgba(16, 185, 129, 0.3)`,     // Polarity
  'realm-5': `0 4px 12px rgba(37, 99, 235, 0.3)`,      // Rhythm (updated)
  'realm-6': `0 4px 12px rgba(157, 78, 221, 0.3)`,     // Cause & Effect
  'realm-7': `0 4px 12px rgba(192, 132, 252, 0.4)`,    // Gender (using dark color for shadow)
  'gold': `0 4px 12px rgba(212, 175, 55, 0.3)`,
};