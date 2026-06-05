'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ChatbotPanel } from './ChatbotPanel';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 4000);
    fetch('/api/auth/me').then((r) => r.json()).then(({ user }) => {
      setIsLoggedIn(!!user);
    }).catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Chat panel — always mounted, slides up/down */}
      <div
        className={`
          fixed z-[60] bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          left-0 right-0 bottom-0 top-14 rounded-t-2xl
          sm:left-auto sm:top-auto sm:right-5 sm:bottom-5 sm:w-[420px] sm:h-[calc(100dvh-5rem)] sm:max-h-[860px] sm:rounded-2xl
          ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%+2rem)]'}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[#0072BC] text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/robi.jpg"
              alt="Robi"
              className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
            />
            <div>
              <p className="font-semibold text-sm leading-tight">Robi</p>
              <p className="text-xs text-white/80">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <ChatbotPanel />
        </div>
      </div>

      {/* Floating button — hidden when panel is open */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsPulsing(false);
        }}
        className={`fixed bottom-5 right-5 z-[60] w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden ring-[4px] ring-[#F67F6A] focus:outline-none focus:ring-[4px] focus:ring-[#F67F6A] ${isOpen ? 'pointer-events-none opacity-0 scale-75' : 'opacity-100 scale-100'}`}
        aria-label="Open AI chat assistant"
      >
        <img
          src="/robi.jpg"
          alt="Chat with Robi"
          className="w-full h-full object-cover"
        />
        {isPulsing && (
          <span className="absolute inset-0 rounded-full border-2 border-[#F67F6A] animate-ping opacity-60 pointer-events-none" />
        )}
      </button>
    </>
  );
}
