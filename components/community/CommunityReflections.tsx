"use client";

import { useEffect, useState } from "react";
import { getReflections, getCurrentUser, toggleWisdomReaction, hasUserReacted } from "@/lib/supabase";
import type { Reflection } from "@/lib/supabase";

/**
 * Community Reflections Component
 *
 * WHY: Share wisdom without social media toxicity
 * - No likes (we use "wisdom" reactions)
 * - No infinite scroll (pagination)
 * - No leaderboards (no competition)
 * - Anonymous option (no pressure)
 *
 * Principle: CAUSE-EFFECT - Sharing insights creates ripples of understanding
 * Principle: POLARITY - Balance individual (anonymous) with community (shared)
 */

interface CommunityReflectionsProps {
  principleId: number;
}

export function CommunityReflections({ principleId }: CommunityReflectionsProps) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    loadReflections();
    loadCurrentUser();
  }, [principleId]);

  const loadReflections = async () => {
    try {
      const data = await getReflections(principleId);
      setReflections(data);
    } catch (error) {
      console.error("Failed to load reflections:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUserId(user?.id || null);
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  const handleWisdomToggle = async (reflectionId: string) => {
    if (!currentUserId) {
      alert("Please sign in to react to reflections");
      return;
    }

    try {
      await toggleWisdomReaction(currentUserId, reflectionId);
      // Reload reflections to update counts
      await loadReflections();
    } catch (error) {
      console.error("Failed to toggle wisdom reaction:", error);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 mx-auto border-4 border-cosmic-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading community wisdom...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Community Wisdom</h2>
          <p className="text-gray-400">
            Insights from others exploring this principle. No competition, just shared learning.
          </p>
        </div>

        {reflections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No reflections yet. Be the first to share your insight!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reflections.map((reflection) => (
              <ReflectionCard
                key={reflection.id}
                reflection={reflection}
                currentUserId={currentUserId}
                onWisdomToggle={handleWisdomToggle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Individual Reflection Card
 */
interface ReflectionCardProps {
  reflection: Reflection;
  currentUserId: string | null;
  onWisdomToggle: (reflectionId: string) => void;
}

function ReflectionCard({ reflection, currentUserId, onWisdomToggle }: ReflectionCardProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (currentUserId) {
      checkReaction();
    } else {
      setIsChecking(false);
    }
  }, [currentUserId, reflection.id]);

  const checkReaction = async () => {
    if (!currentUserId) return;
    try {
      const reacted = await hasUserReacted(currentUserId, reflection.id);
      setHasReacted(reacted);
    } catch (error) {
      console.error("Failed to check reaction:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleClick = () => {
    onWisdomToggle(reflection.id);
    setHasReacted(!hasReacted);
  };

  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
      {/* Header: Author + Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-gold flex items-center justify-center text-white font-medium">
            {reflection.is_anonymous ? "?" : reflection.user_id.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">
              {reflection.is_anonymous ? "Anonymous Explorer" : "Fellow Seeker"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(reflection.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed mb-4">{reflection.content}</p>

      {/* Footer: Wisdom Reaction */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <button
          onClick={handleClick}
          disabled={!currentUserId || isChecking}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className={hasReacted ? "text-cosmic-gold" : "text-gray-500"}>
            ✨
          </span>
          <span className="text-sm text-gray-400">
            {reflection.wisdom_count > 0 ? reflection.wisdom_count : ""}
            {reflection.wisdom_count === 0 && "Wise"}
          </span>
        </button>

        {!currentUserId && (
          <p className="text-xs text-gray-600">Sign in to react</p>
        )}
      </div>
    </div>
  );
}
