"use client";

import { useState } from "react";
import Link from "next/link";
import { PRINCIPLES } from "@/lib/constants";

export function PrincipleNavigator() {
  const [selectedPrinciple, setSelectedPrinciple] = useState<number | null>(
    null
  );

  return (
    <div>
      {/* Principle Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {PRINCIPLES.map((principle) => (
          <button
            key={principle.id}
            onClick={() =>
              setSelectedPrinciple(
                selectedPrinciple === principle.id ? null : principle.id
              )
            }
            className={`p-4 rounded-lg border transition-all ${
              selectedPrinciple === principle.id
                ? "border-cosmic-purple bg-cosmic-purple/10"
                : "border-gray-800 bg-gray-900/50 hover:border-cosmic-purple/50"
            }`}
          >
            <div className="text-sm font-semibold text-gray-200 mb-1">
              {principle.title}
            </div>
            <div className="text-xs text-gray-500">{principle.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Expanded Detail */}
      {selectedPrinciple && (
        <div className="bg-gradient-to-br from-cosmic-purple/10 to-cosmic-gold/10 border border-cosmic-purple/30 rounded-lg p-6 mb-4">
          {(() => {
            const principle = PRINCIPLES.find((p) => p.id === selectedPrinciple);
            if (!principle) return null;

            return (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-100">
                      {principle.title}
                    </h3>
                    <p className="text-cosmic-gold">{principle.ancientTruth}</p>
                  </div>
                  <Link
                    href={`/principles/${principle.slug}`}
                    className="px-4 py-2 bg-cosmic-purple hover:bg-cosmic-gold text-white rounded-lg transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
