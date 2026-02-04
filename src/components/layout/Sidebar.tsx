'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { lessonsMetadata } from '@/content';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isLessonActive = (lessonId: string) => {
    return pathname?.includes(lessonId);
  };

  const isExercisesActive = (lessonId: string) => {
    return pathname?.includes(`${lessonId}/exercises`);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-bolt-secondary-light border-r border-bolt-secondary overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4">
          <h2 className="text-sm font-semibold text-bolt-primary-dark mb-4 uppercase tracking-wide">
            Съдържание
          </h2>
          <ul className="space-y-3">
            {lessonsMetadata.map((lesson) => {
              const isActive = isLessonActive(lesson.id);
              const isExercisePage = isExercisesActive(lesson.id);
              
              return (
                <li key={lesson.id} className="space-y-1">
                  <Link
                    href={`/lessons/${lesson.id}`}
                    onClick={onClose}
                    className={`
                      block w-full text-left px-4 py-3 rounded-xl transition-all text-sm md:text-base font-medium
                      ${
                        isActive
                          ? 'bg-bolt-primary text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-[#E8F0D0] hover:shadow-sm border border-bolt-secondary'
                      }
                    `}
                  >
                    {lesson.number}. {lesson.title}
                  </Link>
                  
                  {/* Sub-navigation: Exercises link */}
                  {isActive && (
                    <Link
                      href={`/lessons/${lesson.id}/exercises`}
                      onClick={onClose}
                      className={`
                        flex items-center gap-2 px-4 py-2 ml-4 rounded-lg text-sm transition-all
                        ${
                          isExercisePage
                            ? 'bg-bolt-primary-dark text-white shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-[#E8F0D0] border border-bolt-secondary hover:text-bolt-primary-dark'
                        }
                      `}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Упражнения</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
