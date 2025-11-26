"use client";

import { useState } from "react";
import Link from "next/link";
import { PRINCIPLES } from "@/lib/constants";
import { getPrincipleColorById } from "@/lib/brand-colors";
import { useTone } from "@/contexts/ToneContext";
import { getTranslation } from "@/lib/tone-translations";

export function PrincipleNavigator() {
  const [selectedPrinciple, setSelectedPrinciple] = useState<number | null>(
    null
  );
  const { tone, toneInfo } = useTone();

  return (
    <div>
      {/* Principle Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {PRINCIPLES.map((principle) => {
          const colors = getPrincipleColorById(principle.id);
          const isSelected = selectedPrinciple === principle.id;

          return (
            <button
              key={principle.id}
              onClick={() =>
                setSelectedPrinciple(
                  isSelected ? null : principle.id
                )
              }
              className="group relative p-4 rounded-lg border transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                backgroundColor: isSelected ? colors?.subtle : 'rgba(17, 24, 39, 0.5)',
                borderColor: isSelected ? colors?.primary : colors?.opacity30,
                boxShadow: isSelected ? `0 8px 24px ${colors?.glow}` : 'none',
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${colors?.opacity30} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className="text-sm font-semibold mb-1 transition-colors"
                  style={{ color: isSelected ? colors?.primary : colors?.secondary }}
                >
                  {principle.title}
                </div>
                <div
                  className="text-xs transition-colors"
                  style={{
                    color: isSelected ? colors?.secondary : 'rgba(156, 163, 175, 1)',
                  }}
                >
                  {principle.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Detail */}
      {selectedPrinciple && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          {(() => {
            const principle = PRINCIPLES.find((p) => p.id === selectedPrinciple);
            if (!principle) return null;
            const colors = getPrincipleColorById(principle.id);
            const translation = getTranslation(principle.slug, tone);

            return (
              <div
                className="relative rounded-xl p-8 mb-4 border overflow-hidden"
                style={{
                  backgroundColor: colors?.subtle,
                  borderColor: colors?.opacity30,
                  boxShadow: `0 0 60px ${colors?.glow}`,
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${colors?.opacity30} 0%, transparent 50%, ${colors?.opacity30} 100%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: colors?.opacity30,
                            color: colors?.primary,
                          }}
                        >
                          Principle {principle.id}
                        </div>
                        <div className="inline-block px-2 py-1 rounded-full text-xs bg-gray-800/50 text-gray-400">
                          {toneInfo.emoji} {toneInfo.label}
                        </div>
                      </div>
                      <h3
                        className="text-3xl font-bold mb-2"
                        style={{ color: colors?.primary }}
                      >
                        {principle.title}
                      </h3>
                      <p
                        className="text-lg font-medium mb-2"
                        style={{ color: colors?.secondary }}
                      >
                        "{translation.translation}"
                      </p>
                      <p
                        className="text-sm italic text-gray-500"
                      >
                        Ancient: "{principle.ancientTruth}"
                      </p>
                    </div>
                    <Link
                      href={`/principles/${principle.slug}`}
                      className="group px-6 py-3 text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg ml-6"
                      style={{
                        backgroundColor: colors?.primary,
                        boxShadow: `0 4px 12px ${colors?.glow}`,
                      }}
                    >
                      <span className="flex items-center gap-2">
                        Learn More
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {translation.description}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
