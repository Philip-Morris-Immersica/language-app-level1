import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { chatFeedbackTable, usersTable } from '@/db/schema';
import { eq, desc, and, gte, lte } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  // Any admin role (viewer/admin/it) can read feedback — same visibility as
  // /admin/chats. No minRole passed = viewer-level access is enough.
  const auth = await requireAdmin(req);
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 200);
  const offset = (page - 1) * limit;
  const reviewed = searchParams.get('reviewed');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const conditions = [];
  if (reviewed === 'true' || reviewed === 'false') {
    conditions.push(eq(chatFeedbackTable.reviewed, reviewed === 'true'));
  }
  if (from) conditions.push(gte(chatFeedbackTable.createdAt, new Date(from)));
  if (to) conditions.push(lte(chatFeedbackTable.createdAt, new Date(to)));

  const rows = await db
    .select({
      id: chatFeedbackTable.id,
      conversationId: chatFeedbackTable.conversationId,
      comment: chatFeedbackTable.comment,
      language: chatFeedbackTable.language,
      reviewed: chatFeedbackTable.reviewed,
      createdAt: chatFeedbackTable.createdAt,
      userName: usersTable.name,
      userEmail: usersTable.email,
    })
    .from(chatFeedbackTable)
    .leftJoin(usersTable, eq(chatFeedbackTable.userId, usersTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(chatFeedbackTable.createdAt))
    .limit(limit)
    .offset(offset);

  await auditLog(auth.userId, 'viewed_feedback_list', `page=${page}`);

  return NextResponse.json({ feedback: rows, page, limit });
}
