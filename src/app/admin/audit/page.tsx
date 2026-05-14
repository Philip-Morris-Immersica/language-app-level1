import { getCurrentAdmin } from '@/lib/admin/getCurrentAdmin';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { adminAuditLogTable, usersTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { ClipboardList } from 'lucide-react';

export default async function AdminAuditPage() {
  const admin = await getCurrentAdmin();
  if (!admin || admin.role !== 'it') redirect('/admin');

  const logs = await db.select({
    id: adminAuditLogTable.id,
    action: adminAuditLogTable.action,
    target: adminAuditLogTable.target,
    createdAt: adminAuditLogTable.createdAt,
    userName: usersTable.name,
    userEmail: usersTable.email,
  })
  .from(adminAuditLogTable)
  .leftJoin(usersTable, eq(adminAuditLogTable.adminUserId, usersTable.id))
  .orderBy(desc(adminAuditLogTable.createdAt))
  .limit(100);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {logs.length === 0 ? (
          <p className="px-4 py-8 text-sm text-gray-400 text-center">No audit log entries yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {logs.map((log) => (
              <div key={log.id} className="px-4 py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-medium text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">{log.action}</span>
                    {log.target && <span className="text-xs text-gray-500">{log.target}</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{log.userName} ({log.userEmail})</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
