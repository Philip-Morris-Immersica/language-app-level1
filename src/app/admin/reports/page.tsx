'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Download, BarChart2, Loader2, MessageSquare } from 'lucide-react';

interface ByConversation {
  conversationId: number;
  userId: number;
  userName: string;
  language: string;
  level: string | null;
  startedAt: string;
  messages: number;
  assistantMessages: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  isEstimated: boolean;
}

interface Analytics {
  totals: {
    conversations: number;
    messages: number;
    assistantMessages?: number;
    uniqueUsers: number;
    tokensIn: number;
    tokensOut: number;
    estimatedCostUsd: string;
    costUsd: string;
  };
  byLanguage: Array<{ language: string; count: number }>;
  byLevel: Array<{ level: string | null; count: number }>;
  byDay: Array<{ date: string; conversations: number }>;
  byModel: Array<{ model: string; messages: number; tokensIn: number; tokensOut: number; costUsd: string }>;
  byConversation: ByConversation[];
}

function fmtUsd(usd: number) {
  if (usd === 0) return '$0.00';
  if (usd < 0.01) return `$${usd.toFixed(5)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

function fmtDate(d: Date) { return d.toISOString().slice(0, 10); }
function today() { return fmtDate(new Date()); }
function daysAgo(n: number) { return fmtDate(new Date(Date.now() - n * 86400_000)); }

type Period = '1d' | '7d' | '30d' | 'all';

const PERIODS: Array<{ id: Period; label: string }> = [
  { id: '1d', label: 'Today' },
  { id: '7d', label: '7d' },
  { id: '30d', label: '30d' },
  { id: 'all', label: 'All time' },
];

export default function AdminReportsPage() {
  const [from, setFrom] = useState(daysAgo(30));
  const [to, setTo] = useState(today());
  const [period, setPeriod] = useState<Period>('30d');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);

  const setQuickPeriod = (p: Period) => {
    setPeriod(p);
    if (p === '1d') { setFrom(today()); setTo(today()); }
    else if (p === '7d') { setFrom(daysAgo(7)); setTo(today()); }
    else if (p === '30d') { setFrom(daysAgo(30)); setTo(today()); }
    else { setFrom('2024-01-01'); setTo(today()); }
  };

  const loadAnalytics = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/analytics?from=${from}&to=${to}`);
    const data = await r.json();
    setAnalytics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
    // intentionally load once on mount + on quick-period change via the button
    // (manual From/To changes still need the "Load" button)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const downloadCsv = () => {
    window.open(`/api/admin/export/csv?from=${from}&to=${to}`, '_blank');
  };

  const totalCost = analytics?.totals.costUsd ?? analytics?.totals.estimatedCostUsd ?? '0';

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Select period</h3>

        <div className="flex gap-1.5 mb-3 flex-wrap">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              onClick={() => setQuickPeriod(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p.id
                  ? 'bg-[#0072BC] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 block mb-1">From</label>
            <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPeriod('30d'); }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">To</label>
            <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPeriod('30d'); }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <button onClick={loadAnalytics} disabled={loading}
            className="flex items-center gap-1.5 bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
            {loading ? 'Loading...' : 'Reload'}
          </button>
          <button onClick={downloadCsv}
            className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {analytics && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Conversations', value: analytics.totals.conversations },
              { label: 'User messages', value: analytics.totals.messages },
              { label: 'Unique users', value: analytics.totals.uniqueUsers },
              { label: 'Tokens in', value: analytics.totals.tokensIn.toLocaleString() },
              { label: 'Tokens out', value: analytics.totals.tokensOut.toLocaleString() },
              { label: 'Total cost', value: `$${totalCost}`, highlight: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-xl p-4 shadow-sm border ${
                  stat.highlight ? 'border-[#FCE2DE] bg-[#FCE2DE]/30' : 'border-gray-100'
                }`}
              >
                <p className="text-2xl font-bold text-gray-900">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* By model */}
          {analytics.byModel && analytics.byModel.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">By model</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="py-1.5 text-left font-medium text-xs">Model</th>
                    <th className="py-1.5 text-right font-medium text-xs">Messages</th>
                    <th className="py-1.5 text-right font-medium text-xs">Tokens in</th>
                    <th className="py-1.5 text-right font-medium text-xs">Tokens out</th>
                    <th className="py-1.5 text-right font-medium text-xs">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.byModel.map((m) => (
                    <tr key={m.model} className="border-b border-gray-50">
                      <td className="py-2 font-mono text-xs text-gray-700">{m.model}</td>
                      <td className="py-2 text-right tabular-nums text-xs">{m.messages.toLocaleString()}</td>
                      <td className="py-2 text-right tabular-nums text-xs text-gray-500">{m.tokensIn.toLocaleString()}</td>
                      <td className="py-2 text-right tabular-nums text-xs text-gray-500">{m.tokensOut.toLocaleString()}</td>
                      <td className="py-2 text-right tabular-nums font-medium text-xs">${m.costUsd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* By conversation (top 20 by cost) */}
          {analytics.byConversation && analytics.byConversation.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#0072BC]" />
                <h3 className="text-sm font-semibold text-gray-700">Top conversations by cost</h3>
                <span className="ml-auto text-[11px] text-gray-400">
                  {analytics.byConversation.length} shown · sorted by cost desc
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500">
                      <th className="py-1.5 text-left font-medium text-xs">User</th>
                      <th className="py-1.5 text-left font-medium text-xs">Started</th>
                      <th className="py-1.5 text-left font-medium text-xs">Lang/Lvl</th>
                      <th className="py-1.5 text-right font-medium text-xs">Msgs</th>
                      <th className="py-1.5 text-right font-medium text-xs">In</th>
                      <th className="py-1.5 text-right font-medium text-xs">Out</th>
                      <th className="py-1.5 text-right font-medium text-xs">Cost</th>
                      <th className="py-1.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.byConversation.map((c) => (
                      <tr key={c.conversationId} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2">
                          <Link href={`/admin/users/${c.userId}`} className="text-xs text-[#0072BC] hover:underline truncate inline-block max-w-[140px]" title={c.userName}>
                            {c.userName}
                          </Link>
                        </td>
                        <td className="py-2 text-xs text-gray-500 tabular-nums">
                          {new Date(c.startedAt).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <span className="text-[10px] uppercase font-mono text-gray-700">{c.language}</span>
                          {c.level && <span className="ml-1 text-[10px] uppercase text-gray-400">/{c.level}</span>}
                        </td>
                        <td className="py-2 text-right tabular-nums text-xs">{c.messages}</td>
                        <td className="py-2 text-right tabular-nums text-xs text-gray-500">{c.tokensIn.toLocaleString()}</td>
                        <td className="py-2 text-right tabular-nums text-xs text-gray-500">{c.tokensOut.toLocaleString()}</td>
                        <td className="py-2 text-right tabular-nums text-xs font-medium">
                          {fmtUsd(c.costUsd)}
                          {c.isEstimated && (
                            <span className="ml-1 text-[9px] text-amber-600" title="Cost partially estimated from token counts">est</span>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          <Link href={`/admin/chats/${c.conversationId}`} className="text-xs text-[#0072BC] hover:underline">
                            view →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {analytics.byConversation.some((c) => c.isEstimated) && (
                <p className="mt-2 text-[10px] text-gray-400 italic">
                  Rows marked &ldquo;est&rdquo; include cost estimated from older token counts (before the per-message cost
                  column existed). Newer messages use the exact OpenAI usage number.
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">By language</h3>
              <div className="space-y-2">
                {analytics.byLanguage.map(({ language, count }) => (
                  <div key={language} className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-gray-700 uppercase">{language}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-[#0072BC] rounded-full" style={{ width: `${Math.round((count / Math.max(1, analytics.totals.conversations)) * 100)}px`, minWidth: '4px' }} />
                      <span className="text-xs text-gray-500">{count}</span>
                    </div>
                  </div>
                ))}
                {analytics.byLanguage.length === 0 && <p className="text-xs text-gray-400">No data</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">By level</h3>
              <div className="space-y-2">
                {analytics.byLevel.map(({ level, count }) => (
                  <div key={level ?? 'none'} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">{level?.toUpperCase() ?? 'Unknown'}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-[#32C189] rounded-full" style={{ width: `${Math.round((count / Math.max(1, analytics.totals.conversations)) * 100)}px`, minWidth: '4px' }} />
                      <span className="text-xs text-gray-500">{count}</span>
                    </div>
                  </div>
                ))}
                {analytics.byLevel.length === 0 && <p className="text-xs text-gray-400">No data</p>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Daily conversations</h3>
            {analytics.byDay.length > 0 ? (
              <div className="flex items-end gap-1 h-24 overflow-x-auto">
                {analytics.byDay.map(({ date, conversations }) => {
                  const max = Math.max(...analytics.byDay.map((d) => d.conversations));
                  const height = max ? Math.round((conversations / max) * 96) : 4;
                  return (
                    <div key={date} title={`${date}: ${conversations}`}
                      className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="bg-[#0072BC] rounded-sm w-4" style={{ height: `${height}px` }} />
                      <span className="text-[9px] text-gray-400 rotate-45 origin-left">{date.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No data for this period.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
