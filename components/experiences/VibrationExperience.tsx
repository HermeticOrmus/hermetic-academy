"use client";

import { Principle } from "@/lib/constants";

export default function VibrationExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Frequency Visualizer
        </h3>
        <p className="text-gray-400">
          Use your mic to see sound waves. Play with frequencies and watch reality respond.
        </p>
      </div>
      <div className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: principle.color.primary + "40" }}>
        <div className="text-center p-8 max-w-md">
          <p className="text-gray-300 mb-4">Audio visualizer with Web Audio API coming soon. Real-time waveforms and frequency patterns.</p>
          <p className="text-sm text-gray-500">Try this: Hum a note. Feel the vibration in your chest. Everything vibrates—atoms, thoughts, emotions.</p>
        </div>
      </div>
    </div>
  );
}
