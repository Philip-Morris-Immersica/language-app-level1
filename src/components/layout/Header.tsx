'use client';

import { Menu, X, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push('/');
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition-colors text-sm font-medium"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">{t('auth.login')}</span>
      </Link>
    );
  }

  // Initials avatar
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
      >
        <span className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden sm:inline text-sm font-medium max-w-[120px] truncate">
          {user.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 min-w-[180px]">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User className="w-4 h-4 text-gray-400" />
            {t('auth.profile')}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('auth.logout')}
          </button>
        </div>
      )}
    </div>
  );
}

export function Header({ isMobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-50 bg-[#8FC412] text-white py-2 px-4 shadow-md">
      <div className="flex items-center justify-between gap-2">

        {/* Left: hamburger */}
        <button
          onClick={onToggleMobileMenu}
          className="flex-shrink-0 p-2 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Center: UNHCR logo + title */}
        <Link href="/" className="flex items-center gap-6 flex-1 min-w-0 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/unhcr-logo.png"
            alt="UNHCR"
            style={{ height: '31px', width: 'auto', flexShrink: 0 }}
          />
          <div className="hidden sm:block h-9 w-px bg-white/40 flex-shrink-0" />
          <span className="hidden sm:block text-white font-bold text-xl md:text-2xl leading-tight truncate uppercase tracking-wide">
            {t('app.title')}
          </span>
        </Link>

        {/* Right: language selector + profile/login */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <LanguageSelector />
          <ProfileMenu />
        </div>

      </div>
    </header>
  );
}
