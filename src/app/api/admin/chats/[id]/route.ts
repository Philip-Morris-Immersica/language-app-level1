import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const convId = parseInt(id);

  const [conv] = await db
    .select({
      id: chatConversationsTable.id,
      userId: chatConversationsTable.userId,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      lastMessageAt: chatConversationsTable.lastMessageAt,
      userName: usersTable.name,
      userEmail: usersTable.email,
    })
    .from(chatConversationsTable)
    .leftJoin(usersTable, eq(chatConversationsTable.userId, usersTable.id))
    .where(eq(chatConversationsTable.id, convId))
    .limit(1);

  if (!conv) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const messages = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.conversationId, convId))
    .orderBy(chatMessagesTable.createdAt);

  await auditLog(auth.userId, 'viewed_chat', `conversation:${convId}`);

  return NextResponse.json({ conversation: conv, messages });
}
