import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { exerciseStatesTable } from '@/db/schema';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { getLLMClient } from '@/lib/chat/llmClient';
import { buildSystemPrompt, buildMessages } from '@/lib/chat/promptBuilder';
import { getLessonChatContext } from '@/lib/chat/contentLoader';
import { redactPII } from '@/lib/chat/piiRedactor';
import { getLessonLevel } from '@/content/registry';

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
  const { message, language, lessonContext: lessonId, currentPage, conversationId } = body as {
    message: string;
    language: string;
    lessonContext?: string;
    currentPage?: string;
    conversationId?: number;
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const { text: cleanMessage, wasRedacted } = redactPII(message.trim());
  const level = lessonId ? (getLessonLevel(lessonId) ?? undefined) : undefined;
  const config = await getActiveConfig(level);

  if (!config.apiKey) {
    return NextResponse.json({ error: 'No API key configured. Please add an OpenAI API key in the admin panel.' }, { status: 503 });
  }

  // Get distinct lesson IDs where user has saved exercise state (= started/completed)
  const [lessonCtx, progressRows] = await Promise.all([
    lessonId ? getLessonChatContext(lessonId) : Promise.resolve(null),
    db.selectDistinct({ lessonId: exerciseStatesTable.lessonId })
      .from(exerciseStatesTable)
      .where(eq(exerciseStatesTable.userId, payload.userId)),
  ]);

  const completedLessons = progressRows.map((r) => r.lessonId);

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
    lessonContext: lessonId ?? null,
    model: config.model,
  });

  const systemPrompt = buildSystemPrompt({
    basePrompt: config.basePrompt ?? undefined,
    levelPrompt: config.levelPrompt ?? undefined,
    lessonContext: lessonCtx,
    userLanguage: language,
    level,
    completedLessons,
    currentPage: currentPage ?? null,
  });

  const messages = buildMessages(systemPrompt, history, cleanMessage);
  const llm = getLLMClient(config.apiKey);

  const encoder = new TextEncoder();
  let fullResponse = '';
  let totalTokensIn = 0;
  let totalTokensOut = 0;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const tokenStream = llm.stream(messages, {
          model: config.model,
          temperature: config.temperature,
          maxTokens: config.maxTokens,
        });

        for await (const chunk of tokenStream) {
          fullResponse += chunk;
          totalTokensOut++;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, conversationId: convId })}\n\n`));
        controller.close();

        totalTokensIn = Math.ceil(systemPrompt.length / 4) + Math.ceil(cleanMessage.length / 4);

        await db.insert(chatMessagesTable).values({
          conversationId: convId!,
          role: 'assistant',
          content: fullResponse,
          lessonContext: lessonId ?? null,
          model: config.model,
          tokensIn: totalTokensIn,
          tokensOut: totalTokensOut,
        });

        await db.update(chatConversationsTable)
          .set({
            totalTokensIn: totalTokensIn,
            totalTokensOut: totalTokensOut,
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
