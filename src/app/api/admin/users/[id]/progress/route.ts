import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { getUserProgressSummary, getUserTestSummary } from '@/lib/admin/userProgress';

/**
 * Per-user breakdown for /admin/users/[id]. Returns:
 *   - progress: per-lesson and per-level completion (from exercise_states)
 *   - chat: total tokens / cost + per-model split (from chat_messages)
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const userId = parseInt(id);
  if (!Number.isFinite(userId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const [progress, tests] = await Promise.all([
    getUserProgressSummary(userId),
    getUserTestSummary(userId),
  ]);

  // Chat totals — join on conversations so we can filter by user.
  const [chatTotals] = await db
    .select({
      totalMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'user')`,
      assistantMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'assistant')`,
      tokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
      tokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
      costMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
    })
    .from(chatMessagesTable)
    .innerJoin(chatConversationsTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .where(eq(chatConversationsTable.userId, userId));

  const byModelRows = await db
    .select({
      model: chatMessagesTable.model,
      messages: sql<number>`COUNT(*)`,
      tokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
      tokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
      costMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
    })
    .from(chatMessagesTable)
    .innerJoin(chatConversationsTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .where(and(
      eq(chatConversationsTable.userId, userId),
      sql`${chatMessagesTable.role} = 'assistant'`,
    ))
    .groupBy(chatMessagesTable.model)
    .orderBy(sql`SUM(${chatMessagesTable.costMicroUsd}) DESC`);

  const byModel = byModelRows.map((r) => ({
    model: r.model ?? 'unknown',
    messages: Number(r.messages),
    tokensIn: Number(r.tokensIn),
    tokensOut: Number(r.tokensOut),
    costUsd: Number(r.costMicro) / 1_000_000,
  }));

  return NextResponse.json({
    progress,
    tests,
    chat: {
      totalMessages: Number(chatTotals?.totalMessages) ?? 0,
      assistantMessages: Number(chatTotals?.assistantMessages) ?? 0,
      tokensIn: Number(chatTotals?.tokensIn) ?? 0,
      tokensOut: Number(chatTotals?.tokensOut) ?? 0,
      costUsd: Number(chatTotals?.costMicro) / 1_000_000 || 0,
      byModel,
    },
  });
}
