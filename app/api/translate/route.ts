/**
 * Translation API Route
 *
 * WHY: Server-side endpoint for AI-powered translations
 * - Keeps API keys secure (not exposed to client)
 * - Enables server-side caching
 * - Rate limiting to prevent abuse
 *
 * POST /api/translate
 * Body: { content, sourceTone, targetTone, context?, model? }
 * Response: { translated, source, cached }
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ToneType, isValidTone } from "@/contexts/ToneContext";
import {
  TRANSLATION_SYSTEM_PROMPT,
  generateTranslationPrompt,
} from "@/lib/ai/translation-prompt";
import { serverCache } from "@/lib/services/translation-cache";
import {
  getTranslation as getStaticTranslation,
  hasTranslation as hasStaticTranslation,
} from "@/lib/tone-translations";

/**
 * Request body schema
 */
interface TranslateRequestBody {
  content: string;
  sourceTone?: ToneType;
  targetTone: ToneType;
  context?: string;
  model?: "haiku" | "sonnet";
}

/**
 * Response schema
 */
interface TranslateResponse {
  translated: string;
  source: "static" | "ai" | "cached" | "fallback";
  cached: boolean;
}

/**
 * Simple in-memory rate limiting
 * In production, use Redis or similar
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Get client IP from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

/**
 * POST /api/translate
 *
 * Translates content from one tone to another
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body: TranslateRequestBody = await request.json();
    const {
      content,
      sourceTone = "scholarly",
      targetTone,
      context,
      model = "haiku",
    } = body;

    // Validate required fields
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required and must be a string" },
        { status: 400 }
      );
    }

    if (!targetTone || !isValidTone(targetTone)) {
      return NextResponse.json(
        { error: "Invalid target tone" },
        { status: 400 }
      );
    }

    if (sourceTone && !isValidTone(sourceTone)) {
      return NextResponse.json(
        { error: "Invalid source tone" },
        { status: 400 }
      );
    }

    // Content too long
    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Content too long. Maximum 5000 characters." },
        { status: 400 }
      );
    }

    // 1. Check server cache first
    const cached = serverCache.get(content, targetTone, context);
    if (cached) {
      return NextResponse.json({
        translated: cached.translated,
        source: "cached",
        cached: true,
      } satisfies TranslateResponse);
    }

    // 2. Check if we have a static translation
    if (context?.startsWith("principle:")) {
      const slug = context.replace("principle:", "");
      if (hasStaticTranslation(slug, targetTone)) {
        const staticTranslation = getStaticTranslation(slug, targetTone);
        // Cache it
        serverCache.set(content, targetTone, staticTranslation.description, "static", context);
        return NextResponse.json({
          translated: staticTranslation.description,
          source: "static",
          cached: false,
        } satisfies TranslateResponse);
      }
    }

    // 3. Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // No API key configured - return original content
      console.warn("ANTHROPIC_API_KEY not configured, returning original content");
      return NextResponse.json({
        translated: content,
        source: "fallback",
        cached: false,
      } satisfies TranslateResponse);
    }

    // 4. Call Claude API
    const anthropic = new Anthropic({ apiKey });
    const modelId = model === "sonnet"
      ? "claude-sonnet-4-20250514"
      : "claude-3-haiku-20240307";

    const userPrompt = generateTranslationPrompt(
      content,
      sourceTone,
      targetTone,
      context
    );

    const response = await anthropic.messages.create({
      model: modelId,
      max_tokens: 1024,
      system: TRANSLATION_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    // Extract translated text
    const translated =
      response.content[0].type === "text"
        ? response.content[0].text.trim()
        : content;

    // Cache the result
    serverCache.set(content, targetTone, translated, "ai", context);

    return NextResponse.json({
      translated,
      source: "ai",
      cached: false,
    } satisfies TranslateResponse);
  } catch (error) {
    console.error("Translation API error:", error);

    // Return a generic error
    return NextResponse.json(
      { error: "Translation failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/translate
 *
 * Returns service status and cache stats
 */
export async function GET() {
  const stats = serverCache.getStats();
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;

  return NextResponse.json({
    status: "ok",
    aiEnabled: hasApiKey,
    cache: stats,
  });
}
