/**
 * Tone Translations for Hermetic Principles
 *
 * WHY: Each principle is explained using metaphors from different subcultures
 *
 * ARCHITECTURE:
 * - "scholarly" is the BASE tone (classic Hermetic language, source content)
 * - All other tones are TRANSLATIONS to specific metaphor domains
 * - Missing tones fall back to "scholarly" (or use AI translation in future)
 *
 * Each tone captures the same wisdom through a different lens
 */

import { ToneType } from "@/contexts/ToneContext";

export interface ToneTranslation {
  /** Short translation/hook - one powerful sentence */
  translation: string;
  /** Longer description - detailed explanation in the tone's voice */
  description: string;
}

/** Partial translations - not all tones need to be present */
export type PrincipleToneTranslations = Partial<Record<ToneType, ToneTranslation>>;

/**
 * Translations for each principle by tone
 * Key is the principle slug
 *
 * Note: Not all tones have translations yet.
 * Missing tones fall back to "scholarly" base tone.
 * Future: AI will generate missing translations on-demand.
 */
export const TONE_TRANSLATIONS: Record<string, PrincipleToneTranslations> = {
  mentalism: {
    // BASE TONE - Classic Hermetic
    scholarly: {
      translation: "The All is Mind; the Universe is Mental.",
      description: "This principle embodies the truth that all reality originates in consciousness. The material universe exists as a mental creation within the Infinite Mind. Your individual mind is a reflection of this universal principle—thought precedes manifestation. Understanding this gives you the key to transforming your experience through the mastery of mind.",
    },
    // LIFESTYLE TONES
    gamer: {
      translation: "Your mental game determines your rank. Tilt = lose. Focus = win. Same in League, same IRL.",
      description: "Your mindset is your build. Go into any ranked match tilted and you're hardstuck. Same with life—your mental determines what reality raid boss you're facing. Not magic. Just how the game works.",
    },
    surfer: {
      translation: "The ocean responds to your mind. Paddle out anxious, the waves feel heavy. Clear your head, and you'll find the perfect line.",
      description: "Your mental state shapes your session. Fear makes every wave look like a closeout. Confidence opens up sections you didn't see before. The ocean doesn't change—your perception of it does. Master your mind, master your waves.",
    },
    athlete: {
      translation: "Your head is where the game is won or lost. Train your mind like you train your body.",
      description: "Every elite athlete knows: the body does what the mind believes. Doubt in the final set means defeat. Confidence under pressure means clutch performance. Visualization isn't woo—it's how champions program their nervous system. Mental reps are real reps.",
    },
    gardener: {
      translation: "The garden reflects the gardener's mind. Tend your thoughts like you tend your soil.",
      description: "A scattered mind grows a scattered garden. Clear intention produces abundant harvests. Before you plant a seed, plant the vision. The garden is patient—it will grow whatever you truly believe it will grow. Your expectations become the soil's instructions.",
    },
    parent: {
      translation: "Children mirror what you think, not just what you say. Your mindset is their first inheritance.",
      description: "Kids don't hear your words—they feel your state. Anxious parent, anxious child. Peaceful parent, secure child. The family atmosphere is created by the dominant thoughts in the home. Before you correct behavior, check your own mental energy.",
    },
    // PROFESSIONAL TONES
    chef: {
      translation: "The kitchen amplifies your state. Cook stressed, everything burns. Cook present, flavors bloom. Your mind is the first ingredient.",
      description: "Before you touch a pan, check your headspace. Rush a sauce while anxious and it breaks. Approach the same recipe calm and focused, it comes together perfectly. The dish reflects the chef's mind. This is why mise en place is mental, not just physical.",
    },
    entrepreneur: {
      translation: "Your business reflects your beliefs. Vision precedes venture. Think poor, stay poor. Think abundant, attract opportunity.",
      description: "Every successful company started as a thought in someone's head. The market responds to conviction. Doubt in the founder means doubt in the product. Customers sense desperation vs confidence. Before the pivot meeting, check your mental state—it will determine the outcome.",
    },
    scientist: {
      translation: "The hypothesis shapes the experiment. Expectation influences observation. Mind and matter are more entangled than we admit.",
      description: "The observer effect isn't just quantum mechanics—it's everywhere. Your theoretical framework determines what data you see. Confirmation bias isn't a bug, it's a feature of how consciousness interacts with reality. The rigorous scientist examines their own mental model as carefully as their data.",
    },
    // CREATIVE TONES
    musician: {
      translation: "The music exists in mind before it exists in sound. Hear it first, then play it.",
      description: "Every great performance is played twice—once in the imagination, once on the instrument. Stage fright disrupts the inner sound. Confidence lets the internal music flow through. The audience doesn't just hear notes—they feel the performer's mental state. Inner silence creates outer brilliance.",
    },
    artist: {
      translation: "The canvas shows what the mind holds. Vision precedes execution. See it clearly, and the hand follows.",
      description: "Every masterpiece existed complete in the artist's imagination before the first brushstroke. Technical skill only matters when guided by clear vision. Doubt produces muddy work. Certainty creates commanding presence. The artwork is the artist's inner world made visible.",
    },
  },

  correspondence: {
    scholarly: {
      translation: "As above, so below; as below, so above.",
      description: "This principle teaches that there is harmony and correspondence between the different planes of existence—physical, mental, and spiritual. The same patterns repeat at every scale. Understanding one level reveals truth about all levels. The macrocosm reflects the microcosm. This law enables you to reason from the known to the unknown.",
    },
    gamer: {
      translation: "Same mechanics everywhere. Lane phase mirrors teamfight. Your jungle pathing reflects your life strategy. Patterns stack.",
      description: "Every system uses the same mechanics at different scales. How you cs in lane = how you handle IRL goals. Team coordination in WoW raids = how you coordinate projects. Master one level, understand all levels.",
    },
    surfer: {
      translation: "The same patterns repeat: ripples in a tide pool mirror swells in the open ocean. Read the small, understand the big.",
      description: "Watch water move anywhere—a bathtub, a river, the Pacific—same physics, different scale. The rip current that pulls you works like the undertow at your feet. Learn to read the patterns in the shorebreak, and you'll read the patterns in 20-foot waves. As above, so below.",
    },
    chef: {
      translation: "Every cuisine follows the same principles. Maillard reaction in a steak mirrors caramelization in onions. Master one technique, unlock them all.",
      description: "Fat + acid + heat + time. Whether it's a French mother sauce or a Thai curry, the fundamentals repeat. The ratio in a vinaigrette teaches you emulsification for aioli. A braise in a Dutch oven follows the same rules as a tagine in Morocco. Learn the pattern once, apply it forever.",
    },
    athlete: {
      translation: "The same principles govern all sports. Balance, timing, explosiveness—master one discipline, understand all movement.",
      description: "A tennis serve and a baseball pitch use the same kinetic chain. The footwork in boxing translates to basketball defense. Athletes who cross-train discover that excellence in one domain reveals principles that apply everywhere. The body doesn't know sport labels—it knows movement patterns.",
    },
    entrepreneur: {
      translation: "Small wins predict big wins. How you handle a $1K deal shows how you'll handle $1M. Patterns scale.",
      description: "The startup that can't serve 10 customers well won't magically serve 10,000. How you negotiate a small contract reveals your approach to the big ones. Business principles don't change with zeros—they just become more visible. Test your systems small before scaling them large.",
    },
    musician: {
      translation: "The same intervals create harmony whether played on piano or sung by a choir. Master one scale, understand all music.",
      description: "A perfect fifth sounds the same in Bach and in hip-hop. The circle of fifths governs blues and classical alike. Music theory is universal—genres are just different applications of the same mathematical relationships. Learn the deep structure, and every style becomes accessible.",
    },
  },

  vibration: {
    scholarly: {
      translation: "Nothing rests; everything moves; everything vibrates.",
      description: "This principle explains that everything in the universe is in constant motion—nothing is at rest. From the densest matter to the highest spirit, all things vibrate at different frequencies. The differences between manifestations of matter, energy, mind, and spirit result from varying rates of vibration. He who understands vibration can change his own vibration and influence the vibrations around him.",
    },
    gamer: {
      translation: "Energy is momentum. High energy = aggressive plays. Low energy = defensive rotations. You control the tempo.",
      description: "Everything has momentum and frequency. Aggressive playstyle vs defensive playstyle—same game, different frequency. Tilt is low-frequency chaos. Flow state is high-frequency clarity. You shift the vibe, you shift the game.",
    },
    surfer: {
      translation: "Feel the energy of the set. Some waves pulse with power, others drift. Match your paddle to the ocean's rhythm and you catch everything.",
      description: "Every wave carries a frequency. The 2-foot mushburger and the 10-foot bomb both vibrate—just different intensities. Your body has a frequency too. Match it to the wave's energy and you're in the pocket. Fight it and you're over the falls. Tune in, dial up, and ride.",
    },
    chef: {
      translation: "Heat is vibration. Low and slow unlocks collagen. High and fast creates crust. Control the energy, control the dish.",
      description: "Temperature is molecular movement. A gentle simmer coaxes flavor from bones over hours. A screaming hot wok locks in crunch in seconds. The same ingredient at different vibrations becomes completely different dishes. Master heat control and you master transformation.",
    },
    musician: {
      translation: "Music IS vibration. Every note is a frequency. Harmony is frequencies in mathematical relationship. You don't play music—you sculpt vibrations.",
      description: "Sound is air molecules vibrating at specific frequencies. A440 isn't just concert pitch—it's 440 vibrations per second. Chords are multiple frequencies vibrating together in ratios the ear finds pleasing. The musician who understands this doesn't just play notes—they consciously manipulate the vibrational field of a room.",
    },
    athlete: {
      translation: "Your energy state determines performance. High vibration = in the zone. Low vibration = sluggish and reactive.",
      description: "Athletes talk about energy for a reason. Before the big game, you can feel the vibration in the locker room. Teams that win championships often describe a collective elevation—everyone vibrating at peak frequency together. Training isn't just physical—it's learning to raise and sustain your energetic state.",
    },
  },

  polarity: {
    scholarly: {
      translation: "Everything is dual; everything has poles; opposites are identical in nature, different in degree.",
      description: "This principle teaches that opposites are really two extremes of the same thing, with many degrees between them. Hot and cold, light and dark, love and hate—all are the same phenomenon at different points on a spectrum. This understanding allows you to transmute one mental state into another by moving along the pole. What appears as opposite is merely a matter of degree.",
    },
    gamer: {
      translation: "Aggro and passive are the same stat (risk). Win streaks and lose streaks both teach. Every strength has a counter.",
      description: "Opposites are just different settings on the same slider. Full tank build vs full damage—both extremes on the survivability spectrum. Understanding both makes you adaptable. Best players slide between poles mid-match.",
    },
    surfer: {
      translation: "Duck dive or turtle roll. Paddle out or ride in. Every session balances pushing out and letting go.",
      description: "The ocean teaches polarity constantly. Paddle hard against the set, or conserve energy and wait for the lull—same goal, opposite approaches. Fear and stoke are two ends of the same adrenaline spectrum. The best surfers know when to charge and when to sit. Extreme either way, and you wipe out.",
    },
    chef: {
      translation: "Sweet and salty, acid and fat, hot and cold. Great dishes balance opposites. Harmony comes from tension.",
      description: "A dish without contrast is flat. The salt that cuts the caramel, the acid that brightens the richness, the cold ice cream on the warm brownie—opposites create depth. Too much of any one element and the dish collapses. Balance isn't avoiding extremes, it's using both.",
    },
    entrepreneur: {
      translation: "Risk and safety are the same spectrum. Growth and stability are the same dial. Master both poles or get stuck at one.",
      description: "The founder who only sees opportunity ignores risk and fails. The one who only sees risk never starts. Success lives in the dynamic balance—knowing when to push and when to consolidate. The same person can be too cautious or too reckless depending on context. Read the situation, choose the pole.",
    },
    artist: {
      translation: "Light and shadow are one thing. Without contrast, there is no form. Master the extremes to create depth.",
      description: "A painting without shadow is flat. A song without silence is noise. The artist who fears the dark end of the spectrum creates weak work. True mastery means commanding the full range—knowing when to push to extremes and when to dwell in subtlety. The boldest art lives at the edges.",
    },
  },

  rhythm: {
    scholarly: {
      translation: "Everything flows, out and in; everything has its tides; all things rise and fall.",
      description: "This principle teaches that in everything there is manifested a measured motion—a flow and inflow, a swing backward and forward, a pendulum-like movement. This rhythm manifests between every pair of opposites. There is always action and reaction, advance and retreat, rising and falling. Understanding rhythm allows you to neutralize its effects by rising above the pendular swing.",
    },
    gamer: {
      translation: "Can't grind 24/7. Burnout kills your rank harder than one bad game. Clean rotation = peak + rest. Pros know this.",
      description: "Everything runs in cycles—win streaks and lose streaks, grind sessions and cooldowns, meta shifts and off-meta. Fighting the rhythm burns you out. Working with it keeps you climbing. Even Faker takes breaks. This is law.",
    },
    surfer: {
      translation: "Sets come in rhythm. Waves pulse, lulls rest. Paddle paddle paddle, then wait. The ocean breathes. Breathe with it.",
      description: "The ocean doesn't deliver constant waves—it sends sets, then pauses. Fight the rhythm and you're exhausted before the good ones come. Honor the lulls, save energy, then go hard when the set hits. Tides rise and fall. Seasons bring different swells. Surf the rhythm or drown against it.",
    },
    chef: {
      translation: "Prep, cook, rest, serve. Rush the resting meat and you lose the juices. Every dish has its tempo.",
      description: "A kitchen has rhythm: the slow prep, the intense service, the cleanup calm. Try to rush bread and it won't rise. Skip the rest on a roast and it's dry. Seasons bring different ingredients, different menus. The best chefs feel the rhythm of their kitchen like a drummer feels the beat.",
    },
    musician: {
      translation: "Music IS rhythm. Tension and release. Crescendo and diminuendo. Even silence has duration.",
      description: "Without rhythm, there are only random sounds. The space between notes matters as much as the notes themselves. A rest isn't nothing—it's anticipation. The master musician doesn't fight the pulse—they ride it, play with it, sometimes against it for effect, but always in relationship to it.",
    },
    parent: {
      translation: "Children have rhythms. Sleep cycles, growth spurts, emotional seasons. Work with the cycle, not against it.",
      description: "Parenting against the rhythm is exhausting. The toddler needs routine. The teenager needs space then connection. Development comes in waves—plateau, then breakthrough. The wise parent reads the cycle and adjusts. Pushing during a downturn creates resistance. Supporting during an upturn accelerates growth.",
    },
  },

  "cause-effect": {
    scholarly: {
      translation: "Every Cause has its Effect; every Effect has its Cause; nothing escapes the Law.",
      description: "This principle embodies the truth that there is a cause for every effect and an effect from every cause. Nothing happens by chance. What we call chance is merely an unrecognized cause. The masses are carried along, obedient to environment, will, and desires of others stronger than themselves. The Masters rise above and become Causers rather than Effects.",
    },
    gamer: {
      translation: "Every input creates an output. One bad positioning = lost teamfight = lost game. Chain reactions. Nothing is RNG except the loot table.",
      description: "Every action chains into consequences. Miss one cs, lose lane pressure, lose tower, lose map control. Or: ward river, spot jungler, ping team, win fight. Mastering cause-effect means you control the game instead of reacting to it.",
    },
    surfer: {
      translation: "Where you paddle determines where you end up. Read the current, position early, and the wave puts you exactly where you need to be.",
      description: "Nothing in surfing is random. That perfect barrel? You set it up three waves ago with your paddle position. Caught in the impact zone? You chose to sit too far inside. Every wipeout traces back to a decision. Every epic ride was earned by reading conditions and positioning perfectly. Cause and effect, wave after wave.",
    },
    chef: {
      translation: "Burnt garlic means bitter sauce. There's no 'fixing it'—only starting over. Every step determines the next. Taste as you go.",
      description: "Cooking is pure cause and effect. Add cold butter too fast, the sauce breaks. Salt early and it penetrates; salt late and it sits on top. Every dish is the sum of a hundred small decisions. You can't un-burn, un-salt, or un-cook. The only insurance is attention at every step.",
    },
    scientist: {
      translation: "Every effect has a cause. The universe is not random—it's a chain of causation we are still mapping.",
      description: "Science is the systematic study of cause and effect. The scientist who dismisses results as 'random' has simply not found the cause yet. Controlled experiments isolate variables to reveal causal relationships. Understanding causation is power—it's how we cure diseases, launch rockets, and predict weather.",
    },
    entrepreneur: {
      translation: "Results don't lie. Revenue traces back to decisions. There are no accidents in business—only untracked causes.",
      description: "The founder who blames luck is avoiding accountability. That customer churned for a reason. That deal closed for a reason. The successful entrepreneur obsessively traces effects back to causes, then adjusts. Data isn't just metrics—it's the map of causation in your business.",
    },
  },

  gender: {
    scholarly: {
      translation: "Gender is in everything; everything has its Masculine and Feminine Principles.",
      description: "This principle teaches that gender manifests on all planes—not merely the physical. The masculine principle represents the active, projective, generating aspect. The feminine principle represents the receptive, nurturing, creative aspect. Neither is superior. Creation requires both. Mental, spiritual, and physical generation all require the union of these two principles.",
    },
    gamer: {
      translation: "Need both modes. Analyze the VOD (logic) + trust your instincts in-game (intuition). Grind + rest. Solo queue + touch grass.",
      description: "Not biological—it's about playstyle balance. Aggressive push (masculine) + patient farm (feminine). Shotcall (masculine) + adapt (feminine). Mechanical skill + game sense. One-tricks lack this. Complete players balance both.",
    },
    surfer: {
      translation: "Power and flow. Drive hard through the bottom turn, then let the wave guide you through the pocket. Force and surrender in every ride.",
      description: "Great surfing requires both energies. The masculine drive that projects you down the line, the feminine flow that reads the wave's face. Pump too hard with no feel and you outrun the section. All flow with no power and you bog in the flats. The magic happens when force and grace dance together.",
    },
    chef: {
      translation: "Structure and intuition. Follow the recipe's foundation, then taste and adjust. Precision and feel make the master.",
      description: "Baking demands precision (masculine): exact ratios, timed steps, controlled process. Cooking invites intuition (feminine): a pinch more salt, a splash more wine, a feeling for doneness. The complete chef commands both—the scientist's precision and the artist's instinct. Imbalance in either direction limits the craft.",
    },
    artist: {
      translation: "Technique and inspiration. Discipline and spontaneity. The masculine builds skill; the feminine channels muse.",
      description: "Art requires both forces. The masculine: practice, study, technical mastery, deliberate composition. The feminine: openness to inspiration, intuitive color choices, letting the work speak. Artists who only drill technique produce sterile work. Those who only wait for inspiration never develop craft. The master balances both.",
    },
    entrepreneur: {
      translation: "Strategy and intuition. Data and gut. Build systems (masculine), read people (feminine). Business needs both.",
      description: "The purely analytical founder misses market feel. The purely intuitive one can't scale. Strategy creates structure. Intuition spots opportunity. Masculine energy drives execution. Feminine energy builds culture and relationships. The complete founder knows which mode each moment requires.",
    },
    musician: {
      translation: "Practice and play. Discipline and expression. Technical rigor (masculine) serves emotional truth (feminine).",
      description: "Music demands both principles. The masculine: scales, exercises, theory, precision, countless hours of practice. The feminine: feel, emotion, interpretation, listening, letting the music flow through. A technician without soul is mechanical. A feeler without technique is limited. Mastery unites both.",
    },
  },
};

