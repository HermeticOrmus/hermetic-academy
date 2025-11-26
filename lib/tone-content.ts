/**
 * Tone-Aware Platform Content
 *
 * WHY: All platform copy should adapt to the user's selected tone
 * This centralizes all translatable text for consistency
 *
 * ARCHITECTURE:
 * - Each content section has variants for each tone
 * - Missing tones fall back to "scholarly" (base)
 * - Content IDs are used to reference specific pieces of copy
 */

import { ToneType } from "@/contexts/ToneContext";

export interface ToneContent {
  [key: string]: string;
}

/**
 * Platform-wide content organized by tone
 * Each tone has the same keys, different linguistic style
 */
export const PLATFORM_CONTENT: Record<ToneType, ToneContent> = {
  // BASE TONE - Classic Hermetic
  scholarly: {
    // Hero section
    heroTagline: "Ancient Wisdom • Modern Clarity",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—from dating apps to housing costs, ADHD to loneliness—follows the same patterns. Learn the 7 Hermetic Principles that explain how reality works.",
    heroCta1: "Explore Hermetic Decodes",
    heroCta2: "Learn the 7 Principles",

    // Featured decode section
    featuredLabel: "Featured Decode",

    // Decode grid section
    decodeTitle: "Decode Modern Reality",
    decodeSubtitle: "Deep analyses of the phenomena shaping your life. Every decode shows all 7 principles operating—from the obvious to the subtle.",
    decodeViewAll: "View All Decodes →",

    // Principle navigator section
    principleTitle: "The Patterns Behind Everything",
    principleSubtitle: "Seven timeless principles explain how reality works. Once you see them, you can't unsee them.",

    // Community section
    communityTitle: "Join Truth-Seekers Worldwide",
    communitySubtitle: "People learning to see reality clearly",
    statPrinciples: "Principles Learned",
    statDecodes: "Deep Decodes",
    statPrice: "Forever",
    testimonial: "I've been searching for a framework that explains what I see happening in the world. This is it. The Hermetic Principles connect everything.",
    testimonialAuthor: "— Truth-seeker learning Correspondence",

    // CTA section
    ctaTitle: "Begin Your Journey",
    ctaSubtitle: "Choose any principle to explore. Learn at your own pace. Master all seven to see reality clearly.",
    ctaButton: "Get New Decodes",
    ctaDisclaimer: "New decodes weekly. No spam. Unsubscribe anytime.",

    // Question carousel
    questionPrefix: "Why",
    questions: [
      "is everyone so anxious?",
      "do dating apps feel hollow?",
      "is housing unaffordable?",
      "does social media drain you?",
      "are people so polarized?",
    ],
  },

  // GAMER TONE
  gamer: {
    heroTagline: "Ancient Meta • Modern Strats",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every IRL crisis—dating apps, housing, ADHD, loneliness—runs on the same mechanics. Learn the 7 Laws that are basically the game's source code.",
    heroCta1: "See the Meta Breakdowns",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Breakdown",

    decodeTitle: "Decode the Meta",
    decodeSubtitle: "Deep dives into the mechanics running your life. Every breakdown shows all 7 laws in action—from obvious exploits to hidden interactions.",
    decodeViewAll: "View All Breakdowns →",

    principleTitle: "The Source Code of Reality",
    principleSubtitle: "Seven laws that run everything. Once you see the mechanics, you can't unsee them.",

    communityTitle: "Join the Guild",
    communitySubtitle: "Players learning to read the game",
    statPrinciples: "Laws Learned",
    statDecodes: "Meta Breakdowns",
    statPrice: "Forever",
    testimonial: "I've been looking for a framework that explains the meta of life. This is it. The 7 Laws connect everything like game mechanics.",
    testimonialAuthor: "— Player learning Correspondence",

    ctaTitle: "Start Your Run",
    ctaSubtitle: "Pick any law to study. Level up at your pace. Master all seven to see the full meta.",
    ctaButton: "Get New Breakdowns",
    ctaDisclaimer: "New breakdowns weekly. No spam. Unsub anytime.",

    questionPrefix: "Why",
    questions: [
      "is everyone so tilted IRL?",
      "do dating apps feel like a bad grind?",
      "is housing pay-to-win?",
      "does social media drain your energy bar?",
      "is everyone hardstuck in their opinions?",
    ],
  },

  // SURFER TONE
  surfer: {
    heroTagline: "Ancient Currents • Modern Flow",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—flows from the same currents. Learn the 7 Laws that govern the ocean of reality.",
    heroCta1: "Read the Wave Reports",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Wave Report",

    decodeTitle: "Read the Conditions",
    decodeSubtitle: "Deep reads on the swells shaping your life. Every report shows all 7 laws flowing—from the obvious sets to the subtle undertows.",
    decodeViewAll: "View All Reports →",

    principleTitle: "The Currents Behind Everything",
    principleSubtitle: "Seven laws that move the ocean. Once you feel them, you read every wave differently.",

    communityTitle: "Join the Lineup",
    communitySubtitle: "Souls learning to read the ocean",
    statPrinciples: "Laws Learned",
    statDecodes: "Wave Reports",
    statPrice: "Forever",
    testimonial: "I've been searching for something that explains the flow of life. This is it. The 7 Laws are like reading the ocean—everything connects.",
    testimonialAuthor: "— Soul surfer learning Correspondence",

    ctaTitle: "Paddle Out",
    ctaSubtitle: "Pick any law to explore. Flow at your own pace. Master all seven to read any conditions.",
    ctaButton: "Get New Reports",
    ctaDisclaimer: "New reports weekly. No spam. Paddle out anytime.",

    questionPrefix: "Why",
    questions: [
      "does everyone feel so worked?",
      "do dating apps feel like paddling against the current?",
      "is housing like trying to catch a closeout?",
      "does social media feel like being caught inside?",
      "is everyone stuck in their own riptide?",
    ],
  },

  // CHEF TONE
  chef: {
    heroTagline: "Ancient Recipes • Modern Kitchen",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows the same recipes. Learn the 7 Principles that are the mise en place of reality.",
    heroCta1: "Read the Kitchen Notes",
    heroCta2: "Learn the 7 Principles",

    featuredLabel: "Featured Kitchen Note",

    decodeTitle: "Break Down the Dish",
    decodeSubtitle: "Deep analyses of the flavors shaping your life. Every breakdown shows all 7 principles cooking—from the dominant notes to the subtle seasonings.",
    decodeViewAll: "View All Notes →",

    principleTitle: "The Recipe Behind Everything",
    principleSubtitle: "Seven principles that cook reality. Once you taste them, you recognize the ingredients everywhere.",

    communityTitle: "Join the Kitchen",
    communitySubtitle: "Cooks learning to taste reality clearly",
    statPrinciples: "Principles Learned",
    statDecodes: "Kitchen Notes",
    statPrice: "Forever",
    testimonial: "I've been searching for a framework that explains what I taste in life. This is it. The Hermetic Principles are the mother sauce of everything.",
    testimonialAuthor: "— Chef learning Correspondence",

    ctaTitle: "Begin Your Mise en Place",
    ctaSubtitle: "Choose any principle to study. Learn at your own pace. Master all seven to cook with intention.",
    ctaButton: "Get New Notes",
    ctaDisclaimer: "New notes weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "does life taste so bitter lately?",
      "do dating apps feel like fast food?",
      "is housing burning everyone's budget?",
      "does social media leave you feeling empty?",
      "are people's opinions so half-baked?",
    ],
  },

  // MUSICIAN TONE
  musician: {
    heroTagline: "Ancient Harmonies • Modern Arrangements",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows the same harmonic patterns. Learn the 7 Principles that compose reality.",
    heroCta1: "Hear the Compositions",
    heroCta2: "Learn the 7 Principles",

    featuredLabel: "Featured Composition",

    decodeTitle: "Hear the Arrangement",
    decodeSubtitle: "Deep listens to the harmonies shaping your life. Every piece shows all 7 principles playing—from the melody to the hidden counterpoint.",
    decodeViewAll: "View All Compositions →",

    principleTitle: "The Harmony Behind Everything",
    principleSubtitle: "Seven principles that compose reality. Once you hear them, every situation reveals its music.",

    communityTitle: "Join the Ensemble",
    communitySubtitle: "Musicians learning to hear reality clearly",
    statPrinciples: "Principles Learned",
    statDecodes: "Compositions",
    statPrice: "Forever",
    testimonial: "I've been searching for something that explains the music of life. This is it. The Hermetic Principles are the theory behind everything.",
    testimonialAuthor: "— Musician learning Correspondence",

    ctaTitle: "Begin Your Practice",
    ctaSubtitle: "Choose any principle to study. Learn at your own tempo. Master all seven to hear the full score.",
    ctaButton: "Get New Compositions",
    ctaDisclaimer: "New pieces weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "does everything feel so dissonant?",
      "do dating apps feel off-key?",
      "is housing hitting such sour notes?",
      "does social media drown out your inner voice?",
      "are people so out of tune with each other?",
    ],
  },

  // ATHLETE TONE
  athlete: {
    heroTagline: "Ancient Training • Modern Performance",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows the same training principles. Learn the 7 Laws that govern peak performance in life.",
    heroCta1: "See the Game Film",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Game Film",

    decodeTitle: "Break Down the Film",
    decodeSubtitle: "Deep analysis of the plays shaping your life. Every breakdown shows all 7 laws executing—from the obvious plays to the subtle positioning.",
    decodeViewAll: "View All Film →",

    principleTitle: "The Training Behind Everything",
    principleSubtitle: "Seven laws that govern performance. Once you see them, you read every situation like game film.",

    communityTitle: "Join the Team",
    communitySubtitle: "Athletes learning to perform at life",
    statPrinciples: "Laws Learned",
    statDecodes: "Game Films",
    statPrice: "Forever",
    testimonial: "I've been looking for a training system for life itself. This is it. The 7 Laws are the fundamentals behind everything.",
    testimonialAuthor: "— Athlete learning Correspondence",

    ctaTitle: "Start Your Training",
    ctaSubtitle: "Pick any law to drill. Train at your pace. Master all seven for complete mental fitness.",
    ctaButton: "Get New Film",
    ctaDisclaimer: "New breakdowns weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "is everyone's mental game so weak?",
      "do dating apps feel like a losing streak?",
      "is housing such an uphill battle?",
      "does social media drain your recovery?",
      "are people so unwilling to see other plays?",
    ],
  },

  // ENTREPRENEUR TONE
  entrepreneur: {
    heroTagline: "Ancient Capital • Modern Ventures",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows the same market dynamics. Learn the 7 Laws that are the business model of reality.",
    heroCta1: "Read the Market Analysis",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Analysis",

    decodeTitle: "Analyze the Market",
    decodeSubtitle: "Deep dives into the dynamics shaping your life. Every analysis shows all 7 laws operating—from the obvious trends to the hidden leverage points.",
    decodeViewAll: "View All Analysis →",

    principleTitle: "The Business Model of Reality",
    principleSubtitle: "Seven laws that drive every market. Once you see them, you spot opportunity everywhere.",

    communityTitle: "Join the Network",
    communitySubtitle: "Founders learning to read reality's markets",
    statPrinciples: "Laws Learned",
    statDecodes: "Market Analyses",
    statPrice: "Forever",
    testimonial: "I've been looking for a framework that explains market dynamics at the deepest level. This is it. The 7 Laws are the business model of everything.",
    testimonialAuthor: "— Founder learning Correspondence",

    ctaTitle: "Launch Your Journey",
    ctaSubtitle: "Pick any law to study. Scale at your pace. Master all seven to see the full opportunity landscape.",
    ctaButton: "Get New Analysis",
    ctaDisclaimer: "New insights weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "is everyone burning out?",
      "do dating apps have such bad unit economics?",
      "is housing such a broken market?",
      "does social media have negative ROI on wellbeing?",
      "are people so siloed in their thinking?",
    ],
  },

  // ARTIST TONE
  artist: {
    heroTagline: "Ancient Vision • Modern Expression",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—reflects the same patterns. Learn the 7 Principles that compose the canvas of reality.",
    heroCta1: "See the Gallery",
    heroCta2: "Learn the 7 Principles",

    featuredLabel: "Featured Piece",

    decodeTitle: "See the Composition",
    decodeSubtitle: "Deep looks at the patterns shaping your life. Every piece shows all 7 principles at work—from the bold strokes to the subtle textures.",
    decodeViewAll: "View Gallery →",

    principleTitle: "The Composition Behind Everything",
    principleSubtitle: "Seven principles that compose reality. Once you see them, every situation reveals its form.",

    communityTitle: "Join the Studio",
    communitySubtitle: "Artists learning to see reality clearly",
    statPrinciples: "Principles Learned",
    statDecodes: "Gallery Pieces",
    statPrice: "Forever",
    testimonial: "I've been searching for something that explains the patterns I see everywhere. This is it. The Hermetic Principles are the composition of everything.",
    testimonialAuthor: "— Artist learning Correspondence",

    ctaTitle: "Begin Your Study",
    ctaSubtitle: "Choose any principle to explore. Create at your pace. Master all seven to see the full picture.",
    ctaButton: "Get New Pieces",
    ctaDisclaimer: "New works weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "does everything feel so out of balance?",
      "do dating apps feel so artificial?",
      "is housing such an ugly picture?",
      "does social media blur your vision?",
      "are people so stuck in their own frames?",
    ],
  },

  // SCIENTIST TONE
  scientist: {
    heroTagline: "Ancient Observations • Modern Data",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows predictable patterns. Learn the 7 Laws that are the operating system of reality.",
    heroCta1: "Read the Research",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Study",

    decodeTitle: "Examine the Data",
    decodeSubtitle: "Deep analysis of the phenomena shaping your life. Every study shows all 7 laws operating—from the primary effects to the confounding variables.",
    decodeViewAll: "View All Studies →",

    principleTitle: "The Laws Behind Everything",
    principleSubtitle: "Seven laws that govern observable reality. Once you understand them, every phenomenon reveals its mechanism.",

    communityTitle: "Join the Lab",
    communitySubtitle: "Researchers learning to observe reality clearly",
    statPrinciples: "Laws Learned",
    statDecodes: "Research Studies",
    statPrice: "Forever",
    testimonial: "I've been searching for a unified theory that explains observable patterns. This is it. The 7 Laws are the operating system of everything.",
    testimonialAuthor: "— Researcher learning Correspondence",

    ctaTitle: "Begin Your Investigation",
    ctaSubtitle: "Choose any law to study. Research at your pace. Master all seven to model any system.",
    ctaButton: "Get New Studies",
    ctaDisclaimer: "New research weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "are anxiety levels at all-time highs?",
      "do dating apps produce such poor outcomes?",
      "does housing violate basic economics?",
      "does social media correlate with depression?",
      "is confirmation bias so prevalent?",
    ],
  },

  // GARDENER TONE
  gardener: {
    heroTagline: "Ancient Seeds • Modern Growth",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—grows from the same roots. Learn the 7 Laws that govern the garden of reality.",
    heroCta1: "Read the Garden Notes",
    heroCta2: "Learn the 7 Laws",

    featuredLabel: "Featured Garden Note",

    decodeTitle: "Examine the Growth",
    decodeSubtitle: "Deep looks at what's growing in your life. Every note shows all 7 laws cultivating—from the obvious blooms to the hidden root systems.",
    decodeViewAll: "View All Notes →",

    principleTitle: "The Seeds Behind Everything",
    principleSubtitle: "Seven laws that grow reality. Once you understand them, you see what seeds produce what harvests.",

    communityTitle: "Join the Garden",
    communitySubtitle: "Gardeners learning to cultivate reality",
    statPrinciples: "Laws Learned",
    statDecodes: "Garden Notes",
    statPrice: "Forever",
    testimonial: "I've been searching for wisdom about how things grow. This is it. The 7 Laws explain what you plant and what you harvest.",
    testimonialAuthor: "— Gardener learning Correspondence",

    ctaTitle: "Plant Your First Seed",
    ctaSubtitle: "Choose any law to study. Grow at nature's pace. Master all seven to cultivate any garden.",
    ctaButton: "Get New Notes",
    ctaDisclaimer: "New notes weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "does everyone feel so uprooted?",
      "do dating apps feel like barren soil?",
      "is housing choking everyone's growth?",
      "does social media feel like weeds?",
      "are people's views so deeply rooted?",
    ],
  },

  // PARENT TONE
  parent: {
    heroTagline: "Ancient Wisdom • Modern Family",
    heroTitle: "You're asking the right questions.",
    heroSubtitle: "Every modern crisis—dating apps, housing, ADHD, loneliness—follows patterns you can teach. Learn the 7 Principles that explain how life really works.",
    heroCta1: "Read the Family Guides",
    heroCta2: "Learn the 7 Principles",

    featuredLabel: "Featured Guide",

    decodeTitle: "Understand the Lesson",
    decodeSubtitle: "Deep insights into what's shaping your family's world. Every guide shows all 7 principles teaching—from the obvious lessons to the subtle influences.",
    decodeViewAll: "View All Guides →",

    principleTitle: "The Lessons Behind Everything",
    principleSubtitle: "Seven principles that teach reality. Once you understand them, you can guide anyone through anything.",

    communityTitle: "Join the Family",
    communitySubtitle: "Parents learning to guide with wisdom",
    statPrinciples: "Principles Learned",
    statDecodes: "Family Guides",
    statPrice: "Forever",
    testimonial: "I've been searching for wisdom I can actually pass on to my kids. This is it. The 7 Principles explain life in a way anyone can understand.",
    testimonialAuthor: "— Parent learning Correspondence",

    ctaTitle: "Begin the Journey Together",
    ctaSubtitle: "Choose any principle to explore. Learn at your family's pace. Master all seven to guide through any challenge.",
    ctaButton: "Get New Guides",
    ctaDisclaimer: "New guides weekly. No spam. Unsubscribe anytime.",

    questionPrefix: "Why",
    questions: [
      "are our kids so anxious?",
      "do relationships feel so disposable?",
      "is it so hard to provide a home?",
      "do screens seem to steal their attention?",
      "is it so hard to have real conversations?",
    ],
  },
};

/**
 * Get content for a specific key in the current tone
 * Falls back to scholarly if tone doesn't have that content
 */
export function getContent(key: string, tone: ToneType): string {
  const toneContent = PLATFORM_CONTENT[tone];
  if (toneContent && key in toneContent) {
    return toneContent[key];
  }
  // Fallback to scholarly
  return PLATFORM_CONTENT.scholarly[key] || key;
}

/**
 * Get all questions for the carousel in the current tone
 */
export function getQuestions(tone: ToneType): string[] {
  const content = PLATFORM_CONTENT[tone];
  if (content && content.questions) {
    // Parse the questions string back to array
    return content.questions as unknown as string[];
  }
  return PLATFORM_CONTENT.scholarly.questions as unknown as string[];
}

/**
 * Hook-friendly content getter
 * Returns an object with all content for the current tone
 */
export function getToneContent(tone: ToneType): ToneContent {
  return PLATFORM_CONTENT[tone] || PLATFORM_CONTENT.scholarly;
}
