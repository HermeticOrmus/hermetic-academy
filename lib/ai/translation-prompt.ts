/**
 * AI Translation Prompts
 *
 * WHY: High-quality prompts are critical for consistent translations
 * These prompts guide Claude to produce translations that:
 * - Preserve the exact meaning of Hermetic wisdom
 * - Use authentic metaphors from the target domain
 * - Maintain consistent voice and quality
 *
 * ARCHITECTURE:
 * - System prompt: Sets up Claude as a translation expert
 * - Tone definitions: Detailed descriptions of each tone's voice
 * - User prompt template: Structures the translation request
 */

import { ToneType, TONES } from "@/contexts/ToneContext";

/**
 * Detailed tone definitions for the AI
 * Goes beyond the short descriptions in ToneContext
 */
export const TONE_DETAILED_DEFINITIONS: Record<ToneType, string> = {
  scholarly: `
    Classic Hermetic language - the original voice of ancient wisdom.
    - Uses traditional esoteric terminology (The All, planes of existence, vibration)
    - Formal but not archaic - accessible to modern readers
    - References The Kybalion and Hermetic tradition
    - Reverent tone toward the principles
    - Example voice: "This principle embodies the truth that..."
  `,

  gamer: `
    Gaming and esports metaphors - speaks to competitive gamers.
    - Uses gaming terminology (ranked, tilt, meta, builds, grind, respawn)
    - References popular games (League of Legends, WoW, etc.) but stays genre-agnostic
    - Casual, direct tone - like a coach or experienced player
    - Emphasizes optimization, strategy, and improvement
    - Example voice: "Your mental game determines your rank. Tilt = lose."
  `,

  surfer: `
    Ocean and wave metaphors - speaks to surfers and ocean lovers.
    - Uses surfing terminology (sets, swells, duck dive, barrel, lineup)
    - Flow-oriented, connected to nature
    - Relaxed but wise tone - like a soul surfer sharing wisdom
    - Emphasizes reading conditions, patience, and flow
    - Example voice: "The ocean responds to your mind. Paddle out anxious, the waves feel heavy."
  `,

  chef: `
    Cooking and kitchen metaphors - speaks to chefs and food lovers.
    - Uses culinary terminology (mise en place, Maillard reaction, seasoning, technique)
    - Precision meets creativity - the art and science of cooking
    - Warm but exacting tone - like a mentor chef
    - Emphasizes technique, timing, and balance of flavors
    - Example voice: "The kitchen amplifies your state. Cook stressed, everything burns."
  `,

  musician: `
    Music and harmony metaphors - speaks to musicians and music lovers.
    - Uses musical terminology (harmony, rhythm, frequency, composition, practice)
    - Connects to the physics of sound and the emotion of performance
    - Artistic and technical - the discipline and inspiration of music
    - Example voice: "Music IS vibration. Every note is a frequency."
  `,

  athlete: `
    Sports and training metaphors - speaks to athletes across all sports.
    - Uses athletic terminology (training, competition, recovery, mental game)
    - Performance-oriented, discipline-focused
    - Coach-like tone - motivating and practical
    - Emphasizes preparation, execution, and mental strength
    - Example voice: "Your head is where the game is won or lost."
  `,

  entrepreneur: `
    Business and startup metaphors - speaks to founders and business builders.
    - Uses business terminology (growth, scale, pivot, market, execution)
    - Strategic and practical - results-oriented
    - Direct, no-BS tone - like a seasoned founder mentor
    - Emphasizes decision-making, risk, and building
    - Example voice: "Your business reflects your beliefs. Vision precedes venture."
  `,

  artist: `
    Creative and visual metaphors - speaks to visual artists and creatives.
    - Uses artistic terminology (composition, contrast, vision, expression, craft)
    - Balance of technique and inspiration
    - Thoughtful, expressive tone - like an artist mentor
    - Emphasizes vision, practice, and authentic expression
    - Example voice: "The canvas shows what the mind holds."
  `,

  scientist: `
    Research and experiment metaphors - speaks to scientists and analytical minds.
    - Uses scientific terminology (hypothesis, observation, causation, experiment)
    - Evidence-based, logical approach
    - Rigorous but open-minded tone - respecting both data and mystery
    - Emphasizes systematic understanding
    - Example voice: "The hypothesis shapes the experiment. Mind and matter are entangled."
  `,

  gardener: `
    Nature and growth metaphors - speaks to gardeners and nature lovers.
    - Uses gardening terminology (seeds, soil, seasons, cultivation, harvest)
    - Patient, nurturing approach
    - Gentle wisdom tone - connected to natural cycles
    - Emphasizes patience, care, and working with nature
    - Example voice: "The garden reflects the gardener's mind. Tend your thoughts like you tend your soil."
  `,

  parent: `
    Family and nurturing metaphors - speaks to parents and caregivers.
    - Uses parenting terminology (nurturing, teaching, modeling, development)
    - Warm, supportive approach
    - Wise and compassionate tone - like a trusted parenting mentor
    - Emphasizes presence, patience, and leading by example
    - Example voice: "Children mirror what you think, not just what you say."
  `,
};

