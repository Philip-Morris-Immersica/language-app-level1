import { db } from '@/db';
import { adminUsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function seedAdminFromEnv(userId: number, email: string): Promise<void> {
  const envEmails = (process.env.IT_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!envEmails.includes(email.toLowerCase())) return;

  const existing = await db
    .select({ id: adminUsersTable.id })
    .from(adminUsersTable)
    .where(eq(adminUsersTable.userId, userId))
    .limit(1);

  if (existing.length > 0) return;

  await db.insert(adminUsersTable).values({
    userId,
    role: 'it',
    createdBy: userId,
  });
}
