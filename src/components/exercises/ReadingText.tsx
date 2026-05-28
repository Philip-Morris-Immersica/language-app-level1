'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Check, X, BookOpen, Volume2, Turtle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { Music } from 'lucide-react';
import { speakBulgarian, stopSpeaking, stopTtsAudio, pauseTtsAudio, resumeTtsAudio, setTtsAudioRate, getTtsAudioPath, playTtsAudio } from '@/lib/tts';
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
  /** URL of an original song/audio file — shows a separate "🎵 Слушай песента" button. */
  songUrl?: string;
  /** When true, paragraphs are rendered as plain text without per-paragraph click-to-play audio. */
  disableParagraphAudio?: boolean;
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
  rate = 1,
}: {
  text: string;
  exerciseId?: string;
  paragraphIndex?: number;
  /** When multiple paragraphs are read as one block, use the `-full` MP3 if generated */
  useFullAudio?: boolean;
  rate?: number;
}) {
  const t = useT();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      // Pause pre-generated MP3 (keeps position); stop browser TTS (no pause support).
      pauseTtsAudio();
      setIsPlaying(false);
      return;
    }
    if (exerciseId) {
      const stem = useFullAudio ? `${exerciseId}-full` : `${exerciseId}-p-${paragraphIndex}`;
      const audioPath = getTtsAudioPath(exerciseId, 'texts', stem);
      // If the same audio was paused, playTtsAudio resumes from the paused position.
      playTtsAudio(audioPath, text, rate, () => setIsPlaying(false));
      setIsPlaying(true);
      return;
    }
    speakBulgarian(text, rate);
    setIsPlaying(true);
  }, [text, isPlaying, exerciseId, paragraphIndex, useFullAudio, rate]);

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
        <><Pause className="w-4 h-4" /> {t('exercise.pause')}</>
      ) : (
        <><Play className="w-4 h-4" /> {t('exercise.listen')}</>
      )}
    </Button>
  );
}

