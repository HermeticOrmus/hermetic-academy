import { Principle } from "@/lib/constants";

/**
 * Simple content display for principle pages
 * Replaces complex interactive experiences with clean educational content
 */

interface PrincipleContentProps {
  principle: Principle;
}

export function PrincipleContent({ principle }: PrincipleContentProps) {
  // Example content structure for each principle
  const contentMap: Record<string, { keyConcepts: string[]; examples: { title: string; description: string }[]; reflections: string[] }> = {
    mentalism: {
      keyConcepts: [
        "Reality is fundamentally mental—your consciousness shapes your experience",
        "Thoughts are the primary cause; material effects follow",
        "Changing your mind changes your world",
        "Mental discipline is the foundation of all mastery",
      ],
      examples: [
        {
          title: "Two People, Same Situation",
          description: "One person sees a setback as failure, spirals into depression. Another sees it as feedback, adjusts and succeeds. Same external reality, different mental frameworks, completely different outcomes.",
        },
        {
          title: "The Placebo Effect",
          description: "Your mind believes the sugar pill is medicine—and your body responds accordingly. Mind creates physiological reality.",
        },
        {
          title: "Learning Anything",
          description: "Believe you can't learn math? You won't invest effort. Believe you can? You persist through challenges. The belief determines the reality.",
        },
      ],
      reflections: [
        "What recurring thoughts shape my daily experience?",
        "How would my life change if I changed one core belief?",
        "Where am I blaming external reality for internal mental patterns?",
      ],
    },
    correspondence: {
      keyConcepts: [
        "Patterns repeat across all scales of existence",
        "Individual behavior mirrors collective culture",
        "Personal healing reflects systemic change",
        "Understanding one level reveals all levels",
      ],
      examples: [
        {
          title: "Family Dynamics = Company Dynamics",
          description: "The way your family handles conflict mirrors how organizations handle conflict. Avoidance at home = conflict-avoidant company culture. Same pattern, different scale.",
        },
        {
          title: "Personal Finance = National Economics",
          description: "Debt cycles, boom-bust patterns, resource allocation—same principles govern your wallet and entire economies.",
        },
        {
          title: "Cell Structure = Social Structure",
          description: "Cells have membranes (boundaries), organelles (specialized functions), communication systems. So do healthy organizations. Structure mirrors across scales.",
        },
      ],
      reflections: [
        "What pattern in my life mirrors a larger societal pattern?",
        "How does my internal world correspond to my external circumstances?",
        "Where can I apply lessons from one domain to another?",
      ],
    },
    vibration: {
      keyConcepts: [
        "Everything is in constant motion and vibrates at different frequencies",
        "High vibration = clarity, energy, flow; Low vibration = confusion, lethargy, stuck",
        "You can shift your vibrational state through practice",
        "Resonance: similar frequencies amplify each other",
      ],
      examples: [
        {
          title: "Energy Throughout the Day",
          description: "Morning clarity (high vibration) vs afternoon fog (low vibration). Same person, different energetic states. You can learn to shift between them intentionally.",
        },
        {
          title: "People and Environments",
          description: "Certain people/places energize you (resonance). Others drain you (dissonance). This is vibrational compatibility, not personality.",
        },
        {
          title: "Mood Contagion",
          description: "Walk into a room full of anxious people—you feel anxious. Happy people—you feel lifted. Vibrations transfer through proximity.",
        },
      ],
      reflections: [
        "What activities raise my vibration? Lower it?",
        "Who do I resonate with? Who creates dissonance?",
        "How can I consciously shift my energetic state?",
      ],
    },
    polarity: {
      keyConcepts: [
        "Everything is dual; opposites are identical in nature, different in degree",
        "Hot and cold are the same thing (temperature) at different points",
        "Mastery means moving consciously between poles",
        "Extremes often produce opposite results",
      ],
      examples: [
        {
          title: "Love and Hate",
          description: "Both are intense emotional investment. Indifference (neutrality) is their opposite. Love can flip to hate because they're on the same spectrum.",
        },
        {
          title: "Confidence and Arrogance",
          description: "Same quality (self-assurance) at different degrees. Too little = insecurity. Balanced = confidence. Too much = arrogance.",
        },
        {
          title: "Minimalism and Hoarding",
          description: "Both are control strategies around possessions. One through absence, one through accumulation. Balanced relationship = neither extreme.",
        },
      ],
      reflections: [
        "Where am I stuck at an extreme?",
        "What opposing quality could bring balance?",
        "How are my 'opposites' actually related?",
      ],
    },
    rhythm: {
      keyConcepts: [
        "Everything flows in cycles—rise and fall, expansion and contraction",
        "Fighting rhythm exhausts you; working with it sustains you",
        "Recognize which phase you're in and act accordingly",
        "Rest is as essential as action",
      ],
      examples: [
        {
          title: "Seasons of Life",
          description: "Growth periods followed by integration periods. Trying to grow 24/7 burns you out. Trying to rest forever creates stagnation. Rhythm requires both.",
        },
        {
          title: "Work Cycles",
          description: "Intense focus sprints + recovery periods = sustainable productivity. Constant grinding (ignoring rhythm) = burnout.",
        },
        {
          title: "Relationship Cycles",
          description: "Closeness and distance naturally cycle. Trying to maintain constant peak intimacy is exhausting. Rhythm allows natural ebb and flow.",
        },
      ],
      reflections: [
        "What natural cycles am I fighting?",
        "Where do I need more rest? More action?",
        "How can I honor rhythm instead of forcing constant output?",
      ],
    },
    "cause-effect": {
      keyConcepts: [
        "Every action creates consequences—nothing happens by chance",
        "Small causes compound into large effects",
        "Mastery means tracing chains backward to root causes",
        "You have more control than you think when you understand causation",
      ],
      examples: [
        {
          title: "Health Outcomes",
          description: "Poor sleep → stress hormone dysregulation → inflammation → chronic disease. One cause cascades into effects across years.",
        },
        {
          title: "Relationship Patterns",
          description: "Unhealed childhood wound → fear of vulnerability → choosing emotionally unavailable partners → loneliness. The original cause echoes through life.",
        },
        {
          title: "Financial Trajectory",
          description: "One small debt → interest compounds → stress affects work → income drops → more debt. Or: one small investment → compounds → security.",
        },
      ],
      reflections: [
        "What effects in my life can I trace to specific causes?",
        "Where am I treating symptoms instead of addressing root causes?",
        "What small change today would cascade into significant results?",
      ],
    },
    gender: {
      keyConcepts: [
        "Everything contains masculine and feminine energies (not biological sex)",
        "Masculine = action, analysis, structure, assertion",
        "Feminine = receptivity, intuition, flow, nurturing",
        "Balance creates wholeness and generative power",
      ],
      examples: [
        {
          title: "Problem Solving",
          description: "Masculine = analyze logically, break down, strategize. Feminine = step back, allow insight to emerge, trust intuition. Best solutions use both.",
        },
        {
          title: "Creating Anything",
          description: "Feminine = vision, inspiration, possibility. Masculine = execution, structure, completion. Neither alone creates—both are required.",
        },
        {
          title: "Leadership",
          description: "Masculine = set direction, make decisions, hold boundaries. Feminine = listen deeply, adapt, build connection. Effective leaders balance both.",
        },
      ],
      reflections: [
        "Which energy do I over-rely on?",
        "Where could I benefit from more masculine energy? More feminine?",
        "How can I integrate both into my work and relationships?",
      ],
    },
  };

  const content = contentMap[principle.slug] || contentMap.mentalism;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Understanding Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Understanding {principle.title}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            <span className="text-cosmic-purple font-semibold">
              "{principle.ancientTruth}"
            </span>
          </p>
          <p className="text-gray-400 leading-relaxed">{principle.description}</p>
        </div>

        {/* Key Concepts */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Key Concepts</h2>
          <ul className="space-y-3">
            {content.keyConcepts.map((concept, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-cosmic-purple mt-1">•</span>
                <span className="text-gray-400 leading-relaxed">{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real-World Applications */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            How This Appears in Life
          </h2>
          <div className="space-y-6">
            {content.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection Prompts */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Questions to Contemplate
          </h2>
          <ul className="space-y-3">
            {content.reflections.map((question, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-cosmic-gold mt-1">?</span>
                <span className="text-gray-400 leading-relaxed">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
