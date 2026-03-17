'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Play, BookOpen, ClipboardCheck, Languages } from 'lucide-react';
import { useT } from '@/i18n/useT';

interface LessonProgress {
  completed: number;
  total: number;
}

type CardItem =
  | { kind: 'alphabet' }
  | { kind: 'lesson'; id: string; number: number; title: string }
  | { kind: 'test'; id: string; label: string };

interface Group {
  lessons: CardItem[];
  test: { id: string; label: string } | null;
}

const GROUPS: Group[] = [
  {
    lessons: [
      { kind: 'alphabet' },
      { kind: 'lesson', id: 'lesson-01', number: 1, title: 'Здравейте' },
      { kind: 'lesson', id: 'lesson-02', number: 2, title: 'Закуска' },
      { kind: 'lesson', id: 'lesson-03', number: 3, title: 'В ресторанта' },
    ],
    test: { id: 'test-a1-1', label: 'Тест – уроци 1, 2 и 3' },
  },
  {
    lessons: [
      { kind: 'lesson', id: 'lesson-04', number: 4, title: 'В супермаркета' },
    ],
    test: { id: 'test-a1-2', label: 'Тест – урок 4' },
  },
  {
    lessons: [
      { kind: 'lesson', id: 'lesson-05', number: 5, title: 'Градът и селото' },
      { kind: 'lesson', id: 'lesson-06', number: 6, title: 'Моето семейство' },
    ],
    test: { id: 'test-a1-3', label: 'Тест – уроци 5 и 6' },
  },
  {
    lessons: [
      { kind: 'lesson', id: 'lesson-07', number: 7, title: 'Денят и часът' },
      { kind: 'lesson', id: 'lesson-08', number: 8, title: 'Цветове и дрехи' },
    ],
    test: { id: 'test-a1-4', label: 'Тест – уроци 7 и 8' },
  },
  {
    lessons: [
      { kind: 'lesson', id: 'lesson-09', number: 9, title: 'Вкъщи' },
      { kind: 'lesson', id: 'lesson-10', number: 10, title: 'На път' },
    ],
    test: { id: 'test-a1-5', label: 'Тест – уроци 9 и 10' },
  },
  {
    lessons: [
      { kind: 'lesson', id: 'lesson-11', number: 11, title: 'Всеки ден' },
    ],
    test: { id: 'test-a1-6', label: 'Тест – урок 11' },
  },
];

const TOTAL_ITEMS = GROUPS.reduce((sum, g) => sum + g.lessons.length + (g.test ? 1 : 0), 0);

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
        className="text-[#8FC412] transition-all duration-700"
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
  const completed = progress?.completed ?? 0;
  const total = progress?.total ?? 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isStarted = completed > 0;
  const isDone = total > 0 && completed >= total;

  const borderClass = isDone
    ? 'border-[#8FC412]'
    : isStarted
      ? 'border-[#0279C3]/40'
      : 'border-gray-200';
  const bgClass = isDone
    ? 'bg-gradient-to-br from-[#f0fad4] to-white'
    : 'bg-white';

  return (
    <div className={`rounded-2xl border-2 ${borderClass} ${bgClass} overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col relative`}>
      {isDone && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 bg-[#8FC412] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </div>
        </div>
      )}

      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm
            ${isDone ? 'bg-[#8FC412]' : isStarted ? 'bg-[#0279C3]' : 'bg-gray-300'}
          `}>
            {number}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              {t('level.lesson')} {number}
            </p>
            <h3 className="font-bold text-gray-800 text-[13px] leading-snug">
              {title}
            </h3>
          </div>
        </div>

        {total > 0 ? (
          <div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
              <span>{completed}/{total}</span>
              <span className="font-semibold text-gray-600">{percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isDone ? 'bg-[#8FC412]' : isStarted ? 'bg-[#0279C3]' : 'bg-gray-200'
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
              ? 'bg-[#8FC412]/10 text-[#6A940C] hover:bg-[#8FC412]/20'
              : isStarted
                ? 'bg-[#0279C3] text-white hover:bg-[#026aa8] shadow-sm'
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
    <div className="rounded-2xl border-2 border-[#0279C3]/20 bg-gradient-to-br from-blue-50 to-white overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0279C3] text-white shrink-0 shadow-sm">
            <Languages className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#0279C3]/60 font-medium uppercase tracking-wider">
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
    <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/30 overflow-hidden transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="p-4 pb-2 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-400 text-white shrink-0 shadow-sm">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-amber-500 font-medium uppercase tracking-wider">
              {t('level.test')}
            </p>
            <h3 className="font-bold text-amber-800 text-[13px] leading-snug">
              {label}
            </h3>
          </div>
        </div>
        <div className="w-full h-1.5 bg-amber-100 rounded-full" />
      </div>
      <div className="px-4 pb-4 pt-2">
        <Link
          href={`/tests/${testId}`}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          {t('level.start')}
        </Link>
      </div>
    </div>
  );
}

export function LevelMapClient() {
  const t = useT();
  const [progressData, setProgressData] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/progress/summary')
      .then(r => r.json())
      .then(data => {
        if (data.lessons) setProgressData(data.lessons);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  let weightedSum = 0;
  for (const group of GROUPS) {
    for (const item of group.lessons) {
      if (item.kind === 'lesson') {
        const p = progressData[item.id];
        if (p && p.total > 0) {
          weightedSum += p.completed / p.total;
        }
      }
    }
  }
  const overallPercent = Math.round((weightedSum / TOTAL_ITEMS) * 100);

  const lessonsCompleted = GROUPS.reduce((count, g) => {
    return count + g.lessons.filter(item => {
      if (item.kind !== 'lesson') return false;
      const p = progressData[item.id];
      return p && p.total > 0 && p.completed >= p.total;
    }).length;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#8FC412] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              <h1 className="text-2xl md:text-3xl font-bold text-[#0279C3]">
                {t('level.title')}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {t('level.subtitle')} · {lessonsCompleted}/11 {t('level.lessonsCompleted')}
              </p>
            </div>
            <ProgressRing percent={overallPercent} size={56} />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>{t('level.overallProgress')}</span>
              <span className="font-semibold text-gray-600">{overallPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8FC412] to-[#a8d94e] rounded-full transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grouped rows */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="space-y-5">
          {GROUPS.map((group, gi) => {
            const lessonCount = group.lessons.length;
            const lessonGridClass =
              lessonCount >= 4
                ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
                : lessonCount === 3
                  ? 'grid-cols-2 lg:grid-cols-3'
                  : lessonCount === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1';

            return (
              <div key={gi} className="rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 p-4 lg:p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Lessons — left */}
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

                  {/* Test — right */}
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
      </div>
    </div>
  );
}
