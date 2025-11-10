"use client";

import { Principle } from "@/lib/constants";

/**
 * Mentalism Experience: Mind Map Builder
 *
 * WHY: Show how thoughts connect and create reality
 * Feature: Interactive node creation, connections, editing
 *
 * THIS IS PLACEHOLDER - Full interactive experience to be built next
 * For now: Explain principle, show static visualization
 */

export default function MentalismExperience({ principle }: { principle: Principle }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Mind Map Builder
        </h3>
        <p className="text-gray-400">
          Create connections between thoughts. See how one idea shapes everything else.
        </p>
      </div>

      {/* Placeholder Interactive Area */}
      <div
        className="min-h-[400px] rounded-xl border-2 border-dashed flex items-center justify-center"
        style={{ borderColor: principle.color.primary + "40" }}
      >
        <div className="text-center space-y-4 p-8">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: principle.color.primary + "20" }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: principle.color.primary }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-2">
              Interactive Experience Coming Soon
            </p>
            <p className="text-gray-400 max-w-md mx-auto">
              We're building a powerful mind mapping tool where you'll create thought networks,
              watch connections form, and see how changing core beliefs reshapes everything.
            </p>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              For now, try this: Think of a central belief you hold. What thoughts stem from it?
              What would change if you shifted that core belief?
            </p>
          </div>
        </div>
      </div>

      {/* Principle Teaching (Static for now) */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Key Insight</h4>
        <p className="text-gray-300">
          Every thought is a seed. What you focus on grows. Not through magic, but through
          attention, action, and the ripple effects of where you direct your consciousness.
        </p>
        <p className="text-gray-300">
          The mind map you'll build shows this visually: One central thought connects to many
          others. Change the center, and everything connected to it shifts.
        </p>
      </div>
    </div>
  );
}
