'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ClipboardCheck, Users, TrendingUp, Loader2 } from 'lucide-react';

interface LessonStats {
  lessonId: string;
  number: number;
  title: string;
  totalExercises: number;
  usersAttempted: number;
  avgPct: number;
  usersCompleted: number;
}

interface SectionStats {
  sectionId: string;
  name: string;
  totalExercises: number;
  avgAttemptedPct: number;
  avgScorePctAll: number;
  avgScorePctCompleters: number;
}

interface TestStats {
  testId: string;
  number: number;
  title: string;
  totalExercises: number;
  usersAttempted: number;
  usersCompleted: number;
  avgAttemptedPct: number;
  avgScorePctAll: number;
  avgScorePctCompleters: number;
  bySection: SectionStats[];
}

interface LevelDetail {
  level: string;
  lessons: LessonStats[];
  tests: TestStats[];
}

const LEVEL_COLORS: Record<string, { accent: string; accentText: string; light: string; mid: string }> = {
  a1: { accent: '#0072BC', accentText: '#05568B', light: '#CDE3F1', mid: '#0072BC' },
  a2: { accent: '#32C189', accentText: '#1F5741', light: '#DAF6EB', mid: '#32C189' },
  b1: { accent: '#E4A202', accentText: '#684D0B', light: '#FEF1D1', mid: '#FFC740' },
  b2: { accent: '#D25A45', accentText: '#683229', light: '#FCE2DE', mid: '#D25A45' },
};

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function AdminLevelDetailPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params);
  const [data, setData] = useState<LevelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/levels/${level}`)
      .then(async (r) => {
        if (!r.ok) {
          const { error } = await r.json().catch(() => ({ error: `HTTP ${r.status}` }));
          throw new Error(error || `HTTP ${r.status}`);
        }
        return r.json();
      })
      .then((d: LevelDetail) => setData(d))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [level]);

  const colors = LEVEL_COLORS[level] ?? LEVEL_COLORS.a1;
  const levelLabel = level.toUpperCase();

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-sm text-[#0072BC] hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">Level {levelLabel}</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Ниво <span style={{ color: colors.accentText }}>{levelLabel}</span>
        </h1>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-12 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading level statistics...
        </div>
      )}

      {error && (
        <div className="bg-[#FCE2DE] border border-[#D25A45]/40 rounded-lg p-4 text-sm text-[#683229]">
          Error: {error}
        </div>
      )}

      {data && !loading && (
        <div className="space-y-6">
          {/* Per-lesson */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
              <BookOpen className="w-4 h-4" style={{ color: colors.accent }} />
              <h2 className="text-base font-semibold text-gray-800">Lesson completion</h2>
              <span className="ml-auto text-xs text-gray-400">
                {data.lessons.length} lesson{data.lessons.length === 1 ? '' : 's'} in {levelLabel}
              </span>
            </div>
            {data.lessons.length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No lessons defined for this level yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500">
                    <th className="px-4 py-2.5 text-left font-medium text-xs uppercase tracking-wider">Lesson</th>
                    <th className="px-4 py-2.5 text-left font-medium text-xs uppercase tracking-wider">Title</th>
                    <th className="px-4 py-2.5 text-right font-medium text-xs uppercase tracking-wider">
                      <Users className="w-3 h-3 inline mr-1" /> Learners
                    </th>
                    <th className="px-4 py-2.5 text-right font-medium text-xs uppercase tracking-wider">Completed</th>
                    <th className="px-4 py-2.5 text-left font-medium text-xs uppercase tracking-wider">
                      <TrendingUp className="w-3 h-3 inline mr-1" /> Avg %
                    </th>
                    <th className="px-4 py-2.5 text-right font-medium text-xs uppercase tracking-wider">Ex.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.lessons.map((l) => (
                    <tr key={l.lessonId} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-500 tabular-nums">
                        {l.lessonId}
                      </td>
                      <td className="px-4 py-2.5 text-gray-800 font-medium">{l.title}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{l.usersAttempted}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-500">
                        {l.usersCompleted}/{l.usersAttempted || '—'}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Bar pct={l.avgPct} color={colors.mid} />
                          <span className="tabular-nums text-xs font-medium text-gray-700 w-10 text-right">
                            {l.avgPct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-xs text-gray-400">
                        {l.totalExercises}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Per-test (with section breakdown expandable) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
              <ClipboardCheck className="w-4 h-4" style={{ color: colors.accent }} />
              <h2 className="text-base font-semibold text-gray-800">Test results</h2>
              <span className="ml-auto text-xs text-gray-400">
                {data.tests.length} test{data.tests.length === 1 ? '' : 's'} in {levelLabel}
              </span>
            </div>
            {data.tests.length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No tests defined for this level yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {data.tests.map((t) => (
                  <TestRow key={t.testId} test={t} colors={colors} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TestRow({ test, colors }: { test: TestStats; colors: { accent: string; accentText: string; light: string; mid: string } }) {
  const [expanded, setExpanded] = useState(false);
  const hasActivity = test.usersAttempted > 0;
  const hasCompleters = test.usersCompleted > 0;
  const completionPct = hasActivity
    ? Math.round((test.usersCompleted / test.usersAttempted) * 100)
    : 0;
  // The "headline" score: prefer completers (representative). If no one finished
  // yet, fall back to "all" with a small note.
  const headlineScore = hasCompleters ? test.avgScorePctCompleters : test.avgScorePctAll;
  const headlineLabel = hasCompleters ? 'Score (finished)' : 'Score (all)';

  return (
    <div>
      <button
        type="button"
        onClick={() => hasActivity && setExpanded((v) => !v)}
        className={`w-full px-5 py-3 grid grid-cols-12 gap-3 items-center text-left ${
          hasActivity ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="col-span-3">
          <p className="text-sm font-medium text-gray-800">{test.title}</p>
          <p className="text-[11px] font-mono text-gray-400">{test.testId}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">Learners</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <p className="text-sm font-semibold tabular-nums text-gray-800">{test.usersAttempted}</p>
            {hasActivity && (
              <p className="text-[10px] text-gray-400">
                · {test.usersCompleted} finished {hasCompleters && `(${completionPct}%)`}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <p className="text-xs text-gray-500">Avg attempted (all)</p>
          <div className="flex items-center gap-2 mt-1">
            <Bar pct={test.avgAttemptedPct} color={colors.mid} />
            <span className="text-xs font-medium tabular-nums w-9 text-right">{test.avgAttemptedPct}%</span>
          </div>
        </div>
        <div className="col-span-3">
          <p className="text-xs text-gray-500">{headlineLabel}</p>
          <div className="flex items-center gap-2 mt-1">
            <Bar pct={headlineScore} color="#32C189" />
            <span className="text-xs font-medium tabular-nums w-9 text-right">{headlineScore}%</span>
          </div>
          {!hasCompleters && hasActivity && (
            <p className="text-[10px] text-gray-400 mt-0.5">no learner finished ≥80% yet</p>
          )}
        </div>
        <div className="col-span-1 text-right text-xs text-gray-400">
          {hasActivity ? (expanded ? '▾' : '▸') : ''}
        </div>
      </button>

      {expanded && hasActivity && (
        <div className="bg-gray-50/60 px-5 py-3 border-t border-gray-100">
          {/* Overall summary line */}
          <div className="grid grid-cols-4 gap-3 pb-3 mb-3 border-b border-gray-200">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Finished (≥80%)</p>
              <p className="text-sm font-semibold text-gray-800 tabular-nums">
                {test.usersCompleted} / {test.usersAttempted}
                <span className="text-xs text-gray-400 ml-1">({completionPct}%)</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Avg attempted</p>
              <p className="text-sm font-semibold text-gray-800 tabular-nums">{test.avgAttemptedPct}%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Score (finished)</p>
              <p className="text-sm font-semibold tabular-nums" style={{ color: hasCompleters ? '#1F5741' : '#9ca3af' }}>
                {hasCompleters ? `${test.avgScorePctCompleters}%` : '—'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Score (all attempters)</p>
              <p className="text-sm font-semibold text-gray-600 tabular-nums">{test.avgScorePctAll}%</p>
            </div>
          </div>

          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            По компоненти
          </p>
          <div className="space-y-1.5">
            {test.bySection.map((s) => (
              <div key={s.sectionId} className="grid grid-cols-12 gap-3 items-center text-xs">
                <div className="col-span-3 text-gray-700 font-medium truncate" title={s.name}>
                  {s.name}
                </div>
                <div className="col-span-1 text-right text-gray-400 tabular-nums">
                  {s.totalExercises} ex.
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-12">attempted</span>
                  <Bar pct={s.avgAttemptedPct} color={colors.mid} />
                  <span className="tabular-nums w-9 text-right text-gray-600">{s.avgAttemptedPct}%</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-12">score (fin)</span>
                  <Bar pct={s.avgScorePctCompleters} color="#32C189" />
                  <span className="tabular-nums w-9 text-right text-gray-600">
                    {hasCompleters ? `${s.avgScorePctCompleters}%` : '—'}
                  </span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-9">score (all)</span>
                  <Bar pct={s.avgScorePctAll} color="#A6E3C8" />
                  <span className="tabular-nums w-9 text-right text-gray-600">{s.avgScorePctAll}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-400 italic leading-relaxed">
            <span className="font-semibold">Finished</span> = learner attempted ≥ 80% of the test&apos;s exercises (representative engagement).
            {' '}<span className="font-semibold">Score</span> = correct ÷ (correct + wrong) across exercises the user submitted (clicked &ldquo;Провери&rdquo;).
            {' '}<span className="font-semibold">Score (finished)</span> is the meaningful one — filters out users who only opened the test.
          </p>
        </div>
      )}
    </div>
  );
}
