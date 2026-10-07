'use client';

/**
 * Level-aware overview map.
 *
 * Renders the full grid of lessons + tests for a single CEFR level (A1, A2, B1, B2).
 * All data — lessons, titles, group boundaries (which test follows which lessons),
 * and test labels — is derived from the central content registry
 * (`src/content/registry.ts`). When metadata is added for an empty level, this
 * component picks it up automatically with no UI changes required.
 *
 * Visual identity is identical to the legacy A1-only LevelMap — only the data
 * source changed from a hardcoded GROUPS array to the registry.
 */

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Play, BookOpen, ClipboardCheck, Languages, Hourglass } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { PlatformLegend } from '@/components/PlatformLegend';
import {
  getLevelDef,
  type Level,
  type LessonMetadataEntry,
  type NavItem,
} from '@/content';

const LATIN_LABEL: Record<Level, string> = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

interface LessonProgress {
  completed: number;
  total: number;
  percent: number;
  done: boolean;
  started: boolean;
}

interface LevelSummary {
  percent: number;
  lessonsCompleted: number;
  lessonsTotal: number;
}

type CardItem =
  | { kind: 'alphabet' }
  | { kind: 'lesson'; id: string; number: number; title: string }
  | { kind: 'test'; id: string; label: string };

interface Group {
  lessons: CardItem[];
  test: { id: string; label: string } | null;
  /** Set only when a level's nav has a section heading before this group. */
  section: { title: string; subtitle?: string } | null;
}

/**
 * Walks lesson metadata in order, accumulating non-test lessons into a group
 * and closing the group when a lesson has `hasTest === true` (the test is
 * attached to that group). Optionally pulls the test's user-facing label from
 * the level's nav items (which match the sidebar).
 *
 * A1 special: `lesson-00` (Азбука) renders as a dedicated AlphabetCard (links
 * to `/lessons/azbouka`, not `/lessons/lesson-00`).
 */
function buildGroups(
  level: Level,
  lessons: LessonMetadataEntry[],
  navItems: NavItem[],
): Group[] {
  const testLabelById = new Map<string, string>();
  for (const item of navItems) {
    if (item.type === 'test') testLabelById.set(item.id, item.label);
  }

  const sectionBeforeLesson = new Map<string, { title: string; subtitle?: string }>();
  for (let i = 1; i < navItems.length; i++) {
    const prev = navItems[i - 1];
    const item = navItems[i];
    if (prev.type === 'section' && item.type === 'lesson') {
      sectionBeforeLesson.set(item.id, { title: prev.title, subtitle: prev.subtitle });
    }
  }

  const groups: Group[] = [];
  let current: CardItem[] = [];
  let currentSection: { title: string; subtitle?: string } | null = null;

  function closeGroup(test: { id: string; label: string } | null) {
    if (current.length === 0) return;
    groups.push({ lessons: current, test, section: currentSection });
    current = [];
    currentSection = null;
  }

  for (const lesson of lessons) {
    const section = sectionBeforeLesson.get(lesson.id);
    if (section) {
      closeGroup(null);
      currentSection = section;
    }

    if (level === 'a1' && lesson.id === 'lesson-00') {
      current.push({ kind: 'alphabet' });
      continue;
    }
    current.push({
      kind: 'lesson',
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
    });

    if (lesson.hasTest && lesson.testId) {
      closeGroup({
        id: lesson.testId,
        label: testLabelById.get(lesson.testId) ?? lesson.testId,
      });
    }
  }

  closeGroup(null);

  return groups;
}

function ProgressRing({ percent, size = 48 }: { percent: number; size?: number }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="currentColor" strokeWidth={stroke}
        className="text-gray-200"
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="currentColor" strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        className="text-[#32C189] transition-all duration-700"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em"
        className="fill-gray-700 text-[11px] font-bold"
      >
        {percent}%
      </text>
    </svg>
  );
}

function LessonTitle({ title }: { title: string }) {
  return <>{useTranslate(title)}</>;
}

