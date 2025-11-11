"use client";

import { useState } from "react";
import { Principle } from "@/lib/constants";

/**
 * Gender Experience: Balance Visualizer
 *
 * WHY: Show how masculine and feminine energies need balance
 *
 * GAMING-NATIVE LANGUAGE:
 * - "Tank vs DPS = same stat (impact), different expression"
 * - "Aggro and defensive are both needed"
 * - Teaching: Everything has both energies, balance is power
 */

interface Activity {
  id: string;
  name: string;
  masculine: number; // 0-1 (0 = pure feminine, 1 = pure masculine)
  category: string;
}

const activities: Activity[] = [
  // Gaming examples
  { id: "ranked", name: "Ranked grind", masculine: 0.8, category: "Gaming" },
  { id: "vod-review", name: "VOD review", masculine: 0.3, category: "Gaming" },
  { id: "mechanics", name: "Mechanics practice", masculine: 0.85, category: "Gaming" },
  { id: "strategy", name: "Strategy planning", masculine: 0.4, category: "Gaming" },
  { id: "team-play", name: "Team coordination", masculine: 0.5, category: "Gaming" },

  // Work examples
  { id: "code", name: "Writing code", masculine: 0.7, category: "Work" },
  { id: "debug", name: "Debugging", masculine: 0.6, category: "Work" },
  { id: "design", name: "System design", masculine: 0.4, category: "Work" },
  { id: "meeting", name: "Team meetings", masculine: 0.5, category: "Work" },
  { id: "mentor", name: "Mentoring others", masculine: 0.3, category: "Work" },

  // Life examples
  { id: "gym", name: "Gym workout", masculine: 0.75, category: "Life" },
  { id: "reading", name: "Reading", masculine: 0.3, category: "Life" },
  { id: "meditation", name: "Meditation", masculine: 0.2, category: "Life" },
  { id: "socializing", name: "Socializing", masculine: 0.45, category: "Life" },
  { id: "creating", name: "Creating art", masculine: 0.5, category: "Life" }
];

