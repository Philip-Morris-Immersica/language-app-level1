'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import { getLessonMetadata } from '@/content';
import {
  GraduationCap,
  ClipboardCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  RotateCcw,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

function useAdminRole() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then((r) => r.json())
      .then(({ admin }) => setRole(admin?.role ?? null))
      .catch(() => null);
  }, []);
  return role;
}

// ── Types mirrored from admin/userProgress ────────────────────────────────────

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
}

// ── AI analysis types ─────────────────────────────────────────────────────────

interface AnalysisExample {
  lessonId: string;
  yourAnswer: string;
  correctAnswer: string;
  note: string;
}

interface AnalysisRecommendation {
  type: 'review_lesson' | 'redo_exercise' | 'alternative_practice';
  lessonId?: string;
  exerciseIds?: string[];
  description: string;
}

interface ImprovementArea {
  topic: string;
  explanation: string;
  examples: AnalysisExample[];
  recommendations: AnalysisRecommendation[];
}

interface AnalysisSummary {
  summary: string;
  strengths: string[];
  improvementAreas: ImprovementArea[];
  nextSteps: string[];
  encouragement: string;
}

interface AnalysisState {
  generatedAt: string;
  summary: AnalysisSummary;
  cached?: boolean;
  attemptedSnapshot?: number;
}

