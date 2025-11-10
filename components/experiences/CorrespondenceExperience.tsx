"use client";

import { Principle } from "@/lib/constants";

export default function CorrespondenceExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Fractal Zoom Explorer
        </h3>
        <p className="text-gray-400">
          Zoom from atoms to galaxies. See the same patterns repeat everywhere.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Interactive fractal explorer coming soon. You'll zoom through scales and see identical patterns emerge.</p>
          <p className="text-sm text-gray-500">Try this: Look at a tree's branches, then at rivers from above, then at your lungs. Same pattern, different scales.</p>
        </div>
      </div>
    </div>
  );
}