export default function GenderExperience({ principle }: { principle: Principle }) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Calculate balance
  const selectedActivityObjs = activities.filter(a => selectedActivities.includes(a.id));
  const totalMasculine = selectedActivityObjs.reduce((sum, a) => sum + a.masculine, 0);
  const totalFeminine = selectedActivityObjs.reduce((sum, a) => sum + (1 - a.masculine), 0);
  const total = totalMasculine + totalFeminine;

  const masculinePercent = total > 0 ? (totalMasculine / total) * 100 : 50;
  const femininePercent = total > 0 ? (totalFeminine / total) * 100 : 50;

  // Determine balance status
  const getBalanceStatus = () => {
    const diff = Math.abs(masculinePercent - 50);
    if (diff < 10) return { status: "Balanced", color: "#10B981", message: "Excellent harmony" };
    if (diff < 20) return { status: "Slight imbalance", color: "#F59E0B", message: "Room for adjustment" };
    return { status: "Imbalanced", color: "#EF4444", message: "Significant skew" };
  };

  const balanceStatus = getBalanceStatus();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Balance Visualizer
        </h3>
        <p className="text-gray-400">
          Everything has both energies. Tank + DPS both needed. Balance = power.
        </p>
      </div>

      {/* Balance Scale */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Masculine (Yang)</p>
            <p className="text-2xl font-bold text-blue-400">{masculinePercent.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 mt-1">Action • Direct • Focused</p>
          </div>

          <div className="flex-1 mx-8">
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 h-full bg-blue-400 transition-all duration-500"
                style={{ width: `${masculinePercent}%` }}
              />
              <div
                className="absolute right-0 h-full bg-pink-400 transition-all duration-500"
                style={{ width: `${femininePercent}%` }}
              />
            </div>
            <div className="flex justify-center mt-2">
              <div className="text-center px-4 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: balanceStatus.color + "20", color: balanceStatus.color }}>
                {balanceStatus.status}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Feminine (Yin)</p>
            <p className="text-2xl font-bold text-pink-400">{femininePercent.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 mt-1">Receptive • Intuitive • Flow</p>
          </div>
        </div>

        {selectedActivities.length > 0 && (
          <p className="text-center text-gray-400 text-sm">{balanceStatus.message}</p>
        )}
      </div>

      {/* Activity Selection */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Select your activities</h4>
        <p className="text-sm text-gray-400">
          Click activities to see their energy balance. Build your ideal day.
        </p>

        {/* Categories */}
        {["Gaming", "Work", "Life"].map(category => (
          <div key={category} className="space-y-2">
            <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <span style={{ color: principle.color.primary }}>▸</span>
              {category}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activities.filter(a => a.category === category).map(activity => {
                const isSelected = selectedActivities.includes(activity.id);
                const masculineVal = activity.masculine;
                const feminineVal = 1 - activity.masculine;

                return (
                  <button
                    key={activity.id}
                    onClick={() => toggleActivity(activity.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      isSelected ? 'scale-105' : ''
                    }`}
                    style={{
                      borderColor: isSelected ? principle.color.primary : '#4B5563',
                      backgroundColor: isSelected ? principle.color.primary + "10" : '#1F2937'
                    }}
                  >
                    <p className="text-sm font-medium text-gray-200 mb-1">{activity.name}</p>
                    <div className="flex gap-1 h-1.5">
                      <div
                        className="bg-blue-400 rounded-full"
                        style={{ width: `${masculineVal * 100}%` }}
                      />
                      <div
                        className="bg-pink-400 rounded-full"
                        style={{ width: `${feminineVal * 100}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Activities Breakdown */}
      {selectedActivities.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-200">Your Energy Profile</h4>
          <div className="space-y-2">
            {selectedActivityObjs.map(activity => {
              const masc = activity.masculine * 100;
              const fem = (1 - activity.masculine) * 100;

              return (
                <div key={activity.id} className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-300">{activity.name}</p>
                    <button
                      onClick={() => toggleActivity(activity.id)}
                      className="text-xs text-gray-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-blue-400">{masc.toFixed(0)}% Masculine</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-pink-400">{fem.toFixed(0)}% Feminine</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Explanation Toggle */}
      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="w-full py-3 rounded-lg font-medium transition-all"
        style={{
          backgroundColor: principle.color.primary + "20",
          color: principle.color.primary,
          border: `1px solid ${principle.color.primary}40`
        }}
      >
        {showExplanation ? "Hide" : "Show"} Energy Explanation
      </button>

      {/* Energy Explanation */}
      {showExplanation && (
        <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-200">Understanding the Energies</h4>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Masculine */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">☀</span>
                </div>
                <h5 className="font-semibold text-blue-400">Masculine (Yang)</h5>
              </div>
              <p className="text-sm text-gray-300">
                Active, assertive, directional energy. The force that acts, decides, builds.
              </p>
              <div className="space-y-1 text-sm text-gray-400">
                <p><span className="text-blue-400">•</span> Gaming: Aggressive plays, mechanical execution</p>
                <p><span className="text-blue-400">•</span> Work: Implementation, problem-solving, shipping</p>
                <p><span className="text-blue-400">•</span> Life: Exercise, goal pursuit, achievement</p>
              </div>
            </div>

            {/* Feminine */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-400/20 flex items-center justify-center">
                  <span className="text-pink-400 font-bold">☾</span>
                </div>
                <h5 className="font-semibold text-pink-400">Feminine (Yin)</h5>
              </div>
              <p className="text-sm text-gray-300">
                Receptive, intuitive, connective energy. The force that receives, integrates, nurtures.
              </p>
              <div className="space-y-1 text-sm text-gray-400">
                <p><span className="text-pink-400">•</span> Gaming: Strategy, awareness, team synergy</p>
                <p><span className="text-pink-400">•</span> Work: Design, collaboration, mentoring</p>
                <p><span className="text-pink-400">•</span> Life: Rest, reflection, relationships</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teaching */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">The Gender Principle (Gaming Edition)</h4>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold" style={{ color: principle.color.primary }}>
              Everything has both energies.
            </span>{' '}
            Tank = feminine (receive damage, create space). DPS = masculine (deal damage, create pressure).
            Both needed. Neither is "better."
          </p>
          <p>
            <span className="font-semibold text-blue-400">Too much masculine (Yang):</span> Burnout, tunnel vision,
            mechanical play without strategy. You become a bot clicking buttons.
          </p>
          <p>
            <span className="font-semibold text-pink-400">Too much feminine (Yin):</span> Analysis paralysis, no execution,
            all theory no practice. You know everything but can't perform.
          </p>
          <p>
            <span className="font-semibold" style={{ color: principle.color.primary }}>
              Balance creates power.
            </span>{' '}
            Best players: aggressive when needed (Yang), patient when needed (Yin). They flow between both.
          </p>
          <p className="text-sm text-gray-400 italic pt-2 border-t border-gray-700">
            This isn't about gender identity. It's about energy. Everyone has both. Wholeness requires both.
          </p>
        </div>
      </div>

      {/* Practical Application */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Building Your Balanced Day</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-blue-400">When to channel Masculine:</p>
            <ul className="space-y-1 text-gray-400">
              <li>• Ranked climb (focused execution)</li>
              <li>• Difficult tasks (direct action)</li>
              <li>• Deadlines (decisive progress)</li>
              <li>• Competition (assertive play)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-pink-400">When to channel Feminine:</p>
            <ul className="space-y-1 text-gray-400">
              <li>• VOD review (receptive learning)</li>
              <li>• Team coordination (collaborative flow)</li>
              <li>• Creativity (intuitive exploration)</li>
              <li>• Recovery (restorative integration)</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-700">
          Aim for 50/50 balance over a week. Some days will skew one way. That's fine. Weekly balance matters more than daily perfection.
        </p>
      </div>
    </div>
  );
}
