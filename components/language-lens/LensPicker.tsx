'use client';

import { LENSES } from '@/lib/constants';
import { useLanguageLens } from '@/lib/hooks/useLanguageLens';
import { useState } from 'react';

export function LensPicker({ onSelect }: { onSelect?: () => void }) {
  const { setLens, markLensChosen } = useLanguageLens();
  const [hoveredLens, setHoveredLens] = useState<string | null>(null);

  const handleLensSelect = (lensId: string) => {
    setLens(lensId);
    markLensChosen();
    onSelect?.();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your Language
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The 7 Hermetic Principles are universal patterns that show up everywhere—in games, business, nature, sports, and life.
          <br />
          <strong>Choose your language to get started:</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {LENSES.map((lens) => (
          <button
            key={lens.id}
            onClick={() => handleLensSelect(lens.id)}
            onMouseEnter={() => setHoveredLens(lens.id)}
            onMouseLeave={() => setHoveredLens(null)}
            className="group relative p-6 rounded-xl border-2 border-border hover:border-primary
                     transition-all duration-200 hover:shadow-lg hover:scale-105
                     bg-card text-left flex flex-col items-center gap-3"
          >
            <span className="text-5xl">{lens.emoji}</span>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{lens.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{lens.audience}</p>
            </div>

            {/* Hover preview */}
            {hoveredLens === lens.id && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-popover border rounded-lg shadow-xl z-10">
                <p className="text-sm">{lens.description}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">{lens.tone}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't worry—you can switch lenses anytime!
      </p>
    </div>
  );
}
