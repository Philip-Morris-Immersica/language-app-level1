'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Send, AlertCircle, Info, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { ChatbotVoiceInput } from './ChatbotVoiceInput';

interface Message {
  role: 'user' | 'assistant' | 'info';
  content: string;
  id: string;
}

interface Props {
  onNewConversation?: () => void;
}

function extractLessonId(pathname: string): string | null {
  const m = pathname.match(/\/lessons\/([^/]+)/);
  return m ? m[1] : null;
}

function describeCurrentPage(pathname: string): string {
  if (!pathname || pathname === '/') return 'home page';
  if (pathname.startsWith('/lessons/azbouka')) return 'Bulgarian Alphabet (Азбука) page';
  const lesson = pathname.match(/\/lessons\/([^/]+)/);
  if (lesson) {
    const suffix = pathname.includes('/exercises') ? ' exercises' : '';
    return `lesson page: ${lesson[1]}${suffix}`;
  }
  if (pathname.startsWith('/tests/')) return `test page: ${pathname.split('/tests/')[1]}`;
  if (pathname.startsWith('/level/')) return `level overview: ${pathname.split('/level/')[1].toUpperCase()}`;
  return pathname;
}

// Thin wrapper to translate a single BG string with useTranslate
function TranslatedChip({ text, onClick }: { text: string; onClick: () => void }) {
  const translated = useTranslate(text);
  return (
    <button
      onClick={onClick}
      className="text-xs bg-[#CDE3F1] text-[#05568B] rounded-full px-3 py-1.5 hover:bg-[#0072BC] hover:text-white transition-colors"
    >
      {translated}
    </button>
  );
}

export function ChatbotPanel({ onNewConversation }: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const pathname = usePathname();
  const lessonId = extractLessonId(pathname ?? '');
  const currentPage = describeCurrentPage(pathname ?? '');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  // Store Bulgarian source text for translation
  const [welcomeBg, setWelcomeBg] = useState('');
  const [chipsBg, setChipsBg] = useState<string[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Auto-translate welcome message from BG
  const welcomeTranslated = useTranslate(welcomeBg);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial load: fetch BG welcome + chips, then check history
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const seen = sessionStorage.getItem('robi_privacy_seen');
      if (!seen) setShowPrivacy(true);

      try {
        // Always fetch BG source for translation
        const [welcomeRes, histRes] = await Promise.all([
          fetch('/api/chat/welcome?lang=bg'),
          fetch('/api/chat/conversations'),
        ]);

        if (cancelled) return;

        const welcomeData = await welcomeRes.json();
        setWelcomeBg(welcomeData.message ?? '');
        setChipsBg(welcomeData.chips ?? []);

        const { conversation, messages: histMsgs } = await histRes.json();

        if (conversation && histMsgs?.length > 0) {
          setConversationId(conversation.id);
          const loaded: Message[] = histMsgs
            .filter((m: { role: string }) => m.role !== 'system')
            .map((m: { role: string; content: string }, i: number) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
              id: `hist-${i}`,
            }));
          setMessages(loaded);
        } else {
          // Will show welcome via welcomeTranslated once translated
          setMessages([]);
        }
      } catch {
        if (!cancelled) setWelcomeBg('Здравей! Аз съм Robi, твоят AI помощник за български език. Питай ме за думи, граматика или упражнения!');
      } finally {
        if (!cancelled) setHistoryLoaded(true);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [lang]);

  // Once welcome is translated, show it if no history
  useEffect(() => {
    if (!historyLoaded || !welcomeTranslated) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ role: 'assistant', content: welcomeTranslated, id: 'welcome' }];
    });
  }, [historyLoaded, welcomeTranslated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const dismissPrivacy = () => {
    sessionStorage.setItem('robi_privacy_seen', '1');
    setShowPrivacy(false);
  };

  const startNewConversation = useCallback(() => {
    setConversationId(null);
    setIsLoading(false);
    setInput('');
    const welcome = welcomeTranslated || welcomeBg;
    setMessages([{ role: 'assistant', content: welcome, id: `welcome-${Date.now()}` }]);
    onNewConversation?.();
    inputRef.current?.focus();
  }, [welcomeTranslated, welcomeBg, onNewConversation]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: 'user', content: trimmed, id: `u-${Date.now()}` };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { role: 'assistant', content: '', id: assistantId }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          language: lang,
          lessonContext: lessonId,
          currentPage,
          conversationId,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setMessages((prev) => prev.map((m) => m.id === assistantId
          ? { ...m, role: 'info', content: error ?? 'Error' }
          : m));
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              fullText += data.text;
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m));
            }
            if (data.conversationId) setConversationId(data.conversationId);
          } catch { /* ignore */ }
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) => m.id === assistantId
        ? { ...m, role: 'info', content: 'Connection error. Please try again.' }
        : m));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [isLoading, lang, lessonId, currentPage, conversationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showChips = messages.length <= 1 && !isLoading && chipsBg.length > 0;

  return (
    <div className="flex flex-col h-full relative">
      {showPrivacy && (
        <div className="absolute inset-0 z-10 flex items-end justify-center p-4 bg-black/30 rounded-b-2xl">
          <div className="bg-white rounded-xl p-4 shadow-lg max-w-sm w-full">
            <div className="flex items-start gap-2 mb-3">
              <Info className="w-5 h-5 text-[#0072BC] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{t('chat.privacyNotice')}</p>
            </div>
            <button onClick={dismissPrivacy}
              className="w-full py-2 bg-[#0072BC] text-white rounded-lg text-sm font-medium hover:bg-[#005A8E] transition-colors">
              OK
            </button>
          </div>
        </div>
      )}

      {messages.length > 1 && !isLoading && (
        <div className="flex-shrink-0 flex justify-end px-3 pt-2">
          <button onClick={startNewConversation}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0072BC] transition-colors"
            title="New conversation">
            <RotateCcw className="w-3.5 h-3.5" />
            New conversation
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'info' ? (
              <div className="flex items-start gap-1.5 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2 max-w-[85%]">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{msg.content}</span>
              </div>
            ) : msg.role === 'user' ? (
              <div className="bg-[#0072BC] text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%] text-sm">
                {msg.content}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] text-sm prose prose-sm prose-gray">
                {msg.content ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {showChips && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {chipsBg.map((chip) => (
            <TranslatedChip key={chip} text={chip} onClick={() => sendMessage(chip)} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-gray-200 px-3 py-2 flex items-end gap-2">
        <ChatbotVoiceInput onTranscript={(text) => setInput(text)} disabled={isLoading} />
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BC]/40 min-h-[40px] max-h-[120px] overflow-y-auto disabled:opacity-50"
          style={{ lineHeight: '1.4' }}
        />
        <button type="submit" disabled={isLoading || !input.trim()}
          className="p-2 bg-[#0072BC] text-white rounded-full hover:bg-[#005A8E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          aria-label={t('chat.send')}>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
