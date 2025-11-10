"use client";

import { useState } from "react";
import { Principle } from "@/lib/constants";
import { completePrinciple } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

/**
 * Principle Reflection Component
 *
 * WHY: Allow users to journal their insights and mark principle complete
 * Personal reflection deepens learning (not just passive consumption)
 *
 * Principle: CAUSE-EFFECT - Writing reflections creates lasting understanding
 * Principle: GENDER - Balance doing (experience) with being (reflection)
 */

interface PrincipleReflectionProps {
  principle: Principle;
  user: User | null;
  isCompleted?: boolean;
}

export function PrincipleReflection({
  principle,
  user,
  isCompleted = false,
}: PrincipleReflectionProps) {
  const [reflection, setReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleSave = async () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    setIsSaving(true);

    try {
      await completePrinciple(user.id, principle.id, reflection);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Reset after 3s
    } catch (error) {
      console.error("Failed to save reflection:", error);
      alert("Failed to save reflection. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-16 px-4 border-t border-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Reflection</h2>
          <p className="text-gray-400">
            What did you learn? How will you apply this principle in your life?
          </p>
        </div>

        {/* Reflection Form */}
        <div className="space-y-4">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts here... (optional but encouraged)"
            className="w-full h-40 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cosmic-purple focus:ring-2 focus:ring-cosmic-purple/20 resize-none"
            disabled={!user}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {isCompleted && (
                <div className="flex items-center gap-2 text-cosmic-gold">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Completed</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || !user}
              className="px-6 py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              {isSaving ? "Saving..." : saved ? "Saved!" : "Mark Complete"}
            </button>
          </div>

          {/* Auth Prompt */}
          {showAuthPrompt && !user && (
            <div className="p-4 bg-cosmic-purple/10 border border-cosmic-purple rounded-xl">
              <p className="text-gray-300 text-center">
                <strong className="text-cosmic-purple">Sign in to save your progress</strong>
                <br />
                <span className="text-sm text-gray-400">
                  Your reflections and journey will be saved across devices.
                </span>
              </p>
              <div className="mt-4 flex gap-3 justify-center">
                <button
                  onClick={() => (window.location.href = "/auth/login")}
                  className="px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 text-white rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => (window.location.href = "/auth/signup")}
                  className="px-4 py-2 border border-cosmic-purple text-cosmic-purple hover:bg-cosmic-purple/10 rounded-lg transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {/* Anonymous Experience Note */}
          {!user && !showAuthPrompt && (
            <p className="text-sm text-gray-500 text-center">
              <span className="inline-block mr-2">ℹ️</span>
              You're exploring anonymously. Sign in to save your progress and join the
              community.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
