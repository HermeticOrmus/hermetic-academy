"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

/**
 * Login Form Component
 *
 * WHY: Simple, friction-free authentication
 * No social pressure, no forced signup, clear value proposition
 *
 * Principle: MENTALISM - Clear intent: "Save progress, join community"
 * Principle: POLARITY - Balance ease (simple form) with security (proper auth)
 */

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Success - redirect to home
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cosmic-purple focus:ring-2 focus:ring-cosmic-purple/20"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cosmic-purple focus:ring-2 focus:ring-cosmic-purple/20"
            placeholder="••••••••"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Signup Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-cosmic-purple hover:text-cosmic-purple/80 font-medium">
            Create one
          </Link>
        </p>
      </div>

      {/* Or Continue Anonymously */}
      <div className="mt-6 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm mb-3">Or continue without an account</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          Explore Anonymously →
        </Link>
      </div>
    </div>
  );
}
