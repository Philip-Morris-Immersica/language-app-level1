import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const conversations = await db
    .select()
    .from(chatConversationsTable)
    .where(eq(chatConversationsTable.userId, payload.userId))
    .orderBy(desc(chatConversationsTable.lastMessageAt))
    .limit(1);

  if (!conversations[0]) {
    return NextResponse.json({ conversation: null, messages: [] });
  }

  const messages = await db
    .select({ role: chatMessagesTable.role, content: chatMessagesTable.content, createdAt: chatMessagesTable.createdAt })
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.conversationId, conversations[0].id))
    .orderBy(chatMessagesTable.createdAt)
    .limit(50);

  return NextResponse.json({ conversation: conversations[0], messages });
}
