'use client';

import { useState } from 'react';
import { FileText, Download, BarChart2, Loader2 } from 'lucide-react';

interface Analytics {
  totals: { conversations: number; messages: number; uniqueUsers: number; tokensIn: number; tokensOut: number; estimatedCostUsd: string };
  byLanguage: Array<{ language: string; count: number }>;
  byLevel: Array<{ level: string | null; count: number }>;
  byDay: Array<{ date: string; conversations: number }>;
}

function today() { return new Date().toISOString().slice(0, 10); }
function monthAgo() { return new Date(Date.now() - 30 * 86400_000).toISOString().slice(0, 10); }

export default function AdminReportsPage() {
  const [from, setFrom] = useState(monthAgo());
  const [to, setTo] = useState(today());
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/analytics?from=${from}&to=${to}`);
    const data = await r.json();
    setAnalytics(data);
    setLoading(false);
  };

  const downloadCsv = () => {
    window.open(`/api/admin/export/csv?from=${from}&to=${to}`, '_blank');
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Select period</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 block mb-1">From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <button onClick={loadAnalytics} disabled={loading}
            className="flex items-center gap-1.5 bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
            {loading ? 'Loading...' : 'Load analytics'}
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
              { label: 'Est. cost', value: `$${analytics.totals.estimatedCostUsd}` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">By language</h3>
              <div className="space-y-2">
                {analytics.byLanguage.map(({ language, count }) => (
                  <div key={language} className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-gray-700 uppercase">{language}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-[#0072BC] rounded-full" style={{ width: `${Math.round((count / analytics.totals.conversations) * 100)}px`, minWidth: '4px' }} />
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
                      <div className="h-2 bg-[#32C189] rounded-full" style={{ width: `${Math.round((count / analytics.totals.conversations) * 100)}px`, minWidth: '4px' }} />
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
