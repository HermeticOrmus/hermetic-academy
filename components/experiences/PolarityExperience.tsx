"use client";

import { Principle } from "@/lib/constants";

export default function PolarityExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Perspective Flip Game
        </h3>
        <p className="text-gray-400">
          See situations from opposing viewpoints. Same facts, completely different stories.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Interactive perspective switcher coming soon. Slide between opposing views and see how they're connected.</p>
          <p className="text-sm text-gray-500">Try this: Think of something you dislike. Now find one positive aspect of it. Opposites are closer than they appear.</p>
        </div>
      </div>
    </div>
  );
}
