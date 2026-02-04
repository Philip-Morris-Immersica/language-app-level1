'use client';

import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ isMobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  return (
    <header className="bg-bolt-primary text-white py-5 md:py-8 px-4 shadow-xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between md:justify-center">
          {/* Mobile menu button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-3 hover:bg-bolt-primary-hover rounded-xl transition-all min-h-[52px] min-w-[52px] flex items-center justify-center active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>

          {/* App title */}
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Български език за мигранти A1
          </h1>

          {/* Spacer for mobile to center title */}
          <div className="w-14 md:hidden" />
        </div>
      </div>
    </header>
  );
}
