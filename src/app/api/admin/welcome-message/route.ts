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
    const trimmedText = text.trim();
    // suggestionChips is a JSON-stringified string[] — trim each chip so
    // stray leading/trailing spaces from admin input never reach the UI.
    let cleanedChips = suggestionChips ?? null;
    if (suggestionChips) {
      try {
        const parsed = JSON.parse(suggestionChips) as unknown;
        if (Array.isArray(parsed)) {
          cleanedChips = JSON.stringify(
            parsed.map((chip) => (typeof chip === 'string' ? chip.trim() : chip)).filter((chip) => chip !== ''),
          );
        }
      } catch {
        // Not valid JSON — leave as-is, GET route already guards against this.
      }
    }

    const existing = await db.select().from(adminWelcomeMessageTable).where(eq(adminWelcomeMessageTable.lang, lang)).limit(1);
    if (existing[0]) {
      await db.update(adminWelcomeMessageTable)
        .set({ text: trimmedText, suggestionChips: cleanedChips, updatedBy: auth.userId, updatedAt: new Date() })
        .where(eq(adminWelcomeMessageTable.lang, lang));
    } else {
      await db.insert(adminWelcomeMessageTable).values({
        lang, text: trimmedText, suggestionChips: cleanedChips, updatedBy: auth.userId,
      });
    }
  }

  invalidateConfigCache();
  await auditLog(auth.userId, 'edited_welcome_message', 'welcome');

  return NextResponse.json({ success: true });
}
