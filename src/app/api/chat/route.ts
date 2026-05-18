import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { exerciseStatesTable } from '@/db/schema';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { getLLMClient } from '@/lib/chat/llmClient';
import { buildSystemPrompt, buildMessages } from '@/lib/chat/promptBuilder';
import { getLessonChatContext, getTestChatContext, type ChatPageContext } from '@/lib/chat/contentLoader';
import { summarizeLessonProgress } from '@/lib/chat/progressAnalyzer';
import { redactPII } from '@/lib/chat/piiRedactor';
import { getLessonLevel } from '@/content/registry';
import { computeCostMicroUsd } from '@/lib/chat/availableModels';

const RATE_LIMIT_PER_HOUR = parseInt(process.env.CHAT_RATE_LIMIT_PER_HOUR ?? '30');
const rateLimitMap = new Map<number, { count: number; resetAt: number }>();

function checkRateLimit(userId: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_PER_HOUR) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!checkRateLimit(payload.userId)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please wait an hour.' }, { status: 429 });
  }

  const body = await req.json();
  const {
    message,
    language,
    lessonContext: lessonId,
    testContext: testId,
    currentPage,
    conversationId,
  } = body as {
    message: string;
    language: string;
    lessonContext?: string | null;
    testContext?: string | null;
    currentPage?: string;
    conversationId?: number;
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const { text: cleanMessage, wasRedacted } = redactPII(message.trim());

  // Determine which page-context loader to use. Tests trump lessons if both
  // are sent for some reason (the client only ever sends one).
  // The `contextId` is the value we use both for the chat context and for the
  // `exerciseStatesTable.lessonId` lookup (test states are stored under the
  // testId in that column).
  const contextId: string | null = testId ?? lessonId ?? null;
  const isTest = !!testId;

  let level: string | undefined;
  if (isTest && testId) {
    const m = testId.match(/^test-(a1|a2|b1|b2)-/i);
    level = m?.[1]?.toLowerCase();
  } else if (lessonId) {
    level = getLessonLevel(lessonId) ?? undefined;
  }

  const config = await getActiveConfig(level);

  if (!config.apiKey) {
    return NextResponse.json({ error: 'No API key configured. Please add an OpenAI API key in the admin panel.' }, { status: 503 });
  }

  // Three parallel DB reads:
  // 1) page context (lesson OR test) with all exercises + correct answers
  // 2) distinct lesson/test IDs the user has touched (overall profile)
  // 3) per-exercise saved states for the CURRENT page (to surface mistakes)
  const pageContextPromise: Promise<ChatPageContext | null> = (() => {
    if (isTest && testId) return getTestChatContext(testId);
    if (lessonId) return getLessonChatContext(lessonId);
    return Promise.resolve(null);
  })();

  const [pageContext, progressRows, currentPageStates] = await Promise.all([
    pageContextPromise,
    db.selectDistinct({ lessonId: exerciseStatesTable.lessonId })
      .from(exerciseStatesTable)
      .where(eq(exerciseStatesTable.userId, payload.userId)),
    contextId
      ? db.select({
          exerciseId: exerciseStatesTable.exerciseId,
          state: exerciseStatesTable.state,
        })
        .from(exerciseStatesTable)
        .where(and(
          eq(exerciseStatesTable.userId, payload.userId),
          eq(exerciseStatesTable.lessonId, contextId),
        ))
      : Promise.resolve([] as Array<{ exerciseId: string; state: string }>),
  ]);

  const completedLessons = progressRows.map((r) => r.lessonId);

  const pageProgress = contextId && pageContext
    ? summarizeLessonProgress(
        contextId,
        currentPageStates,
        pageContext.exercises.length,
        new Set(pageContext.exercises.map((e) => e.id)),
      )
    : null;

  let convId = conversationId;
  if (!convId) {
    const [newConv] = await db.insert(chatConversationsTable).values({
      userId: payload.userId,
      language,
      level: level ?? null,
    }).returning({ id: chatConversationsTable.id });
    convId = newConv.id;
  } else {
    await db.update(chatConversationsTable)
      .set({ lastMessageAt: new Date(), language, level: level ?? null })
      .where(eq(chatConversationsTable.id, convId));
  }

  const historyRows = await db.select({ role: chatMessagesTable.role, content: chatMessagesTable.content })
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.conversationId, convId))
    .orderBy(desc(chatMessagesTable.createdAt))
    .limit(10);
  const history = historyRows.reverse();

  await db.insert(chatMessagesTable).values({
    conversationId: convId,
    role: 'user',
    content: cleanMessage,
    contentRedacted: wasRedacted,
    lessonContext: contextId ?? null,
    model: config.model,
  });

  const systemPrompt = buildSystemPrompt({
    basePrompt: config.basePrompt ?? undefined,
    levelPrompt: config.levelPrompt ?? undefined,
    pageContext,
    userLanguage: language,
    level,
    completedLessons,
    currentPage: currentPage ?? null,
    pageProgress,
  });

  const messages = buildMessages(systemPrompt, history, cleanMessage);
  const llm = getLLMClient(config.apiKey);

  const encoder = new TextEncoder();
  let fullResponse = '';
  // OpenAI sends the real token counts in a final stream chunk
  // (`stream_options: { include_usage: true }`). If for some reason that chunk
  // is missing we fall back to a chars/4 estimate — clearly worse but better
  // than silently storing 0.
  let promptTokens = 0;
  let completionTokens = 0;
  let gotUsage = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const tokenStream = llm.stream(messages, {
          model: config.model,
          temperature: config.temperature,
          maxTokens: config.maxTokens,
        });

        for await (const chunk of tokenStream) {
          if (chunk.type === 'text') {
            fullResponse += chunk.value;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.value })}\n\n`));
          } else if (chunk.type === 'usage') {
            promptTokens = chunk.value.promptTokens;
            completionTokens = chunk.value.completionTokens;
            gotUsage = true;
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, conversationId: convId })}\n\n`));
        controller.close();

        if (!gotUsage) {
          // Fallback estimate — should rarely trigger because OpenAI sends usage
          // on the final chunk. Clearly inferior; logged so we notice if it
          // becomes common.
          promptTokens = Math.ceil(systemPrompt.length / 4) + Math.ceil(cleanMessage.length / 4);
          completionTokens = Math.ceil(fullResponse.length / 4);
          console.warn('[chat] no usage chunk received, falling back to chars/4 estimate');
        }

        const costMicroUsd = computeCostMicroUsd(config.model, promptTokens, completionTokens);

        await db.insert(chatMessagesTable).values({
          conversationId: convId!,
          role: 'assistant',
          content: fullResponse,
          lessonContext: contextId ?? null,
          model: config.model,
          tokensIn: promptTokens,
          tokensOut: completionTokens,
          costMicroUsd,
        });

        // Accumulate conversation totals with SQL `+=` so multi-message
        // conversations report the real sum (the old code OVERWROTE these
        // values on every message, so a 5-message chat only stored the LAST
        // message's tokens — that was the main reason cost reports were wrong).
        await db.update(chatConversationsTable)
          .set({
            totalTokensIn: sql`${chatConversationsTable.totalTokensIn} + ${promptTokens}`,
            totalTokensOut: sql`${chatConversationsTable.totalTokensOut} + ${completionTokens}`,
            totalCostUsdMicro: sql`${chatConversationsTable.totalCostUsdMicro} + ${costMicroUsd}`,
            lastMessageAt: new Date(),
          })
          .where(eq(chatConversationsTable.id, convId!));

      } catch (err) {
        console.error('[chat] stream error:', err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
