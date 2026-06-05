import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { usersTable, chatConversationsTable, chatMessagesTable, adminUsersTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const userId = parseInt(id);

  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
      adminRole: adminUsersTable.role,
    })
    .from(usersTable)
    .leftJoin(adminUsersTable, eq(usersTable.id, adminUsersTable.userId))
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const conversations = await db
    .select({
      id: chatConversationsTable.id,
      language: chatConversationsTable.language,
      level: chatConversationsTable.level,
      startedAt: chatConversationsTable.startedAt,
      lastMessageAt: chatConversationsTable.lastMessageAt,
    })
    .from(chatConversationsTable)
    .where(eq(chatConversationsTable.userId, userId))
    .orderBy(desc(chatConversationsTable.lastMessageAt))
    .limit(20);

  return NextResponse.json({ user, conversations });
}
