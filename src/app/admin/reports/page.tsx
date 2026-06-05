'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText, BarChart2, Loader2, Users, GraduationCap,
  MessageSquare, ChevronDown, ChevronRight, Sparkles, FileSpreadsheet,
} from 'lucide-react';

// ── Types (mirror src/lib/admin/reportData.ts) ───────────────────────────────

type SectionId = 'summary' | 'activeUsers' | 'levelProgress' | 'chatTranscripts';

interface SummarySection {
  newUsers: number;
  activeUsers: number;
  conversations: number;
  userMessages: number;
  assistantMessages: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  byModel: Array<{ model: string; messages: number; tokensIn: number; tokensOut: number; costUsd: number }>;
}

interface ActiveUserLessonProgress {
  lessonId: string;
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'unknown';
  attemptedCount: number;
  totalCount: number;
  pct: number;
}

interface ActiveUserRow {
  userId: number;
  name: string;
  email: string;
  exercisesInPeriod: number;
  chatMessagesInPeriod: number;
  chatCostUsd: number;
  joinedAt: string | null;
  highestLevel: 'a1' | 'a2' | 'b1' | 'b2' | null;
  highestLevelPct: number;
  totalLessonsAttempted: number;
  perLesson: ActiveUserLessonProgress[];
}

interface LevelProgressSection {
  byLevel: Array<{ level: 'a1' | 'a2' | 'b1' | 'b2'; activeUsers: number; avgPct: number }>;
  histogramByLevel: Array<{
    level: 'a1' | 'a2' | 'b1' | 'b2';
    buckets: Array<{ bucket: string; users: number }>;
  }>;
}

interface ChatTranscriptMessage {
  role: string;
  content: string;
  createdAt: string;
  tokensIn: number | null;
  tokensOut: number | null;
  contentRedacted: boolean;
}

interface ChatTranscriptRow {
  conversationId: number;
  userId: number;
  userName: string;
  userEmail: string;
  language: string;
  level: string | null;
  startedAt: string;
  lastMessageAt: string;
  messageCount: number;
  costUsd: number;
  messages: ChatTranscriptMessage[];
}

interface ReportData {
  period: { from: string; to: string };
  sections: {
    summary?: SummarySection;
    activeUsers?: ActiveUserRow[];
    levelProgress?: LevelProgressSection;
    chatTranscripts?: ChatTranscriptRow[];
  };
}

// ── Section catalog ──────────────────────────────────────────────────────────

interface SectionDef {
  id: SectionId;
  label: string;
  description: string;
  defaultOn: boolean;
  warning?: string;
}

