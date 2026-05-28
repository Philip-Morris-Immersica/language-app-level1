/**
 * Report Builder data layer.
 *
 * Used by:
 *   • /api/admin/reports/build       → JSON for on-screen preview
 *   • /api/admin/reports/export-xlsx → same data → multi-sheet XLSX
 *
 * Each "section" here is opt-in (the admin picks them via checkboxes on
 * /admin/reports). We aggregate only the sections that were requested so the
 * heavy ones (e.g. full chat transcripts) don't run unless asked.
 */

import { db } from '@/db';
import {
  usersTable,
  chatConversationsTable,
  chatMessagesTable,
  exerciseStatesTable,
} from '@/db/schema';
import { sql, gte, lte, and, eq, desc, inArray } from 'drizzle-orm';
import { getCostByModel, bucketsToByModelRows } from './costEstimate';
import {
  getUserProgressSummaries,
  getPlatformProgressStats,
  type UserProgressSummary,
} from './userProgress';
import { LEVELS, type Level } from '@/content/registry';

export type ReportSectionId =
  | 'summary'
  | 'activeUsers'
  | 'levelProgress'
  | 'chatTranscripts';

export interface ReportOptions {
  from: Date;
  to: Date;
  sections: ReportSectionId[];
}

// ── Section payload types ────────────────────────────────────────────────────

export interface SummarySection {
  newUsers: number;
  activeUsers: number;
  conversations: number;
  userMessages: number;
  assistantMessages: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  byModel: Array<{
    model: string;
    messages: number;
    tokensIn: number;
    tokensOut: number;
    costUsd: number;
  }>;
}

export interface ActiveUserLessonProgress {
  lessonId: string;
  level: Level | 'unknown';
  attemptedCount: number;
  totalCount: number;
  pct: number;
}

export interface ActiveUserRow {
  userId: number;
  name: string;
  email: string;
  exercisesInPeriod: number;
  chatMessagesInPeriod: number;
  chatCostUsd: number;
  joinedAt: string | null;
  /** Cumulative — across all-time, not just the period. */
  highestLevel: Level | null;
  highestLevelPct: number;
  totalLessonsAttempted: number;
  /** Per-lesson progress (cumulative). Sorted by level then lesson id. */
  perLesson: ActiveUserLessonProgress[];
}

export interface LevelProgressSection {
  /** All-time, not period-filtered. The header in the UI labels it as such. */
  byLevel: Array<{ level: Level; activeUsers: number; avgPct: number }>;
  histogramByLevel: Array<{
    level: Level;
    buckets: Array<{ bucket: string; users: number }>;
  }>;
}

export interface ChatTranscriptMessage {
  role: string;
  content: string;
  createdAt: string;
  tokensIn: number | null;
  tokensOut: number | null;
  contentRedacted: boolean;
}

export interface ChatTranscriptRow {
  conversationId: number;
  userId: number;
  userName: string;
  userEmail: string;
  language: string;
  level: string | null;
  startedAt: string;
  lastMessageAt: string;
  messageCount: number;
  costUsd: number;
  messages: ChatTranscriptMessage[];
}

export interface ReportData {
  period: { from: string; to: string };
  sections: {
    summary?: SummarySection;
    activeUsers?: ActiveUserRow[];
    levelProgress?: LevelProgressSection;
    chatTranscripts?: ChatTranscriptRow[];
  };
}

// ── Section builders ─────────────────────────────────────────────────────────

