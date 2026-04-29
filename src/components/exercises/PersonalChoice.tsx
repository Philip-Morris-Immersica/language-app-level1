'use client';

import { useState, useCallback, useRef } from 'react';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { Button } from '@/components/ui/button';
import { speakBulgarian, getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { TtsHint } from '@/components/TtsHint';

interface PersonalChoiceProps {
  exerciseId?: string;
  imageUrls?: string[];
  model?: {
    question: string;
    positiveAnswer: string;
    negativeAnswer: string;
  };
  blankOptions: string[];
  items: {
    id: string;
    question: string;
    positiveTemplate: string;
    negativeTemplate: string;
    positiveBlank: string;
    negativeBlank: string;
  }[];
  onComplete?: (correct: boolean, score: number) => void;
}

type ItemState =
  | { phase: 'choose' }
  | { phase: 'fill'; preference: 'positive' | 'negative' }
  | { phase: 'done'; preference: 'positive' | 'negative'; correct: boolean };

function speak(text: string) {
  speakBulgarian(text);
}

function SentenceWithBlank({
  template,
  blankOptions,
  onSelect,
  selectedValue,
  correctValue,
  locked,
}: {
  template: string;
  blankOptions: string[];
  onSelect: (val: string) => void;
  selectedValue: string | null;
  correctValue: string;
  locked: boolean;
}) {
  const parts = template.split('___');
  const isCorrect = selectedValue === correctValue;

  return (
    <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed">
      {parts[0]}
      {locked && selectedValue ? (
        <span
          className={`inline-block px-3 py-0.5 mx-1 rounded-lg font-bold text-base md:text-lg border-2 ${
            isCorrect
              ? 'bg-green-100 text-green-800 border-green-400'
              : 'bg-[#FCE2DE] text-[#683229] border-[#D25A45]/70'
          }`}
        >
          {selectedValue}
          {isCorrect ? ' ✓' : ` ✗ → ${correctValue}`}
        </span>
      ) : (
        <span className="inline-flex gap-2 mx-1">
          {blankOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-4 py-1 rounded-lg font-bold text-base border-2 transition-all
                ${selectedValue === opt
                  ? 'bg-[#0072BC] text-white border-[#0072BC] scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0072BC] hover:text-[#0072BC]'
                }
              `}
            >
              {opt}
            </button>
          ))}
        </span>
      )}
      {parts[1]}
    </p>
  );
}

export function PersonalChoice({ exerciseId, imageUrls, model, blankOptions, items, onComplete }: PersonalChoiceProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [states, setStates] = useState<Record<string, ItemState>>({});
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [modelTranslationVisible, setModelTranslationVisible] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestionTranslation = useCallback((id: string) => {
    setRevealedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const completedRef = useRef(false);

  const getState = (id: string): ItemState => states[id] ?? { phase: 'choose' };

  const handlePreference = useCallback((itemId: string, preference: 'positive' | 'negative') => {
    setStates(prev => ({ ...prev, [itemId]: { phase: 'fill', preference } }));
    const item = items.find(i => i.id === itemId);
    if (item) speak(item.question);
  }, [items]);

  const handleBlankSelect = useCallback((itemId: string, value: string) => {
    setSelections(prev => ({ ...prev, [itemId]: value }));
  }, []);

  const handleConfirm = useCallback((itemId: string) => {
    const state = getState(itemId);
    if (state.phase !== 'fill') return;
    const selected = selections[itemId];
    if (!selected) return;

    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const correctBlank = state.preference === 'positive' ? item.positiveBlank : item.negativeBlank;
    const isCorrect = selected === correctBlank;
    const template = state.preference === 'positive' ? item.positiveTemplate : item.negativeTemplate;
    const fullSentence = template.replace('___', correctBlank);

    setStates(prev => ({
      ...prev,
      [itemId]: { phase: 'done', preference: state.preference, correct: isCorrect },
    }));

    speak(fullSentence);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selections, states]);

  const doneItems = items.filter(i => getState(i.id).phase === 'done');
  const allDone = doneItems.length === items.length;
  const correctCount = doneItems.filter(i => {
    const s = getState(i.id);
    return s.phase === 'done' && s.correct;
  }).length;

  if (allDone && onComplete && !completedRef.current) {
    completedRef.current = true;
    const allCorrect = correctCount === items.length;
    setTimeout(() => onComplete(allCorrect, correctCount), 0);
  }

  return (
    <div className="space-y-5">
      <TtsHint messageKey="exercise.tapCardToHear" />

      {imageUrls && imageUrls.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center">
          {imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt=""
              className="rounded-xl shadow-sm max-h-[280px] object-contain"
            />
          ))}
        </div>
      )}

      {model && (
        <div
          className="bg-[#f0f7ff] border border-[#0072BC]/20 rounded-xl p-4 md:p-5 cursor-pointer"
          onClick={() => {
            const modelText = `${model.question} ${model.positiveAnswer} ${model.negativeAnswer}`;
            const audioPath = exerciseId ? getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-model`) : '';
            playTtsAudio(audioPath, modelText);
            setModelTranslationVisible(v => !v);
          }}
        >
          <p className="text-xs font-semibold text-[#0072BC] uppercase tracking-wide mb-2">
            {t('exercise.model')}
          </p>
          <p className="text-base md:text-lg font-bold text-gray-800">
            – {model.question}
          </p>
          <p className="text-base md:text-lg text-green-700 font-medium mt-1">
            – {model.positiveAnswer}
          </p>
          <p className="text-base md:text-lg text-[#D25A45] font-medium">
            – {model.negativeAnswer}
          </p>
          {lang !== 'bg' && (
            <div className="mt-2 space-y-0.5">
              <InlineTranslation text={model.question} visible={modelTranslationVisible} className="mt-0" />
              <InlineTranslation text={model.positiveAnswer} visible={modelTranslationVisible} className="mt-0" />
              <InlineTranslation text={model.negativeAnswer} visible={modelTranslationVisible} className="mt-0" />
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-gray-500 font-medium">
        {t('exercise.yourTurn')}
      </p>

      <div className="grid gap-4">
        {items.map((item) => {
          const state = getState(item.id);
          const template = state.phase !== 'choose'
            ? (state.preference === 'positive' ? item.positiveTemplate : item.negativeTemplate)
            : '';
          const correctBlank = state.phase !== 'choose'
            ? (state.preference === 'positive' ? item.positiveBlank : item.negativeBlank)
            : '';
          const fullSentence = template.replace('___', correctBlank);

          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 p-4 md:p-5 transition-all duration-300 ${
                state.phase === 'done'
                  ? state.correct
                    ? 'bg-[#DAF6EB]/40 border-[#32C189]/40'
                    : 'bg-[#FCE2DE]/50 border-[#D25A45]/40'
                  : state.phase === 'fill'
                  ? 'bg-[#FEF1D1] border-[#FFC740]/60'
                  : 'bg-white border-gray-200 hover:border-[#0072BC]/40 hover:shadow-sm'
              }`}
            >
              {/* Question */}
              <div className="flex items-start gap-2">
                <span className="text-lg">🗣️</span>
                <div className="flex-1">
                  <p
                    className="text-base md:text-lg font-bold text-gray-800 cursor-pointer"
                    onClick={() => { speak(item.question); toggleQuestionTranslation(item.id); }}
                  >
                    – {item.question}
                  </p>
                  <InlineTranslation
                    text={item.question}
                    visible={revealedQuestions.has(item.id) || state.phase !== 'choose'}
                    className="mb-1"
                  />
                </div>
              </div>

              {/* Phase 1: Choose Да/Не */}
              {state.phase === 'choose' && (
                <div className="flex gap-3 mt-3 ml-7">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 font-bold text-base md:text-lg py-3"
                    onClick={() => handlePreference(item.id, 'positive')}
                  >
                    Да
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#D25A45]/50 text-[#D25A45] hover:bg-[#FCE2DE]/40 hover:border-[#D25A45] font-bold text-base md:text-lg py-3"
                    onClick={() => handlePreference(item.id, 'negative')}
                  >
                    Не
                  </Button>
                </div>
              )}

              {/* Phase 2: Fill in с/без */}
              {state.phase === 'fill' && (
                <div className="mt-3 ml-7 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <SentenceWithBlank
                    template={template}
                    blankOptions={blankOptions}
                    onSelect={(val) => handleBlankSelect(item.id, val)}
                    selectedValue={selections[item.id] ?? null}
                    correctValue={correctBlank}
                    locked={false}
                  />
                  {selections[item.id] && (
                    <Button
                      className="bg-[#0072BC] hover:bg-[#025f9c] text-white font-semibold px-6 animate-in fade-in duration-200"
                      onClick={() => handleConfirm(item.id)}
                    >
                      {t('exercise.check')}
                    </Button>
                  )}
                </div>
              )}

              {/* Phase 3: Done — show result */}
              {state.phase === 'done' && (
                <div className="mt-3 ml-7 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  <SentenceWithBlank
                    template={template}
                    blankOptions={blankOptions}
                    onSelect={() => {}}
                    selectedValue={selections[item.id] ?? null}
                    correctValue={correctBlank}
                    locked
                  />
                  <InlineTranslation text={fullSentence} visible className="mt-1" />
                  {state.correct ? (
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('exercise.excellent')}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 font-medium mt-1">
                      {t('exercise.reviewErrors')}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="text-center py-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full border ${
            correctCount === items.length
              ? 'bg-[#DAF6EB] text-[#1F5741] border-[#32C189]/40'
              : 'bg-[#FEF1D1] text-[#684D0B] border-[#FFC740]/40'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('exercise.allAnswered')} ({correctCount}/{items.length})
          </div>
        </div>
      )}
    </div>
  );
}
