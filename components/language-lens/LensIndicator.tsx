'use client';

import { getLensById } from '@/lib/constants';
import { useLanguageLens } from '@/lib/hooks/useLanguageLens';
import Link from 'next/link';

export function LensIndicator({ showSwitch = true }: { showSwitch?: boolean }) {
  const { selectedLens } = useLanguageLens();
  const lens = getLensById(selectedLens);

  if (!lens || selectedLens === 'universal') return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border text-sm">
      <span className="text-lg">{lens.emoji}</span>
      <span className="text-muted-foreground">
        Viewing through <strong>{lens.name}</strong> lens
      </span>
      {showSwitch && (
        <Link href="/lenses" className="text-primary hover:underline ml-2">
          Switch
        </Link>
      )}
    </div>
  );
}
