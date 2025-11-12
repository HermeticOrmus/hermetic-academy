"use client";

import Link from "next/link";
import { getPrincipleColorById } from "@/lib/brand-colors";
import { getPrincipleBySlug, getPrincipleTranslation } from "@/lib/constants";
import { useLanguageLens } from "@/lib/hooks/useLanguageLens";

interface PrincipleCardProps {
  id: number;
  title: string;
  subtitle: string;
  description?: string; // Now optional - will use lens-aware translation
  slug: string;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
}

/**
 * PrincipleCard Component
 *
 * Demonstrates the color presence philosophy:
 * "Anytime we see these principles, these colors are present at some level"
 *
 * Uses multiple opacity levels to create depth:
 * - 10% for base background
 * - 30% for borders and overlays
 * - 60% for hover states
 * - 100% for primary elements
 */
export function PrincipleCard({
  id,
  title,
  subtitle,
  description: propDescription,
  slug,
  isActive = false,
  isCompleted = false,
  onClick
}: PrincipleCardProps) {
  const { selectedLens } = useLanguageLens();
  const colors = getPrincipleColorById(id);

  // Get lens-aware translation
  const principle = getPrincipleBySlug(slug);
  const translation = principle ? getPrincipleTranslation(principle, selectedLens) : null;
  const description = propDescription || translation?.description || "";

  if (!colors) return null;

  return (
    <Link href={`/principles/${slug}`} onClick={onClick}>
      <div
        className="principle-card group relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer"
        style={{
          // Base: Always has subtle color presence (10%)
          backgroundColor: colors.subtle,

          // Border: Stronger presence (30% or 100% based on state)
          border: `2px solid ${isActive ? colors.primary : colors.opacity30}`,

          // Custom CSS variables for child elements
          '--principle-primary': colors.primary,
          '--principle-secondary': colors.secondary,
          '--principle-opacity30': colors.opacity30,
          '--principle-opacity60': colors.opacity60,
          '--principle-glow': colors.glow,
        } as React.CSSProperties}
      >
        {/* Gradient overlay that intensifies on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.opacity30} 0%, transparent 100%)`
          }}
        />

        {/* Number indicator with full color */}
        <div
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
          style={{
            backgroundColor: isCompleted ? colors.primary : colors.opacity60,
            boxShadow: isCompleted ? `0 4px 12px ${colors.glow}` : 'none'
          }}
        >
          {id}
        </div>

        <div className="relative p-6">
          {/* Title with principle color */}
          <h3
            className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform"
            style={{ color: colors.primary }}
          >
            {title}
          </h3>

          {/* Subtitle with secondary color */}
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: colors.secondary }}
          >
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Status indicator bar */}
          <div className="relative h-1 rounded-full overflow-hidden mt-4"
               style={{ backgroundColor: colors.opacity30 }}>
            {isCompleted && (
              <div
                className="absolute inset-0 bg-gradient-to-r animate-shimmer"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
                  backgroundSize: '200% 100%',
                }}
              />
            )}
          </div>

          {/* Hover indicator */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            style={{
              backgroundColor: colors.primary,
            }}
          />
        </div>

        {/* Active state glow */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 30px ${colors.glow}`,
            }}
          />
        )}
      </div>
    </Link>
  );
}