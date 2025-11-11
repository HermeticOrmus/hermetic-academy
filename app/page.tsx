import { QuestionCarousel } from "@/components/home/QuestionCarousel";
import { FeaturedDecode } from "@/components/home/FeaturedDecode";
import { DecodeGrid } from "@/components/home/DecodeGrid";
import { PrincipleNavigator } from "@/components/home/PrincipleNavigator";
import Link from "next/link";

export default function HomePage() {
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
            <div className="inline-block px-4 py-2 bg-cosmic-purple/20 text-cosmic-purple rounded-full text-sm mb-4">
              Ancient Wisdom • Modern Clarity
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-4">
              You're asking the right questions.
            </h1>

            <QuestionCarousel />

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every modern crisis—from dating apps to housing costs, ADHD to
              loneliness—follows the same patterns. Learn the 7 Hermetic
              Principles that explain how reality works.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/community/expert-decodes"
                className="px-8 py-4 bg-cosmic-purple hover:bg-cosmic-gold text-white rounded-lg font-semibold transition-colors"
              >
                Explore Hermetic Decodes
              </Link>
              <Link
                href="/principles"
                className="px-8 py-4 border border-gray-700 hover:border-cosmic-purple text-gray-300 rounded-lg font-semibold transition-colors"
              >
                Learn the 7 Principles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Decode */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-cosmic-gold mb-2">Featured Decode</div>
          <FeaturedDecode {...featuredDecode} />
        </div>
      </section>

      {/* Section 3: Decode Grid */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Decode Modern Reality
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep analyses of the phenomena shaping your life. Every decode
              shows all 7 principles operating—from the obvious to the subtle.
            </p>
          </div>
          <DecodeGrid decodes={decodes} />
          <div className="text-center mt-8">
            <Link
              href="/community/expert-decodes"
              className="text-cosmic-purple hover:text-cosmic-gold transition-colors"
            >
              View All Decodes →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Patterns Revealed (Principle Navigator) */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              The Patterns Behind Everything
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Seven timeless principles explain how reality works. Once you see
              them, you can't unsee them.
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
              Join Truth-Seekers Worldwide
            </h2>
            <p className="text-gray-400">
              People learning to see reality clearly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-purple mb-2">
                10,000+
              </div>
              <div className="text-gray-400">Principles Learned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-gold mb-2">
                11
              </div>
              <div className="text-gray-400">Deep Decodes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-purple mb-2">
                Free
              </div>
              <div className="text-gray-400">Forever</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              "I've been searching for a framework that explains what I see
              happening in the world. This is it. The Hermetic Principles
              connect everything."
            </p>
            <div className="text-center mt-4 text-gray-500">
              — Truth-seeker learning Correspondence
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Email Capture CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-100">
            Begin Your Journey
          </h2>
          <p className="text-gray-400">
            Choose any principle to explore. Learn at your own pace. Master all
            seven to see reality clearly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:border-cosmic-purple focus:outline-none"
            />
            <button className="px-8 py-4 bg-cosmic-purple hover:bg-cosmic-gold text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
              Get New Decodes
            </button>
          </div>
          <p className="text-sm text-gray-500">
            New decodes weekly. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
