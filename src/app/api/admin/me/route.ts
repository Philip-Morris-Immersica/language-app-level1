import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { adminUsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.json({ admin: null });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ admin: null });

  const rows = await db
    .select({ role: adminUsersTable.role })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.userId, payload.userId))
    .limit(1);

  if (!rows[0]) return NextResponse.json({ admin: null });

  return NextResponse.json({ admin: { role: rows[0].role } });
}
