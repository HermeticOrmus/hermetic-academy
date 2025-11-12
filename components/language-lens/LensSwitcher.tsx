'use client';

import { LENSES, getLensById } from '@/lib/constants';
import { useLanguageLens } from '@/lib/hooks/useLanguageLens';
import { useState, useEffect, useRef } from 'react';

export function LensSwitcher({ compact = false }: { compact?: boolean }) {
  const { selectedLens, setLens } = useLanguageLens();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLens = getLensById(selectedLens);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLensChange = (lensId: string) => {
    setLens(lensId);
    setIsOpen(false);
  };

  if (!currentLens) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-border
                   hover:bg-accent transition-colors ${compact ? 'text-sm' : ''}`}
        aria-label="Change language lens"
      >
        <span className={compact ? 'text-xl' : 'text-2xl'}>{currentLens.emoji}</span>
        {!compact && (
          <span className="font-medium">{currentLens.name}</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full ${compact ? 'right-0' : 'left-0'} mt-2
                        bg-popover border border-border rounded-lg shadow-xl z-50
                        min-w-[250px] max-h-[400px] overflow-y-auto`}>
          <div className="p-2">
            {LENSES.map((lens) => (
              <button
                key={lens.id}
                onClick={() => handleLensChange(lens.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left
                           hover:bg-accent transition-colors
                           ${selectedLens === lens.id ? 'bg-accent' : ''}`}
              >
                <span className="text-2xl">{lens.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium">{lens.name}</div>
                  <div className="text-xs text-muted-foreground">{lens.audience}</div>
                </div>
                {selectedLens === lens.id && (
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
