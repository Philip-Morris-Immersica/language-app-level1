import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable, usersTable } from '@/db/schema';
import { sql, gte, lte, and, count } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date(Date.now() - 30 * 86400_000);
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

  const isViewer = auth.role === 'viewer';

  const [totals] = await db.select({
    totalConversations: sql<number>`COUNT(DISTINCT ${chatConversationsTable.id})`,
    totalMessages: sql<number>`COUNT(${chatMessagesTable.id})`,
    totalUsers: sql<number>`COUNT(DISTINCT ${chatConversationsTable.userId})`,
    totalTokensIn: sql<number>`COALESCE(SUM(${chatConversationsTable.totalTokensIn}), 0)`,
    totalTokensOut: sql<number>`COALESCE(SUM(${chatConversationsTable.totalTokensOut}), 0)`,
  })
  .from(chatConversationsTable)
  .leftJoin(chatMessagesTable, sql`${chatMessagesTable.conversationId} = ${chatConversationsTable.id} AND ${chatMessagesTable.role} = 'user'`)
  .where(and(
    gte(chatConversationsTable.startedAt, from),
    lte(chatConversationsTable.startedAt, to),
  ));

  const byLanguage = await db.select({
    language: chatConversationsTable.language,
    count: sql<number>`COUNT(*)`,
  })
  .from(chatConversationsTable)
  .where(and(gte(chatConversationsTable.startedAt, from), lte(chatConversationsTable.startedAt, to)))
  .groupBy(chatConversationsTable.language)
  .orderBy(sql`COUNT(*) DESC`);

  const byLevel = await db.select({
    level: chatConversationsTable.level,
    count: sql<number>`COUNT(*)`,
  })
  .from(chatConversationsTable)
  .where(and(gte(chatConversationsTable.startedAt, from), lte(chatConversationsTable.startedAt, to)))
  .groupBy(chatConversationsTable.level)
  .orderBy(sql`COUNT(*) DESC`);

  const byDay = await db.select({
    date: sql<string>`DATE(${chatConversationsTable.startedAt})`,
    conversations: sql<number>`COUNT(DISTINCT ${chatConversationsTable.id})`,
  })
  .from(chatConversationsTable)
  .where(and(gte(chatConversationsTable.startedAt, from), lte(chatConversationsTable.startedAt, to)))
  .groupBy(sql`DATE(${chatConversationsTable.startedAt})`)
  .orderBy(sql`DATE(${chatConversationsTable.startedAt})`);

  const costMicro = (totals.totalTokensIn + totals.totalTokensOut) * 0.15;

  return NextResponse.json({
    period: { from: from.toISOString(), to: to.toISOString() },
    totals: {
      conversations: totals.totalConversations,
      messages: totals.totalMessages,
      uniqueUsers: totals.totalUsers,
      tokensIn: totals.totalTokensIn,
      tokensOut: totals.totalTokensOut,
      estimatedCostUsd: (costMicro / 1_000_000).toFixed(4),
    },
    byLanguage,
    byLevel,
    byDay,
  });
}
