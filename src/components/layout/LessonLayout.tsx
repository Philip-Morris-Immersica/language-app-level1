'use client';

import { ReactNode } from 'react';

interface LessonLayoutProps {
  children: ReactNode;
}

export function LessonLayout({ children }: LessonLayoutProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-white">
      <div className="w-full px-4 md:px-10 lg:px-16 py-8 md:py-10">
        {children}
      </div>
    </main>
  );
}