async function buildSummary(from: Date, to: Date): Promise<SummarySection> {
  const [newUsersRow] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(usersTable)
    .where(and(gte(usersTable.createdAt, from), lte(usersTable.createdAt, to)));

  // "Active users" = anyone with chat or exercise activity in the period.
  const chatActiveRows = await db
    .selectDistinct({ userId: chatConversationsTable.userId })
    .from(chatConversationsTable)
    .innerJoin(chatMessagesTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ));

  const exActiveUsers = await db
    .selectDistinct({ userId: exerciseStatesTable.userId })
    .from(exerciseStatesTable)
    .where(and(
      gte(exerciseStatesTable.updatedAt, from),
      lte(exerciseStatesTable.updatedAt, to),
    ));

  const activeIds = new Set<number>([
    ...chatActiveRows.map((r) => r.userId),
    ...exActiveUsers.map((r) => r.userId),
  ]);

  const [convRow] = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${chatConversationsTable.id})` })
    .from(chatConversationsTable)
    .innerJoin(chatMessagesTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ));

  const [msgTotals] = await db
    .select({
      userMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'user')`,
      assistantMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'assistant')`,
      tokensIn: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensIn}), 0)`,
      tokensOut: sql<number>`COALESCE(SUM(${chatMessagesTable.tokensOut}), 0)`,
    })
    .from(chatMessagesTable)
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ));

  const buckets = await getCostByModel({ from, to });
  const byModelRows = bucketsToByModelRows(buckets);
  const totalCostMicro = byModelRows.reduce((s, b) => s + b.costMicro, 0);

  // Per-model token totals (so the byModel rows in the report show in/out, not just $).
  const tokenRows = await db
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

  const tokensByModel = new Map(
    tokenRows.map((r) => [r.model ?? 'unknown', { tokensIn: Number(r.tokensIn), tokensOut: Number(r.tokensOut) }]),
  );

  return {
    newUsers: Number(newUsersRow?.count ?? 0),
    activeUsers: activeIds.size,
    conversations: Number(convRow?.count ?? 0),
    userMessages: Number(msgTotals?.userMessages ?? 0),
    assistantMessages: Number(msgTotals?.assistantMessages ?? 0),
    tokensIn: Number(msgTotals?.tokensIn ?? 0),
    tokensOut: Number(msgTotals?.tokensOut ?? 0),
    costUsd: totalCostMicro / 1_000_000,
    byModel: byModelRows.map((b) => {
      const t = tokensByModel.get(b.model) ?? { tokensIn: 0, tokensOut: 0 };
      return {
        model: b.model,
        messages: b.messages,
        tokensIn: t.tokensIn,
        tokensOut: t.tokensOut,
        costUsd: b.costUsd,
      };
    }),
  };
}

async function buildActiveUsers(from: Date, to: Date): Promise<ActiveUserRow[]> {
  // Per-user exercise activity in period
  const exerciseRows = await db
    .select({
      userId: exerciseStatesTable.userId,
      exercises: sql<number>`COUNT(*)`,
    })
    .from(exerciseStatesTable)
    .where(and(
      gte(exerciseStatesTable.updatedAt, from),
      lte(exerciseStatesTable.updatedAt, to),
    ))
    .groupBy(exerciseStatesTable.userId);

  // Per-user chat activity in period (user messages + total cost)
  const chatRows = await db
    .select({
      userId: chatConversationsTable.userId,
      userMessages: sql<number>`COUNT(*) FILTER (WHERE ${chatMessagesTable.role} = 'user')`,
      costMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
    })
    .from(chatMessagesTable)
    .innerJoin(chatConversationsTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ))
    .groupBy(chatConversationsTable.userId);

  // Merge — score = exercises + chat messages (chat is rarer so we don't weight)
  const byUser = new Map<number, { exercises: number; chatMsgs: number; costMicro: number }>();
  for (const r of exerciseRows) {
    byUser.set(r.userId, {
      exercises: Number(r.exercises),
      chatMsgs: 0,
      costMicro: 0,
    });
  }
  for (const r of chatRows) {
    const existing = byUser.get(r.userId) ?? { exercises: 0, chatMsgs: 0, costMicro: 0 };
    existing.chatMsgs = Number(r.userMessages);
    existing.costMicro = Number(r.costMicro);
    byUser.set(r.userId, existing);
  }

  if (byUser.size === 0) return [];

  // ALL active users, sorted by combined activity (no topN cap).
  const ranked = [...byUser.entries()]
    .map(([userId, v]) => ({ userId, score: v.exercises + v.chatMsgs, ...v }))
    .sort((a, b) => b.score - a.score);

  const userIds = ranked.map((r) => r.userId);

  const userInfoRows = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(inArray(usersTable.id, userIds));

  const userInfo = new Map(userInfoRows.map((u) => [u.id, u]));
  const progresses: Map<number, UserProgressSummary> = await getUserProgressSummaries(userIds);

  return ranked.map((r) => {
    const u = userInfo.get(r.userId);
    const p = progresses.get(r.userId);
    return {
      userId: r.userId,
      name: u?.name ?? `User #${r.userId}`,
      email: u?.email ?? '',
      exercisesInPeriod: r.exercises,
      chatMessagesInPeriod: r.chatMsgs,
      chatCostUsd: r.costMicro / 1_000_000,
      joinedAt: u?.createdAt ? u.createdAt.toISOString() : null,
      highestLevel: p?.highestLevel ?? null,
      highestLevelPct: p?.highestLevelPct ?? 0,
      totalLessonsAttempted: p?.totalLessonsAttempted ?? 0,
      perLesson: p?.perLesson ?? [],
    };
  });
}

