import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { usersTable, adminUsersTable, chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, sql, desc, asc } from 'drizzle-orm';
import { getUserProgressSummaries } from '@/lib/admin/userProgress';

type SortKey = 'name' | 'progress' | 'cost' | 'created';
const SORT_KEYS: SortKey[] = ['name', 'progress', 'cost', 'created'];

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
  const offset = (page - 1) * limit;
  const sortParam = (searchParams.get('sort') ?? 'created') as SortKey;
  const sort: SortKey = SORT_KEYS.includes(sortParam) ? sortParam : 'created';
  const orderDir = (searchParams.get('order') ?? 'desc') === 'asc' ? 'asc' : 'desc';

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400_000);

  // Base SQL: join users + admin + chat-cost-last-30d. We compute the 30d cost
  // in a subquery so users with no chat still show up with $0.
  const baseQuery = db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
      adminRole: adminUsersTable.role,
      conversationCount: sql<number>`(SELECT COUNT(*) FROM chat_conversations WHERE user_id = ${usersTable.id})`,
      costMicro30d: sql<number>`(
        SELECT COALESCE(SUM(m.cost_micro_usd), 0)
        FROM chat_messages m
        JOIN chat_conversations c ON c.id = m.conversation_id
        WHERE c.user_id = ${usersTable.id}
          AND m.role = 'assistant'
          AND m.created_at >= ${thirtyDaysAgo}
      )`,
    })
    .from(usersTable)
    .leftJoin(adminUsersTable, eq(usersTable.id, adminUsersTable.userId));

  // For sort by name/created we can do it in SQL. For sort by progress/cost
  // we need the cost computed; cost we already have in SQL. Progress requires
  // post-load — we fetch a page-sized window then sort+slice in JS.

  let rows: Array<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    adminRole: string | null;
    conversationCount: number;
    costMicro30d: number;
  }>;

  // name & created sort use SQL; progress & cost are sorted in JS after we
  // join with the in-memory progress map. The admin user table is small
  // enough that this is fine.
  if (sort === 'name') {
    rows = (await baseQuery.orderBy(
      orderDir === 'asc' ? asc(usersTable.name) : desc(usersTable.name),
    )) as typeof rows;
  } else if (sort === 'created') {
    rows = (await baseQuery.orderBy(
      orderDir === 'asc' ? asc(usersTable.createdAt) : desc(usersTable.createdAt),
    )) as typeof rows;
  } else {
    // progress / cost — pull then sort in JS
    rows = (await baseQuery.orderBy(desc(usersTable.createdAt))) as typeof rows;
  }

  // Compute progress for all rows in one batch (the in-memory join is cheap;
  // the SQL is one query for all users).
  const progresses = await getUserProgressSummaries(rows.map((r) => r.id));

  let enriched = rows.map((r) => {
    const p = progresses.get(r.id);
    return {
      id: r.id,
      name: r.name,
      email: r.email,
      createdAt: r.createdAt,
      adminRole: r.adminRole,
      conversationCount: Number(r.conversationCount),
      progressLevel: p?.highestLevel ?? null,
      progressPct: p?.highestLevelPct ?? 0,
      lessonsAttempted: p?.totalLessonsAttempted ?? 0,
      costUsd30d: Number(r.costMicro30d) / 1_000_000,
    };
  });

  if (sort === 'progress') {
    enriched = enriched.sort((a, b) =>
      orderDir === 'asc' ? a.progressPct - b.progressPct : b.progressPct - a.progressPct,
    );
  } else if (sort === 'cost') {
    enriched = enriched.sort((a, b) =>
      orderDir === 'asc' ? a.costUsd30d - b.costUsd30d : b.costUsd30d - a.costUsd30d,
    );
  }

  // Paginate the enriched array
  const total = enriched.length;
  const paged = enriched.slice(offset, offset + limit);

  return NextResponse.json({ users: paged, page, limit, total, sort, order: orderDir });
}
