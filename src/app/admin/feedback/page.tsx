'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { MessageSquare, Sparkles, Loader2, CheckCircle2, Circle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface FeedbackRow {
  id: number;
  conversationId: number | null;
  comment: string;
  language: string;
  reviewed: boolean;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
}

type ReviewedFilter = 'all' | 'true' | 'false';

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export default function AdminFeedbackPage() {
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewedFilter, setReviewedFilter] = useState<ReviewedFilter>('all');

  const [from, setFrom] = useState(isoDaysAgo(30));
  const [to, setTo] = useState(isoDaysAgo(0));

  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ summary: string; count: number; costUsd: number } | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100' });
    if (reviewedFilter !== 'all') params.set('reviewed', reviewedFilter);
    fetch(`/api/admin/feedback?${params}`)
      .then((r) => r.json())
      .then(({ feedback }) => setRows(feedback ?? []))
      .finally(() => setLoading(false));
  }, [reviewedFilter]);

  useEffect(() => { load(); }, [load]);

  async function toggleReviewed(row: FeedbackRow) {
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, reviewed: !r.reviewed } : r)));
    await fetch(`/api/admin/feedback/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewed: !row.reviewed }),
    });
  }

  async function runAnalysis() {
    setAnalyzing(true);
    setAnalyzeError(null);
    setAnalysis(null);
    try {
      const res = await fetch('/api/admin/feedback/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: `${to}T23:59:59` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Analysis failed');
      setAnalysis(data);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : String(err));
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Free-text comments from the single feedback button at the top of the chat window.
        </p>
      </div>

      {/* On-demand AI analysis — manual click only, never automatic */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#0072BC]" />
          <h2 className="text-sm font-semibold text-gray-800">AI анализ на обратната връзка</h2>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">От</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">До</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-[#0072BC] text-white hover:bg-[#005A8E] transition-colors disabled:opacity-50"
          >
            {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Анализирай с AI
          </button>
          <span className="text-xs text-gray-400">Ръчно, само при клик — не се пуска автоматично.</span>
        </div>

        {analyzeError && <p className="mt-3 text-sm text-red-600">{analyzeError}</p>}

        {analysis && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-2">
              {analysis.count} коментар(и) анализирани · цена: ${analysis.costUsd.toFixed(4)}
            </p>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{analysis.summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Reviewed filter chips */}
      <div className="mb-3 flex flex-wrap gap-2">
        {(['all', 'false', 'true'] as ReviewedFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setReviewedFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              reviewedFilter === f
                ? 'bg-[#0072BC] text-white border-[#0072BC]'
                : 'bg-white hover:bg-gray-50 border-gray-200'
            }`}
          >
            {f === 'all' ? 'Всички' : f === 'false' ? 'Непрочетени' : 'Прочетени'}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">{rows.length} shown</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No feedback found.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="bg-[#CDE3F1] text-[#05568B] px-1.5 py-0.5 rounded text-xs font-medium uppercase">
                  {r.language}
                </span>
                <span className="text-xs text-gray-500">
                  {r.userName ?? 'Anonymous'} {r.userEmail ? `(${r.userEmail})` : ''}
                </span>
                {r.conversationId && (
                  <Link href={`/admin/chats/${r.conversationId}`} className="inline-flex items-center gap-1 text-xs text-[#0072BC] hover:underline">
                    <MessageSquare className="w-3 h-3" /> View conversation
                  </Link>
                )}
                <span className="ml-auto text-xs text-gray-400">{new Date(r.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap mb-3">{r.comment}</p>
              <button
                onClick={() => toggleReviewed(r)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 border transition-colors ${
                  r.reviewed
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {r.reviewed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                {r.reviewed ? 'Reviewed' : 'Mark reviewed'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
