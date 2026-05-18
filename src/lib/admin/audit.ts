import { db } from '@/db';
import { adminAuditLogTable } from '@/db/schema';

export async function auditLog(
  adminUserId: number,
  action: string,
  target?: string,
  before?: unknown,
  after?: unknown,
): Promise<void> {
  try {
    await db.insert(adminAuditLogTable).values({
      adminUserId,
      action,
      target: target ?? null,
      beforeJson: before ? JSON.stringify(before) : null,
      afterJson: after ? JSON.stringify(after) : null,
    });
  } catch (err) {
    console.error('[audit] failed to write audit log:', err);
  }
}
