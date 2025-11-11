"use client";

import { useState } from "react";
import { Principle } from "@/lib/constants";

/**
 * Cause-Effect Experience: Chain Reaction Simulator
 *
 * WHY: Show how choices cascade into consequences
 *
 * GAMING-NATIVE LANGUAGE:
 * - "Your plays create your LP"
 * - "Small choices = big effects"
 * - Teaching: Every action creates a chain reaction
 */

interface Choice {
  id: string;
  text: string;
  immediate: string;
  shortTerm: string[];
  longTerm: string;
  lpChange: number; // Gaming metaphor for value
}

interface Scenario {
  title: string;
  situation: string;
  choices: Choice[];
}

const scenarios: Scenario[] = [
  {
    title: "Lane Phase: Do you last-hit or poke?",
    situation: "Enemy is farming under tower. You have a decision.",
    choices: [
      {
        id: "lasthit",
        text: "Focus on CS (safe farm)",
        immediate: "You get perfect CS this wave",
        shortTerm: [
          "→ You're up 10 CS at 5 min",
          "→ Enemy is healthy, same gold",
          "→ Lane is frozen near their tower"
        ],
        longTerm: "By 10 min you have item advantage but enemy hasn't been pressured. They scale for free. Mid game: even power.",
        lpChange: 5
      },
      {
        id: "poke",
        text: "Poke them under tower (risky)",
        immediate: "You trade HP for pressure",
        shortTerm: [
          "→ Enemy forced to back or play scared",
          "→ You miss some CS but deny theirs",
          "→ Jungle might come (danger)"
        ],
        longTerm: "By 10 min they're behind in gold AND XP. Your jungler invades safely. You snowball. Mid game: you're ahead.",
        lpChange: 15
      }
    ]
  },
  {
    title: "Work: Do you speak up in the meeting?",
    situation: "You notice a flaw in the project plan. Everyone seems to agree.",
    choices: [
      {
        id: "silent",
        text: "Stay silent (safe play)",
        immediate: "Meeting ends smoothly",
        shortTerm: [
          "→ Team proceeds with flawed plan",
          "→ You avoid conflict",
          "→ Project moves forward"
        ],
        longTerm: "3 months later, the flaw becomes a crisis. Team scrambles to fix it. Your silence is remembered. Trust erodes.",
        lpChange: -10
      },
      {
        id: "speak",
        text: "Speak up (risky but right)",
        immediate: "Meeting gets tense",
        shortTerm: [
          "→ Some defensive reactions",
          "→ Discussion reveals you're right",
          "→ Plan adjusted early"
        ],
        longTerm: "Project launches successfully. Your early catch saved months of work. Reputation for good judgment grows.",
        lpChange: 20
      }
    ]
  },
  {
    title: "Ranked: Teammate flaming in chat",
    situation: "Your jungler is blaming everyone. Team morale tanking.",
    choices: [
      {
        id: "flame-back",
        text: "Flame back (emotional response)",
        immediate: "You vent frustration",
        shortTerm: [
          "→ Chat war escalates",
          "→ Everyone tilts harder",
          "→ Team coordination collapses"
        ],
        longTerm: "You lose a winnable game because team was fighting each other instead of the enemy. -20 LP. You queue again tilted.",
        lpChange: -20
      },
      {
        id: "mute",
        text: "Mute and focus (disciplined)",
        immediate: "Chat is now silent",
        shortTerm: [
          "→ You maintain composure",
          "→ You make good plays",
          "→ Others follow your lead"
        ],
        longTerm: "Your calm focus creates space for comebacks. You win 30% of these 'doomed' games. Over 100 games, that's 30 extra wins.",
        lpChange: 25
      }
    ]
  },
  {
    title: "Health: Late night gaming session?",
    situation: "It's midnight. You want to play one more game.",
    choices: [
      {
        id: "play",
        text: "Queue one more (short-term fun)",
        immediate: "You get 30 min of gameplay",
        shortTerm: [
          "→ You play tired, perform worse",
          "→ Sleep at 1:30 AM instead of 12:30",
          "→ One hour less sleep"
        ],
        longTerm: "Next day: groggy, poor performance at work/school. Pattern repeats. Chronic sleep debt. Rank plateaus despite hours played.",
        lpChange: -15
      },
      {
        id: "sleep",
        text: "Sleep now (long-term gains)",
        immediate: "You log off",
        shortTerm: [
          "→ Full 8 hours of sleep",
          "→ Wake up refreshed",
          "→ Better mental clarity"
        ],
        longTerm: "Next session: 20% better reaction time, decision-making. Over 100 games, that's 10-15 extra wins from being well-rested.",
        lpChange: 20
      }
    ]
  },
  {
    title: "Career: Take the shortcut?",
    situation: "You can skip proper documentation to ship faster. Boss wants results.",
    choices: [
      {
        id: "shortcut",
        text: "Ship without docs (fast now)",
        immediate: "Feature ships today",
        shortTerm: [
          "→ Boss is happy",
          "→ Team celebrates",
          "→ You move to next task"
        ],
        longTerm: "6 months later: bug in that feature. No one remembers how it works. 2 weeks to debug. Every future change breaks things. Technical debt compounds.",
        lpChange: -15
      },
      {
        id: "proper",
        text: "Document properly (slow now)",
        immediate: "Feature ships tomorrow",
        shortTerm: [
          "→ Boss is slightly impatient",
          "→ Proper docs written",
          "→ Clean handoff"
        ],
        longTerm: "6 months later: someone extends your feature in 1 day because docs are clear. Your reputation grows. You're promoted for quality work.",
        lpChange: 25
      }
    ]
  }
];

