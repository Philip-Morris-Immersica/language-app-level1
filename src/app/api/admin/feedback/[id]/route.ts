import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { chatFeedbackTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const feedbackId = parseInt(id);
  const body = await req.json().catch(() => null);
  const reviewed = typeof body?.reviewed === 'boolean' ? body.reviewed : true;

  await db.update(chatFeedbackTable).set({ reviewed }).where(eq(chatFeedbackTable.id, feedbackId));
  await auditLog(auth.userId, 'updated_feedback_reviewed', `feedback:${feedbackId}`, undefined, { reviewed });

  return NextResponse.json({ ok: true });
}
