"use client";

import { getPrincipleColorById } from "@/lib/brand-colors";
import { PRINCIPLES } from "@/lib/constants";

interface PrincipleProgressProps {
  completedIds: number[];
  currentId?: number;
  onPrincipleClick?: (id: number) => void;
}

/**
 * PrincipleProgress Component
 *
 * Visual progress indicator showing all 7 principles with their sacred colors.
 * Demonstrates color intensity progression:
 * - 10% opacity: Not started
 * - 30% opacity: Available/unlocked
 * - 60% opacity: In progress
 * - 100% opacity: Completed
 */
export function PrincipleProgress({
  completedIds = [],
  currentId,
  onPrincipleClick
}: PrincipleProgressProps) {
  return (
    <div className="principle-progress">
      {/* Main container */}
      <div className="flex items-center justify-center gap-3 p-6 bg-void-deep rounded-lg">

        {/* Progress line behind gems */}
        <div className="absolute inset-x-6 flex items-center">
          <div className="w-full h-0.5 bg-void-light" />
        </div>

        {/* Principle gems */}
        <div className="relative flex items-center gap-3">
          {PRINCIPLES.map((principle) => {
            const colors = getPrincipleColorById(principle.id);
            if (!colors) return null;

            const isCompleted = completedIds.includes(principle.id);
            const isCurrent = currentId === principle.id;
            const isUnlocked = completedIds.length >= principle.id - 1;

            return (
              <div key={principle.id} className="relative group">
                {/* Connection line (shows progression) */}
                {principle.id > 1 && (
                  <div
                    className="absolute -left-3 top-1/2 w-3 h-0.5 -translate-y-1/2"
                    style={{
                      backgroundColor: completedIds.includes(principle.id - 1)
                        ? colors.opacity60
                        : colors.subtle
                    }}
                  />
                )}

                {/* Gem button */}
                <button
                  onClick={() => onPrincipleClick?.(principle.id)}
                  className="relative transition-all duration-300 transform hover:scale-110"
                  disabled={!isUnlocked && !isCompleted}
                  title={`${principle.title}: ${principle.subtitle}`}
                >
                  {/* Outer ring (always visible with principle color) */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      // Base state: subtle presence
                      backgroundColor: !isUnlocked ? colors.subtle :
                                     isCurrent ? colors.opacity60 :
                                     isCompleted ? colors.primary :
                                     colors.opacity30,

                      // Glow effect for active/completed
                      boxShadow: isCurrent ? `0 0 20px ${colors.glow}` :
                               isCompleted ? `0 0 12px ${colors.glow}` :
                               'none',

                      // Border to enhance visibility
                      border: `2px solid ${
                        isCompleted ? colors.primary :
                        isCurrent ? colors.opacity60 :
                        isUnlocked ? colors.opacity30 :
                        'transparent'
                      }`
                    }}
                  >
                    {/* Inner gem */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                      style={{
                        backgroundColor: isCompleted ? colors.secondary :
                                       isCurrent ? colors.opacity60 :
                                       'transparent',
                        color: isCompleted || isCurrent ? 'white' : colors.primary
                      }}
                    >
                      {isCompleted ? '✓' : principle.id}
                    </div>
                  </div>

                  {/* Pulse animation for current */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: colors.opacity30,
                      }}
                    />
                  )}
                </button>

                {/* Tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div
                    className="px-2 py-1 rounded text-xs whitespace-nowrap"
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                  >
                    {principle.title}
                  </div>
                </div>

                {/* Status label */}
                {(isCompleted || isCurrent) && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: colors.primary }}
                    >
                      {isCompleted ? 'Complete' : 'Current'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary text */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          {completedIds.length === 0 && "Begin your journey through the 7 Principles"}
          {completedIds.length > 0 && completedIds.length < 7 && (
            <>
              <span style={{ color: getPrincipleColorById(completedIds[completedIds.length - 1])?.primary }}>
                {completedIds.length} of 7
              </span>
              {" principles explored"}
            </>
          )}
          {completedIds.length === 7 && (
            <span className="text-gold-divine font-bold">
              Journey Complete! All 7 Principles Mastered 🌟
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * Compact version for navigation/header
 */
export function PrincipleProgressCompact({
  completedIds = [],
  currentId
}: Omit<PrincipleProgressProps, 'onPrincipleClick'>) {
  return (
    <div className="flex items-center gap-1">
      {PRINCIPLES.map((principle) => {
        const colors = getPrincipleColorById(principle.id);
        if (!colors) return null;

        const isCompleted = completedIds.includes(principle.id);
        const isCurrent = currentId === principle.id;

        return (
          <div
            key={principle.id}
            className="w-2 h-8 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isCompleted ? colors.primary :
                             isCurrent ? colors.opacity60 :
                             colors.subtle,
              boxShadow: isCurrent ? `0 0 8px ${colors.glow}` : 'none'
            }}
            title={principle.title}
          />
        );
      })}
    </div>
  );
}