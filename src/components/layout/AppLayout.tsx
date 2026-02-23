'use client';

import { useState, ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        isMobileMenuOpen={isMenuOpen}
        onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Sidebar is overlay — content always takes full width */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
