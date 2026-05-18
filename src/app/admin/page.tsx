import Link from 'next/link';
import { getCurrentAdmin } from '@/lib/admin/getCurrentAdmin';
import { db } from '@/db';
import { chatConversationsTable, usersTable, exerciseStatesTable } from '@/db/schema';
import { sql, gte } from 'drizzle-orm';
import { MessageSquare, Users, DollarSign, UserCheck, ChevronRight } from 'lucide-react';
import { getPlatformProgressStats } from '@/lib/admin/userProgress';
import { getTotalCostMicroUsd, formatUsd } from '@/lib/admin/costEstimate';
import { LEVELS } from '@/content/registry';

const DAY_MS = 86400_000;

async function getUsageStats() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * DAY_MS);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    [userTotalRow],
    [userLastWeekRow],
    [convRow],
    chatActiveIds,
    exActiveIds,
    monthCost,
  ] = await Promise.all([
    db.select({ total: sql<number>`COUNT(*)` }).from(usersTable),
    db.select({ total: sql<number>`COUNT(*)` }).from(usersTable).where(sql`${usersTable.createdAt} >= ${sevenDaysAgo}`),
    db.select({ total: sql<number>`COUNT(*)` }).from(chatConversationsTable),
    db.selectDistinct({ userId: chatConversationsTable.userId })
      .from(chatConversationsTable)
      .where(gte(chatConversationsTable.lastMessageAt, sevenDaysAgo)),
    db.selectDistinct({ userId: exerciseStatesTable.userId })
      .from(exerciseStatesTable)
      .where(gte(exerciseStatesTable.updatedAt, sevenDaysAgo)),
    getTotalCostMicroUsd({ from: monthStart }),
  ]);

  const activeUserSet = new Set([
    ...chatActiveIds.map((r) => r.userId),
    ...exActiveIds.map((r) => r.userId),
  ]);

  return {
    usersTotal: Number(userTotalRow.total) ?? 0,
    usersLastWeek: Number(userLastWeekRow.total) ?? 0,
    conversations: Number(convRow.total) ?? 0,
    activeUsers7d: activeUserSet.size,
    monthCostUsd: monthCost.totalUsd,
    monthCostRealUsd: monthCost.realMicro / 1_000_000,
    monthCostEstUsd: monthCost.estimatedMicro / 1_000_000,
  };
}

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string; barBg: string; barFill: string }> = {
  a1: { bg: 'bg-[#CDE3F1]', text: 'text-[#05568B]', border: 'border-[#0072BC]', barBg: 'bg-[#0072BC]/10', barFill: 'bg-[#0072BC]' },
  a2: { bg: 'bg-[#DAF6EB]', text: 'text-[#1F5741]', border: 'border-[#32C189]', barBg: 'bg-[#32C189]/10', barFill: 'bg-[#32C189]' },
  b1: { bg: 'bg-[#FEF1D1]', text: 'text-[#684D0B]', border: 'border-[#FFC740]', barBg: 'bg-[#FFC740]/10', barFill: 'bg-[#E4A202]' },
  b2: { bg: 'bg-[#FCE2DE]', text: 'text-[#683229]', border: 'border-[#D25A45]', barBg: 'bg-[#D25A45]/10', barFill: 'bg-[#D25A45]' },
};

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  const [stats, progress] = await Promise.all([getUsageStats(), getPlatformProgressStats()]);

  const usageCards = [
    {
      label: 'Total users',
      value: stats.usersTotal.toLocaleString(),
      delta: stats.usersLastWeek > 0 ? `+${stats.usersLastWeek} last 7d` : null,
      icon: <Users className="w-5 h-5" />,
      color: 'text-[#0072BC]',
      bg: 'bg-[#CDE3F1]',
      href: '/admin/users',
    },
    {
      label: 'Active users — last 7 days',
      value: stats.activeUsers7d.toLocaleString(),
      delta: 'chat OR exercise',
      icon: <UserCheck className="w-5 h-5" />,
      color: 'text-[#1F5741]',
      bg: 'bg-[#DAF6EB]',
      href: '/admin/users?sort=created',
    },
    {
      label: 'Total chat conversations',
      value: stats.conversations.toLocaleString(),
      delta: null,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-[#684D0B]',
      bg: 'bg-[#FEF1D1]',
      href: '/admin/chats',
    },
    {
      label: 'Chat cost — this month',
      value: formatUsd(stats.monthCostUsd),
      delta:
        stats.monthCostEstUsd > 0
          ? `${formatUsd(stats.monthCostRealUsd)} real + ${formatUsd(stats.monthCostEstUsd)} est. → click for breakdown`
          : 'real, per-message → click for breakdown',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-[#683229]',
      bg: 'bg-[#FCE2DE]',
      href: '/admin/reports',
    },
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

      {/* Row 1 — Platform usage */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Platform usage</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {usageCards.map((card) => (
          <Link
            href={card.href}
            key={card.label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition group cursor-pointer block"
          >
            <div className={`inline-flex p-2 rounded-lg ${card.bg} ${card.color} mb-3`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            {card.delta && <p className="text-[11px] text-gray-400 mt-0.5">{card.delta}</p>}
          </Link>
        ))}
      </div>

      {/* Row 2 — Per-level learning progress (clickable) */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Learning progress
        <span className="ml-2 font-normal text-[11px] text-gray-400 normal-case">click a level for lesson + test breakdown</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {LEVELS.map((lvl) => {
          const data = progress.byLevel[lvl];
          const hist = progress.histogramByLevel[lvl];
          const maxHist = Math.max(...hist.map((b) => b.users), 1);
          const colors = LEVEL_COLORS[lvl];
          return (
            <Link
              href={`/admin/levels/${lvl}`}
              key={lvl}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 ${colors.border} hover:shadow-md transition cursor-pointer block group`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                  {lvl}
                </span>
                <ChevronRight className={`w-4 h-4 ${colors.text} opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition`} />
              </div>

              <p className="text-3xl font-bold text-gray-900 tabular-nums">{data.avgPct}%</p>
              <p className="text-xs text-gray-500 mt-0.5">
                avg completion across {data.activeUsers} learner{data.activeUsers === 1 ? '' : 's'}
              </p>

              {/* Mini histogram */}
              {data.activeUsers > 0 ? (
                <div className="mt-3 flex items-end gap-0.5 h-10">
                  {hist.map((b) => (
                    <div key={b.bucket} title={`${b.bucket}: ${b.users}`} className="flex-1 flex flex-col items-center">
                      <div className={`${colors.barFill} rounded-sm w-full`}
                        style={{ height: `${(b.users / maxHist) * 36 + 2}px` }} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[11px] text-gray-400 italic">No learner activity yet</p>
              )}
              {data.activeUsers > 0 && (
                <div className="mt-1 flex justify-between text-[9px] text-gray-400">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-3">Quick links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/admin/chats', label: 'View all conversations' },
            { href: '/admin/users', label: 'Manage users' },
            { href: '/admin/reports', label: 'Cost & usage reports' },
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
