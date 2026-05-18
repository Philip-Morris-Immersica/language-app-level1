import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { invalidateConfigCache } from '@/lib/chat/getActiveConfig';
import { db } from '@/db';
import { adminPromptsTable } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const scope = req.nextUrl.searchParams.get('scope') ?? 'base';

  const rows = await db
    .select()
    .from(adminPromptsTable)
    .where(eq(adminPromptsTable.scope, scope))
    .orderBy(desc(adminPromptsTable.version));

  return NextResponse.json({ prompts: rows });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { scope, promptText, temperature, model, maxTokens } = await req.json();
  if (!scope || !promptText) {
    return NextResponse.json({ error: 'scope and promptText required' }, { status: 400 });
  }

  const existing = await db.select({ version: adminPromptsTable.version })
    .from(adminPromptsTable)
    .where(and(eq(adminPromptsTable.scope, scope), eq(adminPromptsTable.isActive, true)))
    .orderBy(desc(adminPromptsTable.version))
    .limit(1);

  const nextVersion = (existing[0]?.version ?? 0) + 1;

  await db.update(adminPromptsTable)
    .set({ isActive: false })
    .where(eq(adminPromptsTable.scope, scope));

  const [inserted] = await db.insert(adminPromptsTable).values({
    scope,
    promptText,
    temperature: temperature ?? 70,
    model: model ?? 'gpt-4o-mini',
    maxTokens: maxTokens ?? 1000,
    isActive: true,
    version: nextVersion,
    updatedBy: auth.userId,
  }).returning();

  invalidateConfigCache();
  await auditLog(auth.userId, 'edited_prompt', `prompt:${scope}`, existing[0], { version: nextVersion });

  return NextResponse.json({ prompt: inserted });
}
