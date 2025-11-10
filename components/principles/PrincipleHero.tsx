"use client";

import { Principle } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Principle Hero Section
 *
 * WHY: First impression - introduce principle with beauty and clarity
 * Shows: Title, subtitle, ancient truth, teen translation, description
 * Principle: GENDER - Balance logic (content) with beauty (presentation)
 */

interface PrincipleHeroProps {
  principle: Principle;
  isCompleted?: boolean;
}

export function PrincipleHero({ principle, isCompleted = false }: PrincipleHeroProps) {
  return (
    <section
      className="relative py-20 px-4 border-b border-gray-800 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, ${principle.color.primary}10 0%, transparent 50%)`,
      }}
    >
      {/* Background Decorative Number */}
      <div
        className="absolute top-0 right-0 text-[20rem] font-bold opacity-5 pointer-events-none"
        style={{ color: principle.color.primary }}
      >
        {principle.id}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Completion Badge */}
        {isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-gold/20 border border-cosmic-gold mb-6">
            <svg
              className="w-5 h-5 text-cosmic-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-cosmic-gold font-medium">
              Journey Complete
            </span>
          </div>
        )}

        {/* Principle Number + Title */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="text-4xl font-bold"
            style={{ color: principle.color.primary }}
          >
            {principle.id}
          </div>
          <div>
            <h1
              className="text-5xl md:text-6xl font-bold"
              style={{ color: principle.color.primary }}
            >
              {principle.title}
            </h1>
            <p className="text-xl text-gray-400 mt-2">{principle.subtitle}</p>
          </div>
        </div>

        {/* Ancient Truth (Original Teaching) */}
        <div className="mt-8 p-6 rounded-xl bg-gray-900/50 border border-gray-800">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            Ancient Wisdom
          </p>
          <p className="text-lg text-gray-300 italic">{principle.ancientTruth}</p>
        </div>

        {/* Teen Translation (Modern Language) */}
        <div className="mt-6 p-6 rounded-xl border-2" style={{ borderColor: principle.color.primary }}>
          <p className="text-sm uppercase tracking-wide mb-2" style={{ color: principle.color.secondary }}>
            What This Means For You
          </p>
          <p className="text-xl text-gray-100 font-medium">
            {principle.teenTranslation}
          </p>
        </div>

        {/* Description (Detailed Explanation) */}
        <div className="mt-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            {principle.description}
          </p>
        </div>

        {/* Experience Preview */}
        <div className="mt-8 p-4 rounded-lg bg-gray-800/30 border border-gray-700">
          <div className="flex items-start gap-3">
            <div
              className="mt-1 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${principle.color.primary}20` }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: principle.color.primary }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 uppercase tracking-wide">
                Interactive Experience
              </p>
              <p className="text-base text-gray-200 mt-1">
                <span className="font-semibold" style={{ color: principle.color.primary }}>
                  {principle.experienceType}
                </span>
                {" — "}
                {principle.experienceDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
