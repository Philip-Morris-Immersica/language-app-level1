'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';
import { PlatformLegend } from '@/components/PlatformLegend';
import { LEVELS, getLevelDef, type Level } from '@/content';

// Latin labels are language-agnostic per UNHCR brand rule.
const LATIN_LABEL: Record<Level, string> = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

interface LevelView {
  code: Level;
  label: string;
  href: string;
  totalItems: number;
  hasContent: boolean;
}

/**
 * Derives the level a lesson ID belongs to from its prefix. A1 IDs are kept
 * un-prefixed for historical reasons (`lesson-XX`), so the absence of a known
 * prefix means A1.
 */
function levelOfLessonId(id: string): Level {
  if (id.startsWith('a2-')) return 'a2';
  if (id.startsWith('b1-')) return 'b1';
  if (id.startsWith('b2-')) return 'b2';
  return 'a1';
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-white rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function HomePageClient() {
  const { user, loading } = useAuth();
  const t = useT();

  const levelViews = useMemo<LevelView[]>(
    () =>
      LEVELS.map((code) => {
        const def = getLevelDef(code);
        const totalItems =
          def.lessonsMetadata.length + Object.keys(def.testLoaders).length;
        return {
          code,
          label: LATIN_LABEL[code],
          href: `/level/${code}`,
          totalItems,
          hasContent: totalItems > 0,
        };
      }),
    [],
  );

  const [progressByLevel, setProgressByLevel] = useState<Record<Level, number>>({
    a1: 0,
    a2: 0,
    b1: 0,
    b2: 0,
  });

  useEffect(() => {
    if (!user) return;
    fetch('/api/progress/summary')
      .then((r) => r.json())
      .then((data) => {
        if (!data.lessons) return;
        const sums: Record<Level, number> = { a1: 0, a2: 0, b1: 0, b2: 0 };
        for (const [lessonId, value] of Object.entries(
          data.lessons as Record<string, { completed: number; total: number }>,
        )) {
          if (value.total <= 0) continue;
          const lvl = levelOfLessonId(lessonId);
          sums[lvl] += value.completed / value.total;
        }
        const next: Record<Level, number> = { a1: 0, a2: 0, b1: 0, b2: 0 };
        for (const view of levelViews) {
          next[view.code] = view.totalItems > 0
            ? Math.round((sums[view.code] / view.totalItems) * 100)
            : 0;
        }
        setProgressByLevel(next);
      })
      .catch(() => {});
  }, [user, levelViews]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#32C189] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── GUEST ────────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-12 text-center">
          {/* Big UNHCR logo above the welcome heading (per Обратна връзка 2). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/unhcr-logo.png"
            alt="UNHCR"
            className="mb-8 w-[200px] md:w-[240px] lg:w-[280px] h-auto"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0072BC] leading-tight mb-6">
            {t('home.welcome')}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-3 leading-relaxed">
            {t('home.subtitle')}
          </p>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-3 leading-relaxed">
            {t('home.description')}
          </p>
          <p className="text-base md:text-lg text-[#0072BC] font-semibold mb-10">
            {t('home.wishYouSuccess')}
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#0072BC] hover:bg-[#005A8E] text-white font-semibold px-10 py-4 rounded-xl transition-colors shadow-md text-lg"
          >
            {t('home.continue')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            {t('auth.alreadyHave')}{' '}
            <Link href="/login" className="text-[#0072BC] hover:underline font-medium">
              {t('auth.loginHere')}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ── LOGGED IN ────────────────────────────────────────────────────────────
  // Layout per Обратна връзка 2:
  //   1. „Добре дошли, [Name]!"
  //   2. „Изберете ниво:"
  //   3. Level cards (UNHCR blue, Latin labels)
  //   4. Legend below the cards
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white flex flex-col">
      <div className="px-8 md:px-16 lg:px-24 pt-12 pb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0072BC] mb-2">
          {t('home.welcomeUser')} {user.name}!
        </h1>
      </div>

      <div className="px-8 md:px-16 lg:px-24 pb-12">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
          {t('home.selectLevel')}:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {levelViews.map((level) => {
            const progress = progressByLevel[level.code] ?? 0;
            return (
              <Link
                key={level.code}
                href={level.href}
                className="rounded-2xl bg-[#0072BC] text-white p-8 flex flex-col items-center justify-center shadow-md hover:bg-[#005A8E] transition-colors"
              >
                <span className="text-4xl font-bold mb-2 tracking-wide">{level.label}</span>
                {level.hasContent ? (
                  <>
                    <span className="text-white/80 text-sm font-medium mb-3">
                      {t('home.progress')}
                    </span>
                    <ProgressBar value={progress} />
                    <span className="mt-2 text-white/70 text-xs">
                      {progress}
                      {t('home.completed')}
                    </span>
                  </>
                ) : (
                  <span className="mt-3 inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    {t('level.comingSoon')}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Legend appears DIRECTLY below the level cards (Обратна връзка 2). */}
      <PlatformLegend />
    </div>
  );
}
