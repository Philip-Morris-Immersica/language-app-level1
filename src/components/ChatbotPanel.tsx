'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Send, AlertCircle, Info, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { ChatbotVoiceInput, type VoiceStatus } from './ChatbotVoiceInput';

interface Message {
  role: 'user' | 'assistant' | 'info';
  content: string;
  id: string;
}

interface Props {
  onNewConversation?: () => void;
}

/** Detect lesson, test or alphabet from the current URL. Returns the kind so
 *  the chat backend can branch on lesson vs test (different exercise loaders,
 *  different prompt rules). */
function extractContext(pathname: string): { kind: 'lesson' | 'test' | null; id: string | null } {
  const lesson = pathname.match(/\/lessons\/([^/]+)/);
  if (lesson) return { kind: 'lesson', id: lesson[1] };
  const test = pathname.match(/\/tests\/([^/]+)/);
  if (test) return { kind: 'test', id: test[1] };
  return { kind: null, id: null };
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

/** Chip that auto-translates its visible text from a Bulgarian source string.
 *  On click sends the **translated** text (not the BG source) so the bot sees
 *  the user's message in their own language. */
function TranslatedChip({ source, onClick }: { source: string; onClick: (text: string) => void }) {
  const translated = useTranslate(source);
  const display = translated || source;
  return (
    <button
      onClick={() => onClick(display)}
      className="text-xs bg-[#CDE3F1] text-[#05568B] rounded-full px-3 py-1.5 hover:bg-[#0072BC] hover:text-white transition-colors"
    >
      {display}
    </button>
  );
}

/** Inert chip — its text is already in the user's language (e.g. per-lang
 *  hardcoded fallback or admin's per-lang override). Sent as-is on click. */
function PlainChip({ text, onClick }: { text: string; onClick: (text: string) => void }) {
  return (
    <button
      onClick={() => onClick(text)}
      className="text-xs bg-[#CDE3F1] text-[#05568B] rounded-full px-3 py-1.5 hover:bg-[#0072BC] hover:text-white transition-colors"
    >
      {text}
    </button>
  );
}

/** Welcome message that auto-translates a Bulgarian source string when one
 *  is provided. When `source` is null we render the already-localised
 *  `display` text directly. */
function useDisplayedWelcome(display: string, source: string | null): string {
  const translated = useTranslate(source ?? '');
  if (source) return translated || display;
  return display;
}

export function ChatbotPanel({ onNewConversation }: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const pathname = usePathname();
  const { kind: ctxKind, id: ctxId } = extractContext(pathname ?? '');
  const currentPage = describeCurrentPage(pathname ?? '');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');

  // Welcome / chips: the server returns both the localised display value AND
  // (when the admin has customised BG) the BG source for client-side translation.
  const [welcomeText, setWelcomeText] = useState('');
  const [welcomeSource, setWelcomeSource] = useState<string | null>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [chipsSource, setChipsSource] = useState<string[] | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const displayedWelcome = useDisplayedWelcome(welcomeText, welcomeSource);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const seen = sessionStorage.getItem('robi_privacy_seen');
      if (!seen) setShowPrivacy(true);

      try {
        const [welcomeRes, histRes] = await Promise.all([
          fetch(`/api/chat/welcome?lang=${encodeURIComponent(lang)}`),
          fetch('/api/chat/conversations'),
        ]);

        if (cancelled) return;

        const welcomeData = await welcomeRes.json();
        setWelcomeText(welcomeData.message ?? '');
        setWelcomeSource(welcomeData.messageSource ?? null);
        setChips(welcomeData.chips ?? []);
        setChipsSource(welcomeData.chipsSource ?? null);

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
        }
        // For empty history, the welcome is rendered via the displayedWelcome
        // effect below (waits for translation when needed).
      } catch {
        if (!cancelled) {
          setWelcomeText('Hi! I\'m Robi, your AI assistant for Bulgarian. Ask me about words, grammar, or exercises!');
        }
      } finally {
        if (!cancelled) setHistoryLoaded(true);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [lang]);

  // Once welcome is resolved (and possibly translated), show it as the first
  // assistant message — only if there is no loaded conversation history.
  useEffect(() => {
    if (!historyLoaded || !displayedWelcome) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ role: 'assistant', content: displayedWelcome, id: 'welcome' }];
    });
  }, [historyLoaded, displayedWelcome]);

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
    setMessages([{ role: 'assistant', content: displayedWelcome, id: `welcome-${Date.now()}` }]);
    onNewConversation?.();
    inputRef.current?.focus();
  }, [displayedWelcome, onNewConversation]);

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
          // Backward-compat: lessonContext is sent for lesson pages; for test
          // pages we send testContext. The server reads either.
          lessonContext: ctxKind === 'lesson' ? ctxId : null,
          testContext: ctxKind === 'test' ? ctxId : null,
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
  }, [isLoading, lang, ctxKind, ctxId, currentPage, conversationId]);

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

  const showChips = messages.length <= 1 && !isLoading && chips.length > 0 && historyLoaded;
  // Show the "New conversation" button only once there's an actual back-and-forth
  // (welcome message + user reply + assistant reply ≥ 3 messages).
  const showNewConversation = messages.length >= 3 && !isLoading;

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

      {showNewConversation && (
        <div className="flex-shrink-0 flex justify-end px-3 pt-2 pb-1 border-b border-gray-100">
          <button
            onClick={startNewConversation}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#0072BC] text-[#0072BC] bg-white hover:bg-[#CDE3F1] transition-colors shadow-sm"
            title={t('chat.newConversation') || 'New conversation'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('chat.newConversation') || 'New conversation'}
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
          {chips.map((chip, i) => (
            chipsSource && chipsSource[i]
              ? <TranslatedChip key={`c-${i}`} source={chipsSource[i]} onClick={sendMessage} />
              : <PlainChip key={`c-${i}`} text={chip} onClick={sendMessage} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-gray-200 px-3 py-2 flex items-end gap-2">
        <ChatbotVoiceInput
          onTranscript={(text) => setInput(text)}
          onStatusChange={setVoiceStatus}
          disabled={isLoading}
        />
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            voiceStatus === 'recording'
              ? t('chat.micListening')
              : voiceStatus === 'transcribing'
                ? t('chat.micTranscribing')
                : t('chat.placeholder')
          }
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
