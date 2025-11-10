"use client";

import Link from "next/link";
import { Principle } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PrincipleCardProps {
  principle: Principle;
  completed?: boolean;
}

export function PrincipleCard({ principle, completed = false }: PrincipleCardProps) {
  return (
    <Link
      href={`/principles/${principle.slug}`}
      className={cn(
        "group relative block p-6 rounded-xl border transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl",
        completed
          ? "border-cosmic-gold bg-cosmic-gold/10"
          : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${principle.color.primary}15 0%, transparent 100%)`,
      }}
    >
      {/* Completed Badge */}
      {completed && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cosmic-gold flex items-center justify-center">
          <svg
            className="w-4 h-4 text-cosmic-black"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Principle Number */}
      <div
        className="text-6xl font-bold opacity-10 mb-4"
        style={{ color: principle.color.primary }}
      >
        {principle.id}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
        {principle.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-4">{principle.subtitle}</p>

      {/* Teen Translation */}
      <p className="text-sm text-gray-300">{principle.teenTranslation}</p>

      {/* Experience Type */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {principle.experienceType}
        </p>
      </div>

      {/* Hover Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity",
          "pointer-events-none"
        )}
        style={{
          background: `linear-gradient(135deg, ${principle.color.primary}20 0%, transparent 100%)`,
        }}
      />
    </Link>
  );
}
