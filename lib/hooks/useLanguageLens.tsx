'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LensContextType {
  selectedLens: string;
  hasChosenLens: boolean;
  lensHistory: string[];
  setLens: (lensId: string) => void;
  markLensChosen: () => void;
  resetLens: () => void;
}

const LensContext = createContext<LensContextType | undefined>(undefined);

const STORAGE_KEY = 'hermetic-lens-preference';
const DEFAULT_LENS = 'universal';

export function LanguageLensProvider({ children }: { children: ReactNode }) {
  const [selectedLens, setSelectedLens] = useState<string>(DEFAULT_LENS);
  const [hasChosenLens, setHasChosenLens] = useState<boolean>(false);
  const [lensHistory, setLensHistory] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSelectedLens(data.selectedLens || DEFAULT_LENS);
        setHasChosenLens(data.hasChosenLens || false);
        setLensHistory(data.lensHistory || []);
      } catch (e) {
        console.error('Failed to parse lens preference', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedLens,
          hasChosenLens,
          lensHistory
        })
      );
    }
  }, [selectedLens, hasChosenLens, lensHistory, isHydrated]);

  const setLens = (lensId: string) => {
    setSelectedLens(lensId);

    // Add to history if not already present
    if (!lensHistory.includes(lensId)) {
      setLensHistory(prev => [...prev, lensId]);
    }
  };

  const markLensChosen = () => {
    setHasChosenLens(true);
  };

  const resetLens = () => {
    setSelectedLens(DEFAULT_LENS);
    setHasChosenLens(false);
    setLensHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    selectedLens,
    hasChosenLens,
    lensHistory,
    setLens,
    markLensChosen,
    resetLens
  };

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export function useLanguageLens() {
  const context = useContext(LensContext);
  if (context === undefined) {
    throw new Error('useLanguageLens must be used within a LanguageLensProvider');
  }
  return context;
}
