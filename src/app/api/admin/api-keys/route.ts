import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { encryptKey, maskKey } from '@/lib/admin/cryptoKeys';
import { invalidateConfigCache } from '@/lib/chat/getActiveConfig';
import { db } from '@/db';
import { adminApiKeysTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const rows = await db.select({
    id: adminApiKeysTable.id,
    provider: adminApiKeysTable.provider,
    isActive: adminApiKeysTable.isActive,
    createdAt: adminApiKeysTable.createdAt,
    lastUsedAt: adminApiKeysTable.lastUsedAt,
  }).from(adminApiKeysTable);

  return NextResponse.json({ keys: rows });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { provider, key } = await req.json();
  if (!provider || !key) {
    return NextResponse.json({ error: 'provider and key required' }, { status: 400 });
  }

  const encryptedKey = await encryptKey(key);
  const masked = maskKey(key);

  await db.update(adminApiKeysTable)
    .set({ isActive: false })
    .where(eq(adminApiKeysTable.provider, provider));

  await db.insert(adminApiKeysTable).values({
    provider,
    encryptedKey,
    isActive: true,
    createdBy: auth.userId,
  });

  invalidateConfigCache();
  await auditLog(auth.userId, 'added_api_key', `provider:${provider}`, null, { masked });

  return NextResponse.json({ success: true, masked });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const id = parseInt(req.nextUrl.searchParams.get('id') ?? '0');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await db.delete(adminApiKeysTable).where(eq(adminApiKeysTable.id, id));
  invalidateConfigCache();
  await auditLog(auth.userId, 'deleted_api_key', `key:${id}`);

  return NextResponse.json({ success: true });
}