function TestLabel({ label }: { label: string }) {
  return <>{useTranslate(label)}</>;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  const translatedTitle = useTranslate(title);
  const translatedSubtitle = useTranslate(subtitle ?? '');
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#CDE3F1] text-[#0072BC] flex items-center justify-center shrink-0">
        <BookOpen className="w-5 h-5" />
      </div>
      <div className="min-w-0 pt-0.5">
        <h2 className="text-base md:text-lg font-bold text-[#05568B] leading-snug">
          {translatedTitle}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-0.5">{translatedSubtitle}</p>
        )}
      </div>
    </div>
  );
}

function LessonCard({
  number,
  title,
  lessonId,
  progress,
  t,
}: {
  number: number;
  title: string;
  lessonId: string;
  progress: LessonProgress | null;
  t: (key: string) => string;
}) {
  const percent = progress?.percent ?? 0;
  const isStarted = progress?.started ?? false;
  const isDone = progress?.done ?? false;

  const borderClass = isDone
    ? 'border-[#32C189]'
    : isStarted
      ? 'border-[#0072BC]/40'
      : 'border-gray-200';

  return (
    <div className={`rounded-2xl border-2 ${borderClass} bg-white overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col relative`}>
      {isDone && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 bg-[#32C189] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        </div>
      )}

      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm
            ${isDone ? 'bg-[#32C189]' : isStarted ? 'bg-[#0072BC]' : 'bg-gray-300'}
          `}>
            {number}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              {t('level.lesson')} {number}
            </p>
            <h3 className="font-bold text-gray-800 text-[13px] leading-snug">
              <LessonTitle title={title} />
            </h3>
          </div>
        </div>

        {(progress?.total ?? 0) > 0 ? (
          <div>
            <div className="flex items-center justify-end text-[10px] text-gray-400 mb-1">
              <span className="font-semibold text-gray-600">{percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isDone ? 'bg-[#32C189]' : isStarted ? 'bg-[#0072BC]' : 'bg-gray-200'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-1.5 bg-gray-100 rounded-full" />
        )}
      </div>

      <div className="px-4 pb-4 pt-2">
        <Link
          href={`/lessons/${lessonId}`}
          className={`
            w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all
            ${isDone
              ? 'bg-[#DAF6EB]/50 text-[#1F5741] hover:bg-[#DAF6EB]'
              : isStarted
                ? 'bg-[#0072BC] text-white hover:bg-[#005A8E] shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          {isDone ? (
            <><BookOpen className="w-3.5 h-3.5" />{t('level.review')}</>
          ) : isStarted ? (
            <>{t('level.continue')}<ArrowRight className="w-3.5 h-3.5" /></>
          ) : (
            <><Play className="w-3.5 h-3.5" />{t('level.start')}</>
          )}
        </Link>
      </div>
    </div>
  );
}

function AlphabetCard({ t }: { t: (key: string) => string }) {
  return (
    <div className="rounded-2xl border-2 border-[#0072BC]/20 bg-gradient-to-br from-blue-50 to-white overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0072BC] text-white shrink-0 shadow-sm">
            <Languages className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#0072BC]/60 font-medium uppercase tracking-wider">
              &nbsp;
            </p>
            <h3 className="font-bold text-gray-800 text-[13px] leading-snug">
              {t('nav.alphabet')}
            </h3>
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full" />
      </div>
      <div className="px-4 pb-4 pt-2">
        <Link
          href="/lessons/azbouka"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          {t('level.start')}
        </Link>
      </div>
    </div>
  );
}

