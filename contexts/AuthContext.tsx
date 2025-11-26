"use client";

/**
 * AuthContext - Centralized Authentication State Management
 *
 * WHY: Provides a single source of truth for auth state across the application.
 * Instead of each component managing its own auth state and subscriptions,
 * this context handles it once and provides reactive updates to all consumers.
 *
 * Principle: MENTALISM - Clear, unified mental model of auth state
 * Principle: CORRESPONDENCE - Context structure mirrors auth reality
 * Principle: CAUSE-EFFECT - Centralized state = consistent behavior
 *
 * USAGE:
 *   const { user, session, loading, signIn, signOut } = useAuth();
 *
 * FEATURES:
 * - Subscribes to Supabase auth state changes
 * - Handles SSR/hydration properly with initial loading state
 * - Provides typed auth methods (signIn, signUp, signOut, refreshSession)
 * - Exposes loading/error states for UI handling
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User, Session, AuthError as SupabaseAuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Authentication context state and methods
 */
export interface AuthContextType {
  /** Current authenticated user, null if not authenticated */
  user: User | null;
  /** Current session, null if not authenticated */
  session: Session | null;
  /** Loading state - true during initial load and auth operations */
  loading: boolean;
  /** Error from last auth operation, null if no error */
  error: Error | null;
  /** Whether user is authenticated (convenience boolean) */
  isAuthenticated: boolean;

  // Auth methods
  /** Sign in with email and password */
  signIn: (email: string, password: string) => Promise<void>;
  /** Sign up with email and password */
  signUp: (email: string, password: string) => Promise<void>;
  /** Sign out current user */
  signOut: () => Promise<void>;
  /** Manually refresh the current session */
  refreshSession: () => Promise<void>;
  /** Clear any auth error */
  clearError: () => void;
}

/**
 * Auth provider props
 */
interface AuthProviderProps {
  children: ReactNode;
}

// ============================================
// CONTEXT CREATION
// ============================================

/**
 * Auth context with undefined default
 * We use undefined to ensure useAuth() is always used within provider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

/**
 * AuthProvider - Wraps application to provide auth state
 *
 * This component:
 * 1. Initializes auth state on mount
 * 2. Subscribes to auth state changes
 * 3. Provides auth methods and state to all children
 *
 * Must wrap any component that needs auth access.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  // State
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ========================================
  // AUTH STATE INITIALIZATION & SUBSCRIPTION
  // ========================================

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Failed to get initial session:", sessionError);
          // Don't throw - just means user isn't authenticated
        }

        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Clear errors on successful auth events
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setError(null);
        }

        // Log auth events in development for debugging
        if (process.env.NODE_ENV === "development") {
          console.log("[Auth Event]", event, newSession?.user?.email ?? "no user");
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ========================================
  // AUTH METHODS
  // ========================================

  /**
   * Sign in with email and password
   * Throws on failure for caller to handle
   */
  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // State will be updated by onAuthStateChange listener
      // Refresh router to update server components
      router.refresh();
    } catch (err) {
      const authError = err as SupabaseAuthError;
      setError(new Error(authError.message || "Failed to sign in"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  /**
   * Sign up with email and password
   * Note: This creates the auth user only.
   * Profile creation should happen separately (in signup form or via database trigger)
   */
  const signUp = useCallback(async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        // Email confirmation required - user created but not signed in
        // The caller should handle this case (show confirmation message)
        return;
      }

      // If auto-confirmed, state will update via listener
      router.refresh();
    } catch (err) {
      const authError = err as SupabaseAuthError;
      setError(new Error(authError.message || "Failed to create account"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  /**
   * Sign out current user
   */
  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      // State will be cleared by onAuthStateChange listener
      router.push("/");
      router.refresh();
    } catch (err) {
      const authError = err as SupabaseAuthError;
      setError(new Error(authError.message || "Failed to sign out"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  /**
   * Manually refresh the session
   * Useful when you need to ensure fresh tokens
   */
  const refreshSession = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        throw refreshError;
      }

      // State will be updated by onAuthStateChange listener
    } catch (err) {
      const authError = err as SupabaseAuthError;
      setError(new Error(authError.message || "Failed to refresh session"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear any auth error
   * Call this when user dismisses error or navigates away
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // ========================================
  // CONTEXT VALUE
  // ========================================

  /**
   * Memoize context value to prevent unnecessary re-renders
   * Only updates when auth state actually changes
   */
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      loading,
      error,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      refreshSession,
      clearError,
    }),
    [user, session, loading, error, signIn, signUp, signOut, refreshSession, clearError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK
// ============================================

/**
 * useAuth - Access auth context from any component
 *
 * Must be used within an AuthProvider.
 * Throws if used outside provider (catches configuration errors early).
 *
 * @example
 * const { user, isAuthenticated, signOut } = useAuth();
 *
 * if (loading) return <Spinner />;
 * if (!isAuthenticated) return <LoginPrompt />;
 * return <Dashboard user={user} />;
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
      "Wrap your app or component tree with <AuthProvider>."
    );
  }

  return context;
}

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * useRequireAuth - Hook for protected routes/components
 *
 * Automatically redirects to login if not authenticated.
 * Returns auth state for component use.
 *
 * @param redirectTo - URL to redirect to if not authenticated (default: /auth/login)
 *
 * @example
 * export function Dashboard() {
 *   const { user, loading } = useRequireAuth();
 *   if (loading) return <Spinner />;
 *   return <DashboardContent user={user!} />;
 * }
 */
export function useRequireAuth(redirectTo: string = "/auth/login"): AuthContextType {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for initial load to complete
    if (auth.loading) return;

    // Redirect if not authenticated
    if (!auth.isAuthenticated) {
      router.push(redirectTo);
    }
  }, [auth.loading, auth.isAuthenticated, router, redirectTo]);

  return auth;
}

/**
 * useOptionalAuth - Hook for components that work with or without auth
 *
 * Returns null if not in AuthProvider (instead of throwing).
 * Useful for shared components that may be used in authenticated or public contexts.
 *
 * @example
 * const auth = useOptionalAuth();
 * const userName = auth?.user?.email ?? "Guest";
 */
export function useOptionalAuth(): AuthContextType | null {
  const context = useContext(AuthContext);
  return context ?? null;
}

// Default export for convenience
export default AuthProvider;
