"use client";

import { useState } from "react";
import { ColorShowcase } from "@/components/brand/ColorShowcase";
import { PrincipleCard } from "@/components/principles/PrincipleCard";
import { PrincipleProgress, PrincipleProgressCompact } from "@/components/principles/PrincipleProgress";
import { PRINCIPLES } from "@/lib/constants";
import { getPrincipleColorById, HERMETIC_COLORS } from "@/lib/brand-colors";

/**
 * Brand Demo Page
 *
 * Showcases the Hermetic Academy × Hermetic Ormus brand integration
 * with emphasis on the sacred color system where:
 * "Anytime we see these principles, these colors are present at some level"
 */
export default function BrandDemoPage() {
  const [completedPrinciples, setCompletedPrinciples] = useState<number[]>([1, 2, 3]);
  const [currentPrinciple, setCurrentPrinciple] = useState<number>(4);
  const [selectedPrinciple, setSelectedPrinciple] = useState<number>(1);

  const selectedColors = getPrincipleColorById(selectedPrinciple);

  return (
    <div className="min-h-screen bg-void-black">
      {/* Page header with principle colors */}
      <header
        className="border-b transition-all duration-500"
        style={{
          borderColor: selectedColors?.opacity30,
          backgroundColor: selectedColors?.subtle
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Hermetic Academy Brand Demo
              </h1>
              <p className="text-gold-divine">
                Sacred Color System Integration
              </p>
            </div>

            {/* Compact progress in header */}
            <PrincipleProgressCompact
              completedIds={completedPrinciples}
              currentId={currentPrinciple}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Section 1: Color Philosophy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Color Philosophy
          </h2>
          <div className="bg-void-deep rounded-lg p-6 border border-void-light">
            <blockquote className="text-lg text-gray-300 italic mb-4">
              "Anytime we see these principles, these colors are present at some level in some way."
            </blockquote>
            <p className="text-gray-400">
              Every interaction with a principle carries its sacred color signature through multiple opacity levels:
            </p>
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="h-16 rounded-md bg-white mb-2" />
                <p className="text-sm text-gray-400">100% - Primary</p>
              </div>
              <div className="text-center">
                <div className="h-16 rounded-md bg-white/60 mb-2" />
                <p className="text-sm text-gray-400">60% - Interactive</p>
              </div>
              <div className="text-center">
                <div className="h-16 rounded-md bg-white/30 mb-2" />
                <p className="text-sm text-gray-400">30% - Ambient</p>
              </div>
              <div className="text-center">
                <div className="h-16 rounded-md bg-white/10 mb-2" />
                <p className="text-sm text-gray-400">10% - Subtle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Progress Indicators */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Progress Visualization
          </h2>
          <PrincipleProgress
            completedIds={completedPrinciples}
            currentId={currentPrinciple}
            onPrincipleClick={(id) => {
              setSelectedPrinciple(id);
              setCurrentPrinciple(id);
            }}
          />

          {/* Interactive controls */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => {
                if (!completedPrinciples.includes(currentPrinciple)) {
                  setCompletedPrinciples([...completedPrinciples, currentPrinciple]);
                  if (currentPrinciple < 7) {
                    setCurrentPrinciple(currentPrinciple + 1);
                  }
                }
              }}
              className="px-4 py-2 bg-gold-divine text-void-black font-semibold rounded-md hover:bg-gold-radiant transition-colors"
            >
              Complete Current Principle
            </button>
            <button
              onClick={() => {
                setCompletedPrinciples([]);
                setCurrentPrinciple(1);
              }}
              className="px-4 py-2 border border-gray-600 text-gray-300 font-semibold rounded-md hover:border-gray-400 transition-colors"
            >
              Reset Progress
            </button>
          </div>
        </section>

        {/* Section 3: Principle Cards Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Principle Cards with Color Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.slice(0, 6).map((principle) => (
              <PrincipleCard
                key={principle.id}
                id={principle.id}
                title={principle.title}
                subtitle={principle.subtitle}
                description={principle.description}
                slug={principle.slug}
                isActive={currentPrinciple === principle.id}
                isCompleted={completedPrinciples.includes(principle.id)}
                onClick={() => setSelectedPrinciple(principle.id)}
              />
            ))}
          </div>
        </section>

        {/* Section 4: Interactive Color Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Interactive Color States
          </h2>

          <div className="bg-void-deep rounded-lg p-6 border border-void-light">
            {/* Principle selector */}
            <div className="flex gap-2 mb-6">
              {PRINCIPLES.map((p) => {
                const colors = getPrincipleColorById(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrinciple(p.id)}
                    className="px-4 py-2 rounded-md font-semibold text-white transition-all"
                    style={{
                      backgroundColor: selectedPrinciple === p.id
                        ? colors?.primary
                        : colors?.opacity30,
                      transform: selectedPrinciple === p.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {p.id}
                  </button>
                );
              })}
            </div>

            {/* Selected principle demo */}
            {selectedColors && (
              <div className="space-y-6">
                {/* Color swatches */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div
                      className="h-20 rounded-md mb-2"
                      style={{ backgroundColor: selectedColors.primary }}
                    />
                    <p className="text-xs text-gray-400">100% Primary</p>
                  </div>
                  <div>
                    <div
                      className="h-20 rounded-md mb-2"
                      style={{ backgroundColor: selectedColors.opacity60 }}
                    />
                    <p className="text-xs text-gray-400">60% Interactive</p>
                  </div>
                  <div>
                    <div
                      className="h-20 rounded-md mb-2"
                      style={{ backgroundColor: selectedColors.opacity30 }}
                    />
                    <p className="text-xs text-gray-400">30% Ambient</p>
                  </div>
                  <div>
                    <div
                      className="h-20 rounded-md mb-2"
                      style={{ backgroundColor: selectedColors.subtle }}
                    />
                    <p className="text-xs text-gray-400">10% Subtle</p>
                  </div>
                </div>

                {/* Example UI elements */}
                <div className="space-y-4">
                  {/* Button examples */}
                  <div className="flex gap-3">
                    <button
                      className="px-6 py-2 rounded-md font-semibold text-white transition-all hover:scale-105"
                      style={{
                        backgroundColor: selectedColors.primary,
                        boxShadow: `0 4px 12px ${selectedColors.glow}`
                      }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-6 py-2 rounded-md font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: selectedColors.opacity30,
                        color: selectedColors.primary,
                        border: `2px solid ${selectedColors.primary}`
                      }}
                    >
                      Secondary Action
                    </button>
                    <button
                      className="px-6 py-2 rounded-md font-semibold transition-all"
                      style={{
                        backgroundColor: 'transparent',
                        color: selectedColors.primary,
                        border: `1px solid ${selectedColors.opacity60}`
                      }}
                    >
                      Outline Action
                    </button>
                  </div>

                  {/* Card example */}
                  <div
                    className="p-6 rounded-lg"
                    style={{
                      backgroundColor: selectedColors.subtle,
                      border: `2px solid ${selectedColors.opacity30}`
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: selectedColors.primary }}
                    >
                      Example Card
                    </h3>
                    <p className="text-gray-300 mb-4">
                      This card demonstrates multiple opacity levels working together.
                    </p>
                    <div
                      className="h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${selectedColors.primary} 0%, ${selectedColors.secondary} 100%)`
                      }}
                    />
                  </div>

                  {/* Badge examples */}
                  <div className="flex gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: selectedColors.opacity30,
                        color: selectedColors.primary,
                      }}
                    >
                      Badge Style 1
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{
                        backgroundColor: selectedColors.primary,
                      }}
                    >
                      Badge Style 2
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: 'transparent',
                        color: selectedColors.primary,
                        border: `1px solid ${selectedColors.opacity60}`
                      }}
                    >
                      Badge Style 3
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Full Color Showcase */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Complete Color System
          </h2>
          <ColorShowcase />
        </section>
      </div>
    </div>
  );
}