import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { usersTable, adminUsersTable, chatConversationsTable } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
  const offset = (page - 1) * limit;

  const rows = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
      adminRole: adminUsersTable.role,
      conversationCount: sql<number>`(SELECT COUNT(*) FROM chat_conversations WHERE user_id = ${usersTable.id})`,
    })
    .from(usersTable)
    .leftJoin(adminUsersTable, eq(usersTable.id, adminUsersTable.userId))
    .orderBy(desc(usersTable.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ users: rows, page, limit });
}
