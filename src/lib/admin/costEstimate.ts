/**
 * Cost computation helpers — handle the realistic case where some messages
 * have `cost_micro_usd > 0` (computed at insert time, after May 2026) and
 * older messages have `cost_micro_usd = 0` but populated `tokens_in`/`tokens_out`
 * (approximate values stored before the schema change).
 *
 * For old rows we estimate cost using the per-model rates from
 * `availableModels.ts`. The number is not 100% accurate (the old token counts
 * were rough estimates themselves) but it's directionally correct — far better
 * than showing $0.00 for activity that clearly happened.
 *
 * Returned `costMicroUsd` from these helpers is **integer micro-USD** (same unit
 * as the DB column). Divide by 1_000_000 to display dollars.
 */

import { db } from '@/db';
import { chatMessagesTable, chatConversationsTable } from '@/db/schema';
import { sql, and, gte, lte, eq } from 'drizzle-orm';
import { computeCostMicroUsd } from '@/lib/chat/availableModels';

interface CostBucket {
  model: string | null;
  realMicro: number;
  estTokensIn: number;
  estTokensOut: number;
  messageCount: number;
}

interface PeriodFilter {
  from?: Date;
  to?: Date;
  userId?: number;
}

/**
 * Returns total cost (real + estimated) in micro-USD for the given period.
 * Optionally scoped to a single user.
 */
export async function getTotalCostMicroUsd(filter: PeriodFilter = {}): Promise<{
  realMicro: number;
  estimatedMicro: number;
  totalMicro: number;
  totalUsd: number;
}> {
  const buckets = await getCostByModel(filter);
  let realMicro = 0;
  let estimatedMicro = 0;
  for (const b of buckets) {
    realMicro += b.realMicro;
    if (b.estTokensIn > 0 || b.estTokensOut > 0) {
      estimatedMicro += computeCostMicroUsd(b.model, b.estTokensIn, b.estTokensOut);
    }
  }
  const totalMicro = realMicro + estimatedMicro;
  return { realMicro, estimatedMicro, totalMicro, totalUsd: totalMicro / 1_000_000 };
}

/**
 * Per-model cost breakdown — returns one bucket per model with both the real
 * recorded cost and the tokens that need to be re-priced (older rows where
 * cost_micro_usd is 0).
 */
export async function getCostByModel(filter: PeriodFilter = {}): Promise<CostBucket[]> {
  const conditions = [sql`${chatMessagesTable.role} = 'assistant'`];
  if (filter.from) conditions.push(gte(chatMessagesTable.createdAt, filter.from));
  if (filter.to) conditions.push(lte(chatMessagesTable.createdAt, filter.to));

  // We always need to join conversations when filtering by user, otherwise we
  // can stay on chat_messages alone.
  if (filter.userId !== undefined) {
    const rows = await db
      .select({
        model: chatMessagesTable.model,
        realMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
        estTokensIn: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensIn} ELSE 0 END), 0)`,
        estTokensOut: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensOut} ELSE 0 END), 0)`,
        messageCount: sql<number>`COUNT(*)`,
      })
      .from(chatMessagesTable)
      .innerJoin(chatConversationsTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
      .where(and(...conditions, eq(chatConversationsTable.userId, filter.userId)))
      .groupBy(chatMessagesTable.model);
    return rows.map((r) => ({
      model: r.model,
      realMicro: Number(r.realMicro),
      estTokensIn: Number(r.estTokensIn),
      estTokensOut: Number(r.estTokensOut),
      messageCount: Number(r.messageCount),
    }));
  }

  const rows = await db
    .select({
      model: chatMessagesTable.model,
      realMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
      estTokensIn: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensIn} ELSE 0 END), 0)`,
      estTokensOut: sql<number>`COALESCE(SUM(CASE WHEN ${chatMessagesTable.costMicroUsd} = 0 THEN ${chatMessagesTable.tokensOut} ELSE 0 END), 0)`,
      messageCount: sql<number>`COUNT(*)`,
    })
    .from(chatMessagesTable)
    .where(and(...conditions))
    .groupBy(chatMessagesTable.model);
  return rows.map((r) => ({
    model: r.model,
    realMicro: Number(r.realMicro),
    estTokensIn: Number(r.estTokensIn),
    estTokensOut: Number(r.estTokensOut),
    messageCount: Number(r.messageCount),
  }));
}

/**
 * Convert a CostBucket array into the public "byModel" rows used by the
 * reports / dashboard UIs.
 */
export function bucketsToByModelRows(buckets: CostBucket[]): Array<{
  model: string;
  messages: number;
  costMicro: number;
  costUsd: number;
}> {
  return buckets
    .map((b) => {
      const fallback = computeCostMicroUsd(b.model, b.estTokensIn, b.estTokensOut);
      const costMicro = b.realMicro + fallback;
      return {
        model: b.model ?? 'unknown',
        messages: b.messageCount,
        costMicro,
        costUsd: costMicro / 1_000_000,
      };
    })
    .sort((a, b) => b.costMicro - a.costMicro);
}

/**
 * Format a USD amount with adaptive precision: $0.0042 for tiny amounts,
 * $0.50 for small, $12.34 for normal. Always >= 2 decimals.
 */
export function formatUsd(usd: number): string {
  if (usd === 0) return '$0.00';
  if (usd < 0.01) return `$${usd.toFixed(5)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}
