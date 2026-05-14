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
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-[60] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 w-[380px] h-[560px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100dvh-2rem)] sm:w-[420px] sm:h-[600px]">
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
      )}

      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsPulsing(false);
          }}
          className="fixed bottom-5 right-5 z-[60] w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden ring-[4px] ring-[#D25A45] focus:outline-none focus:ring-[4px] focus:ring-[#D25A45]"
          aria-label="Open AI chat assistant"
        >
          <img
            src="/robi.jpg"
            alt="Chat with Robi"
            className="w-full h-full object-cover"
          />
          {isPulsing && (
            <span className="absolute inset-0 rounded-full border-2 border-[#D25A45] animate-ping opacity-60 pointer-events-none" />
          )}
        </button>
      )}
    </>
  );
}
