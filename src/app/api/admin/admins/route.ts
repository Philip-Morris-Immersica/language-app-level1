import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { adminUsersTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const rows = await db
    .select({
      id: adminUsersTable.id,
      userId: adminUsersTable.userId,
      role: adminUsersTable.role,
      createdAt: adminUsersTable.createdAt,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(adminUsersTable)
    .leftJoin(usersTable, eq(adminUsersTable.userId, usersTable.id));

  return NextResponse.json({ admins: rows });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { userId, role } = await req.json();
  if (!userId || !role) return NextResponse.json({ error: 'userId and role required' }, { status: 400 });
  if (!['it', 'admin', 'viewer'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const existing = await db.select().from(adminUsersTable).where(eq(adminUsersTable.userId, userId)).limit(1);
  if (existing[0]) {
    await db.update(adminUsersTable).set({ role }).where(eq(adminUsersTable.userId, userId));
  } else {
    await db.insert(adminUsersTable).values({ userId, role, createdBy: auth.userId });
  }

  await auditLog(auth.userId, 'granted_role', `user:${userId}`, null, { role });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const userId = parseInt(searchParams.get('userId') ?? '0');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  if (userId === auth.userId) {
    return NextResponse.json({ error: 'Cannot remove yourself' }, { status: 400 });
  }

  await db.delete(adminUsersTable).where(eq(adminUsersTable.userId, userId));
  await auditLog(auth.userId, 'revoked_role', `user:${userId}`);

  return NextResponse.json({ success: true });
}
