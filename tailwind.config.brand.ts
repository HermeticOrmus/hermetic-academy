import type { Config } from "tailwindcss";
import { TAILWIND_COLORS, TAILWIND_SHADOWS } from "./lib/brand-colors";

/**
 * Hermetic Academy Tailwind Configuration
 *
 * This configuration aligns with the Hermetic Ormus brand system,
 * using the 7 sacred colors for the 7 Hermetic Principles.
 *
 * To use this configuration:
 * 1. Rename current tailwind.config.ts to tailwind.config.old.ts
 * 2. Rename this file to tailwind.config.ts
 * 3. Run `npm run dev` to see the new colors in action
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Import the complete color system
        ...TAILWIND_COLORS,

        // Legacy cosmic colors (for backward compatibility)
        // Can be gradually phased out
        cosmic: {
          black: "#0F0F0F",
          purple: "#6B46C1",
          gold: "#F59E0B",
          white: "#F5F5F5",
        },

        // Keep existing gray for UI elements
        gray: {
          800: "#1F2937",
          600: "#4B5563",
        },
      },

      fontFamily: {
        // Aligned with Hermetic Ormus brand fonts
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Source Serif Pro", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      boxShadow: {
        // Import realm-colored shadows
        ...TAILWIND_SHADOWS,
      },

      animation: {
        // Sacred animations
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },

      keyframes: {
        'pulse-gold': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 20px 10px rgba(212, 175, 55, 0.3)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },

      backgroundImage: {
        // Sacred gradients
        'realm-gradient-1': 'linear-gradient(135deg, #E63946 0%, #FF6B75 100%)',
        'realm-gradient-2': 'linear-gradient(135deg, #FF6B35 0%, #FF9668 100%)',
        'realm-gradient-3': 'linear-gradient(135deg, #FFD93D 0%, #FFEB8C 100%)',
        'realm-gradient-4': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        'realm-gradient-5': 'linear-gradient(135deg, #4CC9F0 0%, #7DD9F5 100%)',
        'realm-gradient-6': 'linear-gradient(135deg, #9D4EDD 0%, #C18EED 100%)',
        'realm-gradient-7': 'linear-gradient(135deg, #9333EA 0%, #B870F0 100%)',

        // Gold gradients
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        'gold-radial': 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',

        // Void gradients
        'void-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        'void-radial': 'radial-gradient(circle, #1A1A1A 0%, #0A0A0A 100%)',
      },

      spacing: {
        // Sacred geometry proportions
        'golden': '161.8%',
        'golden-sm': '61.8%',
        'golden-lg': '261.8%',
      },

      borderRadius: {
        // Sacred geometry inspired
        'sacred': '12px',
        'gem': '20% 80% 80% 20% / 80% 20% 80% 20%',
      },

      blur: {
        // Mystical blur effects
        'sacred': '60px',
      },

      transitionDuration: {
        // Sacred time intervals
        'sacred': '333ms',
        'mystical': '777ms',
      },
    },
  },
  plugins: [
    // Add any plugins here if needed
  ],
  // Safelist dynamic classes that might be generated
  safelist: [
    // Realm colors (1-7)
    ...Array.from({ length: 7 }, (_, i) => [
      `bg-realm-${i + 1}`,
      `text-realm-${i + 1}`,
      `border-realm-${i + 1}`,
      `shadow-realm-${i + 1}`,
      `bg-realm-${i + 1}-light`,
      `text-realm-${i + 1}-light`,
      `bg-realm-${i + 1}-dark`,
      `text-realm-${i + 1}-dark`,
    ]).flat(),
    // Gradients
    ...Array.from({ length: 7 }, (_, i) => `bg-realm-gradient-${i + 1}`),
  ],
};

export default config;