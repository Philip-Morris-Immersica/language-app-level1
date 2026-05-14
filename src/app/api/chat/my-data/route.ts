import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { chatConversationsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await db.delete(chatConversationsTable).where(eq(chatConversationsTable.userId, payload.userId));

  return NextResponse.json({ success: true, message: 'All your chat data has been deleted.' });
}
