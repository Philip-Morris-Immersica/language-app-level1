import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { adminUsersTable, usersTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  // 'admin' role can view + grant here too (not just 'it') — see the extra
  // guardrails in POST below that keep IT-level access IT-only.
  const auth = await requireAdmin(req, 'admin');
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
  // Regular admins may grant 'admin'/'viewer' too — see guardrails below that
  // keep IT-level access (granting 'it', or touching an existing IT admin)
  // strictly IT-only.
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { userId, email, role } = await req.json();
  if ((!userId && !email) || !role) {
    return NextResponse.json({ error: 'userId or email, and role, are required' }, { status: 400 });
  }
  if (!['it', 'admin', 'viewer'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }
  if (role === 'it' && auth.role !== 'it') {
    return NextResponse.json({ error: 'Only IT can grant IT access' }, { status: 403 });
  }

  // Resolve the target user server-side. Looking the user up here (instead of
  // relying on the client's capped/paginated user list) avoids false
  // "User not found" errors for accounts that simply aren't in the first page
  // of results the admin UI happened to load.
  let resolvedUserId: number | undefined = userId;
  if (!resolvedUserId) {
    const trimmedEmail = String(email).trim();
    const found = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(sql`lower(${usersTable.email}) = lower(${trimmedEmail})`)
      .limit(1);
    if (!found[0]) {
      return NextResponse.json({ error: 'User not found. They must be registered first.' }, { status: 404 });
    }
    resolvedUserId = found[0].id;
  }

  const existing = await db.select().from(adminUsersTable).where(eq(adminUsersTable.userId, resolvedUserId)).limit(1);

  // A non-IT admin may not touch an existing IT admin's row at all (e.g.
  // accidentally downgrading them to 'admin'/'viewer').
  if (existing[0]?.role === 'it' && auth.role !== 'it') {
    return NextResponse.json({ error: 'Only IT can modify an IT admin' }, { status: 403 });
  }

  if (existing[0]) {
    await db.update(adminUsersTable).set({ role }).where(eq(adminUsersTable.userId, resolvedUserId));
  } else {
    await db.insert(adminUsersTable).values({ userId: resolvedUserId, role, createdBy: auth.userId });
  }

  await auditLog(auth.userId, 'granted_role', `user:${resolvedUserId}`, null, { role, grantedByRole: auth.role });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  // Revoking admin access stays IT-only, deliberately — regular admins can
  // grant roles (see POST) but can never remove anyone.
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
