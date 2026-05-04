'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { ImageLightbox } from '@/components/ImageLightbox';
import { TtsHint } from '@/components/TtsHint';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setError(true)}
    />
  );
}

function HighlightPrepositions({ text }: { text: string }) {
  const parts = text.split(/\b(без|със|с|Няма|няма|Има|има)\b/g);
  return (
    <>
      {parts.map((part, i) => {
        const lower = part.toLowerCase();
        if (lower === 'без' || lower === 'няма') return <span key={i} className="text-[#D25A45] font-extrabold">{part}</span>;
        if (lower === 'с' || lower === 'със' || lower === 'има') return <span key={i} className="text-green-700 font-extrabold">{part}</span>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface GrammarExample {
  imageUrl: string;
  text: string;
  subtext?: string;
  label?: string;
  lines?: string[];
  translations?: Record<string, string>;
  zoomable?: boolean;
  /** TTS generation only — which voice reads the card (see generate-tts.ts). */
  voiceGender?: 'male' | 'female';
}

interface GrammarWithExamplesProps {
  order?: number;
  title?: string;
  subtitle?: string;
  disableTts?: boolean;
  showLikeDislike?: boolean;
  examples: GrammarExample[];
  exerciseId?: string;
}

function BoldLine({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="font-extrabold text-[#2d5a1b]">{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export function GrammarWithExamples({ subtitle, examples, disableTts, showLikeDislike, exerciseId }: GrammarWithExamplesProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const { lang } = useLanguage();
  const t = useT();

  const handleClick = (index: number, example: GrammarExample) => {
    if (!disableTts) {
      const stripGrammarLinePrefix = (l: string) =>
        l.replace(/^\s*\S+:\s+/, '').replace(/^\s*[✓✗]\s*/, '');
      const textToSpeak = example.lines
        ? example.lines.filter(l => l.trim() !== '').map(stripGrammarLinePrefix).join(' ')
        : [example.text, example.subtext].filter(Boolean).join(' ');
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-card-${index}`)
        : '';
      playTtsAudio(audioPath, textToSpeak);
    }
    // label is intentionally excluded from TTS — it is visual only

    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Hero mode: single example with image → render full-width, large, always zoomable
  const isHero = examples.length === 1 && Boolean(examples[0].imageUrl);

  if (isHero) {
    const example = examples[0];
    const hasText = Boolean(example.text || (example.lines && example.lines.length > 0));
    return (
      <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <ImageLightbox src={example.imageUrl} alt={example.lines ? example.lines[0] : example.text}>
            <div className="relative w-full h-64 md:h-[26rem] lg:h-[32rem] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
              <ImageWithFallback src={example.imageUrl} alt={example.lines ? example.lines[0] : example.text} />
            </div>
          </ImageLightbox>
          {hasText && (
            <div
              onClick={() => handleClick(0, example)}
              className="mt-4 text-center cursor-pointer space-y-1"
            >
              {example.lines
                ? example.lines.filter(Boolean).map((line, i) => (
                    <p key={i} className="text-base font-semibold text-gray-700">{line}</p>
                  ))
                : <p className="text-base font-semibold text-gray-700">{example.text}</p>
              }
            </div>
          )}
          <p className="mt-3 text-center text-xs text-gray-400 select-none">
            Кликнете върху картинката, за да я увеличите.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {!disableTts && <TtsHint messageKey="exercise.tapCardToHear" />}
      {lang !== 'bg' && disableTts && (
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      {/* Examples grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {examples.map((example, index) => (
          <div
            key={index}
            onClick={() => handleClick(index, example)}
            className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 flex flex-col items-center"
          >
            {/* Image */}
            {example.imageUrl && (
              example.zoomable ? (
                <div className="w-full" onClick={(e) => e.stopPropagation()}>
                  <ImageLightbox src={example.imageUrl} alt={example.lines ? example.lines[0] : example.text}>
                    <div className="relative w-full h-56 md:h-72 lg:h-80 rounded-lg overflow-hidden bg-white">
                      <ImageWithFallback
                        src={example.imageUrl}
                        alt={example.lines ? example.lines[0] : example.text}
                      />
                    </div>
                  </ImageLightbox>
                </div>
              ) : (
                <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-white">
                  <ImageWithFallback
                    src={example.imageUrl}
                    alt={example.lines ? example.lines[0] : example.text}
                  />
                </div>
              )
            )}

            {/* Text section */}
            <div className="mt-4 text-center space-y-2 w-full">
              {example.lines ? (
                <>
                  {example.text && (
                    <p className="text-xs font-bold uppercase tracking-widest text-[#5a8a3c] mb-3 pb-2 border-b border-gray-100">
                      {example.text}
                    </p>
                  )}
                  {example.lines.map((line, lineIndex) => {
                    if (line === '') return <div key={lineIndex} className="h-2" />;
                    const plainLine = line.replace(/\*\*(.+?)\*\*/g, '$1');
                    const translationSource = plainLine.replace(/^\s*[✓✗]\s*/, '');
                    const isPositive = plainLine.startsWith('✓');
                    const isNegative = plainLine.startsWith('✗');
                    const isWarning = plainLine.startsWith('⚠️');
                    const isSentence = /^(Аз|Той|Тя|Ние|Вие|Те|Имам|Нямам|Това|–)\s/.test(plainLine);
                    const colorClass = isPositive
                      ? 'text-green-700'
                      : isNegative
                      ? 'text-[#D25A45]'
                      : isWarning
                      ? 'text-[#684D0B] font-extrabold'
                      : isSentence
                      ? 'text-[#0072BC] font-semibold'
                      : 'text-gray-800';
                    return (
                      <div key={lineIndex}>
                        <p className={`text-base md:text-lg font-bold ${colorClass}`}>
                          <BoldLine text={line} />
                        </p>
                        {translationSource.trim() && (
                          <InlineTranslation text={translationSource} visible={revealed.has(index)} />
                        )}
                      </div>
                    );
                  })}
                </>
              ) : showLikeDislike && example.subtext ? (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <ThumbsUp className="w-5 h-5 md:w-6 md:h-6 fill-green-600 text-green-600 flex-shrink-0" />
                    <p className="text-base md:text-lg font-bold text-gray-800">
                      <HighlightPrepositions text={example.text} />
                    </p>
                  </div>
                  <InlineTranslation text={example.text} visible={revealed.has(index)} translations={example.translations} />
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <ThumbsDown className="w-5 h-5 md:w-6 md:h-6 fill-red-500 text-red-500 flex-shrink-0" />
                    <p className="text-sm md:text-base text-gray-600 italic">
                      <HighlightPrepositions text={example.subtext} />
                    </p>
                  </div>
                  <InlineTranslation text={example.subtext} visible={revealed.has(index)} />
                  {example.label && (
                    <p className="mt-2 text-xs font-semibold text-[#2d5a1b] bg-[#f0f7e8] border border-[#8BC34A]/40 rounded-full px-3 py-1 inline-block">
                      {example.label}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    <HighlightPrepositions text={example.text} />
                  </p>
                  <InlineTranslation text={example.text} visible={revealed.has(index)} translations={example.translations} />
                  {example.subtext && (
                    <>
                      <p className="text-sm md:text-base text-gray-600 italic">
                        <HighlightPrepositions text={example.subtext} />
                      </p>
                      <InlineTranslation text={example.subtext} visible={revealed.has(index)} />
                    </>
                  )}
                  {example.label && (
                    <p className="mt-2 text-xs font-semibold text-[#2d5a1b] bg-[#f0f7e8] border border-[#8BC34A]/40 rounded-full px-3 py-1 inline-block">
                      {example.label}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
