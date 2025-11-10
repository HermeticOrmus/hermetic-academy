import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

/**
 * Supabase client for use in components and API routes
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database types (generated from Supabase)
 * In production, use: npx supabase gen types typescript --local
 */

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  theme_preference: string;
  created_at: string;
  updated_at: string;
}

export interface PrincipleProgress {
  id: string;
  user_id: string;
  principle_id: number;
  completed: boolean;
  reflection: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reflection {
  id: string;
  user_id: string;
  principle_id: number;
  content: string;
  is_anonymous: boolean;
  wisdom_count: number;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface WisdomReaction {
  id: string;
  reflection_id: string;
  user_id: string;
  created_at: string;
}

export interface CosmeticUnlock {
  id: string;
  user_id: string;
  cosmetic_type: "theme" | "badge" | "avatar";
  cosmetic_id: string;
  unlocked_via: "achievement" | "donation";
  created_at: string;
}

/**
 * Helper: Get current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Helper: Get user profile
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

/**
 * Helper: Get user's principle progress
 */
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from("principle_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data as PrincipleProgress[];
}

/**
 * Helper: Mark principle as complete
 */
export async function completePrinciple(
  userId: string,
  principleId: number,
  reflection?: string
) {
  const { data, error } = await supabase
    .from("principle_progress")
    .upsert(
      {
        user_id: userId,
        principle_id: principleId,
        completed: true,
        reflection: reflection || null,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,principle_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data as PrincipleProgress;
}

/**
 * Helper: Get reflections for a principle
 */
export async function getReflections(principleId?: number) {
  let query = supabase
    .from("reflections")
    .select("*")
    .eq("is_flagged", false)
    .order("created_at", { ascending: false });

  if (principleId) {
    query = query.eq("principle_id", principleId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Reflection[];
}

/**
 * Helper: Create a reflection
 */
export async function createReflection(
  userId: string,
  principleId: number,
  content: string,
  isAnonymous: boolean = false
) {
  const { data, error } = await supabase
    .from("reflections")
    .insert({
      user_id: userId,
      principle_id: principleId,
      content,
      is_anonymous: isAnonymous,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Reflection;
}

/**
 * Helper: Toggle wisdom reaction
 */
export async function toggleWisdomReaction(
  userId: string,
  reflectionId: string
) {
  // Check if reaction exists
  const { data: existing } = await supabase
    .from("wisdom_reactions")
    .select("id")
    .eq("user_id", userId)
    .eq("reflection_id", reflectionId)
    .single();

  if (existing) {
    // Remove reaction
    const { error } = await supabase
      .from("wisdom_reactions")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;
    return { action: "removed" };
  } else {
    // Add reaction
    const { data, error } = await supabase
      .from("wisdom_reactions")
      .insert({
        user_id: userId,
        reflection_id: reflectionId,
      })
      .select()
      .single();

    if (error) throw error;
    return { action: "added", data: data as WisdomReaction };
  }
}

/**
 * Helper: Check if user has reacted to reflection
 */
export async function hasUserReacted(userId: string, reflectionId: string) {
  const { data } = await supabase
    .from("wisdom_reactions")
    .select("id")
    .eq("user_id", userId)
    .eq("reflection_id", reflectionId)
    .single();

  return !!data;
}
