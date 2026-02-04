'use client';

import { ReactNode } from 'react';

interface LessonLayoutProps {
  children: ReactNode;
}

export function LessonLayout({ children }: LessonLayoutProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {children}
      </div>
    </main>
  );
}
