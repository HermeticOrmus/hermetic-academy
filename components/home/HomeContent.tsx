"use client";

import Link from "next/link";
import { useTone } from "@/contexts/ToneContext";
import { getContent } from "@/lib/tone-content";
import { QuestionCarousel } from "./QuestionCarousel";
import { FeaturedDecode } from "./FeaturedDecode";
import { DecodeGrid } from "./DecodeGrid";
import { PrincipleNavigator } from "./PrincipleNavigator";

export function HomeContent() {
  const { tone } = useTone();

  // Get all content for current tone
  const content = {
    heroTagline: getContent("heroTagline", tone),
    heroTitle: getContent("heroTitle", tone),
    heroSubtitle: getContent("heroSubtitle", tone),
    heroCta1: getContent("heroCta1", tone),
    heroCta2: getContent("heroCta2", tone),
    featuredLabel: getContent("featuredLabel", tone),
    decodeTitle: getContent("decodeTitle", tone),
    decodeSubtitle: getContent("decodeSubtitle", tone),
    decodeViewAll: getContent("decodeViewAll", tone),
    principleTitle: getContent("principleTitle", tone),
    principleSubtitle: getContent("principleSubtitle", tone),
    communityTitle: getContent("communityTitle", tone),
    communitySubtitle: getContent("communitySubtitle", tone),
    statPrinciples: getContent("statPrinciples", tone),
    statDecodes: getContent("statDecodes", tone),
    statPrice: getContent("statPrice", tone),
    testimonial: getContent("testimonial", tone),
    testimonialAuthor: getContent("testimonialAuthor", tone),
    ctaTitle: getContent("ctaTitle", tone),
    ctaSubtitle: getContent("ctaSubtitle", tone),
    ctaButton: getContent("ctaButton", tone),
    ctaDisclaimer: getContent("ctaDisclaimer", tone),
  };

  // Featured decode data
  const featuredDecode = {
    title: "Modern Dating: When Infinite Choice Creates Infinite Loneliness",
    slug: "modern-dating-apps-connection-crisis",
    excerpt:
      "44% of Americans use dating apps. Loneliness is at epidemic levels. This isn't coincidence—it's predictable outcome when you violate all seven Hermetic principles simultaneously.",
    principlesUsed: ["Polarity", "Vibration", "Rhythm"],
  };

  // Decode grid data
  const decodes = [
    {
      title: "ADHD Explosion",
      slug: "adhd-diagnosis-explosion-attention-crisis",
      question: "Why is everyone being diagnosed with ADHD?",
      tags: ["Vibration", "Cause-Effect"],
    },
    {
      title: "Housing Crisis",
      slug: "housing-affordability-crisis-shelter-speculation",
      question: "Why is housing so unaffordable?",
      tags: ["Cause-Effect", "Polarity"],
    },
    {
      title: "Meaning Crisis",
      slug: "meaning-crisis-religion-decline-secular-void",
      question: "Why does nothing feel meaningful?",
      tags: ["Mentalism", "Correspondence"],
    },
    {
      title: "Student Debt",
      slug: "student-debt-education-financial-trap",
      question: "Why is education so expensive?",
      tags: ["Cause-Effect", "Rhythm"],
    },
    {
      title: "AI Job Displacement",
      slug: "ai-job-displacement-labor-transformation",
      question: "Will AI take my job?",
      tags: ["Cause-Effect", "Rhythm"],
    },
    {
      title: "Aesthetic Wars",
      slug: "minimalism-maximalism-polarity-aesthetic-wars",
      question: "Minimalism or maximalism?",
      tags: ["Polarity", "Gender"],
    },
    {
      title: "Bitcoin Surge",
      slug: "bitcoin-crypto-surge-digital-scarcity",
      question: "Why is crypto surging again?",
      tags: ["Vibration", "Polarity"],
    },
    {
      title: "Ozempic Revolution",
      slug: "ozempic-glp1-weight-loss-transformation",
      question: "What's behind the weight loss drug boom?",
      tags: ["Cause-Effect", "Polarity"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero with Question Carousel */}
      <section className="py-20 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 via-purple-500/20 to-violet-200/20 text-gray-100 border border-cosmic-gold/30 rounded-full text-sm mb-4">
              {content.heroTagline}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-4">
              {content.heroTitle}
            </h1>

            <QuestionCarousel />

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/community/expert-decodes"
                className="px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-gold hover:opacity-90 text-white rounded-lg font-semibold transition-all"
              >
                {content.heroCta1}
              </Link>
              <Link
                href="/principles"
                className="px-8 py-4 border border-cosmic-gold hover:border-cosmic-gold/70 hover:bg-cosmic-gold/10 text-gray-300 hover:text-cosmic-gold rounded-lg font-semibold transition-all"
              >
                {content.heroCta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Decode */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-cosmic-gold mb-2">{content.featuredLabel}</div>
          <FeaturedDecode {...featuredDecode} />
        </div>
      </section>

      {/* Section 3: Decode Grid */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              {content.decodeTitle}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {content.decodeSubtitle}
            </p>
          </div>
          <DecodeGrid decodes={decodes} />
          <div className="text-center mt-8">
            <Link
              href="/community/expert-decodes"
              className="text-cosmic-gold hover:text-cosmic-gold/70 transition-colors font-semibold"
            >
              {content.decodeViewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Patterns Revealed (Principle Navigator) */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              {content.principleTitle}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {content.principleSubtitle}
            </p>
          </div>
          <PrincipleNavigator />
        </div>
      </section>

      {/* Section 5: Community Proof */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              {content.communityTitle}
            </h2>
            <p className="text-gray-400">
              {content.communitySubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-gold mb-2">
                10,000+
              </div>
              <div className="text-gray-400">{content.statPrinciples}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-gold mb-2">
                11
              </div>
              <div className="text-gray-400">{content.statDecodes}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-gold mb-2">
                Free
              </div>
              <div className="text-gray-400">{content.statPrice}</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              "{content.testimonial}"
            </p>
            <div className="text-center mt-4 text-gray-500">
              {content.testimonialAuthor}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Email Capture CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-100">
            {content.ctaTitle}
          </h2>
          <p className="text-gray-400">
            {content.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:border-cosmic-gold focus:outline-none transition-colors"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-gold hover:opacity-90 text-white rounded-lg font-semibold transition-all whitespace-nowrap">
              {content.ctaButton}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {content.ctaDisclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
