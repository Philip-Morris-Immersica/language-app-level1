import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/admin/getCurrentAdmin';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar role={admin.role} />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
