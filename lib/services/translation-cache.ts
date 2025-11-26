/**
 * Translation Cache
 *
 * WHY: Cache translations to avoid redundant AI calls
 * Dramatically reduces cost and improves performance
 *
 * ARCHITECTURE:
 * - Browser: localStorage (persists across sessions)
 * - Server: In-memory Map (cleared on restart, could add Redis later)
 * - Key format: `tone:${toneId}:${contentHash}`
 *
 * Cache invalidation:
 * - TTL-based (configurable, default 7 days)
 * - Manual clear available
 * - Version-based invalidation when translations improve
 */

import { ToneType } from "@/contexts/ToneContext";

/**
 * Cached translation entry
 */
interface CacheEntry {
  /** The translated content */
  translated: string;
  /** When this was cached (ISO timestamp) */
  cachedAt: string;
  /** Source of translation: "static" | "ai" */
  source: "static" | "ai";
  /** Cache version (for invalidation) */
  version: number;
}

/**
 * Cache configuration
 */
interface CacheConfig {
  /** Time to live in milliseconds (default: 7 days) */
  ttl: number;
  /** Cache version - increment to invalidate all entries */
  version: number;
  /** Storage key prefix */
  prefix: string;
}

const DEFAULT_CONFIG: CacheConfig = {
  ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  version: 1,
  prefix: "hermetic-tone-cache",
};

/**
 * Simple hash function for content
 * Not cryptographic, just for cache keys
 */
function hashContent(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to base36 for shorter keys
  return Math.abs(hash).toString(36);
}

/**
 * Generate cache key for a translation
 */
function getCacheKey(content: string, tone: ToneType, context?: string): string {
  const contentHash = hashContent(content);
  const contextPart = context ? `:${context}` : "";
  return `${tone}:${contentHash}${contextPart}`;
}

/**
 * Translation Cache - Browser Implementation
 *
 * Uses localStorage for persistence across browser sessions
 */
export class BrowserTranslationCache {
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Get a cached translation
   */
  get(content: string, tone: ToneType, context?: string): CacheEntry | null {
    if (typeof window === "undefined") return null;

    const key = getCacheKey(content, tone, context);
    const fullKey = `${this.config.prefix}:${key}`;

    try {
      const stored = localStorage.getItem(fullKey);
      if (!stored) return null;

      const entry: CacheEntry = JSON.parse(stored);

      // Check version
      if (entry.version !== this.config.version) {
        this.delete(content, tone, context);
        return null;
      }

      // Check TTL
      const cachedTime = new Date(entry.cachedAt).getTime();
      if (Date.now() - cachedTime > this.config.ttl) {
        this.delete(content, tone, context);
        return null;
      }

      return entry;
    } catch {
      // Invalid JSON or other error
      return null;
    }
  }

  /**
   * Store a translation in cache
   */
  set(
    content: string,
    tone: ToneType,
    translated: string,
    source: "static" | "ai",
    context?: string
  ): void {
    if (typeof window === "undefined") return;

    const key = getCacheKey(content, tone, context);
    const fullKey = `${this.config.prefix}:${key}`;

    const entry: CacheEntry = {
      translated,
      cachedAt: new Date().toISOString(),
      source,
      version: this.config.version,
    };

    try {
      localStorage.setItem(fullKey, JSON.stringify(entry));
    } catch (e) {
      // localStorage might be full or disabled
      console.warn("Failed to cache translation:", e);
    }
  }

  /**
   * Delete a cached translation
   */
  delete(content: string, tone: ToneType, context?: string): void {
    if (typeof window === "undefined") return;

    const key = getCacheKey(content, tone, context);
    const fullKey = `${this.config.prefix}:${key}`;
    localStorage.removeItem(fullKey);
  }

  /**
   * Check if a translation is cached
   */
  has(content: string, tone: ToneType, context?: string): boolean {
    return this.get(content, tone, context) !== null;
  }

  /**
   * Clear all cached translations
   */
  clear(): void {
    if (typeof window === "undefined") return;

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.config.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  /**
   * Get cache statistics
   */
  getStats(): { count: number; size: number } {
    if (typeof window === "undefined") {
      return { count: 0, size: 0 };
    }

    let count = 0;
    let size = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.config.prefix)) {
        count++;
        const value = localStorage.getItem(key);
        if (value) {
          size += key.length + value.length;
        }
      }
    }

    return { count, size };
  }
}

/**
 * Translation Cache - Server Implementation
 *
 * Uses in-memory Map (could be extended to use Redis)
 */
export class ServerTranslationCache {
  private cache: Map<string, CacheEntry>;
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.cache = new Map();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  get(content: string, tone: ToneType, context?: string): CacheEntry | null {
    const key = getCacheKey(content, tone, context);
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check version
    if (entry.version !== this.config.version) {
      this.cache.delete(key);
      return null;
    }

    // Check TTL
    const cachedTime = new Date(entry.cachedAt).getTime();
    if (Date.now() - cachedTime > this.config.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  set(
    content: string,
    tone: ToneType,
    translated: string,
    source: "static" | "ai",
    context?: string
  ): void {
    const key = getCacheKey(content, tone, context);
    const entry: CacheEntry = {
      translated,
      cachedAt: new Date().toISOString(),
      source,
      version: this.config.version,
    };
    this.cache.set(key, entry);
  }

  delete(content: string, tone: ToneType, context?: string): void {
    const key = getCacheKey(content, tone, context);
    this.cache.delete(key);
  }

  has(content: string, tone: ToneType, context?: string): boolean {
    return this.get(content, tone, context) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { count: number; size: number } {
    let size = 0;
    this.cache.forEach((entry, key) => {
      size += key.length + JSON.stringify(entry).length;
    });
    return { count: this.cache.size, size };
  }
}

// Export singleton instances
export const browserCache = new BrowserTranslationCache();
export const serverCache = new ServerTranslationCache();

/**
 * Get appropriate cache based on environment
 */
export function getCache(): BrowserTranslationCache | ServerTranslationCache {
  if (typeof window !== "undefined") {
    return browserCache;
  }
  return serverCache;
}
