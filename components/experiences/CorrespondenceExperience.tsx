"use client";

import { useState, useRef, useEffect } from "react";
import { Principle } from "@/lib/constants";

/**
 * Correspondence Experience: Fractal Zoom Explorer
 *
 * WHY: Show how patterns repeat across all scales
 *
 * GAMING-NATIVE LANGUAGE:
 * - "Same mechanics everywhere"
 * - "Lane phase = Teamfight = Life strategy"
 * - Teaching: Master one level, understand all levels
 */

interface FractalLevel {
  name: string;
  scale: string;
  examples: string[];
  pattern: string;
}

const FRACTAL_LEVELS: FractalLevel[] = [
  {
    name: "Quantum",
    scale: "10⁻³⁵m (Planck Length)",
    examples: ["Quantum fluctuations", "Particle spin", "Wave patterns"],
    pattern: "Spiral energy"
  },
  {
    name: "Atomic",
    scale: "10⁻¹⁰m (Angstrom)",
    examples: ["Electron orbits", "Atomic bonds", "Molecular geometry"],
    pattern: "Orbital spirals"
  },
  {
    name: "Cellular",
    scale: "10⁻⁶m (Micrometer)",
    examples: ["DNA double helix", "Cell division", "Protein folding"],
    pattern: "Helical structure"
  },
  {
    name: "Biological",
    scale: "1m (Human Scale)",
    examples: ["Fingerprint whorls", "Hair follicle spirals", "Inner ear cochlea"],
    pattern: "Growth spirals"
  },
  {
    name: "Terrestrial",
    scale: "10⁶m (Megameter)",
    examples: ["Hurricane spirals", "Water vortex", "Plant phyllotaxis"],
    pattern: "Flow spirals"
  },
  {
    name: "Planetary",
    scale: "10⁹m (Gigameter)",
    examples: ["Ocean currents", "Atmospheric circulation", "Magnetic fields"],
    pattern: "Rotational spirals"
  },
  {
    name: "Stellar",
    scale: "10¹²m (Terameter)",
    examples: ["Solar wind", "Planetary orbits", "Comet tails"],
    pattern: "Orbital dynamics"
  },
  {
    name: "Galactic",
    scale: "10²¹m (Zettameter)",
    examples: ["Spiral galaxies", "Star formation", "Galactic arms"],
    pattern: "Gravitational spirals"
  },
  {
    name: "Cosmic",
    scale: "10²⁶m (Observable Universe)",
    examples: ["Cosmic web", "Galaxy clusters", "Large-scale structure"],
    pattern: "Universal patterns"
  }
];

export default function CorrespondenceExperience({ principle }: { principle: Principle }) {
  const [currentLevel, setCurrentLevel] = useState(4); // Start at human scale
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw fractal spiral on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw spiral based on current level
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 20;

    // Golden ratio spiral
    const phi = (1 + Math.sqrt(5)) / 2;
    const turns = 4 + currentLevel * 0.5;
    const points = 1000;

    ctx.strokeStyle = principle.color.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * turns * Math.PI * 2;
      const radius = (i / points) * maxRadius * Math.pow(phi, angle / (Math.PI * 2));

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Add decorative circles at key points
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = maxRadius * 0.7;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = principle.color.primary + "80";
      ctx.fill();
    }

  }, [currentLevel, principle.color.primary]);

  // Zoom in (to smaller scales)
  const zoomIn = () => {
    if (currentLevel > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentLevel(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Zoom out (to larger scales)
  const zoomOut = () => {
    if (currentLevel < FRACTAL_LEVELS.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const level = FRACTAL_LEVELS[currentLevel];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Fractal Zoom Explorer
        </h3>
        <p className="text-gray-400">
          Same patterns everywhere. Lane phase = teamfight = life strategy. Zoom and see.
        </p>
      </div>

      {/* Canvas with fractal visualization */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className={`w-full h-auto bg-gray-900/50 rounded-xl border-2 transition-transform duration-300 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
          style={{ borderColor: principle.color.primary + "40" }}
        />

        {/* Scale indicator */}
        <div className="absolute top-4 right-4 bg-gray-900/90 px-4 py-2 rounded-lg">
          <p className="text-xs text-gray-400">Scale</p>
          <p className="text-sm font-mono text-gray-200">{level.scale}</p>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={zoomIn}
          disabled={currentLevel === 0 || isAnimating}
          className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: principle.color.primary + "20",
            color: principle.color.primary,
            border: `1px solid ${principle.color.primary}40`
          }}
        >
          🔬 Zoom In (Smaller)
        </button>

        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: principle.color.primary }}>
            {level.name}
          </p>
          <p className="text-sm text-gray-400">
            {currentLevel + 1} / {FRACTAL_LEVELS.length}
          </p>
        </div>

        <button
          onClick={zoomOut}
          disabled={currentLevel === FRACTAL_LEVELS.length - 1 || isAnimating}
          className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: principle.color.primary + "20",
            color: principle.color.primary,
            border: `1px solid ${principle.color.primary}40`
          }}
        >
          🌌 Zoom Out (Larger)
        </button>
      </div>

      {/* Level information */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">
          {level.name} Level - {level.scale}
        </h4>
        <p className="text-sm text-gray-400">Pattern: {level.pattern}</p>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-300">Examples at this scale:</p>
          <ul className="space-y-1">
            {level.examples.map((example, i) => (
              <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                <span style={{ color: principle.color.primary }}>•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scale navigation */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Quick Jump:</h4>
        <div className="grid grid-cols-3 gap-2">
          {FRACTAL_LEVELS.map((lvl, index) => (
            <button
              key={index}
              onClick={() => setCurrentLevel(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentLevel === index
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              style={{
                backgroundColor: currentLevel === index
                  ? principle.color.primary
                  : '#374151'
              }}
            >
              {lvl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Teaching */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Same Mechanics, Different Scale</h4>
        <div className="space-y-4">
          <div>
            <p className="text-gray-300 font-semibold">Lane Phase (Micro)</p>
            <p className="text-gray-400 text-sm ml-4">
              → CS'ing = resource management<br/>
              → Trading = calculated aggression<br/>
              → Wave control = tempo manipulation
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold">Teamfight (Mid)</p>
            <p className="text-gray-400 text-sm ml-4">
              → Gold lead = resource advantage<br/>
              → Engage/disengage = calculated trades<br/>
              → Baron control = objective tempo
            </p>
          </div>

          <div>
            <p className="text-gray-300 font-semibold">Life Strategy (Macro)</p>
            <p className="text-gray-400 text-sm ml-4">
              → Income = resource management<br/>
              → Opportunities = calculated risks<br/>
              → Career progression = long-term tempo
            </p>
          </div>

          <p className="text-gray-300 font-semibold mt-4" style={{ color: principle.color.primary }}>
            Master the pattern at one scale → Understand it at all scales.
          </p>
        </div>
      </div>
    </div>
  );
}
