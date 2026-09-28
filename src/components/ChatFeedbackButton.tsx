'use client';

import { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { getCurrentConversationId } from '@/lib/chat/currentConversation';

/**
 * Single feedback entry point for the whole chat — one button at the top of
 * the chat window (in ChatbotWidget's header), NOT a thumbs up/down on every
 * message. Opens a tiny modal with a free-text box. No AI call happens here —
 * the comment is just stored; admins review it (and can trigger an on-demand
 * AI summary) in /admin/feedback.
 */
export function ChatFeedbackButton() {
  const { lang } = useLanguage();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  function close() {
    setOpen(false);
    setSent(false);
    setError(false);
    setText('');
  }

  async function send() {
    const comment = text.trim();
    if (!comment || sending) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch('/api/chat/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          language: lang,
          conversationId: getCurrentConversationId(),
        }),
      });
      // fetch() only throws on network failure — an HTTP error status (e.g.
      // 401 if the session expired) must be checked explicitly, otherwise
      // the button would stay stuck on "sending" forever with no feedback.
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
      setTimeout(close, 1500);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={t('chat.feedbackButton')}
        aria-label={t('chat.feedbackButton')}
        className="flex items-center gap-1 px-1.5 py-1.5 hover:bg-white/20 rounded-lg transition-colors"
      >
        <MessageSquarePlus className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
          {t('chat.feedbackButton')}
        </span>
      </button>

      {open && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">{t('chat.feedbackTitle')}</h3>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label={t('chat.feedbackClose')}
              >
                <X className="size-4" />
              </button>
            </div>

            {sent ? (
              <p className="py-4 text-center text-sm text-green-600">{t('chat.feedbackThanks')}</p>
            ) : (
              <>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('chat.feedbackPlaceholder')}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-[#0072BC]"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!text.trim() || sending}
                  className="mt-3 w-full rounded-lg bg-[#0072BC] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005A8E] disabled:opacity-40"
                >
                  {sending ? '…' : t('chat.feedbackSend')}
                </button>
                {error && (
                  <p className="mt-2 text-center text-xs text-red-600">{t('chat.feedbackError')}</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
