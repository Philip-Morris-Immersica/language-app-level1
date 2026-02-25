'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';
import { navItems } from '@/content';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function LessonTitle({ title }: { title: string }) {
  const translated = useTranslate(title);
  return <>{translated}</>;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const t = useT();

  const isActive = (id: string) => pathname?.includes(id);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 bg-[#F5F5F5] border-r border-gray-200 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header strip */}
        <div className="px-5 py-5 border-b border-gray-200">
          <h2 className="text-gray-800 font-bold text-base tracking-wide">
            {t('nav.contents')}
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">{t('nav.level')}</p>
        </div>

        <div className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
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
                          ? 'bg-[#EEF7C8] text-[#2D2D2D] border-l-4 border-[#8FC412]'
                          : 'text-[#2D2D2D] hover:bg-gray-200'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                          ${active ? 'bg-[#8FC412] text-white' : 'bg-[#8FC412]/20 text-[#5a8a00]'}
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
                return (
                  <li key={item.id}>
                    <Link
                      href={`/lessons/${item.id}`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                        ${active
                          ? 'bg-[#EEF7C8] text-[#2D2D2D] border-l-4 border-[#8FC412]'
                          : 'text-[#2D2D2D] hover:bg-gray-200'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                          ${active ? 'bg-[#8FC412] text-white' : 'bg-gray-300 text-gray-600'}
                        `}
                      >
                        {item.number}
                      </span>
                      <span className="flex-1 leading-snug"><LessonTitle title={item.title} /></span>
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
                          ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-400'
                          : 'text-blue-700 hover:bg-blue-50'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center
                          ${active ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-500'}
                        `}
                      >
                        <ClipboardCheck className="w-4 h-4" />
                      </span>
                      <span className="flex-1 leading-snug">{t('nav.test')} {item.label}</span>
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
