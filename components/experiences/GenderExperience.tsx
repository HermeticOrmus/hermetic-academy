"use client";

import { Principle } from "@/lib/constants";

export default function GenderExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Balance Visualizer
        </h3>
        <p className="text-gray-400">
          Explore masculine and feminine energies. See how balance creates power.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Interactive balance scale coming soon. Drag activities to see which energy they embody.</p>
          <p className="text-sm text-gray-500">Try this: Think about your day. How much time in action (masculine) vs. reflection (feminine)? Balance = wholeness.</p>
        </div>
      </div>
    </div>
  );
}