/**
 * Get translation for a principle by slug and tone
 * Falls back to scholarly (base tone) if translation not available
 */
export function getTranslation(slug: string, tone: ToneType): ToneTranslation {
  const principleTranslations = TONE_TRANSLATIONS[slug];

  if (!principleTranslations) {
    return {
      translation: "Translation not available",
      description: "Description not available",
    };
  }

  // Try requested tone first
  const requestedTranslation = principleTranslations[tone];
  if (requestedTranslation) {
    return requestedTranslation;
  }

  // Fall back to scholarly (base tone)
  const scholarlyTranslation = principleTranslations.scholarly;
  if (scholarlyTranslation) {
    return scholarlyTranslation;
  }

  // Last resort: any available translation
  const anyTranslation = Object.values(principleTranslations)[0];
  if (anyTranslation) {
    return anyTranslation;
  }

  return {
    translation: "Translation not available",
    description: "Description not available",
  };
}

/**
 * Get all translations for a principle
 */
export function getAllTranslations(slug: string): PrincipleToneTranslations | null {
  return TONE_TRANSLATIONS[slug] || null;
}

/**
 * Check if a translation exists for a specific principle + tone combo
 */
export function hasTranslation(slug: string, tone: ToneType): boolean {
  const translations = TONE_TRANSLATIONS[slug];
  return translations ? tone in translations : false;
}

/**
 * Get available tones for a principle (tones that have translations)
 */
export function getAvailableTones(slug: string): ToneType[] {
  const translations = TONE_TRANSLATIONS[slug];
  if (!translations) return [];
  return Object.keys(translations) as ToneType[];
}