// ── Main profile page ─────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const t = useT();
  const { lang } = useLanguage();
  const adminRole = useAdminRole();
  const isAdminOrIT = adminRole === 'admin' || adminRole === 'it';

  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisState | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [notEnoughData, setNotEnoughData] = useState(false);

  useEffect(() => {
    fetch('/api/me/progress', { credentials: 'include' })
      .then((r) => r.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));

    // Load cached analysis on mount
    fetch('/api/me/analysis', { credentials: 'include' })
      .then((r) => r.json())
      .then((json) => {
        if (json.cached) setAnalysis(json.cached);
      })
      .catch(() => null);
  }, []);

  const totalAttempted = data?.progress?.perLesson.reduce((s, l) => s + l.attemptedCount, 0) ?? 0;
  const canRegenerateAnalysis =
    isAdminOrIT ||
    !analysis ||
    analysis.attemptedSnapshot !== totalAttempted ||
    analysis.language !== lang ||
    (Date.now() - new Date(analysis.generatedAt).getTime()) / 3_600_000 >= 24;

  const generateAnalysis = async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    setNotEnoughData(false);
    try {
      const r = await fetch('/api/me/analysis', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang }),
      });
      const json = await r.json();
      if (json.notEnoughData) {
        setNotEnoughData(true);
        return;
      }
      if (json.error) {
        setAnalysisError(t('profile.aiError'));
        return;
      }
      setAnalysis({
        generatedAt: json.generatedAt,
        summary: json.summary as AnalysisSummary,
        cached: json.cached,
        attemptedSnapshot: totalAttempted,
      });
    } catch {
      setAnalysisError(t('profile.aiError'));
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <p className="text-gray-500 mb-4">Please log in to view your profile.</p>
        <Link href="/login" className="text-[#0072BC] hover:underline">{t('auth.login')}</Link>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-4">

      {/* ── Header card ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-[#0072BC] flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
          {data?.progress?.highestLevel && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wide text-white bg-[#0072BC] px-2 py-0.5 rounded">
                {data.progress.highestLevel.toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">
                {t('profile.currentLevel')}: {data.progress.highestLevelPct}%
              </span>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse py-8 text-center">Loading...</div>
      ) : (
        <>
          {/* ── Lessons progress ──────────────────────────────────────────── */}
          {data?.progress && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-[#0072BC]" />
                <h2 className="text-base font-semibold text-gray-800">{t('profile.lessonsProgress')}</h2>
                <span className="ml-auto text-xs text-gray-400">
                  {data.progress.totalLessonsAttempted} {t('profile.lessonsTouched')}
                </span>
              </div>

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
                      <p className="text-2xl font-bold text-gray-900 tabular-nums">{lvlData.avgPct}%</p>
                      <p className="text-[10px] text-gray-400">{lvlData.lessonsAttempted} {t('profile.lessonsTouched')}</p>
                    </div>
                  );
                })}
              </div>

              {data.progress.perLesson.length > 0 ? (
                <div className="space-y-1.5">
                  {data.progress.perLesson.map((l) => {
                    const meta = getLessonMetadata(l.lessonId);
                    const lessonLabel = meta
                      ? `${meta.number === 0 ? '' : `Урок ${meta.number}: `}${meta.title}`
                      : l.lessonId;
                    return (
                    <div key={l.lessonId} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-700 w-44 truncate font-medium">{lessonLabel}</span>
                      <span className="uppercase text-[10px] text-gray-400 w-6">{l.level}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#32C189]"
                          style={{ width: `${Math.min(100, Math.max(2, l.pct))}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-gray-700 w-12 text-right">{l.pct}%</span>
                      <span className="tabular-nums text-gray-400 w-16 text-right">
                        {l.attemptedCount}/{l.totalCount}
                      </span>
                    </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">{t('profile.noActivity')}</p>
              )}
            </div>
          )}

          {/* ── Test results ───────────────────────────────────────────────── */}
          {data?.tests && data.tests.length > 0 && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardCheck className="w-4 h-4 text-[#0072BC]" />
                <h2 className="text-base font-semibold text-gray-800">{t('profile.testResults')}</h2>
                <span className="ml-auto text-xs text-gray-400">
                  {data.tests.filter((t) => t.completed).length} / {data.tests.length} {t('profile.testsFinishedCount')}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {data.tests.map((test) => (
                  <TestRow key={test.testId} test={test} t={t} />
                ))}
              </div>
              <p className="mt-3 text-[10px] text-gray-400 italic">
                {t('profile.score')} = {t('profile.attempted')} ÷ (✓ + ✗).
              </p>
            </div>
          )}

          {/* ── AI analysis ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#0072BC]" />
              <h2 className="text-base font-semibold text-gray-800">{t('profile.aiAnalysis')}</h2>
            </div>

            {!analysis && !analysisLoading && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-3">{t('profile.aiAnalysisIntro')}</p>
                {notEnoughData && (
                  <p className="text-sm text-[#D25A45] mb-3">{t('profile.notEnoughData')}</p>
                )}
                {analysisError && (
                  <p className="text-sm text-[#D25A45] mb-3">{analysisError}</p>
                )}
                <button
                  onClick={generateAnalysis}
                  disabled={analysisLoading}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0072BC] text-white rounded-lg text-sm font-medium hover:bg-[#005A8E] transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {t('profile.generateAnalysis')}
                </button>
              </div>
            )}

            {analysisLoading && (
              <div className="flex items-center gap-3 py-6 text-gray-400">
                <div className="w-5 h-5 border-2 border-[#0072BC] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">{t('profile.generating')}</span>
              </div>
            )}

            {analysis && !analysisLoading && (
              <AnalysisReport
                analysis={analysis}
                canRegenerate={canRegenerateAnalysis}
                onRegenerate={generateAnalysis}
                t={t}
                error={analysisError}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── Test row component ────────────────────────────────────────────────────────

function TestRow({ test, t }: { test: UserTestResult; t: (k: string) => string }) {
  const [expanded, setExpanded] = useState(false);

  const badge = test.completed ? (
    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-[#DAF6EB] text-[#1F5741] rounded">{t('profile.finished')}</span>
  ) : (
    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{t('profile.inProgress')}</span>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-1 py-2.5 grid grid-cols-12 gap-2 items-center text-left hover:bg-gray-50/60"
      >
        <div className="col-span-4">
          <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5 flex-wrap">
            <span className="uppercase text-[10px] text-gray-400">{test.level}</span>
            <span>{test.title}</span>
          </p>
        </div>
        <div className="col-span-2">{badge}</div>
        <div className="col-span-3">
          <p className="text-[10px] text-gray-500">{t('profile.attempted')}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0072BC]" style={{ width: `${test.attemptedPct}%` }} />
            </div>
            <span className="text-[11px] tabular-nums w-9 text-right text-gray-700">{test.attemptedPct}%</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">{test.attemptedCount}/{test.totalExercises}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-gray-500">{t('profile.score')}</p>
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
            {test.pointsEarned}/{test.totalPoints} т.
          </p>
        </div>
        <div className="col-span-1 text-right text-xs text-gray-400">
          {expanded ? <ChevronUp className="w-3.5 h-3.5 inline" /> : <ChevronDown className="w-3.5 h-3.5 inline" />}
        </div>
      </button>

      {expanded && (
        <div className="bg-gray-50/60 px-3 py-3 border-t border-gray-100 -mx-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('profile.bySection')}</p>
          <div className="space-y-1.5">
            {test.bySection.map((s) => {
              const needsWork = s.maxPoints > 0 && s.pointsScorePct < 50;
              return (
                <div key={s.sectionId} className="grid grid-cols-12 gap-2 items-center text-xs">
                  <div className={`col-span-4 font-medium truncate ${needsWork ? 'text-[#D25A45]' : 'text-gray-700'}`}>
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

// ── AI Analysis report ────────────────────────────────────────────────────────

function AnalysisReport({
  analysis,
  canRegenerate,
  onRegenerate,
  t,
  error,
}: {
  analysis: AnalysisState;
  canRegenerate: boolean;
  onRegenerate: () => void;
  t: (k: string) => string;
  error: string | null;
}) {
  const { summary } = analysis;
  const [openArea, setOpenArea] = useState<number | null>(null);

  const generatedDate = new Date(analysis.generatedAt).toLocaleDateString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="space-y-5">
      {/* Meta row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-[11px] text-gray-400">
          {t('profile.lastUpdated')}: {generatedDate}
        </span>
        <button
          onClick={onRegenerate}
          disabled={!canRegenerate}
          title={!canRegenerate ? t('profile.regenerateDisabled') : undefined}
          className="flex items-center gap-1.5 text-xs text-[#0072BC] hover:underline disabled:text-gray-300 disabled:no-underline disabled:cursor-default"
        >
          <RotateCcw className="w-3 h-3" />
          {t('profile.regenerate')}
        </button>
      </div>

      {error && <p className="text-sm text-[#D25A45]">{error}</p>}

      {/* Summary */}
      {summary?.summary && (
        <div className="bg-[#CDE3F1]/30 border border-[#CDE3F1] rounded-xl p-4">
          <p className="text-base text-gray-800 leading-relaxed">{summary.summary}</p>
        </div>
      )}

      {/* Strengths */}
      {summary?.strengths?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#32C189]" />
            <h3 className="text-sm font-semibold text-gray-700">{t('profile.strengths')}</h3>
          </div>
          <ul className="space-y-1">
            {summary.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#32C189] mt-0.5 flex-shrink-0">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement areas */}
      {summary?.improvementAreas?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#D25A45]" />
            <h3 className="text-sm font-semibold text-gray-700">{t('profile.improvementAreas')}</h3>
          </div>
          <div className="space-y-2">
            {summary.improvementAreas.map((area, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenArea(openArea === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">{area.topic}</span>
                  {openArea === idx
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>

                {openArea === idx && (
                  <div className="px-4 py-4 space-y-4 border-t border-gray-100">
                    {/* Explanation */}
                    <p className="text-sm text-gray-600 leading-relaxed">{area.explanation}</p>

                    {/* Examples */}
                    {area.examples?.length > 0 && (
                      <div className="space-y-2">
                        {area.examples.map((ex, ei) => (
                          <div key={ei} className="bg-[#FCE2DE]/20 border border-[#FCE2DE] rounded-lg p-3 space-y-1">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-400 block mb-0.5">{t('profile.yourAnswer')}</span>
                                <span className="font-medium text-[#683229]">{ex.yourAnswer || '—'}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 block mb-0.5">{t('profile.correctAnswer')}</span>
                                <span className="font-medium text-[#1F5741]">{ex.correctAnswer || '—'}</span>
                              </div>
                            </div>
                            {ex.note && (
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ex.note}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    {area.recommendations?.length > 0 && (
                      <div className="space-y-2">
                        {area.recommendations.map((rec, ri) => (
                          <RecommendationChip key={ri} rec={rec} t={t} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next steps */}
      {summary?.nextSteps?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-[#FFC740]" />
            <h3 className="text-sm font-semibold text-gray-700">{t('profile.nextSteps')}</h3>
          </div>
          <ol className="space-y-1.5">
            {summary.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0072BC] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Encouragement */}
      {summary?.encouragement && (
        <div className="bg-[#DAF6EB] border border-[#32C189]/30 rounded-xl p-4 text-sm text-[#1F5741] font-medium leading-relaxed">
          {summary.encouragement}
        </div>
      )}
    </div>
  );
}

// ── Recommendation chip ───────────────────────────────────────────────────────

function RecommendationChip({
  rec,
  t,
}: {
  rec: AnalysisRecommendation;
  t: (k: string) => string;
}) {
  const icons = {
    review_lesson: <BookOpen className="w-3.5 h-3.5" />,
    redo_exercise: <RotateCcw className="w-3.5 h-3.5" />,
    alternative_practice: <Lightbulb className="w-3.5 h-3.5" />,
  };
  const labels = {
    review_lesson: t('profile.rec.reviewLesson'),
    redo_exercise: t('profile.rec.redoExercise'),
    alternative_practice: t('profile.rec.altPractice'),
  };

  const href = rec.lessonId
    ? rec.lessonId.startsWith('test-')
      ? `/tests/${rec.lessonId}`
      : `/lessons/${rec.lessonId}`
    : null;

  const inner = (
    <div className="flex items-start gap-2 text-xs">
      <span className="mt-0.5 text-[#0072BC] flex-shrink-0">{icons[rec.type]}</span>
      <div>
        <span className="font-medium text-[#05568B]">{labels[rec.type]}</span>
        {rec.description && (
          <p className="text-gray-500 mt-0.5 leading-relaxed">{rec.description}</p>
        )}
      </div>
      {href && <ArrowRight className="w-3.5 h-3.5 ml-auto mt-0.5 text-[#0072BC] flex-shrink-0" />}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block bg-[#CDE3F1]/30 border border-[#CDE3F1] rounded-lg px-3 py-2.5 hover:bg-[#CDE3F1]/60 transition-colors">
        {inner}
      </Link>
    );
  }

  return (
    <div className="bg-[#FEF1D1]/50 border border-[#FEF1D1] rounded-lg px-3 py-2.5">
      {inner}
    </div>
  );
}
