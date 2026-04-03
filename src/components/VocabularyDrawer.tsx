'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, X, Volume2 } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { useLanguage } from '@/i18n/LanguageContext';
import type { VocabularyItem } from '@/content/types';
import { playTtsAudio } from '@/lib/tts';

function VocabRow({ item, lessonId }: { item: VocabularyItem; lessonId?: string }) {
  const { lang } = useLanguage();
  const translated = useTranslate(item.bulgarian);
  const showTranslation = lang !== 'bg' && translated !== item.bulgarian;

  return (
    <button
      onClick={() => {
        const audioPath = lessonId ? `/assets/${lessonId}/audio/tts/words/${item.id}.mp3` : '';
        playTtsAudio(audioPath, item.bulgarian);
      }}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EEF7C8] transition-colors text-left group cursor-pointer"
    >
      <Volume2 className="w-4 h-4 text-gray-400 group-hover:text-[#8FC412] shrink-0 transition-colors" />
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-gray-800">{item.bulgarian}</span>
        {showTranslation && (
          <span className="text-sm text-[#0279C3] ml-2">— {translated}</span>
        )}
      </div>
    </button>
  );
}

interface VocabularyDrawerProps {
  vocabulary: VocabularyItem[];
  lessonTitle?: string;
  lessonId?: string;
}

export function VocabularyDrawer({ vocabulary, lessonTitle, lessonId }: VocabularyDrawerProps) {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('open-vocabulary-drawer', open);
    return () => window.removeEventListener('open-vocabulary-drawer', open);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!vocabulary || vocabulary.length === 0) return null;

  return (
    <>
      {/* Floating button — bottom-left, mirroring the chatbot on the right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 w-14 h-14 md:w-16 md:h-16 bg-[#0279C3] hover:bg-[#025f9a] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ring-[4px] ring-[#8FC412]"
        aria-label={t('exercise.dictionary')}
      >
        <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={close}
        />
      )}

      {/* Drawer panel — slides from left */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50 w-full sm:w-[400px] md:w-[440px]
          bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#0279C3] to-[#025f9a]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-lg font-bold text-white">{t('exercise.dictionary')}</h2>
              {lessonTitle && (
                <p className="text-xs text-white/70">{lessonTitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hint */}
        <div className="px-6 py-2 bg-[#EEF7C8] text-xs text-[#4a6b1f] text-center">
          🔊 {t('exercise.tapToTranslate')}
        </div>

        {/* Word list */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="divide-y divide-gray-50">
            {vocabulary.map((item) => (
              <VocabRow key={item.id} item={item} lessonId={lessonId} />
            ))}
          </div>
        </div>

        {/* Footer with count */}
        <div className="px-6 py-3 border-t border-gray-100 text-center text-xs text-gray-400">
          {vocabulary.length} {vocabulary.length === 1 ? 'дума' : 'думи'}
        </div>
      </div>
    </>
  );
}
