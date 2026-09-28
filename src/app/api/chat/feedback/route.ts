import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { chatFeedbackTable } from '@/db/schema';

/**
 * Stores one free-text feedback comment from the single button at the top of
 * the chat window. Deliberately does NOT call any LLM — this route must stay
 * free (no token cost per submission). Admins review comments and can trigger
 * an on-demand AI summary in /admin/feedback when they actually want one.
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const comment = typeof body?.comment === 'string' ? body.comment.trim().slice(0, 2000) : '';
  if (!comment) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
  }

  const language = typeof body?.language === 'string' ? body.language.slice(0, 5) : 'bg';
  const conversationId = Number.isInteger(body?.conversationId) ? body.conversationId : null;

  await db.insert(chatFeedbackTable).values({
    conversationId,
    userId: payload.userId,
    comment,
    language,
  });

  return NextResponse.json({ ok: true });
}
