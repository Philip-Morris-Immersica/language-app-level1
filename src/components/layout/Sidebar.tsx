'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClipboardCheck, Check, Hourglass } from 'lucide-react';
import {
  getNavItemsForLevel,
  LESSON_LEVEL_MAP,
  TEST_LEVEL_MAP,
  LEVELS,
  type Level,
} from '@/content';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LATIN_LABEL: Record<Level, string> = {
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

/**
 * Derives the currently-active level from the page path. Falls back to A1
 * when nothing matches (e.g. `/` or unknown routes) so first-time visitors
 * still see the A1 sidebar.
 *
 * Detection rules:
 *  - `/level/<lvl>` → that level.
 *  - `/lessons/<id>` → `LESSON_LEVEL_MAP[id]`; legacy `/lessons/azbouka` is A1.
 *  - `/tests/<id>` → `TEST_LEVEL_MAP[id]`.
 */
function detectActiveLevel(pathname: string | null): Level {
  if (!pathname) return 'a1';

  const levelMatch = pathname.match(/^\/level\/([a-z0-9]+)/);
  if (levelMatch) {
    const candidate = levelMatch[1] as Level;
    if ((LEVELS as readonly string[]).includes(candidate)) return candidate;
  }

  const lessonMatch = pathname.match(/^\/lessons\/([^/?#]+)/);
  if (lessonMatch) {
    const id = lessonMatch[1];
    if (id === 'azbouka') return 'a1';
    const lvl = LESSON_LEVEL_MAP[id];
    if (lvl) return lvl;
  }

  const testMatch = pathname.match(/^\/tests\/([^/?#]+)/);
  if (testMatch) {
    const lvl = TEST_LEVEL_MAP[testMatch[1]];
    if (lvl) return lvl;
  }

  return 'a1';
}

interface LessonProgress {
  completed: number;
  total: number;
}

function LessonTitle({ title }: { title: string }) {
  const translated = useTranslate(title);
  return <>{translated}</>;
}

function TestLabel({ label }: { label: string }) {
  const translated = useTranslate(label);
  return <>{translated}</>;
}

function ProgressRing({
  size = 30,
  strokeWidth = 3,
  percent,
  children,
}: {
  size?: number;
  strokeWidth?: number;
  percent: number;
  children: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {percent > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-[#32C189] transition-all duration-500"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const t = useT();
  const [progressData, setProgressData] = useState<Record<string, LessonProgress>>({});
  const fetched = useRef(false);

  const activeLevel = useMemo(() => detectActiveLevel(pathname), [pathname]);
  const navItemsForLevel = useMemo(() => getNavItemsForLevel(activeLevel), [activeLevel]);

  useEffect(() => {
    if (!isOpen || fetched.current) return;
    fetched.current = true;
    fetch('/api/progress/summary')
      .then(r => r.json())
      .then(data => {
        if (data.lessons) setProgressData(data.lessons);
      })
      .catch(() => {});
  }, [isOpen]);

  const isActive = (id: string) => pathname?.includes(id);

  function lessonInfo(lessonId: string) {
    const p = progressData[lessonId];
    const total = p?.total ?? 0;
    const done = p?.completed ?? 0;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const isStarted = done > 0;
    const isDone = total > 0 && done >= total;
    return { percent, isStarted, isDone, done, total };
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <nav
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-[#F5F5F5] border-r border-gray-200 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-5 py-5 border-b border-gray-200">
          <h2 className="text-gray-800 font-bold text-base tracking-wide">
            {t('nav.contents')}
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">
            {t('nav.level')} {LATIN_LABEL[activeLevel]}
          </p>
        </div>

        <div className="p-3">
          {navItemsForLevel.length === 0 ? (
            <div className="flex flex-col items-center text-center px-4 py-10">
              <div className="w-12 h-12 rounded-xl bg-[#CDE3F1] text-[#0072BC] flex items-center justify-center mb-3">
                <Hourglass className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 leading-snug">
                {t('level.empty')}
              </p>
            </div>
          ) : (
          <ul className="space-y-1">
            {navItemsForLevel.map((item) => {
              /* ── Азбука ── */
              if (item.type === 'special') {
                const active = isActive(item.id);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                        ${active
                          ? 'bg-[#CDE3F1] text-[#2D2D2D] border-l-4 border-[#0072BC]'
                          : 'text-[#2D2D2D] hover:bg-gray-200'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold
                          ${active ? 'bg-[#0072BC] text-white' : 'bg-[#CDE3F1] text-[#0072BC]'}
                        `}
                      >
                        А
                      </span>
                      <span className="flex-1 leading-snug font-semibold">{t(item.titleKey as Parameters<typeof t>[0])}</span>
                    </Link>
                  </li>
                );
              }

              /* ── Урок ── */
              if (item.type === 'lesson') {
                const active = isActive(item.id);
                const { percent, isStarted, isDone } = lessonInfo(item.id);

                return (
                  <li key={item.id}>
                    <Link
                      href={`/lessons/${item.id}`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                        ${active
                          ? 'bg-[#CDE3F1] text-[#2D2D2D] border-l-4 border-[#0072BC]'
                          : isStarted
                            ? 'bg-[#DAF6EB]/50 text-[#2D2D2D] hover:bg-[#DAF6EB]'
                            : 'text-[#2D2D2D] hover:bg-gray-200'
                        }
                      `}
                    >
                      {isStarted && !active ? (
                        <ProgressRing percent={isDone ? 100 : percent}>
                          {isDone ? (
                            <Check className="w-3.5 h-3.5 text-[#1F5741]" />
                          ) : (
                            <span className="text-[10px] font-bold text-[#1F5741]">{item.number}</span>
                          )}
                        </ProgressRing>
                      ) : (
                        <span
                          className={`
                            flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold
                            ${active ? 'bg-[#0072BC] text-white' : 'bg-gray-300 text-gray-600'}
                          `}
                        >
                          {item.number}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="leading-snug block"><LessonTitle title={item.title} /></span>
                        {isStarted && !active && (
                          <span className={`text-[10px] ${isDone ? 'text-[#1F5741]' : 'text-gray-400'}`}>
                            {percent}%
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              }

              /* ── Тест ── */
              if (item.type === 'test') {
                const active = isActive(item.id);

                return (
                  <li key={item.id}>
                    <Link
                      href={`/tests/${item.id}`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                        ${active
                          ? 'bg-[#FEF1D1] text-[#684D0B] border-l-4 border-[#FFC740]'
                          : 'text-[#684D0B] hover:bg-[#FEF1D1]/70'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-[30px] h-[30px] rounded-md flex items-center justify-center
                          ${active ? 'bg-[#FFC740] text-[#684D0B]' : 'bg-[#FEF1D1] text-[#684D0B]'}
                        `}
                      >
                        <ClipboardCheck className="w-4 h-4" />
                      </span>
                      <span className="flex-1 leading-snug">{t('nav.test')} – <TestLabel label={item.label} /></span>
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>
          )}
        </div>
      </nav>
    </>
  );
}