async function buildLevelProgress(): Promise<LevelProgressSection> {
  // All-time, not period-filtered. Period filtering on cumulative progress
  // makes the numbers misleading (a user who finished a lesson in January
  // but did nothing in the period would disappear). We label this as
  // cumulative in the UI/XLSX.
  const stats = await getPlatformProgressStats();
  return {
    byLevel: LEVELS.map((lvl) => ({
      level: lvl,
      activeUsers: stats.byLevel[lvl].activeUsers,
      avgPct: stats.byLevel[lvl].avgPct,
    })),
    histogramByLevel: LEVELS.map((lvl) => ({
      level: lvl,
      buckets: stats.histogramByLevel[lvl],
    })),
  };
}

async function buildChatTranscripts(from: Date, to: Date): Promise<ChatTranscriptRow[]> {
  // ALL conversations from the period, sorted by message count desc (no cap).
  const convRows = await db
    .select({
      conversationId: chatConversationsTable.id,
      userId: chatConversationsTable.userId,
      userName: usersTable.name,
      userEmail: usersTable.email,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      lastMessageAt: chatConversationsTable.lastMessageAt,
      messageCount: sql<number>`COUNT(${chatMessagesTable.id})`,
      costMicro: sql<number>`COALESCE(SUM(${chatMessagesTable.costMicroUsd}), 0)`,
    })
    .from(chatConversationsTable)
    .innerJoin(chatMessagesTable, eq(chatMessagesTable.conversationId, chatConversationsTable.id))
    .leftJoin(usersTable, eq(chatConversationsTable.userId, usersTable.id))
    .where(and(
      gte(chatMessagesTable.createdAt, from),
      lte(chatMessagesTable.createdAt, to),
    ))
    .groupBy(
      chatConversationsTable.id,
      chatConversationsTable.userId,
      usersTable.name,
      usersTable.email,
      chatConversationsTable.language,
      chatConversationsTable.level,
      chatConversationsTable.startedAt,
      chatConversationsTable.lastMessageAt,
    )
    .orderBy(desc(sql`COUNT(${chatMessagesTable.id})`));

  if (convRows.length === 0) return [];

  const convIds = convRows.map((r) => r.conversationId);
  const allMessages = await db
    .select({
      conversationId: chatMessagesTable.conversationId,
      role: chatMessagesTable.role,
      content: chatMessagesTable.content,
      contentRedacted: chatMessagesTable.contentRedacted,
      tokensIn: chatMessagesTable.tokensIn,
      tokensOut: chatMessagesTable.tokensOut,
      createdAt: chatMessagesTable.createdAt,
    })
    .from(chatMessagesTable)
    .where(inArray(chatMessagesTable.conversationId, convIds))
    .orderBy(chatMessagesTable.conversationId, chatMessagesTable.createdAt);

  const byConv = new Map<number, ChatTranscriptMessage[]>();
  for (const m of allMessages) {
    if (m.role === 'system') continue;
    const list = byConv.get(m.conversationId) ?? [];
    list.push({
      role: m.role,
      content: m.content,
      createdAt: m.createdAt?.toISOString() ?? '',
      tokensIn: m.tokensIn,
      tokensOut: m.tokensOut,
      contentRedacted: m.contentRedacted ?? false,
    });
    byConv.set(m.conversationId, list);
  }

  return convRows.map((r) => ({
    conversationId: r.conversationId,
    userId: r.userId,
    userName: r.userName ?? `User #${r.userId}`,
    userEmail: r.userEmail ?? '',
    language: r.language,
    level: r.level,
    startedAt: r.startedAt?.toISOString() ?? '',
    lastMessageAt: r.lastMessageAt?.toISOString() ?? '',
    messageCount: Number(r.messageCount),
    costUsd: Number(r.costMicro) / 1_000_000,
    messages: byConv.get(r.conversationId) ?? [],
  }));
}

// ── Public entry ─────────────────────────────────────────────────────────────

export async function buildReport(opts: ReportOptions): Promise<ReportData> {
  const { from, to, sections } = opts;
  const wanted = new Set(sections);

  // Run requested sections in parallel — each section's data is independent.
  const [summary, activeUsers, levelProgress, chatTranscripts] = await Promise.all([
    wanted.has('summary') ? buildSummary(from, to) : Promise.resolve(undefined),
    wanted.has('activeUsers') ? buildActiveUsers(from, to) : Promise.resolve(undefined),
    wanted.has('levelProgress') ? buildLevelProgress() : Promise.resolve(undefined),
    wanted.has('chatTranscripts') ? buildChatTranscripts(from, to) : Promise.resolve(undefined),
  ]);

  return {
    period: { from: from.toISOString(), to: to.toISOString() },
    sections: {
      ...(summary && { summary }),
      ...(activeUsers && { activeUsers }),
      ...(levelProgress && { levelProgress }),
      ...(chatTranscripts && { chatTranscripts }),
    },
  };
}