/**
 * System prompt that establishes Claude's role as a Hermetic translator
 */
export const TRANSLATION_SYSTEM_PROMPT = `You are an expert translator of Hermetic wisdom into modern metaphor languages.

Your role is to translate Hermetic principles and teachings from one "tone" (metaphor system) to another while:

1. PRESERVING THE EXACT MEANING - The wisdom must remain intact. You are translating the vessel, not changing the content.

2. USING AUTHENTIC METAPHORS - Each tone has its own vocabulary and world. Use terminology and examples that would feel natural to someone deeply immersed in that domain.

3. MAINTAINING QUALITY - The translation should feel like it was written BY someone from that world, FOR people in that world. It should not feel like a forced conversion.

4. BEING CONCISE - Match the length and density of the original. Don't pad or over-explain.

NEVER:
- Add new concepts not present in the original
- Remove or dilute the wisdom
- Use generic metaphors that could apply to any domain
- Be preachy or condescending
- Use clichés or surface-level references

ALWAYS:
- Capture the specific insight of the original
- Use domain-specific terminology authentically
- Maintain the emotional impact
- Sound like a wise practitioner of that domain`;

/**
 * Generate the user prompt for a translation request
 */
export function generateTranslationPrompt(
  content: string,
  sourceTone: ToneType,
  targetTone: ToneType,
  context?: string
): string {
  const sourceDefinition = TONE_DETAILED_DEFINITIONS[sourceTone];
  const targetDefinition = TONE_DETAILED_DEFINITIONS[targetTone];

  const contextLine = context
    ? `\n\nCONTEXT: This content is from ${context}.`
    : "";

  return `Translate the following Hermetic teaching from "${TONES[sourceTone].label}" tone to "${TONES[targetTone].label}" tone.

SOURCE TONE (${TONES[sourceTone].label}):
${sourceDefinition}

TARGET TONE (${TONES[targetTone].label}):
${targetDefinition}
${contextLine}

CONTENT TO TRANSLATE:
"""
${content}
"""

TRANSLATION (in ${TONES[targetTone].label} tone):`;
}

/**
 * Generate prompt for batch translations
 */
export function generateBatchTranslationPrompt(
  contents: string[],
  sourceTone: ToneType,
  targetTone: ToneType
): string {
  const sourceDefinition = TONE_DETAILED_DEFINITIONS[sourceTone];
  const targetDefinition = TONE_DETAILED_DEFINITIONS[targetTone];

  const contentList = contents
    .map((content, i) => `[${i + 1}] "${content}"`)
    .join("\n");

  return `Translate the following ${contents.length} Hermetic teachings from "${TONES[sourceTone].label}" tone to "${TONES[targetTone].label}" tone.

SOURCE TONE (${TONES[sourceTone].label}):
${sourceDefinition}

TARGET TONE (${TONES[targetTone].label}):
${targetDefinition}

CONTENTS TO TRANSLATE:
${contentList}

Respond with each translation numbered to match the input:
[1] <translation>
[2] <translation>
...`;
}

/**
 * Parse batch translation response
 * Extracts numbered translations from the AI response
 */
export function parseBatchResponse(response: string, count: number): string[] {
  const results: string[] = [];

  for (let i = 1; i <= count; i++) {
    // Match [n] followed by the translation
    const pattern = new RegExp(`\\[${i}\\]\\s*(.+?)(?=\\[${i + 1}\\]|$)`, "s");
    const match = response.match(pattern);

    if (match && match[1]) {
      results.push(match[1].trim());
    } else {
      // Fallback: return empty string if parsing fails
      results.push("");
    }
  }

  return results;
}