function TestCard({ testId, label, t }: { testId: string; label: string; t: (key: string) => string }) {
  return (
    <div className="rounded-2xl border-2 border-[#FFC740]/40 bg-white overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FFC740] text-[#684D0B] shrink-0 shadow-sm">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#684D0B] font-medium uppercase tracking-wider">
              {t('level.test')}
            </p>
            <h3 className="font-bold text-[#684D0B] text-[13px] leading-snug">
              {t('level.test')} – <TestLabel label={label} />
            </h3>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#FEF1D1] rounded-full" />
      </div>
      <div className="px-4 pb-4 pt-2">
        <Link
          href={`/tests/${testId}`}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-[#FEF1D1] text-[#684D0B] hover:bg-[#FFC740]/30 border border-[#FFC740]/40 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          {t('level.start')}
        </Link>
      </div>
    </div>
  );
}

function EmptyLevelState({ t }: { t: (key: string) => string }) {
  return (
    <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-10 md:p-14 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#CDE3F1] text-[#0072BC] flex items-center justify-center mb-5">
        <Hourglass className="w-8 h-8" />
      </div>
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
        {t('level.empty')}
      </h2>
    </div>
  );
}

export function LevelMapClient({ level }: { level: Level }) {
  const t = useT();
  const def = getLevelDef(level);
  const groups = useMemo(
    () => buildGroups(level, def.lessonsMetadata, def.navItems),
    [level, def.lessonsMetadata, def.navItems],
  );
  const isEmpty = def.lessonsMetadata.length === 0;

  const [progressData, setProgressData] = useState<Record<string, LessonProgress>>({});
  const [levelSummary, setLevelSummary] = useState<LevelSummary | null>(null);
  const [loading, setLoading] = useState(!isEmpty);

  useEffect(() => {
    if (isEmpty) return;
    fetch('/api/progress/summary')
      .then(r => r.json())
      .then(data => {
        if (data.lessons) setProgressData(data.lessons);
        if (data.levels?.[level]) setLevelSummary(data.levels[level]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isEmpty, level]);

  const overallPercent = levelSummary?.percent ?? 0;
  const lessonsCompleted = levelSummary?.lessonsCompleted ?? 0;
  const lessonsTotal = levelSummary?.lessonsTotal ?? def.lessonsMetadata.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#32C189] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const headingTitle = `${t('nav.level')} ${LATIN_LABEL[level]} — ${t('level.title')}`;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-slate-50 to-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('level.backToLevels')}
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0072BC]">
                {headingTitle}
              </h1>
              {!isEmpty && (
                <p className="text-gray-500 text-sm mt-1">
                  {t('level.subtitle')} · {lessonsCompleted}/{lessonsTotal} {t('level.lessonsCompleted')}
                </p>
              )}
            </div>
            {!isEmpty && <ProgressRing percent={overallPercent} size={56} />}
          </div>

          {!isEmpty && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span>{t('level.overallProgress')}</span>
                <span className="font-semibold text-gray-600">{overallPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#32C189] to-[#7DE0B9] rounded-full transition-all duration-700"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body: groups or empty state */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {isEmpty ? (
          <EmptyLevelState t={t} />
        ) : (
          <div className="space-y-5">
            {groups.map((group, gi) => {
              const lessonCount = group.lessons.length;
              const lessonGridClass = group.section
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : lessonCount >= 4
                  ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
                  : lessonCount === 3
                    ? 'grid-cols-2 lg:grid-cols-3'
                    : lessonCount === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-1';

              return (
                <div key={gi} className={`rounded-2xl backdrop-blur-sm p-4 lg:p-5 shadow-sm ${
                  group.section
                    ? 'bg-[#CDE3F1]/40 border border-[#0072BC]/20'
                    : 'bg-white/60 border border-gray-100'
                }`}>
                  {group.section && (
                    <SectionHeading title={group.section.title} subtitle={group.section.subtitle} />
                  )}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className={`flex-1 grid ${lessonGridClass} gap-3`}>
                      {group.lessons.map((item) => {
                        if (item.kind === 'alphabet') {
                          return <AlphabetCard key="azbouka" t={t} />;
                        }
                        if (item.kind === 'lesson') {
                          return (
                            <LessonCard
                              key={item.id}
                              number={item.number}
                              title={item.title}
                              lessonId={item.id}
                              progress={progressData[item.id] || null}
                              t={t}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>

                    {group.test && (
                      <div className="lg:w-[220px] shrink-0">
                        <TestCard testId={group.test.id} label={group.test.label} t={t} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Platform legend (shared component — also shown on the home page) */}
      <PlatformLegend />
    </div>
  );
}
