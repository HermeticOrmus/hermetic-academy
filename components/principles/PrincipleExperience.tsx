"use client";

import { useMemo } from "react";
import { Principle } from "@/lib/constants";
import dynamic from "next/dynamic";

/**
 * Principle Experience Loader
 *
 * WHY: Dynamically load the correct interactive experience for each principle
 * Each experience is code-split for performance (only load what's needed)
 *
 * Principle: CORRESPONDENCE - Component structure mirrors principle organization
 * Principle: VIBRATION - Dynamic loading keeps app responsive
 */

// Lazy load experience components (code splitting)
const MentalismExperience = dynamic(() => import("@/components/experiences/MentalismExperience"), {
  loading: () => <ExperienceLoader />,
});

const CorrespondenceExperience = dynamic(() => import("@/components/experiences/CorrespondenceExperience"), {
  loading: () => <ExperienceLoader />,
});

const VibrationExperience = dynamic(() => import("@/components/experiences/VibrationExperience"), {
  loading: () => <ExperienceLoader />,
});

const PolarityExperience = dynamic(() => import("@/components/experiences/PolarityExperience"), {
  loading: () => <ExperienceLoader />,
});

const RhythmExperience = dynamic(() => import("@/components/experiences/RhythmExperience"), {
  loading: () => <ExperienceLoader />,
});

const CauseEffectExperience = dynamic(() => import("@/components/experiences/CauseEffectExperience"), {
  loading: () => <ExperienceLoader />,
});

const GenderExperience = dynamic(() => import("@/components/experiences/GenderExperience"), {
  loading: () => <ExperienceLoader />,
});

interface PrincipleExperienceProps {
  principle: Principle;
}

export function PrincipleExperience({ principle }: PrincipleExperienceProps) {
  // Map slugs to experience components
  const ExperienceComponent = useMemo(() => {
    const experienceMap: Record<string, React.ComponentType<{ principle: Principle }>> = {
      mentalism: MentalismExperience,
      correspondence: CorrespondenceExperience,
      vibration: VibrationExperience,
      polarity: PolarityExperience,
      rhythm: RhythmExperience,
      "cause-effect": CauseEffectExperience,
      gender: GenderExperience,
    };

    return experienceMap[principle.slug] || MentalismExperience;
  }, [principle.slug]);

  return (
    <section className="py-16 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Experience Container */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <ExperienceComponent principle={principle} />
        </div>

        {/* Instructions (Below Experience) */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Take your time exploring. There's no rush, no timer, no competition.
            <br />
            Understanding comes through play, not pressure.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Loading State for Experiences
 * WHY: Show something beautiful while code loads (principle of RHYTHM - flow)
 */
function ExperienceLoader() {
  return (
    <div className="flex items-center justify-center p-20">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Loading experience...</p>
      </div>
    </div>
  );
}
