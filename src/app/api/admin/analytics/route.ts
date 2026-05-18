import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable, usersTable } from '@/db/schema';
import { sql, gte, lte, and, eq } from 'drizzle-orm';
import { getCostByModel, bucketsToByModelRows } from '@/lib/admin/costEstimate';
import { computeCostMicroUsd } from '@/lib/chat/availableModels';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date(Date.now() - 30 * 86400_000);
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

  const [convTotals] = await db.select({
    totalConversations: sql<number>`COUNT(DISTINCT ${chatConversationsTable.id})`,
    totalUsers: sql<number>`COUNT(DISTINCT ${chatConversationsTable.userId})`,
  })
  .from(chatConversationsTable)
  .where(and(
    gte(chatConversationsTable.startedAt, from),
    lte(chatConversationsTable.startedAt, to),
  ));

  const [msgTotals] = await db.select({
    totalUserMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'user')`,
    totalAssistantMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'assistant')`,
    totalTokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
    totalTokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
  })
  .from(chatMessagesTable)
  .where(and(
    gte(chatMessagesTable.createdAt, from),
    lte(chatMessagesTable.createdAt, to),
  ));

  // Use cost helper that handles real cost_micro_usd + fallback from tokens.
  const buckets = await getCostByModel({ from, to });
  const byModelData = bucketsToByModelRows(buckets);
  const totalCostMicro = byModelData.reduce((s, b) => s + b.costMicro, 0);
  const totalCostUsd = (totalCostMicro / 1_000_000).toFixed(4);
  const byModel = byModelData.map((b) => ({
    model: b.model,
    messages: b.messages,
    tokensIn: 0, // filled below from per-model query
    tokensOut: 0,
    costUsd: b.costUsd.toFixed(4),
  }));

  // Per-model tokens (for display only — the cost above already accounts for both real + estimated)
  const modelTokens = await db
    .select({
      model: chatMessagesTable.model,
      tokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
      tokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
    })
    .from(chatMessagesTable)
    .where(and(
      sql`${chatMessagesTable.role} = 'assistant'`,
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ))
    .groupBy(chatMessagesTable.model);
  const tokensByModel = new Map(modelTokens.map((r) => [r.model ?? 'unknown', { tokensIn: Number(r.tokensIn), tokensOut: Number(r.tokensOut) }]));
  for (const row of byModel) {
    const t = tokensByModel.get(row.model);
    if (t) { row.tokensIn = t.tokensIn; row.tokensOut = t.tokensOut; }
  }

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

  // Per-conversation breakdown (top 20 by cost). Use real + fallback per row.
  const convRows = await db
    .select({
      conversationId: chatMessagesTable.conversationId,
      userId: chatConversationsTable.userId,
      userName: usersTable.name,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      messages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'user')`,
      assistantMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'assistant')`,
      tokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
      tokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
      realCostMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
      // For fallback we'd need per-model totals; instead we'll bulk-fetch fallback per conv below.
    })
    .from(chatMessagesTable)
    .innerJoin(chatConversationsTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .leftJoin(usersTable, eq(chatConversationsTable.userId, usersTable.id))
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ))
    .groupBy(
      chatMessagesTable.conversationId,
      chatConversationsTable.userId,
      usersTable.name,
      chatConversationsTable.language,
      chatConversationsTable.level,
      chatConversationsTable.startedAt,
    );

  // Compute fallback cost per conversation using per-(conv, model) tokens.
  // One extra query — group by (conv, model) so we know the right rates.
  const convModelRows = await db
    .select({
      conversationId: chatMessagesTable.conversationId,
      model: chatMessagesTable.model,
      estTokensIn: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensIn} ELSE 0 END), 0)`,
      estTokensOut: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensOut} ELSE 0 END), 0)`,
    })
    .from(chatMessagesTable)
    .where(and(
      sql`${chatMessagesTable.role} = 'assistant'`,
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ))
    .groupBy(chatMessagesTable.conversationId, chatMessagesTable.model);

  const fallbackByConv = new Map<number, number>();
  for (const r of convModelRows) {
    const micro = computeCostMicroUsd(r.model, Number(r.estTokensIn), Number(r.estTokensOut));
    fallbackByConv.set(r.conversationId, (fallbackByConv.get(r.conversationId) ?? 0) + micro);
  }

  const byConversation = convRows.map((r) => {
    const fallbackMicro = fallbackByConv.get(r.conversationId) ?? 0;
    const totalMicro = Number(r.realCostMicro) + fallbackMicro;
    return {
      conversationId: r.conversationId,
      userId: r.userId,
      userName: r.userName ?? `User #${r.userId}`,
      language: r.language,
      level: r.level,
      startedAt: r.startedAt,
      messages: Number(r.messages),
      assistantMessages: Number(r.assistantMessages),
      tokensIn: Number(r.tokensIn),
      tokensOut: Number(r.tokensOut),
      costUsd: totalMicro / 1_000_000,
      isEstimated: fallbackMicro > 0,
    };
  })
  .sort((a, b) => b.costUsd - a.costUsd)
  .slice(0, 20);

  return NextResponse.json({
    period: { from: from.toISOString(), to: to.toISOString() },
    totals: {
      conversations: Number(convTotals.totalConversations),
      messages: Number(msgTotals.totalUserMessages),
      assistantMessages: Number(msgTotals.totalAssistantMessages),
      uniqueUsers: Number(convTotals.totalUsers),
      tokensIn: Number(msgTotals.totalTokensIn),
      tokensOut: Number(msgTotals.totalTokensOut),
      estimatedCostUsd: totalCostUsd,
      costUsd: totalCostUsd,
    },
    byLanguage,
    byLevel,
    byDay,
    byModel,
    byConversation,
  });
}
