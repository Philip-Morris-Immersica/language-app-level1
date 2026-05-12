'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Square, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { speakBulgarian, stopSpeaking, stopTtsAudio, getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { TtsHint } from '@/components/TtsHint';

interface ChecklistItem {
  id: string;
  text: string;
  isTrue: boolean;
}

interface ReadingTextImage {
  imageUrl: string;
  label: string;
  ttsWordId?: string;
  /** Optional curated translations for `label` (lang code → text); click-to-reveal uses same pattern as paragraph translation. */
  labelTranslations?: Record<string, string>;
}

interface ReadingTextProps {
  audioUrl?: string;
  textTitle?: string;
  images?: ReadingTextImage[];
  imageFlashcards?: boolean;
  paragraphs: string[];
  paragraphTranslations?: Record<string, string>[];
  showDictionary?: boolean;
  hideText?: boolean;
  noTranslation?: boolean;
  checklist?: {
    instruction: string;
    items: ChecklistItem[];
  };
  exerciseId?: string;
  onComplete?: (isCorrect: boolean) => void;
}

function TtsButton({
  text,
  exerciseId,
  paragraphIndex = 0,
  useFullAudio,
}: {
  text: string;
  exerciseId?: string;
  paragraphIndex?: number;
  /** When multiple paragraphs are read as one block, use the `-full` MP3 if generated */
  useFullAudio?: boolean;
}) {
  const t = useT();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      stopSpeaking();
      stopTtsAudio();
      setIsPlaying(false);
      return;
    }
    if (exerciseId) {
      const stem = useFullAudio ? `${exerciseId}-full` : `${exerciseId}-p-${paragraphIndex}`;
      const audioPath = getTtsAudioPath(exerciseId, 'texts', stem);
      playTtsAudio(audioPath, text, undefined, () => setIsPlaying(false));
      setIsPlaying(true);
      return;
    }
    speakBulgarian(text);
    setIsPlaying(true);
  }, [text, isPlaying, exerciseId, paragraphIndex, useFullAudio]);

  return (
    <Button
      onClick={handlePlay}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm shadow-md active:scale-95 transition-all ${
        isPlaying
          ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
          : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
      }`}
    >
      {isPlaying ? (
        <><Square className="w-4 h-4" /> {t('exercise.stop')}</>
      ) : (
        <><Play className="w-4 h-4" /> {t('exercise.listen')}</>
      )}
    </Button>
  );
}

export function ReadingText({ audioUrl, textTitle, images, imageFlashcards, paragraphs, paragraphTranslations, showDictionary, hideText, noTranslation, checklist, exerciseId, onComplete }: ReadingTextProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | null>>({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const completedRef = useRef(false);

  /** Sequential „Слушай“ (paragraph p-0, then p-1, …) when no single `audioUrl` full file */
  const [sequentialPlaying, setSequentialPlaying] = useState(false);
  const [playingParaIndex, setPlayingParaIndex] = useState<number | null>(null);
  const seqRef = useRef<{ cancelled: boolean } | null>(null);
  const [flippedVocabImages, setFlippedVocabImages] = useState<Record<number, boolean>>({});
  const [revealedImageLabels, setRevealedImageLabels] = useState<Set<number>>(new Set());

  const stopSequentialPlayback = useCallback(() => {
    if (seqRef.current) seqRef.current.cancelled = true;
    seqRef.current = null;
    stopTtsAudio();
    setSequentialPlaying(false);
    setPlayingParaIndex(null);
  }, []);

  useEffect(() => {
    return () => {
      if (seqRef.current) seqRef.current.cancelled = true;
      stopTtsAudio();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const showSequentialListen =
    !!exerciseId &&
    paragraphs.length > 0 &&
    !audioUrl &&
    !hideText;

  const handleSequentialListen = () => {
    if (sequentialPlaying) {
      stopSequentialPlayback();
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (!exerciseId) return;
    const token = { cancelled: false };
    seqRef.current = token;
    setSequentialPlaying(true);

    const playNext = (i: number) => {
      if (token.cancelled) return;
      if (i >= paragraphs.length) {
        if (seqRef.current === token) seqRef.current = null;
        setSequentialPlaying(false);
        setPlayingParaIndex(null);
        return;
      }
      const p = paragraphs[i];
      setPlayingParaIndex(i);
      const audioPath = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${i}`);
      playTtsAudio(audioPath, p, undefined, () => {
        if (token.cancelled) return;
        window.setTimeout(() => {
          if (!token.cancelled) playNext(i + 1);
        }, 400);
      });
    };
    playNext(0);
  };

  const handleVocabImageClick = (index: number, label: string, ttsWordId?: string) => {
    if (sequentialPlaying) stopSequentialPlayback();
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    const wasFlipped = flippedVocabImages[index];
    setFlippedVocabImages(prev => ({ ...prev, [index]: !prev[index] }));
    if (wasFlipped) return;
    if (exerciseId && ttsWordId) {
      const audioPath = getTtsAudioPath(exerciseId, 'words', ttsWordId);
      playTtsAudio(audioPath, label);
    } else {
      speakBulgarian(label);
    }
  };

  const handlePlayAudio = () => {
    if (!audioUrl) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {(audioUrl || showDictionary || showSequentialListen) && (
        <div className="flex justify-end gap-2 mb-6">
          {showDictionary && (
            <Button
              className="px-5 py-3 md:px-6 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 bg-[#0072BC] hover:bg-[#05568B] text-white"
              onClick={() => window.dispatchEvent(new CustomEvent('open-vocabulary-drawer'))}
            >
              <span className="text-lg">📖</span>
              {t('exercise.dictionary')}
            </Button>
          )}
          {audioUrl && (
            <Button
              onClick={handlePlayAudio}
              className="bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB] px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  {t('exercise.stop')}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.listen')}
                </>
              )}
            </Button>
          )}
          {showSequentialListen && (
            <Button
              onClick={handleSequentialListen}
              className={`px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                sequentialPlaying
                  ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                  : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
              }`}
            >
              {sequentialPlaying ? (
                <>
                  <Square className="w-5 h-5" />
                  {t('exercise.stop')}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.listen')}
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {textTitle && (
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          {textTitle}
        </h2>
      )}

      {hideText && images && images.length > 0 ? (
        <div className="mb-6">
          {!noTranslation && lang !== 'bg' && (
            <p className="text-xs md:text-sm text-[#737373] mb-3 text-center max-w-xl mx-auto">
              {t('exercise.tapLabelForTranslation')}
            </p>
          )}
          <div
            className={`grid gap-6 ${images.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2 md:max-w-3xl md:mx-auto'}`}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="flex flex-col items-stretch h-full min-w-0"
              >
                <div className="flex-1 flex items-center justify-center min-h-[11rem] md:min-h-[14rem]">
                  <img
                    src={img.imageUrl}
                    alt={img.label}
                    className="w-full max-h-72 rounded-lg shadow-sm object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex flex-col items-center grow justify-end">
                  {img.label &&
                    (noTranslation || lang === 'bg' ? (
                      <span className="text-xs md:text-sm text-gray-500 font-medium text-center">
                        {img.label}
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`text-xs md:text-sm font-medium text-center rounded-md px-2 py-1 transition-colors border border-transparent ${
                            revealedImageLabels.has(i)
                              ? 'text-[#0072BC] bg-[#CDE3F1]/30 border-[#0072BC]/25'
                              : 'text-gray-700 hover:bg-gray-50 border-dashed border-gray-300'
                          }`}
                          aria-expanded={revealedImageLabels.has(i)}
                          onClick={() => {
                            setRevealedImageLabels((prev) => {
                              const next = new Set(prev);
                              if (next.has(i)) next.delete(i);
                              else next.add(i);
                              return next;
                            });
                          }}
                        >
                          {img.label}
                        </button>
                        <InlineTranslation
                          text={img.label}
                          visible={revealedImageLabels.has(i)}
                          translations={img.labelTranslations}
                        />
                      </>
                    ))}
                  {paragraphs[i] && (
                    <div className="mt-3 w-full flex justify-center">
                      <TtsButton text={paragraphs[i]} exerciseId={exerciseId} paragraphIndex={i} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !hideText && images && images.length > 0 && imageFlashcards ? (
        <div className={`grid gap-4 md:gap-6 mb-6 ${images.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img, i) => {
            const isFlipped = flippedVocabImages[i];
            return (
              <div
                key={i}
                className="perspective-1000 h-48 md:h-52"
                style={{ perspective: '1000px' }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleVocabImageClick(i, img.label, img.ttsWordId);
                    }
                  }}
                  onClick={() => handleVocabImageClick(i, img.label, img.ttsWordId)}
                  className="relative w-full h-full cursor-pointer transition-transform duration-500 preserve-3d"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-xl p-3 shadow-md flex items-center justify-center border border-gray-200"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img.imageUrl}
                        alt={img.label}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute w-full h-full backface-hidden bg-[#32C189] rounded-xl p-4 shadow-md flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <p className="text-base md:text-lg font-bold text-white text-center px-2 leading-snug">
                      {img.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : !hideText && images && images.length > 0 ? (
        <div className={`grid gap-3 mb-6 ${images.length === 1 ? 'grid-cols-1 max-w-md md:max-w-lg mx-auto' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={img.imageUrl}
                alt={img.label}
                className="w-full rounded-lg shadow-sm object-contain max-h-72"
                loading="lazy"
              />
              {img.label && (
                <span className="mt-1.5 text-xs md:text-sm text-gray-500 font-medium">{img.label}</span>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {hideText && (!images || images.length === 0) ? (
        <div className="flex items-center gap-3 mb-2">
          <TtsButton
            text={paragraphs.join('\n\n')}
            exerciseId={exerciseId}
            useFullAudio={paragraphs.length > 1}
          />
        </div>
      ) : hideText ? null : (
        <>
          <TtsHint messageKey="exercise.tapTextToHear" />

          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                onClick={noTranslation ? undefined : () => {
                  if (sequentialPlaying) stopSequentialPlayback();
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                  const audioPath = exerciseId
                    ? getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${index}`)
                    : '';
                  setPlayingParaIndex(index);
                  playTtsAudio(audioPath, paragraph, undefined, () => setPlayingParaIndex(null));

                  setRevealedParas(prev => {
                    const next = new Set(prev);
                    if (next.has(index)) next.delete(index);
                    else next.add(index);
                    return next;
                  });
                }}
                className={noTranslation
                  ? 'rounded-lg p-2 -mx-2'
                  : `cursor-pointer rounded-lg p-2 -mx-2 transition-colors active:scale-[0.99] ${
                      playingParaIndex === index
                        ? 'bg-[#DAF6EB]/30 border border-[#32C189]/40'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`
                }
              >
                {paragraph.includes('\n') ? (
                  paragraph.split('\n').map((line, li) => (
                    <p key={li} className="text-base md:text-lg text-gray-800 leading-relaxed">
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                )}
                {!noTranslation && <InlineTranslation text={paragraph} visible={revealedParas.has(index)} translations={paragraphTranslations?.[index]} />}
              </div>
            ))}
          </div>
        </>
      )}

      {checklist && (
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <p className="text-sm md:text-base font-semibold text-gray-700 mb-4">
            {checklist.instruction}
          </p>
          <div className="space-y-2">
            {checklist.items.map((item) => {
              const answer = checkAnswers[item.id];
              const isCorrect = checkSubmitted && answer === item.isTrue;
              const isWrong = checkSubmitted && answer !== null && answer !== undefined && answer !== item.isTrue;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    isCorrect ? 'border-green-400 bg-green-50' :
                    isWrong ? 'border-[#D25A45]/70 bg-[#FCE2DE]/40' :
                    answer !== null && answer !== undefined ? 'border-[#8B9D5F] bg-[#f4faee]' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span className="flex-1 text-sm md:text-base font-medium text-gray-800">
                    {item.text}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        if (checkSubmitted) return;
                        setCheckAnswers(prev => ({ ...prev, [item.id]: true }));
                      }}
                      disabled={checkSubmitted}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        answer === true
                          ? isCorrect ? 'bg-[#32C189] text-white' : isWrong ? 'bg-[#D25A45] text-white' : 'bg-[#32C189] text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-[#32C189] hover:text-[#32C189]'
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => {
                        if (checkSubmitted) return;
                        setCheckAnswers(prev => ({ ...prev, [item.id]: false }));
                      }}
                      disabled={checkSubmitted}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        answer === false
                          ? isCorrect ? 'bg-[#32C189] text-white' : isWrong ? 'bg-[#D25A45] text-white' : 'bg-[#32C189] text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-[#D25A45]/70 hover:text-[#D25A45]'
                      }`}
                    >
                      ✗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!checkSubmitted ? (
            <Button
              onClick={() => {
                const allAnswered = checklist.items.every(item => checkAnswers[item.id] !== null && checkAnswers[item.id] !== undefined);
                if (!allAnswered) return;
                setCheckSubmitted(true);
                const allCorrect = checklist.items.every(item => checkAnswers[item.id] === item.isTrue);
                if (!completedRef.current) {
                  completedRef.current = true;
                  onComplete?.(allCorrect);
                }
              }}
              disabled={!checklist.items.every(item => checkAnswers[item.id] !== null && checkAnswers[item.id] !== undefined)}
              className="mt-4 bg-[#32C189] hover:bg-[#257958] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('exercise.check')}
            </Button>
          ) : (
            <div className={`mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-white text-base shadow-md ${
              checklist.items.every(item => checkAnswers[item.id] === item.isTrue) ? 'bg-[#32C189]' : 'bg-[#D25A45]'
            }`}>
              {checklist.items.every(item => checkAnswers[item.id] === item.isTrue)
                ? `✓ ${t('exercise.excellent')}`
                : `${checklist.items.filter(item => checkAnswers[item.id] === item.isTrue).length} / ${checklist.items.length}`
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
