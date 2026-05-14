import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { invalidateConfigCache } from '@/lib/chat/getActiveConfig';
import { db } from '@/db';
import { adminWelcomeMessageTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const rows = await db.select().from(adminWelcomeMessageTable);
  return NextResponse.json({ messages: rows });
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { messages } = await req.json() as {
    messages: Array<{ lang: string; text: string; suggestionChips?: string }>
  };
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages array required' }, { status: 400 });
  }

  for (const { lang, text, suggestionChips } of messages) {
    const existing = await db.select().from(adminWelcomeMessageTable).where(eq(adminWelcomeMessageTable.lang, lang)).limit(1);
    if (existing[0]) {
      await db.update(adminWelcomeMessageTable)
        .set({ text, suggestionChips: suggestionChips ?? null, updatedBy: auth.userId, updatedAt: new Date() })
        .where(eq(adminWelcomeMessageTable.lang, lang));
    } else {
      await db.insert(adminWelcomeMessageTable).values({
        lang, text, suggestionChips: suggestionChips ?? null, updatedBy: auth.userId,
      });
    }
  }

  invalidateConfigCache();
  await auditLog(auth.userId, 'edited_welcome_message', 'welcome');

  return NextResponse.json({ success: true });
}
