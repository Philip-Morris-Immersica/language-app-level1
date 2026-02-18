'use client';

import Image from 'next/image';
import { BookOpen } from 'lucide-react';

interface GrammarExample {
  imageUrl: string;
  text: string;
  subtext?: string;
}

interface GrammarWithExamplesProps {
  order: number;
  title: string;
  subtitle?: string;
  examples: GrammarExample[];
}

export function GrammarWithExamples({ order, title, subtitle, examples }: GrammarWithExamplesProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#F8F5EE] to-[#F0EDE0] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-10 shadow-md">
      {/* Header with icon */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#6B8543] rounded-xl flex items-center justify-center shadow-md">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Examples grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border-2 border-gray-200 p-5 shadow-sm hover:shadow-md transition-all hover:scale-105 flex flex-col items-center"
          >
            {/* Image */}
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={example.imageUrl}
                alt={example.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <p className="text-base md:text-lg font-bold text-gray-800">
                {example.text}
              </p>
              {example.subtext && (
                <p className="text-sm md:text-base text-gray-600">
                  {example.subtext}
                </p>
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
