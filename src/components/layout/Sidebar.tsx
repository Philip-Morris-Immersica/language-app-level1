'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { lessonsMetadata } from '@/content';
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

  const isLessonActive = (lessonId: string) => pathname?.includes(lessonId);

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
            {lessonsMetadata.map((lesson) => {
              const isActive = isLessonActive(lesson.id);

              return (
                <li key={lesson.id}>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                      ${isActive
                        ? 'bg-[#EEF7C8] text-[#2D2D2D] border-l-4 border-[#8FC412]'
                        : 'text-[#2D2D2D] hover:bg-gray-200'
                      }
                    `}
                  >
                    <span
                      className={`
                        flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                        ${isActive ? 'bg-[#8FC412] text-white' : 'bg-gray-300 text-gray-600'}
                      `}
                    >
                      {lesson.number}
                    </span>
                    <span className="flex-1 leading-snug"><LessonTitle title={lesson.title} /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
