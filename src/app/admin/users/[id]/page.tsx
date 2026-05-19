'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { MessageSquare, Sparkles, GraduationCap, DollarSign, ClipboardCheck } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  adminRole: string | null;
}

interface Conversation {
  id: number;
  language: string;
  level: string | null;
  startedAt: string;
  lastMessageAt: string;
}

interface LessonProgress {
  lessonId: string;
  level: string;
  attemptedCount: number;
  totalCount: number;
  pct: number;
}

interface TestSection {
  sectionId: string;
  name: string;
  totalExercises: number;
  attemptedCount: number;
  attemptedPct: number;
  submittedCount: number;
  correctCount: number;
  wrongCount: number;
  scorePct: number;
  pointsEarned: number;
  maxPoints: number;
  pointsScorePct: number;
}

interface UserTestResult {
  testId: string;
  level: string;
  number: number;
  title: string;
  totalExercises: number;
  attemptedCount: number;
  attemptedPct: number;
  submittedCount: number;
  correctCount: number;
  wrongCount: number;
  scorePct: number;
  completed: boolean;
  pointsEarned: number;
  totalPoints: number;
  pointsScorePct: number;
  bySection: TestSection[];
}

interface ProgressData {
  progress: {
    userId: number;
    totalLessonsAttempted: number;
    byLevel: Record<'a1' | 'a2' | 'b1' | 'b2', { lessonsAttempted: number; avgPct: number }>;
    highestLevel: string | null;
    highestLevelPct: number;
    perLesson: LessonProgress[];
  };
  tests: UserTestResult[];
  chat: {
    totalMessages: number;
    assistantMessages: number;
    tokensIn: number;
    tokensOut: number;
    costUsd: number;
    byModel: Array<{ model: string; messages: number; tokensIn: number; tokensOut: number; costUsd: number }>;
  };
}

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/users/${id}`).then((r) => r.json()),
      fetch(`/api/admin/users/${id}/progress`).then((r) => r.json()),
    ])
      .then(([userResp, progressResp]) => {
        setUser(userResp.user);
        setConversations(userResp.conversations ?? []);
        setData(progressResp);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const generateSummary = async () => {
    setSummaryLoading(true);
    try {
      const r = await fetch(`/api/admin/users/${id}/summary`, { method: 'POST' });
      const { summary } = await r.json();
      setSummary(summary);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-sm text-[#0072BC] hover:underline">← Users</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">User #{id}</span>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <>
          {user && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {user.adminRole && (
                  <span className="bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded text-xs font-medium capitalize">{user.adminRole}</span>
                )}
              </div>
              <p className="text-xs text-gray-400">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-800">AI Learning Summary</h3>
              <button
                onClick={generateSummary}
                disabled={summaryLoading}
                className="flex items-center gap-1.5 text-xs bg-[#0072BC] text-white px-3 py-1.5 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {summaryLoading ? 'Generating...' : 'Generate summary'}
              </button>
            </div>
            {summary ? (
              <p className="text-sm text-gray-700 whitespace-pre-line">{summary}</p>
            ) : (
              <p className="text-sm text-gray-400">Click &ldquo;Generate summary&rdquo; to get an AI analysis of this user&apos;s learning conversations.</p>
            )}
          </div>

          {/* Learning progress */}
          {data?.progress && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-[#0072BC]" />
                <h3 className="text-base font-semibold text-gray-800">Learning progress</h3>
                <span className="ml-auto text-xs text-gray-400">
                  {data.progress.totalLessonsAttempted} lesson{data.progress.totalLessonsAttempted === 1 ? '' : 's'} touched
                </span>
              </div>

              {/* Per-level summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {(['a1', 'a2', 'b1', 'b2'] as const).map((lvl) => {
                  const lvlData = data.progress.byLevel[lvl];
                  const isCurrent = data.progress.highestLevel === lvl;
                  return (
                    <div
                      key={lvl}
                      className={`rounded-lg p-2 border ${
                        isCurrent ? 'border-[#0072BC] bg-[#CDE3F1]/30' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-600 uppercase">{lvl}</p>
                      <p className="text-xl font-bold text-gray-900 tabular-nums">{lvlData.avgPct}%</p>
                      <p className="text-[10px] text-gray-400">{lvlData.lessonsAttempted} lessons</p>
                    </div>
                  );
                })}
              </div>

              {/* Per-lesson bars */}
              {data.progress.perLesson.length > 0 ? (
                <div className="space-y-1.5">
                  {data.progress.perLesson.map((l) => (
                    <div key={l.lessonId} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-gray-500 w-32 truncate">{l.lessonId}</span>
                      <span className="uppercase text-[10px] text-gray-400 w-6">{l.level}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#32C189]"
                          style={{ width: `${Math.min(100, Math.max(2, l.pct))}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-gray-700 w-12 text-right">{l.pct}%</span>
                      <span className="tabular-nums text-gray-400 w-14 text-right">
                        {l.attemptedCount}/{l.totalCount}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No exercise activity yet.</p>
              )}
            </div>
          )}

          {/* Test results */}
          {data?.tests && data.tests.length > 0 && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardCheck className="w-4 h-4 text-[#0072BC]" />
                <h3 className="text-base font-semibold text-gray-800">Test results</h3>
                <span className="ml-auto text-xs text-gray-400">
                  {data.tests.filter((t) => t.completed).length} of {data.tests.length} finished (≥80%)
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {data.tests.map((t) => (
                  <UserTestRow key={t.testId} test={t} />
                ))}
              </div>
              <p className="mt-3 text-[10px] text-gray-400 italic">
                Score = correct ÷ (correct + wrong) over exercises the user submitted (clicked &ldquo;Провери&rdquo;).
                A test is marked <span className="font-semibold">Finished</span> if the user attempted ≥ 80% of its exercises.
              </p>
            </div>
          )}

          {/* Chat usage */}
          {data?.chat && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-[#683229]" />
                <h3 className="text-base font-semibold text-gray-800">Chat usage</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{data.chat.totalMessages.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">User messages</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{data.chat.tokensIn.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tokens in</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{data.chat.tokensOut.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tokens out</p>
                </div>
                <div className="bg-[#FCE2DE]/40 border border-[#FCE2DE] rounded-lg p-2">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">${data.chat.costUsd.toFixed(4)}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Total cost</p>
                </div>
              </div>

              {data.chat.byModel.length > 0 && (
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
                      {data.chat.byModel.map((m) => (
                        <tr key={m.model} className="border-b border-gray-50">
                          <td className="py-1.5 font-mono text-gray-700">{m.model}</td>
                          <td className="py-1.5 text-right tabular-nums">{m.messages}</td>
                          <td className="py-1.5 text-right tabular-nums text-gray-500">{m.tokensIn.toLocaleString()}</td>
                          <td className="py-1.5 text-right tabular-nums text-gray-500">{m.tokensOut.toLocaleString()}</td>
                          <td className="py-1.5 text-right tabular-nums font-medium">${m.costUsd.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-800">Conversations ({conversations.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {conversations.map((conv) => (
                <div key={conv.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#CDE3F1] text-[#05568B] px-1.5 py-0.5 rounded font-medium">{conv.language}</span>
                    {conv.level && <span className="text-xs bg-[#FEF1D1] text-[#684D0B] px-1.5 py-0.5 rounded font-medium">{conv.level.toUpperCase()}</span>}
                    <span className="text-xs text-gray-400">{new Date(conv.startedAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/admin/chats/${conv.id}`} className="text-xs text-[#0072BC] hover:underline">View →</Link>
                </div>
              ))}
              {conversations.length === 0 && (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">No conversations yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserTestRow({ test }: { test: UserTestResult }) {
  const [expanded, setExpanded] = useState(false);
  const finishedBadge = test.completed
    ? <span className="text-[10px] font-medium px-1.5 py-0.5 bg-[#DAF6EB] text-[#1F5741] rounded">Finished</span>
    : <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">In progress</span>;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-1 py-2.5 grid grid-cols-12 gap-2 items-center text-left hover:bg-gray-50/60 cursor-pointer"
      >
        <div className="col-span-4">
          <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
            <span className="uppercase text-[10px] text-gray-400">{test.level}</span>
            <span>{test.title}</span>
          </p>
          <p className="text-[11px] font-mono text-gray-400">{test.testId}</p>
        </div>
        <div className="col-span-2">{finishedBadge}</div>
        <div className="col-span-3">
          <p className="text-[10px] text-gray-500">Attempted</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0072BC]" style={{ width: `${test.attemptedPct}%` }} />
            </div>
            <span className="text-[11px] tabular-nums w-9 text-right text-gray-700">{test.attemptedPct}%</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {test.attemptedCount}/{test.totalExercises} ex.
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-gray-500">Score</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${test.pointsScorePct >= 50 ? 'bg-[#32C189]' : 'bg-[#D25A45]'}`}
                style={{ width: `${test.pointsScorePct}%` }}
              />
            </div>
            <span className="text-[11px] tabular-nums w-9 text-right text-gray-700">
              {test.pointsEarned > 0 || test.submittedCount > 0 ? `${test.pointsScorePct}%` : '—'}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 tabular-nums">
            {test.pointsEarned}/{test.totalPoints} pts
          </p>
        </div>
        <div className="col-span-1 text-right text-xs text-gray-400">
          {expanded ? '▾' : '▸'}
        </div>
      </button>

      {expanded && (
        <div className="bg-gray-50/60 px-3 py-3 border-t border-gray-100 -mx-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            По компоненти
          </p>
          <div className="space-y-1.5">
            {test.bySection.map((s) => {
              const needsWork = s.maxPoints > 0 && s.pointsScorePct < 50;
              return (
                <div key={s.sectionId} className="grid grid-cols-12 gap-2 items-center text-xs">
                  <div className={`col-span-4 font-medium truncate ${needsWork ? 'text-[#D25A45]' : 'text-gray-700'}`} title={s.name}>
                    {s.name}
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${needsWork ? 'bg-[#D25A45]' : 'bg-[#32C189]'}`}
                        style={{ width: `${s.pointsScorePct}%` }}
                      />
                    </div>
                    <span className={`tabular-nums w-10 text-right text-[11px] ${needsWork ? 'text-[#D25A45]' : 'text-gray-700'}`}>
                      {s.pointsScorePct}%
                    </span>
                  </div>
                  <div className={`col-span-2 text-right text-[11px] font-bold tabular-nums ${needsWork ? 'text-[#D25A45]' : 'text-gray-700'}`}>
                    {s.pointsEarned}/{s.maxPoints}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