export default function CauseEffectExperience({ principle }: { principle: Principle }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const [totalLP, setTotalLP] = useState(0);
  const [history, setHistory] = useState<{ scenario: string; choice: string; lp: number }[]>([]);

  const scenario = scenarios[currentScenario];

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowConsequences(true);
    setTotalLP(prev => prev + choice.lpChange);
    setHistory(prev => [...prev, {
      scenario: scenario.title,
      choice: choice.text,
      lp: choice.lpChange
    }]);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedChoice(null);
      setShowConsequences(false);
    }
  };

  const reset = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setShowConsequences(false);
    setTotalLP(0);
    setHistory([]);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: principle.color.primary }}>
          Chain Reaction Simulator
        </h3>
        <p className="text-gray-400">
          Your plays create your LP. Small choices = big effects. See the cascade.
        </p>
      </div>

      {/* LP Tracker */}
      <div className="flex justify-center gap-6">
        <div className="bg-gray-800/50 rounded-xl px-6 py-3">
          <p className="text-sm text-gray-400">Total LP Change</p>
          <p className={`text-3xl font-bold ${totalLP >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalLP >= 0 ? '+' : ''}{totalLP}
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-xl px-6 py-3">
          <p className="text-sm text-gray-400">Scenarios</p>
          <p className="text-3xl font-bold text-gray-200">
            {currentScenario + 1} / {scenarios.length}
          </p>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-6">
        <div>
          <h4 className="text-xl font-bold text-gray-200 mb-2">{scenario.title}</h4>
          <p className="text-gray-400">{scenario.situation}</p>
        </div>

        {/* Choices */}
        {!showConsequences && (
          <div className="grid md:grid-cols-2 gap-4">
            {scenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="p-6 rounded-lg border-2 transition-all text-left hover:scale-105"
                style={{
                  borderColor: principle.color.primary + "40",
                  backgroundColor: "#1F2937"
                }}
              >
                <p className="font-semibold text-gray-200 mb-2">{choice.text}</p>
                <p className="text-sm text-gray-400">{choice.immediate}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Potential LP:</span>
                  <span className={`text-sm font-bold ${choice.lpChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {choice.lpChange >= 0 ? '+' : ''}{choice.lpChange}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Consequences Chain */}
        {showConsequences && selectedChoice && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: principle.color.primary + "20" }}>
              <p className="font-semibold text-gray-200 mb-2">You chose: {selectedChoice.text}</p>
              <p className="text-sm text-gray-400">{selectedChoice.immediate}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-300">Short-term consequences:</p>
              {selectedChoice.shortTerm.map((consequence, i) => (
                <div key={i} className="pl-4 py-2 border-l-2 text-gray-400 text-sm" style={{ borderColor: principle.color.primary }}>
                  {consequence}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-300 mb-2">Long-term impact:</p>
              <p className="text-gray-300">{selectedChoice.longTerm}</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg" style={{
              backgroundColor: selectedChoice.lpChange >= 0 ? '#10B98120' : '#EF444420'
            }}>
              <p className="text-sm text-gray-300">LP Change:</p>
              <p className={`text-2xl font-bold ${selectedChoice.lpChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selectedChoice.lpChange >= 0 ? '+' : ''}{selectedChoice.lpChange}
              </p>
            </div>

            {currentScenario < scenarios.length - 1 ? (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: principle.color.primary,
                  color: 'white'
                }}
              >
                Next Scenario →
              </button>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-300 font-semibold">All scenarios complete!</p>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-200">Your Chain of Choices</h4>
          <div className="space-y-2">
            {history.map((entry, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-300">{entry.scenario}</p>
                  <p className="text-xs text-gray-500">{entry.choice}</p>
                </div>
                <span className={`text-sm font-bold ${entry.lp >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {entry.lp >= 0 ? '+' : ''}{entry.lp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teaching */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">The Cause-Effect Truth</h4>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold" style={{ color: principle.color.primary }}>
              Every action creates consequences.
            </span>{' '}
            In ranked, every misposition costs LP. In life, every choice compounds.
          </p>
          <p>
            The difference between Challenger and Diamond isn't mechanics. It's consequence awareness.
            They see 3 moves ahead. They know: "If I do X, opponent does Y, which leads to Z."
          </p>
          <p>
            <span className="font-semibold" style={{ color: principle.color.primary }}>
              Small choices create big effects.
            </span>{' '}
            Muting one toxic player doesn't seem important. But over 100 games, that's 10-20 extra wins
            from maintaining mental.
          </p>
          <p className="text-sm text-gray-400 italic pt-2 border-t border-gray-700">
            Pro players don't see the game. They see the chain of consequences. That's what you're learning here.
          </p>
        </div>
      </div>
    </div>
  );
}
