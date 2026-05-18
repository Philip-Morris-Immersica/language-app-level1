import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable, usersTable } from '@/db/schema';
import { eq, gte, lte, and, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date(Date.now() - 30 * 86400_000);
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();

  const conversations = await db
    .select({
      convId: chatConversationsTable.id,
      userId: chatConversationsTable.userId,
      userName: usersTable.name,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      lastMessageAt: chatConversationsTable.lastMessageAt,
    })
    .from(chatConversationsTable)
    .leftJoin(usersTable, eq(chatConversationsTable.userId, usersTable.id))
    .where(and(
      gte(chatConversationsTable.startedAt, from),
      lte(chatConversationsTable.startedAt, to),
    ))
    .orderBy(desc(chatConversationsTable.startedAt));

  const lines: string[] = [
    'conversation_id,user_id,user_name,language,level,started_at,last_message_at',
    ...conversations.map((c) => [
      c.convId,
      c.userId,
      `"${(c.userName ?? '').replace(/"/g, '""')}"`,
      c.language,
      c.level ?? '',
      c.startedAt?.toISOString() ?? '',
      c.lastMessageAt?.toISOString() ?? '',
    ].join(',')),
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="robi-conversations-${from.toISOString().slice(0, 10)}.csv"`,
    },
  });
}
