import { notFound } from "next/navigation";
import { getPrincipleBySlug, getNextPrinciple, getPrevPrinciple } from "@/lib/constants";
import { getCurrentUser, getUserProgress } from "@/lib/supabase";
import { PrincipleHero } from "@/components/principles/PrincipleHero";
import { PrincipleContent } from "@/components/principles/PrincipleContent";
import { PrincipleReflection } from "@/components/principles/PrincipleReflection";
import { CommunityReflections } from "@/components/community/CommunityReflections";
import { PrincipleNavigation } from "@/components/principles/PrincipleNavigation";

/**
 * Dynamic Principle Page
 *
 * WHY: Each of the 7 principles needs its own page with:
 * - Hero section (title, description)
 * - Educational content (key concepts, examples, reflections)
 * - Personal reflection area
 * - Community wisdom sharing
 * - Navigation to prev/next principle
 *
 * Principle: MENTALISM - Clear intent drives structure
 * Principle: CORRESPONDENCE - Page structure mirrors learning journey
 */

interface PrinciplePageProps {
  params: {
    slug: string;
  };
}

export default async function PrinciplePage({ params }: PrinciplePageProps) {
  const principle = getPrincipleBySlug(params.slug);

  // If principle not found (invalid slug), show 404
  if (!principle) {
    notFound();
  }

  // Get current user (null if not authenticated)
  const user = await getCurrentUser();

  // Get user's progress if authenticated
  const userProgress = user ? await getUserProgress(user.id) : null;

  // Check if this principle is completed
  const isCompleted =
    userProgress?.some((p) => p.principle_id === principle.id && p.completed) ?? false;

  // Get navigation (prev/next principles)
  const nextPrinciple = getNextPrinciple(principle.id);
  const prevPrinciple = getPrevPrinciple(principle.id);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Principle introduction */}
      <PrincipleHero principle={principle} isCompleted={isCompleted} />

      {/* Educational Content - Key concepts, examples, reflections */}
      <PrincipleContent principle={principle} />

      {/* Personal Reflection - Save thoughts (auth required) */}
      <PrincipleReflection
        principle={principle}
        user={user}
        isCompleted={isCompleted}
      />

      {/* Community Wisdom - See others' insights */}
      <CommunityReflections principleId={principle.id} />

      {/* Navigation - Explore other principles */}
      <PrincipleNavigation
        currentPrinciple={principle}
        nextPrinciple={nextPrinciple}
        prevPrinciple={prevPrinciple}
      />
    </div>
  );
}

/**
 * Generate static params for all 7 principles
 * WHY: Pre-render all principle pages at build time (performance)
 */
export function generateStaticParams() {
  return [
    { slug: "mentalism" },
    { slug: "correspondence" },
    { slug: "vibration" },
    { slug: "polarity" },
    { slug: "rhythm" },
    { slug: "cause-effect" },
    { slug: "gender" },
  ];
}

/**
 * Generate metadata for each principle page
 * WHY: SEO and social sharing
 */
export async function generateMetadata({ params }: PrinciplePageProps) {
  const principle = getPrincipleBySlug(params.slug);

  if (!principle) {
    return {
      title: "Principle Not Found",
    };
  }

  return {
    title: `${principle.title} - ${principle.subtitle} | Hermetic Academy`,
    description: `Learn the Hermetic Principle of ${principle.title}: ${principle.ancientTruth}`,
    openGraph: {
      title: `${principle.title}: ${principle.subtitle}`,
      description: `Learn the Hermetic Principle of ${principle.title}: ${principle.ancientTruth}`,
    },
  };
}