export function ReadingText({ audioUrl, songUrl, disableParagraphAudio, textTitle, images, imageFlashcards, paragraphs, paragraphTranslations, showDictionary, hideText, noTranslation, checklist, exerciseId, onComplete }: ReadingTextProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songAudioRef = useRef<HTMLAudioElement | null>(null);
  const [songPlaying, setSongPlaying] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | null>>({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const completedRef = useRef(false);

  /** Sequential „Слушай“ (paragraph p-0, then p-1, …) when no single `audioUrl` full file */
  const [sequentialPlaying, setSequentialPlaying] = useState(false);
  const [sequentialPaused, setSequentialPaused] = useState(false);
  const [playingParaIndex, setPlayingParaIndex] = useState<number | null>(null);
  const seqRef = useRef<{ cancelled: boolean } | null>(null);
  const [flippedVocabImages, setFlippedVocabImages] = useState<Record<number, boolean>>({});
  const [revealedImageLabels, setRevealedImageLabels] = useState<Set<number>>(new Set());
  const [showHiddenText, setShowHiddenText] = useState(false);

  /** Slow-mode toggle (only for hideText/listening exercises). Persisted in localStorage.
   *  Default: ON (0.85x) — user must explicitly switch to 1x.
   */
  const [slowMode, setSlowMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = window.localStorage.getItem('tts-slow-mode');
    return stored !== '0'; // '1' or null → slow; '0' → normal
  });
  const ttsRate = hideText && slowMode ? 0.85 : 1;

  const toggleSlowMode = useCallback(() => {
    setSlowMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tts-slow-mode', next ? '1' : '0');
      }
      // Apply the new rate to any currently playing audio without interrupting it.
      const newRate = hideText && next ? 0.85 : 1;
      setTtsAudioRate(newRate);
      if (audioRef.current) audioRef.current.playbackRate = newRate;
      return next;
    });
  }, [hideText]);

  const stopSequentialPlayback = useCallback(() => {
    if (seqRef.current) seqRef.current.cancelled = true;
    seqRef.current = null;
    stopTtsAudio();
    setSequentialPlaying(false);
    setSequentialPaused(false);
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

  // Show the listen button whenever there is playable content — including hideText exercises.
  const showFullListenButton =
    (!!exerciseId && paragraphs.length > 0) || !!audioUrl;

  /**
   * Unified listen handler for the main "Слушай" button.
   * - With explicit audioUrl: plays the full MP3 file.
   * - Without audioUrl: uses sequential paragraph playback (p-0 → p-1 → …)
   *   so the button never falls back to browser speech synthesis.
   */
  const handleMainListen = audioUrl ? handlePlayAudio : handleSequentialListen;
  const mainIsPlaying = audioUrl ? isPlaying : sequentialPlaying;
  const mainIsPaused = audioUrl ? isPaused : sequentialPaused;

  const handleSongPlay = () => {
    if (songPlaying) {
      songAudioRef.current?.pause();
      setSongPlaying(false);
      return;
    }
    stopTtsAudio();
    if (sequentialPlaying) stopSequentialPlayback();
    const audio = songAudioRef.current ?? new Audio(songUrl!);
    songAudioRef.current = audio;
    audio.onended = () => setSongPlaying(false);
    audio.onerror = () => setSongPlaying(false);
    audio.play().catch(() => setSongPlaying(false));
    setSongPlaying(true);
  };

  /** @deprecated Prefer `showFullListenButton`. Kept for safety but is now always false. */
  const showSequentialListen =
    !showFullListenButton &&
    !!exerciseId &&
    paragraphs.length > 0 &&
    !audioUrl &&
    !hideText;

  const handleSequentialListen = () => {
    // Build the sequential chain for a given token.
    const makeChain = (tok: { cancelled: boolean }) => {
      const step = (i: number) => {
        if (tok.cancelled) return;
        if (i >= paragraphs.length) {
          if (seqRef.current === tok) seqRef.current = null;
          setSequentialPlaying(false);
          setSequentialPaused(false);
          setPlayingParaIndex(null);
          return;
        }
        setPlayingParaIndex(i);
        const audioPath = getTtsAudioPath(exerciseId!, 'texts', `${exerciseId}-p-${i}`);
        playTtsAudio(audioPath, paragraphs[i], ttsRate, () => {
          if (tok.cancelled) return;
          window.setTimeout(() => { if (!tok.cancelled) step(i + 1); }, 400);
        });
      };
      return step;
    };

    // 1. PAUSE — currently playing.
    if (sequentialPlaying) {
      pauseTtsAudio(); // keeps currentAudio for resume
      setSequentialPlaying(false);
      setSequentialPaused(true);
      // Token stays alive; playingParaIndex marks the paused position.
      return;
    }

    // 2. RESUME — paused with a live token.
    if (sequentialPaused && seqRef.current && !seqRef.current.cancelled && playingParaIndex !== null) {
      const token = seqRef.current;
      const pausedIdx = playingParaIndex;
      const step = makeChain(token);
      // resumeTtsAudio updates onended so the chain fires correctly when audio ends.
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => { if (!token.cancelled) step(pausedIdx + 1); }, 400);
      });
      if (resumed) {
        setSequentialPlaying(true);
        setSequentialPaused(false);
        return;
      }
      // Resume failed — fall through to fresh start.
      token.cancelled = true;
      seqRef.current = null;
    }

    // 3. FRESH START.
    stopSequentialPlayback();
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
    if (!exerciseId) return;

    const token = { cancelled: false };
    seqRef.current = token;
    setSequentialPlaying(true);
    setSequentialPaused(false);
    makeChain(token)(0);
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
    if (sequentialPlaying) stopSequentialPlayback();

    // PAUSE — currently playing.
    if (isPlaying) {
      pauseTtsAudio();
      if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    // RESUME — was paused (convention-based full MP3 path via tts.ts currentAudio).
    if (isPaused && exerciseId && paragraphs.length > 0) {
      const resumed = resumeTtsAudio(() => { setIsPlaying(false); setIsPaused(false); });
      if (resumed) { setIsPlaying(true); setIsPaused(false); return; }
      // Resume failed — fall through to fresh start.
      setIsPaused(false);
    }

    // RESUME — was paused via audioRef (direct audioUrl branch).
    if (isPaused && audioRef.current) {
      audioRef.current.playbackRate = ttsRate;
      audioRef.current.play().catch(() => { setIsPlaying(false); setIsPaused(false); });
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // FRESH START — convention-based full MP3 (+ browser TTS fallback via playTtsAudio).
    if (exerciseId && paragraphs.length > 0) {
      const fullText = paragraphs.join(' ');
      const path = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-full`);
      playTtsAudio(path, fullText, ttsRate, () => { setIsPlaying(false); setIsPaused(false); });
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (!audioUrl) return;
    const audio = audioRef.current ?? new Audio(audioUrl);
    audioRef.current = audio;
    audio.playbackRate = ttsRate;
    audio.onended = () => { setIsPlaying(false); setIsPaused(false); };
    audio.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    audio.play().catch(() => { setIsPlaying(false); setIsPaused(false); });
    setIsPlaying(true);
    setIsPaused(false);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {(audioUrl || songUrl || showDictionary || showSequentialListen || hideText || showFullListenButton) && (
        <div className="flex justify-end gap-2 mb-6 flex-wrap">
          {showDictionary && (
            <Button
              className="px-5 py-3 md:px-6 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 bg-[#0072BC] hover:bg-[#05568B] text-white"
              onClick={() => window.dispatchEvent(new CustomEvent('open-vocabulary-drawer'))}
            >
              <span className="text-lg">📖</span>
              {t('exercise.dictionary')}
            </Button>
          )}
          {hideText && (
            <Button
              onClick={toggleSlowMode}
              title={slowMode ? 'Нормална скорост' : 'По-бавно четене (0.85x)'}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                slowMode
                  ? 'bg-[#0072BC] text-white hover:bg-[#05568B]'
                  : 'bg-white border-2 border-[#0072BC]/40 text-[#0072BC] hover:bg-[#CDE3F1]/40'
              }`}
            >
              <Turtle className="w-4 h-4" />
              {slowMode ? '0.85x' : '1x'}
            </Button>
          )}
          {showFullListenButton && (
            <Button
              onClick={handleMainListen}
              className={`px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                mainIsPlaying
                  ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                  : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
              }`}
            >
              {mainIsPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  {t('exercise.pause')}
                </>
              ) : mainIsPaused ? (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.continue')}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.listen')}
                </>
              )}
            </Button>
          )}
          {songUrl && (
            <Button
              onClick={handleSongPlay}
              className={`px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                songPlaying
                  ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                  : 'bg-white border-2 border-[#0072BC] text-[#05568B] hover:bg-[#CDE3F1]'
              }`}
            >
              {songPlaying ? (
                <><Pause className="w-5 h-5" />{t('exercise.pause')}</>
              ) : (
                <><Music className="w-5 h-5" />{t('exercise.listenSong')}</>
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
                  <Pause className="w-5 h-5" />
                  {t('exercise.pause')}
                </>
              ) : sequentialPaused ? (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.continue')}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t('exercise.listen')}
                </>
              )}
            </Button>
          )}
          {hideText && paragraphs.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowHiddenText(prev => !prev)}
              className="flex items-center gap-2 border-2 border-[#0072BC]/40 text-[#0072BC] hover:bg-[#CDE3F1]/40 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm"
            >
              <BookOpen className="w-4 h-4" />
              {showHiddenText ? t('exercise.hideText') : t('exercise.showText')}
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
            className={`grid gap-x-6 gap-y-10 ${images.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2 md:max-w-3xl md:mx-auto'}`}
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
                      <TtsButton text={paragraphs[i]} exerciseId={exerciseId} paragraphIndex={i} rate={ttsRate} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showHiddenText && paragraphs.length > 0 && (
            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
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
        <div className={`grid gap-3 mb-6 ${images.length === 1 ? 'grid-cols-1 max-w-xl md:max-w-2xl mx-auto' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={img.imageUrl}
                alt={img.label}
                className={`w-full rounded-lg shadow-sm object-contain ${images.length === 1 ? 'max-h-96 md:max-h-[480px]' : 'max-h-72'}`}
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
        <div className="space-y-3">
          {!showFullListenButton && (
            <div className="flex items-center gap-3">
              <TtsButton
                text={paragraphs.join('\n\n')}
                exerciseId={exerciseId}
                useFullAudio={paragraphs.length > 1}
                rate={ttsRate}
              />
            </div>
          )}
          {paragraphs.length > 0 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowHiddenText(prev => !prev)}
                className="flex items-center gap-2 border-2 border-[#0072BC]/40 text-[#0072BC] hover:bg-[#CDE3F1]/40 px-5 py-2.5 rounded-lg font-semibold text-sm"
              >
                <BookOpen className="w-4 h-4" />
                {showHiddenText ? t('exercise.hideText') : t('exercise.showText')}
              </Button>
            </div>
          )}
          {showHiddenText && paragraphs.length > 0 && (
            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : hideText ? null : disableParagraphAudio ? (
        <div className="space-y-1">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg text-gray-800 leading-relaxed py-0.5">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <>
          <TtsHint messageKey="exercise.tapTextToHear" />

          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                onClick={() => {
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

                  if (!noTranslation) {
                    setRevealedParas(prev => {
                      const next = new Set(prev);
                      if (next.has(index)) next.delete(index);
                      else next.add(index);
                      return next;
                    });
                  }
                }}
                className={`cursor-pointer rounded-lg p-2 -mx-2 transition-colors active:scale-[0.99] ${
                  playingParaIndex === index
                    ? 'bg-[#DAF6EB]/30 border border-[#32C189]/40'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Volume2
                    className={`w-4 h-4 mt-1.5 flex-shrink-0 transition-colors ${
                      playingParaIndex === index ? 'text-[#32C189]' : 'text-gray-300'
                    }`}
                  />
                  <div className="flex-1">
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
                </div>
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
