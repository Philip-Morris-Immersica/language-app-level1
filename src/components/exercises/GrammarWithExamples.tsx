'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { InlineTranslation } from '@/components/InlineTranslation';
import { speakBulgarian } from '@/lib/tts';

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
        if (lower === 'без' || lower === 'няма') return <span key={i} className="text-red-600 font-extrabold">{part}</span>;
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
  lines?: string[];
}

interface GrammarWithExamplesProps {
  order?: number;
  title?: string;
  subtitle?: string;
  examples: GrammarExample[];
}

export function GrammarWithExamples({ subtitle, examples }: GrammarWithExamplesProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const { lang } = useLanguage();
  const t = useT();

  const handleClick = (index: number, example: GrammarExample) => {
    const textToSpeak = example.lines
      ? example.lines.join(' ')
      : [example.text, example.subtext].filter(Boolean).join(' ');

    speakBulgarian(textToSpeak);

    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {lang !== 'bg' && (
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
              <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-white">
                <ImageWithFallback
                  src={example.imageUrl}
                  alt={example.lines ? example.lines[0] : example.text}
                />
              </div>
            )}

            {/* Text section */}
            <div className="mt-4 text-center space-y-2">
              {example.lines ? (
                <>
                  {example.lines.map((line, lineIndex) => {
                    const isPositive = line.startsWith('✓');
                    const isNegative = line.startsWith('✗');
                    const colorClass = isPositive
                      ? 'text-green-700'
                      : isNegative
                      ? 'text-red-600'
                      : 'text-gray-800';
                    return (
                      <div key={lineIndex}>
                        <p className={`text-base md:text-lg font-bold ${colorClass}`}>
                          {line}
                        </p>
                        <InlineTranslation text={line} visible={revealed.has(index)} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    <HighlightPrepositions text={example.text} />
                  </p>
                  <InlineTranslation text={example.text} visible={revealed.has(index)} />
                  {example.subtext && (
                    <>
                      <p className="text-sm md:text-base text-gray-600 italic">
                        <HighlightPrepositions text={example.subtext} />
                      </p>
                      <InlineTranslation text={example.subtext} visible={revealed.has(index)} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Note at bottom */}
      <div className="mt-8 p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
        <p className="text-sm text-gray-700 text-center italic">
          {subtitle || 'Граматика – Глагол СЪМ'}
        </p>
      </div>
    </div>
  );
}
