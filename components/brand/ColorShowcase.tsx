"use client";

import { HERMETIC_COLORS, PRINCIPLE_GEMS, FOUNDATION_COLORS } from "@/lib/brand-colors";

/**
 * Color Showcase Component
 *
 * Visual demonstration of the Hermetic Academy × Hermetic Ormus
 * unified color system. Shows all 7 principle colors with their
 * sacred meanings and gem associations.
 *
 * Use this on a demo page to visualize the brand integration.
 */

interface PrincipleColorCardProps {
  id: number;
  name: string;
  subtitle: string;
  colorSet: typeof HERMETIC_COLORS.mentalism;
  gem: typeof PRINCIPLE_GEMS.mentalism;
}

function PrincipleColorCard({ id, name, subtitle, colorSet, gem }: PrincipleColorCardProps) {
  return (
    <div className="bg-void-deep rounded-lg p-6 border border-void-light hover:border-gold-divine transition-all duration-300">
      {/* Color swatches */}
      <div className="flex gap-2 mb-4">
        <div
          className="w-16 h-16 rounded-md shadow-lg"
          style={{ backgroundColor: colorSet.primary }}
          title="Primary"
        />
        <div
          className="w-16 h-16 rounded-md shadow-lg"
          style={{ backgroundColor: colorSet.secondary }}
          title="Secondary"
        />
        <div
          className="w-16 h-16 rounded-md shadow-lg"
          style={{ backgroundColor: colorSet.dark }}
          title="Dark"
        />
      </div>

      {/* Principle info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-2xl font-bold"
            style={{ color: colorSet.secondary }}
          >
            {id}.
          </span>
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      {/* Gem info */}
      <div className="border-t border-void-light pt-4">
        <p className="text-sm font-semibold text-gold-divine mb-1">
          {gem.name}
        </p>
        <p className="text-xs text-gray-500">
          {gem.description}
        </p>
      </div>

      {/* Color codes */}
      <div className="mt-4 space-y-1 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-gray-500">Primary:</span>
          <span className="text-gray-400">{colorSet.primary}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tailwind:</span>
          <span className="text-gray-400">{colorSet.tailwind}</span>
        </div>
      </div>

      {/* Visual gradient bar */}
      <div
        className={`h-1 w-full mt-4 rounded-full bg-gradient-to-r ${colorSet.gradient}`}
      />
    </div>
  );
}

