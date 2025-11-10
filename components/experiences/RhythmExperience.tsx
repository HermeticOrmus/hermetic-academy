"use client";

import { Principle } from "@/lib/constants";

export default function RhythmExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Cycle Tracker
        </h3>
        <p className="text-gray-400">
          Track natural rhythms and your personal energy. See how cycles sync.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Calendar-based cycle tracker coming soon. Visualize moon phases, seasons, and personal energy patterns.</p>
          <p className="text-sm text-gray-500">Try this: Notice your energy today. High or low? Check back in a week. Everything flows in cycles.</p>
        </div>
      </div>
    </div>
  );
}
