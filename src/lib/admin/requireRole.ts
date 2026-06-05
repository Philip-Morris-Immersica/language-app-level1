import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { adminUsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { AdminRole } from './getCurrentAdmin';

export async function requireAdmin(
  req: NextRequest,
  minRole?: AdminRole,
): Promise<{ userId: number; role: AdminRole } | NextResponse> {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db
    .select({ role: adminUsersTable.role })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.userId, payload.userId))
    .limit(1);

  if (!rows[0]) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const role = rows[0].role as AdminRole;

  if (minRole === 'it' && role !== 'it') {
    return NextResponse.json({ error: 'Forbidden — IT only' }, { status: 403 });
  }
  if (minRole === 'admin' && role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return { userId: payload.userId, role };
}

export function isNextResponse(v: unknown): v is NextResponse {
  return v instanceof NextResponse;
}
