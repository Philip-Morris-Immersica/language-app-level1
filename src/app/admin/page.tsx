import { getCurrentAdmin } from '@/lib/admin/getCurrentAdmin';
import { db } from '@/db';
import { chatConversationsTable, chatMessagesTable, usersTable } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { MessageSquare, Users, Zap, TrendingUp } from 'lucide-react';

async function getStats() {
  const [convRow] = await db.select({ total: sql<number>`COUNT(*)` }).from(chatConversationsTable);
  const [msgRow] = await db.select({ total: sql<number>`COUNT(*)` }).from(chatMessagesTable).where(sql`role = 'user'`);
  const [userRow] = await db.select({ total: sql<number>`COUNT(*)` }).from(usersTable);
  const [todayRow] = await db.select({ total: sql<number>`COUNT(*)` })
    .from(chatConversationsTable)
    .where(sql`started_at >= CURRENT_DATE`);

  return {
    conversations: convRow.total ?? 0,
    messages: msgRow.total ?? 0,
    users: userRow.total ?? 0,
    today: todayRow.total ?? 0,
  };
}

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  const stats = await getStats();

  const cards = [
    { label: 'Total conversations', value: stats.conversations, icon: <MessageSquare className="w-5 h-5" />, color: 'text-[#0072BC]', bg: 'bg-[#CDE3F1]' },
    { label: 'User messages', value: stats.messages, icon: <Zap className="w-5 h-5" />, color: 'text-[#1F5741]', bg: 'bg-[#DAF6EB]' },
    { label: 'Registered users', value: stats.users, icon: <Users className="w-5 h-5" />, color: 'text-[#684D0B]', bg: 'bg-[#FEF1D1]' },
    { label: 'Conversations today', value: stats.today, icon: <TrendingUp className="w-5 h-5" />, color: 'text-[#683229]', bg: 'bg-[#FCE2DE]' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome, <span className="font-medium">{admin?.name}</span>
          <span className="ml-2 text-xs bg-[#CDE3F1] text-[#05568B] px-2 py-0.5 rounded-full capitalize">{admin?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`inline-flex p-2 rounded-lg ${card.bg} ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-3">Quick links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/admin/chats', label: 'View all conversations' },
            { href: '/admin/users', label: 'Manage users' },
            { href: '/admin/reports', label: 'Download reports' },
            ...(admin?.role === 'it' ? [
              { href: '/admin/prompts', label: 'Edit AI prompts' },
              { href: '/admin/api-keys', label: 'Manage API keys' },
              { href: '/admin/admins', label: 'Manage admins' },
            ] : []),
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#0072BC] hover:underline"
            >
              → {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
