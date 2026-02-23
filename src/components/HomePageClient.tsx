'use client';

import Link from 'next/link';
import { Lock, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';

const LEVELS = [
  { code: 'A1', label: 'A1', href: '/lessons/lesson-01', available: true },
  { code: 'A2', label: 'A2', href: '#', available: false },
  { code: 'A3', label: 'A3', href: '#', available: false },
  { code: 'A4', label: 'A4', href: '#', available: false },
];

const PROGRESS = 12;

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#8FC412] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── GUEST ────────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16 text-center bg-white">
          <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-[#EEF7C8] rounded-full">
            <span className="text-[#6A940C] font-semibold text-sm">UNHCR</span>
            <span className="text-gray-500 text-sm">· The UN Refugee Agency</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0279C3] leading-tight mb-4">
            {t('home.welcome')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            {t('home.subtitle')}
          </h2>
          <p className="text-gray-500 max-w-xl mb-10 leading-relaxed text-lg">
            {t('home.description')}
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#8FC412] hover:bg-[#7DAD0E] text-white font-semibold px-10 py-4 rounded-xl transition-colors shadow-md text-lg"
          >
            {t('home.continue')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            {t('auth.alreadyHave')}{' '}
            <Link href="/login" className="text-[#0279C3] hover:underline">
              {t('auth.loginHere')}
            </Link>
          </p>
        </div>

        <div className="bg-[#8FC412] py-4 px-6 flex items-center justify-center gap-3">
          <BookOpen className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-medium">{t('home.statsBar')}</span>
        </div>
      </div>
    );
  }

  // ── LOGGED IN ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white flex flex-col">
      <div className="px-8 md:px-16 lg:px-24 pt-12 pb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0279C3] mb-2">
          {t('home.welcomeUser')} {user.name}!
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="flex-1 px-8 md:px-16 lg:px-24 pb-12">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
          {t('home.selectLevel')}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {LEVELS.map((level) =>
            level.available ? (
              <Link
                key={level.code}
                href={level.href}
                className="rounded-2xl bg-[#8FC412] text-white p-8 flex flex-col items-center justify-center shadow-md hover:bg-[#7DAD0E] transition-colors"
              >
                <span className="text-4xl font-bold mb-2">{level.label}</span>
                <span className="text-white/80 text-sm font-medium mb-3">{t('home.progress')}</span>
                <ProgressBar value={PROGRESS} />
                <span className="mt-2 text-white/60 text-xs">{PROGRESS}{t('home.completed')}</span>
              </Link>
            ) : (
              <div
                key={level.code}
                className="rounded-2xl bg-gray-100 text-gray-400 p-8 flex flex-col items-center justify-center cursor-not-allowed"
              >
                <span className="text-4xl font-bold mb-4">{level.label}</span>
                <Lock className="w-7 h-7 opacity-40" />
              </div>
            )
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">{t('home.selectHint')}</p>
      </div>
    </div>
  );
}
