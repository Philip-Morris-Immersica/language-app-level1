import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { buildSystemPrompt, HARDCODED_CAPABILITIES, HARDCODED_PLATFORM_KNOWLEDGE } from '@/lib/chat/promptBuilder';
import { getLessonChatContext, getTestChatContext, type ChatPageContext } from '@/lib/chat/contentLoader';
import { summarizeLessonProgress } from '@/lib/chat/progressAnalyzer';
import { getLessonLevel } from '@/content/registry';
import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import type { SupportedLang } from '@/i18n/languages';

/**
 * POST /api/admin/prompts/preview
 *
 * Returns the full computed system prompt as it would be sent to the LLM
 * for a given configuration. Useful for the admin "Preview" button so
 * the editor sees exactly what the model receives — including the
 * hardcoded CAPABILITIES + PLATFORM blocks plus the dynamic data section.
 *
 * Body:
 *   basePromptOverride?: string   — text from the admin editor (preview as if saved)
 *   levelPromptOverride?: string  — text from the level scope editor
 *   userLanguage: string          — what language the user is set to
 *   lessonId?: string             — preview as if user is on this lesson
 *   includeProgress?: boolean     — when true and lessonId set, include the
 *                                    requesting admin's own real progress
 *                                    for that lesson (so they can see the
 *                                    progress section in action).
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const body = await req.json();
  const basePrompt: string | undefined = body.basePromptOverride;
  const levelPrompt: string | undefined = body.levelPromptOverride;
  const userLanguage: SupportedLang = body.userLanguage ?? 'en';
  const rawContextId: string | undefined = (body.lessonId || body.contextId || undefined);
  const includeProgress: boolean = body.includeProgress === true;

  // Detect lesson vs test from the ID prefix
  const isTest = !!rawContextId && /^test-/i.test(rawContextId);

  let level: string | undefined;
  let pageContext: ChatPageContext | null = null;
  if (rawContextId) {
    if (isTest) {
      const m = rawContextId.match(/^test-(a1|a2|b1|b2)-/i);
      level = m?.[1]?.toLowerCase();
      pageContext = await getTestChatContext(rawContextId);
    } else {
      level = getLessonLevel(rawContextId) ?? undefined;
      pageContext = await getLessonChatContext(rawContextId);
    }
  }

  let pageProgress = null;
  if (includeProgress && rawContextId && pageContext) {
    const rows = await db.select({
      exerciseId: exerciseStatesTable.exerciseId,
      state: exerciseStatesTable.state,
    })
      .from(exerciseStatesTable)
      .where(and(
        eq(exerciseStatesTable.userId, auth.userId),
        eq(exerciseStatesTable.lessonId, rawContextId),
      ));
    const checkable = pageContext.exercises.filter((e) => e.checkable);
    pageProgress = summarizeLessonProgress(
      rawContextId,
      rows,
      checkable.length,
      new Set(checkable.map((e) => e.id)),
    );
  }

  const pageLabel = !rawContextId
    ? 'home page'
    : isTest ? `test page: ${rawContextId}` : `lesson page: ${rawContextId}`;

  const systemPrompt = buildSystemPrompt({
    basePrompt,
    levelPrompt,
    pageContext,
    userLanguage,
    level,
    currentPage: pageLabel,
    pageProgress,
  });

  return NextResponse.json({
    systemPrompt,
    charCount: systemPrompt.length,
    approxTokens: Math.ceil(systemPrompt.length / 4),
    hardcoded: {
      capabilities: HARDCODED_CAPABILITIES,
      platformKnowledge: HARDCODED_PLATFORM_KNOWLEDGE,
    },
  });
}
