/**
 * AI Translation Service
 *
 * WHY: Enable dynamic translation of content to any tone via Claude API
 * This allows the platform to scale beyond pre-written translations
 *
 * ARCHITECTURE:
 * - Uses Claude API (Haiku for cost efficiency, Sonnet for quality)
 * - Integrates with caching layer to avoid redundant calls
 * - Rate limiting to prevent abuse
 * - Graceful degradation on errors
 */

import { ToneType } from "@/contexts/ToneContext";
import {
  ITranslationService,
  TranslationRequest,
  TranslationResult,
  StaticTranslationService,
} from "./translation-service";
import { getCache } from "./translation-cache";
import {
  TRANSLATION_SYSTEM_PROMPT,
  generateTranslationPrompt,
  generateBatchTranslationPrompt,
  parseBatchResponse,
} from "@/lib/ai/translation-prompt";

/**
 * AI Translation Service Configuration
 */
interface AITranslationConfig {
  /** API endpoint for translations */
  apiEndpoint: string;
  /** Model to use (haiku for speed/cost, sonnet for quality) */
  model: "haiku" | "sonnet";
  /** Maximum tokens for response */
  maxTokens: number;
  /** Whether to use caching */
  useCache: boolean;
  /** Whether to fall back to static translations */
  fallbackToStatic: boolean;
}

const DEFAULT_CONFIG: AITranslationConfig = {
  apiEndpoint: "/api/translate",
  model: "haiku",
  maxTokens: 1024,
  useCache: true,
  fallbackToStatic: true,
};

/**
 * AI Translation Service
 *
 * Uses Claude API to translate content to any tone
 * Falls back to static translations when available
 */
export class AITranslationService implements ITranslationService {
  private config: AITranslationConfig;
  private staticService: StaticTranslationService;
  private cache = getCache();

  constructor(config: Partial<AITranslationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.staticService = new StaticTranslationService();
  }

  async translate(request: TranslationRequest): Promise<TranslationResult> {
    const { content, targetTone, sourceTone = "scholarly", context } = request;

    // 1. Check cache first
    if (this.config.useCache) {
      const cached = this.cache.get(content, targetTone, context);
      if (cached) {
        return {
          translated: cached.translated,
          fromCache: true,
          source: cached.source,
          tone: targetTone,
        };
      }
    }

    // 2. Try static translation if available
    if (this.config.fallbackToStatic) {
      const staticResult = await this.staticService.translate(request);
      if (staticResult.source === "static") {
        // Cache the static result
        if (this.config.useCache) {
          this.cache.set(content, targetTone, staticResult.translated, "static", context);
        }
        return staticResult;
      }
    }

    // 3. Call AI API
    try {
      const translated = await this.callAI(content, sourceTone, targetTone, context);

      // Cache the result
      if (this.config.useCache) {
        this.cache.set(content, targetTone, translated, "ai", context);
      }

      return {
        translated,
        fromCache: false,
        source: "ai",
        tone: targetTone,
      };
    } catch (error) {
      console.error("AI translation failed:", error);

      // Return original content as fallback
      return {
        translated: content,
        fromCache: false,
        source: "fallback",
        tone: targetTone,
      };
    }
  }

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    // For now, translate sequentially (could optimize with batch API)
    return Promise.all(requests.map((req) => this.translate(req)));
  }

  hasTranslation(content: string, tone: ToneType, context?: string): boolean {
    // Check cache
    if (this.cache.has(content, tone, context)) {
      return true;
    }
    // Check static translations
    return this.staticService.hasTranslation(content, tone, context);
  }

  /**
   * Call the translation API
   */
  private async callAI(
    content: string,
    sourceTone: ToneType,
    targetTone: ToneType,
    context?: string
  ): Promise<string> {
    const response = await fetch(this.config.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        sourceTone,
        targetTone,
        context,
        model: this.config.model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translated;
  }
}

/**
 * Hybrid Translation Service
 *
 * Combines static and AI translations:
 * 1. Always tries static first (fast, free, high quality)
 * 2. Falls back to AI for content without static translations
 * 3. Uses caching to minimize AI calls
 */
export class HybridTranslationService implements ITranslationService {
  private staticService: StaticTranslationService;
  private aiService: AITranslationService;

  constructor(aiConfig: Partial<AITranslationConfig> = {}) {
    this.staticService = new StaticTranslationService();
    this.aiService = new AITranslationService({
      ...aiConfig,
      fallbackToStatic: false, // We handle fallback manually
    });
  }

  async translate(request: TranslationRequest): Promise<TranslationResult> {
    // Try static first
    const staticResult = await this.staticService.translate(request);
    if (staticResult.source === "static") {
      return staticResult;
    }

    // Fall back to AI
    return this.aiService.translate(request);
  }

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    return Promise.all(requests.map((req) => this.translate(req)));
  }

  hasTranslation(content: string, tone: ToneType, context?: string): boolean {
    return (
      this.staticService.hasTranslation(content, tone, context) ||
      this.aiService.hasTranslation(content, tone, context)
    );
  }
}

/**
 * Create the appropriate translation service based on environment
 */
export function createAITranslationService(
  config: Partial<AITranslationConfig> = {}
): ITranslationService {
  // For now, return the hybrid service
  // Could be configured based on environment variables
  return new HybridTranslationService(config);
}
