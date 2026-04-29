'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';
import { PlatformLegend } from '@/components/PlatformLegend';

// Level labels are ALWAYS Latin (A1, A2, B1, B2) per UNHCR convention,
// regardless of the user's UI language.
const LEVELS = [
  { code: 'A1', label: 'A1', href: '/level/a1', available: true  },
  { code: 'A2', label: 'A2', href: '#',         available: false },
  { code: 'B1', label: 'B1', href: '#',         available: false },
  { code: 'B2', label: 'B2', href: '#',         available: false },
];

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

  // Hooks must run unconditionally — keep this above any early return.
  const [a1Progress, setA1Progress] = useState(0);

  useEffect(() => {
    if (!user) return;
    // 11 lessons + 1 alphabet + 6 tests = 18 items, each weighted equally
    const A1_TOTAL_ITEMS = 18;
    fetch('/api/progress/summary')
      .then(r => r.json())
      .then(data => {
        if (!data.lessons) return;
        let weightedSum = 0;
        for (const v of Object.values(data.lessons) as { completed: number; total: number }[]) {
          if (v.total > 0) weightedSum += v.completed / v.total;
        }
        setA1Progress(Math.round((weightedSum / A1_TOTAL_ITEMS) * 100));
      })
      .catch(() => {});
  }, [user]);

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
          {LEVELS.map((level) => {
            const progress = level.code === 'A1' ? a1Progress : 0;
            return level.available ? (
              <Link
                key={level.code}
                href={level.href}
                className="rounded-2xl bg-[#0072BC] text-white p-8 flex flex-col items-center justify-center shadow-md hover:bg-[#005A8E] transition-colors"
              >
                <span className="text-4xl font-bold mb-2 tracking-wide">{level.label}</span>
                <span className="text-white/80 text-sm font-medium mb-3">{t('home.progress')}</span>
                <ProgressBar value={progress} />
                <span className="mt-2 text-white/70 text-xs">{progress}{t('home.completed')}</span>
              </Link>
            ) : (
              <div
                key={level.code}
                className="rounded-2xl bg-gray-100 text-gray-400 p-8 flex flex-col items-center justify-center cursor-not-allowed"
              >
                <span className="text-4xl font-bold mb-4 tracking-wide">{level.label}</span>
                <Lock className="w-7 h-7 opacity-40" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend appears DIRECTLY below the level cards (Обратна връзка 2). */}
      <PlatformLegend />
    </div>
  );
}
