"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

/**
 * Signup Form Component
 *
 * WHY: Frictionless account creation
 * Only ask for essentials (email, password, username)
 * No phone numbers, no social media, no marketing consent checkboxes
 *
 * Principle: CAUSE-EFFECT - Clear value: "Save progress, join community"
 * Principle: RHYTHM - No pressure to signup immediately (anonymous option always available)
 */

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate username
    if (username.length < 3 || username.length > 20) {
      setError("Username must be 3-20 characters");
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      setLoading(false);
      return;
    }

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create user");
      }

      // 2. Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        username: username,
        theme_preference: "dark",
      });

      if (profileError) throw profileError;

      // Success - redirect to home
      router.push("/");
      router.refresh();
    } catch (err: any) {
      if (err.message.includes("duplicate")) {
        setError("Username or email already taken");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cosmic-purple focus:ring-2 focus:ring-cosmic-purple/20"
            placeholder="seeker123"
          />
          <p className="text-xs text-gray-500 mt-1">
            3-20 characters, letters, numbers, and underscores only
          </p>
        </div>

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
            minLength={6}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cosmic-purple focus:ring-2 focus:ring-cosmic-purple/20"
            placeholder="••••••••"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cosmic-purple hover:text-cosmic-purple/80 font-medium">
            Sign in
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

      {/* Privacy Note */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">
          We respect your privacy. No tracking, no ads, no data selling.
          <br />
          Your email is only for login. We'll never spam you.
        </p>
      </div>
    </div>
  );
}
