import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { db } from '@/db';
import { adminUsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type AdminRole = 'it' | 'admin' | 'viewer';

export interface CurrentAdmin {
  userId: number;
  name: string;
  email: string;
  role: AdminRole;
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const rows = await db
    .select({ role: adminUsersTable.role })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.userId, payload.userId))
    .limit(1);

  if (!rows[0]) return null;

  return {
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    role: rows[0].role as AdminRole,
  };
}

export async function getCurrentUser(): Promise<{ userId: number; name: string; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  return { userId: payload.userId, name: payload.name, email: payload.email };
}
