/**
 * Tone Context
 *
 * WHY: Manages the content style/tone preference across the app
 * Allows users to read Hermetic principles in their preferred metaphor system.
 *
 * DESIGN DECISIONS:
 * - "scholarly" is the BASE tone (source content, neutral academic language)
 * - All other tones are TRANSLATIONS from scholarly to specific metaphor domains
 * - Tone affects TEXT ONLY, not colors/icons/visuals
 * - Translations preserve meaning, change linguistic vessel
 */

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Available tone types
 * - scholarly: Base tone, neutral academic language (source content)
 * - Others: Metaphor-based translations for different audiences
 */
export type ToneType =
  | "scholarly"    // Base tone - neutral, academic
  | "gamer"        // Gaming/esports metaphors
  | "surfer"       // Ocean/wave/flow metaphors
  | "chef"         // Cooking/kitchen metaphors
  | "musician"     // Music/rhythm/harmony metaphors
  | "athlete"      // Sports/training/competition metaphors
  | "entrepreneur" // Business/startup/growth metaphors
  | "artist"       // Creative/visual/expression metaphors
  | "scientist"    // Research/experiment/discovery metaphors
  | "gardener"     // Nature/growth/cultivation metaphors
  | "parent";      // Family/nurturing/teaching metaphors

export interface ToneInfo {
  id: ToneType;
  label: string;
  emoji: string;
  description: string;
  category: "base" | "lifestyle" | "professional" | "creative";
}

export const TONES: Record<ToneType, ToneInfo> = {
  // Base tone
  scholarly: {
    id: "scholarly",
    label: "Scholarly",
    emoji: "📚",
    description: "Classic Hermetic language",
    category: "base",
  },

  // Lifestyle tones
  gamer: {
    id: "gamer",
    label: "Gamer",
    emoji: "🎮",
    description: "Gaming & esports metaphors",
    category: "lifestyle",
  },
  surfer: {
    id: "surfer",
    label: "Surfer",
    emoji: "🏄",
    description: "Ocean & wave metaphors",
    category: "lifestyle",
  },
  athlete: {
    id: "athlete",
    label: "Athlete",
    emoji: "🏃",
    description: "Sports & training metaphors",
    category: "lifestyle",
  },
  gardener: {
    id: "gardener",
    label: "Gardener",
    emoji: "🌱",
    description: "Nature & growth metaphors",
    category: "lifestyle",
  },
  parent: {
    id: "parent",
    label: "Parent",
    emoji: "👨‍👩‍👧",
    description: "Family & nurturing metaphors",
    category: "lifestyle",
  },

  // Professional tones
  chef: {
    id: "chef",
    label: "Chef",
    emoji: "👨‍🍳",
    description: "Cooking & kitchen metaphors",
    category: "professional",
  },
  entrepreneur: {
    id: "entrepreneur",
    label: "Entrepreneur",
    emoji: "🚀",
    description: "Business & startup metaphors",
    category: "professional",
  },
  scientist: {
    id: "scientist",
    label: "Scientist",
    emoji: "🔬",
    description: "Research & experiment metaphors",
    category: "professional",
  },

  // Creative tones
  musician: {
    id: "musician",
    label: "Musician",
    emoji: "🎵",
    description: "Music & harmony metaphors",
    category: "creative",
  },
  artist: {
    id: "artist",
    label: "Artist",
    emoji: "🎨",
    description: "Creative & visual metaphors",
    category: "creative",
  },
};

/** Get tones grouped by category */
export function getTonesByCategory() {
  const categories = {
    base: [] as ToneInfo[],
    lifestyle: [] as ToneInfo[],
    professional: [] as ToneInfo[],
    creative: [] as ToneInfo[],
  };

  Object.values(TONES).forEach((tone) => {
    categories[tone.category].push(tone);
  });

  return categories;
}

/** List of all tone IDs for validation */
export const TONE_IDS = Object.keys(TONES) as ToneType[];

/** Check if a string is a valid tone */
export function isValidTone(value: string): value is ToneType {
  return TONE_IDS.includes(value as ToneType);
}

/** Default tone for new users */
export const DEFAULT_TONE: ToneType = "scholarly";

interface ToneContextType {
  tone: ToneType;
  setTone: (tone: ToneType) => void;
  toneInfo: ToneInfo;
  /** Whether the current tone is the base/source tone */
  isBaseTone: boolean;
}

const ToneContext = createContext<ToneContextType | undefined>(undefined);

const STORAGE_KEY = "hermetic-academy-tone";

export function ToneProvider({ children }: { children: ReactNode }) {
  const [tone, setToneState] = useState<ToneType>(DEFAULT_TONE);
  const [mounted, setMounted] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isValidTone(stored)) {
      setToneState(stored);
    }
  }, []);

  // Save preference to localStorage
  const setTone = (newTone: ToneType) => {
    setToneState(newTone);
    localStorage.setItem(STORAGE_KEY, newTone);
  };

  const contextValue: ToneContextType = {
    tone,
    setTone,
    toneInfo: TONES[tone],
    isBaseTone: tone === "scholarly",
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ToneContext.Provider value={{ ...contextValue, tone: DEFAULT_TONE, toneInfo: TONES[DEFAULT_TONE] }}>
        {children}
      </ToneContext.Provider>
    );
  }

  return (
    <ToneContext.Provider value={contextValue}>
      {children}
    </ToneContext.Provider>
  );
}

export function useTone() {
  const context = useContext(ToneContext);
  if (context === undefined) {
    throw new Error("useTone must be used within a ToneProvider");
  }
  return context;
}