const SECTIONS: SectionDef[] = [
  {
    id: 'summary',
    label: 'Period summary',
    description: 'Registrations, active users, conversations, tokens, cost — all for the selected period.',
    defaultOn: true,
  },
  {
    id: 'activeUsers',
    label: 'Active users in period',
    description: 'All users with exercise or chat activity in the period, sorted by activity. Each row expands to show per-lesson progress.',
    defaultOn: true,
  },
  {
    id: 'levelProgress',
    label: 'Learning progress by level',
    description: 'Average completion + distribution histogram per level. Cumulative across all users (not period-filtered).',
    defaultOn: true,
  },
  {
    id: 'chatTranscripts',
    label: 'Chat transcripts',
    description: 'Full message contents of all conversations from the period, sorted by message count. Heavy — adds many rows to the export.',
    defaultOn: false,
    warning: 'Heavy — increases report size significantly.',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

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

const LEVEL_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  a1: { bar: 'bg-[#0072BC]', text: 'text-[#05568B]', bg: 'bg-[#CDE3F1]' },
  a2: { bar: 'bg-[#32C189]', text: 'text-[#1F5741]', bg: 'bg-[#DAF6EB]' },
  b1: { bar: 'bg-[#E4A202]', text: 'text-[#684D0B]', bg: 'bg-[#FEF1D1]' },
  b2: { bar: 'bg-[#D25A45]', text: 'text-[#683229]', bg: 'bg-[#FCE2DE]' },
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminReportsPage() {
  const [from, setFrom] = useState(daysAgo(30));
  const [to, setTo] = useState(today());
  const [period, setPeriod] = useState<Period>('30d');
  const [enabled, setEnabled] = useState<Record<SectionId, boolean>>(() => {
    const init = {} as Record<SectionId, boolean>;
    for (const s of SECTIONS) init[s.id] = s.defaultOn;
    return init;
  });
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const setQuickPeriod = (p: Period) => {
    setPeriod(p);
    if (p === '1d') { setFrom(today()); setTo(today()); }
    else if (p === '7d') { setFrom(daysAgo(7)); setTo(today()); }
    else if (p === '30d') { setFrom(daysAgo(30)); setTo(today()); }
    else { setFrom('2024-01-01'); setTo(today()); }
  };

  const selectedSections = (Object.keys(enabled) as SectionId[]).filter((k) => enabled[k]);

  const buildUrl = (path: string) => {
    const params = new URLSearchParams({
      from,
      to,
      sections: selectedSections.join(','),
    });
    return `${path}?${params.toString()}`;
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      const r = await fetch(buildUrl('/api/admin/reports/build'));
      const data = await r.json();
      setReport(data);
    } finally {
      setLoading(false);
    }
  };

  const downloadXlsx = () => {
    window.open(buildUrl('/api/admin/reports/export-xlsx'), '_blank');
  };

  useEffect(() => {
    generateReport();
    // initial load only — re-runs are triggered by the explicit "Generate report" button
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSection = (id: SectionId) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      {/* ── Period ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">1. Select period</h3>
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
        </div>
      </div>

      {/* ── Sections ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">2. What to include</h3>
        <div className="space-y-2">
          {SECTIONS.map((s) => (
            <label
              key={s.id}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                enabled[s.id]
                  ? 'border-[#0072BC] bg-[#CDE3F1]/30'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={enabled[s.id]}
                onChange={() => toggleSection(s.id)}
                className="mt-0.5 w-4 h-4 accent-[#0072BC] cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                {s.warning && (
                  <p className="text-[11px] text-[#684D0B] mt-1">⚠ {s.warning}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── Actions ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5 flex flex-wrap gap-2">
        <button
          onClick={generateReport}
          disabled={loading || selectedSections.length === 0}
          className="flex items-center gap-1.5 bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
          {loading ? 'Generating...' : 'Generate report'}
        </button>
        <button
          onClick={downloadXlsx}
          disabled={selectedSections.length === 0}
          className="flex items-center gap-1.5 bg-white border-2 border-[#32C189] text-[#1F5741] text-sm px-4 py-2 rounded-lg hover:bg-[#DAF6EB] transition-colors disabled:opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export XLSX
        </button>
      </div>

      {/* ── Preview ────────────────────────────────────────────────────── */}
      {report && (
        <div className="space-y-5">
          {report.sections.summary && <SummaryView data={report.sections.summary} />}
          {report.sections.activeUsers && <ActiveUsersView rows={report.sections.activeUsers} />}
          {report.sections.levelProgress && <LevelProgressView data={report.sections.levelProgress} />}
          {report.sections.chatTranscripts && <ChatTranscriptsView rows={report.sections.chatTranscripts} />}
          {selectedSections.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400">
              Select at least one section to generate a report.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Section views ────────────────────────────────────────────────────────────

function SummaryView({ data }: { data: SummarySection }) {
  const stats = [
    { label: 'New users', value: data.newUsers },
    { label: 'Active users', value: data.activeUsers },
    { label: 'Conversations', value: data.conversations },
    { label: 'User messages', value: data.userMessages },
    { label: 'Tokens in', value: data.tokensIn.toLocaleString() },
    { label: 'Tokens out', value: data.tokensOut.toLocaleString() },
    { label: 'Total cost', value: fmtUsd(data.costUsd), highlight: true },
  ];
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#0072BC]" />
        <h2 className="text-base font-semibold text-gray-800">Period summary</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-3 border ${
              s.highlight ? 'border-[#FCE2DE] bg-[#FCE2DE]/30' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <p className="text-xl font-bold text-gray-900 tabular-nums">
              {typeof s.value === 'number' ? s.value.toLocaleString() : s.value}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {data.byModel.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase mb-1">By model</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="py-1.5 text-left font-medium">Model</th>
                <th className="py-1.5 text-right font-medium">Messages</th>
                <th className="py-1.5 text-right font-medium">In</th>
                <th className="py-1.5 text-right font-medium">Out</th>
                <th className="py-1.5 text-right font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.byModel.map((m) => (
                <tr key={m.model} className="border-b border-gray-50">
                  <td className="py-1.5 font-mono text-gray-700">{m.model}</td>
                  <td className="py-1.5 text-right tabular-nums">{m.messages.toLocaleString()}</td>
                  <td className="py-1.5 text-right tabular-nums text-gray-500">{m.tokensIn.toLocaleString()}</td>
                  <td className="py-1.5 text-right tabular-nums text-gray-500">{m.tokensOut.toLocaleString()}</td>
                  <td className="py-1.5 text-right tabular-nums font-medium">{fmtUsd(m.costUsd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ActiveUsersView({ rows }: { rows: ActiveUserRow[] }) {
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-[#0072BC]" />
        <h2 className="text-base font-semibold text-gray-800">Active users in period</h2>
        <span className="ml-auto text-[11px] text-gray-400">{rows.length} user{rows.length === 1 ? '' : 's'}</span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">No user activity in this period.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="py-1.5 w-6"></th>
                <th className="py-1.5 text-left font-medium">User</th>
                <th className="py-1.5 text-left font-medium">Level</th>
                <th className="py-1.5 text-right font-medium">Progress</th>
                <th className="py-1.5 text-right font-medium">Lessons</th>
                <th className="py-1.5 text-right font-medium">Exercises</th>
                <th className="py-1.5 text-right font-medium">Chat msgs</th>
                <th className="py-1.5 text-right font-medium">Cost</th>
                <th className="py-1.5"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => <ActiveUserRowView key={r.userId} user={r} />)}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ActiveUserRowView({ user }: { user: ActiveUserRow }) {
  const [open, setOpen] = useState(false);
  const lvl = user.highestLevel;
  const colors = lvl ? LEVEL_COLORS[lvl] : null;
  const hasLessons = user.perLesson.length > 0;

  return (
    <>
      <tr className="border-b border-gray-50 hover:bg-gray-50">
        <td className="py-2 align-top">
          {hasLessons ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-gray-400 hover:text-gray-700"
              aria-label={open ? 'Hide lessons' : 'Show lessons'}
            >
              {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          ) : null}
        </td>
        <td className="py-2">
          <p className="text-xs font-medium text-gray-800 truncate max-w-[180px]" title={user.name}>{user.name}</p>
          <p className="text-[10px] text-gray-400 truncate max-w-[180px]" title={user.email}>{user.email}</p>
        </td>
        <td className="py-2">
          {lvl && colors ? (
            <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} font-semibold`}>{lvl}</span>
          ) : (
            <span className="text-[10px] text-gray-400">—</span>
          )}
        </td>
        <td className="py-2 text-right">
          <div className="flex items-center justify-end gap-2">
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors?.bar ?? 'bg-gray-400'}`}
                style={{ width: `${Math.min(100, Math.max(2, user.highestLevelPct))}%` }}
              />
            </div>
            <span className="tabular-nums text-gray-700 w-9 text-right">{user.highestLevelPct}%</span>
          </div>
        </td>
        <td className="py-2 text-right tabular-nums text-gray-600">{user.totalLessonsAttempted}</td>
        <td className="py-2 text-right tabular-nums text-gray-600">{user.exercisesInPeriod}</td>
        <td className="py-2 text-right tabular-nums text-gray-600">{user.chatMessagesInPeriod}</td>
        <td className="py-2 text-right tabular-nums text-gray-700 font-medium">{fmtUsd(user.chatCostUsd)}</td>
        <td className="py-2 text-right">
          <Link href={`/admin/users/${user.userId}`} className="text-[11px] text-[#0072BC] hover:underline">View →</Link>
        </td>
      </tr>
      {open && hasLessons && (
        <tr className="bg-gray-50/60 border-b border-gray-100">
          <td></td>
          <td colSpan={8} className="py-3 px-2">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Per-lesson progress (cumulative)
            </p>
            <div className="space-y-1">
              {user.perLesson.map((l) => {
                const lvlColor = l.level !== 'unknown' ? LEVEL_COLORS[l.level] : null;
                return (
                  <div key={l.lessonId} className="flex items-center gap-2 text-[11px]">
                    <span className="font-mono text-gray-500 w-28 truncate">{l.lessonId}</span>
                    <span className="uppercase text-[9px] text-gray-400 w-6">{l.level !== 'unknown' ? l.level : '—'}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${lvlColor?.bar ?? 'bg-[#32C189]'}`}
                        style={{ width: `${Math.min(100, Math.max(2, l.pct))}%` }}
                      />
                    </div>
                    <span className="tabular-nums text-gray-700 w-9 text-right">{l.pct}%</span>
                    <span className="tabular-nums text-gray-400 w-12 text-right">
                      {l.attemptedCount}/{l.totalCount}
                    </span>
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function LevelProgressView({ data }: { data: LevelProgressSection }) {
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap className="w-4 h-4 text-[#0072BC]" />
        <h2 className="text-base font-semibold text-gray-800">Learning progress by level</h2>
        <span className="ml-auto text-[11px] text-gray-400 italic">cumulative — all-time</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.byLevel.map((lvl) => {
          const colors = LEVEL_COLORS[lvl.level];
          const hist = data.histogramByLevel.find((h) => h.level === lvl.level)?.buckets ?? [];
          const maxBucket = Math.max(...hist.map((b) => b.users), 1);
          return (
            <Link
              key={lvl.level}
              href={`/admin/levels/${lvl.level}`}
              className={`rounded-xl p-3 border ${colors.bg} hover:shadow transition`}
            >
              <p className={`text-xs font-bold uppercase ${colors.text}`}>{lvl.level}</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums mt-0.5">{lvl.avgPct}%</p>
              <p className="text-[10px] text-gray-500">avg, {lvl.activeUsers} learners</p>
              {lvl.activeUsers > 0 ? (
                <div className="mt-2 flex items-end gap-0.5 h-10">
                  {hist.map((b) => (
                    <div key={b.bucket} title={`${b.bucket}: ${b.users}`} className="flex-1">
                      <div
                        className={`${colors.bar} rounded-sm w-full`}
                        style={{ height: `${(b.users / maxBucket) * 36 + 2}px` }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[10px] text-gray-400 italic">no activity</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ChatTranscriptsView({ rows }: { rows: ChatTranscriptRow[] }) {
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-[#0072BC]" />
        <h2 className="text-base font-semibold text-gray-800">Chat transcripts</h2>
        <span className="ml-auto text-[11px] text-gray-400">{rows.length} conversation{rows.length === 1 ? '' : 's'}</span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">No chat conversations in this period.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((c) => <TranscriptRow key={c.conversationId} conv={c} />)}
        </div>
      )}
    </section>
  );
}

function TranscriptRow({ conv }: { conv: ChatTranscriptRow }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg"
      >
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-800 truncate">{conv.userName}</p>
          <p className="text-[10px] text-gray-400 truncate">
            {new Date(conv.startedAt).toLocaleDateString()} · {conv.language.toUpperCase()}
            {conv.level && ` / ${conv.level.toUpperCase()}`}
            {' · '}{conv.messageCount} msgs · {fmtUsd(conv.costUsd)}
          </p>
        </div>
        <Link
          href={`/admin/chats/${conv.conversationId}`}
          onClick={(e) => e.stopPropagation()}
          className="text-[11px] text-[#0072BC] hover:underline"
        >
          Open →
        </Link>
      </button>
      {open && (
        <div className="px-3 pb-3 pt-1 space-y-2 max-h-[400px] overflow-y-auto bg-gray-50/40 border-t border-gray-100">
          {conv.messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-2xl px-3 py-2 max-w-[80%] text-xs ${
                  m.role === 'user'
                    ? 'bg-[#0072BC] text-white rounded-tr-sm'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                }`}
              >
                {m.contentRedacted && (
                  <span className="text-[10px] opacity-60 block mb-1">[Some content was redacted]</span>
                )}
                <p className="whitespace-pre-wrap leading-snug">{m.content}</p>
                <p className="text-[9px] opacity-50 mt-1">{new Date(m.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
