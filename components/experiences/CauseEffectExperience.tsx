"use client";

import { Principle } from "@/lib/constants";

export default function CauseEffectExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Chain Reaction Simulator
        </h3>
        <p className="text-gray-400">
          Make a choice. Watch consequences cascade. See how small actions create big effects.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Interactive cause-effect simulator coming soon. Choose actions and watch chains of consequences unfold.</p>
          <p className="text-sm text-gray-500">Try this: Think of one small action you took today. What effects did it create? What will those effects create tomorrow?</p>
        </div>
      </div>
    </div>
  );
}