export function ColorShowcase() {
  const principles = [
    { id: 1, name: "Mentalism", subtitle: "The All is Mind", color: HERMETIC_COLORS.mentalism, gem: PRINCIPLE_GEMS.mentalism },
    { id: 2, name: "Correspondence", subtitle: "As Above, So Below", color: HERMETIC_COLORS.correspondence, gem: PRINCIPLE_GEMS.correspondence },
    { id: 3, name: "Vibration", subtitle: "Nothing Rests", color: HERMETIC_COLORS.vibration, gem: PRINCIPLE_GEMS.vibration },
    { id: 4, name: "Polarity", subtitle: "Everything is Dual", color: HERMETIC_COLORS.polarity, gem: PRINCIPLE_GEMS.polarity },
    { id: 5, name: "Rhythm", subtitle: "Everything Flows", color: HERMETIC_COLORS.rhythm, gem: PRINCIPLE_GEMS.rhythm },
    { id: 6, name: "Cause & Effect", subtitle: "Every Cause Has Its Effect", color: HERMETIC_COLORS.causeEffect, gem: PRINCIPLE_GEMS.causeEffect },
    { id: 7, name: "Gender", subtitle: "Gender is in Everything", color: HERMETIC_COLORS.gender, gem: PRINCIPLE_GEMS.gender },
  ];

  return (
    <div className="min-h-screen bg-void-black p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Hermetic Academy × Hermetic Ormus
          </h1>
          <p className="text-xl text-gold-divine mb-2">
            Unified Color System
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The 7 Hermetic Principles aligned with the first 7 colors from the 9 Angelic Realms.
            A journey from foundation (red) to integration (violet).
          </p>
        </div>
      </div>

      {/* Color progression bar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex h-4 rounded-full overflow-hidden">
          {principles.map((p) => (
            <div
              key={p.id}
              className="flex-1"
              style={{ backgroundColor: p.color.primary }}
            />
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          The Sacred Spectrum: Root to Crown
        </p>
      </div>

      {/* Principle cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {principles.map((principle) => (
          <PrincipleColorCard
            key={principle.id}
            id={principle.id}
            name={principle.name}
            subtitle={principle.subtitle}
            colorSet={principle.color}
            gem={principle.gem}
          />
        ))}
      </div>

      {/* Foundation colors */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Foundation Colors</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Void colors */}
          <div className="bg-void-deep rounded-lg p-4 border border-void-light">
            <div className="w-full h-20 rounded mb-2" style={{ backgroundColor: FOUNDATION_COLORS.voidBlack }} />
            <p className="text-sm font-mono text-gray-400">Void Black</p>
            <p className="text-xs text-gray-500">{FOUNDATION_COLORS.voidBlack}</p>
          </div>

          <div className="bg-void-deep rounded-lg p-4 border border-void-light">
            <div className="w-full h-20 rounded mb-2" style={{ backgroundColor: FOUNDATION_COLORS.shadowDeep }} />
            <p className="text-sm font-mono text-gray-400">Shadow Deep</p>
            <p className="text-xs text-gray-500">{FOUNDATION_COLORS.shadowDeep}</p>
          </div>

          {/* Gold colors */}
          <div className="bg-void-deep rounded-lg p-4 border border-void-light">
            <div className="w-full h-20 rounded mb-2" style={{ backgroundColor: FOUNDATION_COLORS.goldDivine }} />
            <p className="text-sm font-mono text-gray-400">Gold Divine</p>
            <p className="text-xs text-gray-500">{FOUNDATION_COLORS.goldDivine}</p>
          </div>

          <div className="bg-void-deep rounded-lg p-4 border border-void-light">
            <div className="w-full h-20 rounded mb-2" style={{ backgroundColor: FOUNDATION_COLORS.goldRadiant }} />
            <p className="text-sm font-mono text-gray-400">Gold Radiant</p>
            <p className="text-xs text-gray-500">{FOUNDATION_COLORS.goldRadiant}</p>
          </div>
        </div>
      </div>

      {/* Usage examples */}
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Usage Examples</h2>

        <div className="space-y-4">
          {/* Example buttons */}
          <div className="bg-void-deep rounded-lg p-6 border border-void-light">
            <h3 className="text-lg font-semibold text-white mb-4">Principle Buttons</h3>
            <div className="flex flex-wrap gap-3">
              {principles.map((p) => (
                <button
                  key={p.id}
                  className="px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: p.color.primary,
                    boxShadow: `0 4px 12px ${p.color.glow}`,
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Example cards with glow */}
          <div className="bg-void-deep rounded-lg p-6 border border-void-light">
            <h3 className="text-lg font-semibold text-white mb-4">Cards with Realm Glow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {principles.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-lg border-2 transition-all duration-300"
                  style={{
                    backgroundColor: FOUNDATION_COLORS.shadowDeep,
                    borderColor: p.color.primary,
                    boxShadow: `0 4px 12px ${p.color.glow}`,
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: p.color.secondary }}>
                    {p.name}
                  </h4>
                  <p className="text-sm text-gray-400">{p.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gold Hat badge */}
          <div className="bg-void-deep rounded-lg p-6 border border-void-light">
            <h3 className="text-lg font-semibold text-white mb-4">Gold Hat Elements</h3>
            <div className="flex gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-divine/10 rounded-full border border-gold-divine/30">
                <span className="text-gold-divine">👑</span>
                <span className="text-sm text-gold-radiant font-semibold">Gold Hat Member</span>
              </div>

              <button className="px-6 py-2 bg-gradient-to-r from-gold-deep to-gold-divine text-void-black font-bold rounded-md hover:shadow-gold transition-all duration-300">
                Sacred Technology
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-void-light">
        <p className="text-center text-gray-500 text-sm">
          "As above, so below. As the brand, so the experience."
        </p>
        <p className="text-center text-gold-divine text-xs mt-2">
          — Hermetic Ormus, Gold Hat Technologist
        </p>
      </div>
    </div>
  );
}

export default ColorShowcase;