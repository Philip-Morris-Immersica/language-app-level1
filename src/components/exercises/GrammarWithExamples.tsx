'use client';

import Image from 'next/image';
import { useState } from 'react';

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
  const speak = (example: GrammarExample) => {
    const textToSpeak = example.lines
      ? example.lines.join(' ')
      : [example.text, example.subtext].filter(Boolean).join(' ');

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Examples grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {examples.map((example, index) => (
          <div
            key={index}
            onClick={() => speak(example)}
            className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 flex flex-col items-center"
          >
            {/* Image */}
            <div className="relative w-full h-56 md:h-64 mb-4 rounded-lg overflow-hidden bg-white">
              <ImageWithFallback
                src={example.imageUrl}
                alt={example.lines ? example.lines[0] : example.text}
              />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              {example.lines ? (
                example.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-base md:text-lg font-bold text-gray-800">
                    {line}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    {example.text}
                  </p>
                  {example.subtext && (
                    <p className="text-sm md:text-base text-gray-600">
                      {example.subtext}
                    </p>
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
