/**
 * Translation Service
 *
 * WHY: Abstracts content translation behind a clean interface
 * Enables swapping implementations: static → AI → hybrid
 *
 * ARCHITECTURE:
 * 1. StaticTranslationService - Uses pre-written translations
 * 2. AITranslationService - Uses Claude API for dynamic translation
 * 3. HybridTranslationService - Tries static first, falls back to AI
 *
 * All services implement the same interface for easy swapping
 */

import { ToneType } from "@/contexts/ToneContext";
import {
  getTranslation as getStaticTranslation,
  hasTranslation,
  ToneTranslation,
} from "@/lib/tone-translations";

/**
 * Translation request - what we want to translate
 */
export interface TranslationRequest {
  /** The content to translate */
  content: string;
  /** The target tone to translate to */
  targetTone: ToneType;
  /** Optional: the source tone (defaults to "scholarly") */
  sourceTone?: ToneType;
  /** Optional: context about the content (e.g., "principle:mentalism") */
  context?: string;
}

/**
 * Translation result - what we get back
 */
export interface TranslationResult {
  /** The translated content */
  translated: string;
  /** Whether this came from cache */
  fromCache: boolean;
  /** The source of translation: "static" | "ai" | "fallback" */
  source: "static" | "ai" | "fallback";
  /** The tone it was translated to */
  tone: ToneType;
}

/**
 * Translation service interface - all implementations must provide these methods
 */
export interface ITranslationService {
  /**
   * Translate a single piece of content
   */
  translate(request: TranslationRequest): Promise<TranslationResult>;

  /**
   * Translate multiple pieces of content (batch)
   */
  translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]>;

  /**
   * Check if a translation is available (without fetching it)
   */
  hasTranslation(content: string, tone: ToneType, context?: string): boolean;
}

/**
 * Static Translation Service
 *
 * Uses pre-written translations from tone-translations.ts
 * Fast, free, high quality (human-curated)
 * Limited: only works for content that has pre-written translations
 */
export class StaticTranslationService implements ITranslationService {
  async translate(request: TranslationRequest): Promise<TranslationResult> {
    const { content, targetTone, context } = request;

    // If context is a principle slug, use the principle translations
    if (context?.startsWith("principle:")) {
      const slug = context.replace("principle:", "");
      const translation = getStaticTranslation(slug, targetTone);

      if (translation.translation !== "Translation not available") {
        return {
          translated: translation.description, // Use description for longer content
          fromCache: false,
          source: "static",
          tone: targetTone,
        };
      }
    }

    // No static translation available - return original content
    return {
      translated: content,
      fromCache: false,
      source: "fallback",
      tone: targetTone,
    };
  }

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    return Promise.all(requests.map((req) => this.translate(req)));
  }

  hasTranslation(content: string, tone: ToneType, context?: string): boolean {
    if (context?.startsWith("principle:")) {
      const slug = context.replace("principle:", "");
      return hasTranslation(slug, tone);
    }
    return false;
  }
}

/**
 * Get principle translation with both short and long versions
 *
 * Convenience function for principle pages that need both
 */
export function getPrincipleTranslation(
  slug: string,
  tone: ToneType
): ToneTranslation & { available: boolean } {
  const translation = getStaticTranslation(slug, tone);
  const available = hasTranslation(slug, tone);

  return {
    ...translation,
    available,
  };
}

/**
 * Create the default translation service instance
 *
 * Currently: StaticTranslationService
 * Future: HybridTranslationService (static + AI)
 */
export function createTranslationService(): ITranslationService {
  return new StaticTranslationService();
}

// Export a singleton instance for convenience
export const translationService = createTranslationService();
