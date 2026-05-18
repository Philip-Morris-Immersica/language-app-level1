import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { chatConversationsTable, usersTable, chatMessagesTable } from '@/db/schema';
import { eq, desc, sql, and, gte, lte, like } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
  const offset = (page - 1) * limit;
  const lang = searchParams.get('lang');
  const level = searchParams.get('level');
  const userId = searchParams.get('userId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const search = searchParams.get('search');

  const conditions = [];
  if (lang) conditions.push(eq(chatConversationsTable.language, lang));
  if (level) conditions.push(eq(chatConversationsTable.level, level));
  if (userId) conditions.push(eq(chatConversationsTable.userId, parseInt(userId)));
  if (from) conditions.push(gte(chatConversationsTable.startedAt, new Date(from)));
  if (to) conditions.push(lte(chatConversationsTable.startedAt, new Date(to)));

  const rows = await db
    .select({
      id: chatConversationsTable.id,
      userId: chatConversationsTable.userId,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      lastMessageAt: chatConversationsTable.lastMessageAt,
      totalTokensIn: chatConversationsTable.totalTokensIn,
      totalTokensOut: chatConversationsTable.totalTokensOut,
      userName: usersTable.name,
      userEmail: usersTable.email,
      messageCount: sql<number>`(SELECT COUNT(*) FROM chat_messages WHERE conversation_id = ${chatConversationsTable.id})`,
    })
    .from(chatConversationsTable)
    .leftJoin(usersTable, eq(chatConversationsTable.userId, usersTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(chatConversationsTable.lastMessageAt))
    .limit(limit)
    .offset(offset);

  await auditLog(auth.userId, 'viewed_chats_list', `page=${page}`);

  return NextResponse.json({ conversations: rows, page, limit });
}
