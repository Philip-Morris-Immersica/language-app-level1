import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { asc, or, sql } from 'drizzle-orm';

// Lightweight "starts with" search over name + email, used for live
// autocomplete (e.g. the admin-grant combobox). Kept separate from
// /api/admin/users (which is heavier — joins progress/cost — and is capped
// at 100 rows) so typing a few letters always finds the right user
// regardless of how many accounts exist.
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const q = (req.nextUrl.searchParams.get('q') ?? '').trim();
  if (q.length < 2) return NextResponse.json({ users: [] });

  const pattern = `${q}%`;
  const rows = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email })
    .from(usersTable)
    .where(or(
      sql`${usersTable.name} ILIKE ${pattern}`,
      sql`${usersTable.email} ILIKE ${pattern}`,
    ))
    .orderBy(asc(usersTable.name))
    .limit(8);

  return NextResponse.json({ users: rows });
}
