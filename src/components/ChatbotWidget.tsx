'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CHATBOT_URL = 'https://immersica.skillie.ai/chatbot-embed/223/prompt/700';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Chat panel — anchored at bottom-5 right-5 (same as FAB), grows upward */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-[60] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 w-[536px] h-[803px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100dvh-2rem)] sm:w-[621px] sm:h-[540px]">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#8FC412] text-white flex-shrink-0">
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

          {/* iframe */}
          <iframe
            src={CHATBOT_URL}
            className="flex-1 w-full border-0"
            title="Robi AI Chatbot"
            allow="microphone"
          />
        </div>
      )}

      {/* FAB button — hidden when panel is open */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsPulsing(false);
          }}
          className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#8FC412] focus:ring-offset-2"
          aria-label="Open AI chat assistant"
        >
          <img
            src="/robi.jpg"
            alt="Chat with Robi"
            className="w-full h-full object-cover"
          />

          {/* Pulse ring */}
          {isPulsing && (
            <span className="absolute inset-0 rounded-full border-2 border-[#8FC412] animate-ping opacity-60 pointer-events-none" />
          )}
        </button>
      )}
    </>
  );
}
