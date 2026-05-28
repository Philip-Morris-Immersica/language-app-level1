'use client';

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatbotWidget } from '@/components/ChatbotWidget';

interface AppLayoutProps {
  children: ReactNode;
}

const LESSON_NAV_PREFIXES = ['/lessons/', '/tests/', '/level/'];

export function AppLayout({ children }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const showLessonNav = LESSON_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className="min-h-screen bg-white flex flex-col" suppressHydrationWarning>
      <Header
        isMobileMenuOpen={isMenuOpen}
        onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
        showLessonNav={showLessonNav}
      />

      {/* Sidebar is overlay — only rendered on lesson/level/test pages */}
      {showLessonNav && (
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}

      <main className="flex-1 overflow-auto" suppressHydrationWarning>
        {children}
      </main>

      <ChatbotWidget />
    </div>
  );
}
