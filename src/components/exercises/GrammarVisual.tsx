'use client';

import Image from 'next/image';

interface PronounVisual {
  pronoun: string;
  imageUrl?: string;
  description?: string;
}

interface GrammarVisualProps {
  order?: number;
  title?: string;
  subtitle?: string;
  pronouns: PronounVisual[];
}

export function GrammarVisual({ subtitle, pronouns }: GrammarVisualProps) {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Visual grid for pronouns */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {pronouns.map((item, index) => (
          <div
            key={index}
            onClick={() => speak(item.pronoun)}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 flex flex-col items-center justify-center"
          >
            {/* Image placeholder or actual image */}
            {item.imageUrl ? (
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.pronoun}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-32 mb-4 flex items-center justify-center">
                {/* Simple stick figure representations */}
                {item.pronoun === 'аз' && (
                  <svg className="w-20 h-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="25" r="12" fill="#9CA3AF" />
                    <line x1="50" y1="37" x2="50" y2="65" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="45" x2="35" y2="55" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="45" x2="65" y2="55" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="65" x2="35" y2="85" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="65" x2="65" y2="85" stroke="#9CA3AF" strokeWidth="3" />
                  </svg>
                )}
                {item.pronoun === 'ти' && (
                  <svg className="w-20 h-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="25" r="12" fill="#6B7280" />
                    <line x1="50" y1="37" x2="50" y2="65" stroke="#6B7280" strokeWidth="3" />
                    <line x1="50" y1="45" x2="35" y2="55" stroke="#6B7280" strokeWidth="3" />
                    <line x1="50" y1="45" x2="65" y2="55" stroke="#6B7280" strokeWidth="3" />
                    <line x1="50" y1="65" x2="35" y2="85" stroke="#6B7280" strokeWidth="3" />
                    <line x1="50" y1="65" x2="65" y2="85" stroke="#6B7280" strokeWidth="3" />
                  </svg>
                )}
                {item.pronoun === 'той' && (
                  <svg className="w-24 h-24" viewBox="0 0 120 100">
                    {/* Three male figures */}
                    <circle cx="25" cy="30" r="9" fill="#4B5563" />
                    <line x1="25" y1="39" x2="25" y2="60" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="46" x2="16" y2="54" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="46" x2="34" y2="54" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="60" x2="16" y2="75" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="60" x2="34" y2="75" stroke="#4B5563" strokeWidth="2.5" />
                    
                    <circle cx="60" cy="30" r="9" fill="#6B7280" />
                    <line x1="60" y1="39" x2="60" y2="60" stroke="#6B7280" strokeWidth="2.5" />
                    <line x1="60" y1="46" x2="51" y2="54" stroke="#6B7280" strokeWidth="2.5" />
                    <line x1="60" y1="46" x2="69" y2="54" stroke="#6B7280" strokeWidth="2.5" />
                    <line x1="60" y1="60" x2="51" y2="75" stroke="#6B7280" strokeWidth="2.5" />
                    <line x1="60" y1="60" x2="69" y2="75" stroke="#6B7280" strokeWidth="2.5" />
                    
                    <circle cx="95" cy="30" r="9" fill="#94A3B8" />
                    <line x1="95" y1="39" x2="95" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="46" x2="86" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="46" x2="104" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="60" x2="86" y2="75" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="60" x2="104" y2="75" stroke="#94A3B8" strokeWidth="2.5" />
                  </svg>
                )}
                {item.pronoun === 'тя' && (
                  <svg className="w-24 h-24" viewBox="0 0 120 100">
                    {/* Three female figures (with middle one in dress) */}
                    <circle cx="25" cy="30" r="9" fill="#4B5563" />
                    <line x1="25" y1="39" x2="25" y2="60" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="46" x2="16" y2="54" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="46" x2="34" y2="54" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="60" x2="16" y2="75" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="25" y1="60" x2="34" y2="75" stroke="#4B5563" strokeWidth="2.5" />
                    
                    {/* Middle figure with dress (female) */}
                    <circle cx="60" cy="30" r="9" fill="#BE185D" />
                    <line x1="60" y1="39" x2="60" y2="55" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="46" x2="51" y2="54" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="46" x2="69" y2="54" stroke="#BE185D" strokeWidth="2.5" />
                    {/* Dress/skirt */}
                    <line x1="51" y1="55" x2="48" y2="75" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="69" y1="55" x2="72" y2="75" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="48" y1="75" x2="72" y2="75" stroke="#BE185D" strokeWidth="2" />
                    
                    <circle cx="95" cy="30" r="9" fill="#94A3B8" />
                    <line x1="95" y1="39" x2="95" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="46" x2="86" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="46" x2="104" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="60" x2="86" y2="75" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="95" y1="60" x2="104" y2="75" stroke="#94A3B8" strokeWidth="2.5" />
                  </svg>
                )}
                {item.pronoun === 'то' && (
                  <svg className="w-24 h-24" viewBox="0 0 120 100">
                    {/* То - three figures (left dark, middle pink, right gray) */}
                    {/* Left figure - dark */}
                    <circle cx="30" cy="30" r="10" fill="#4B5563" />
                    <line x1="30" y1="40" x2="30" y2="62" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="30" y1="47" x2="20" y2="55" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="30" y1="47" x2="40" y2="55" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="30" y1="62" x2="20" y2="78" stroke="#4B5563" strokeWidth="2.5" />
                    <line x1="30" y1="62" x2="40" y2="78" stroke="#4B5563" strokeWidth="2.5" />
                    
                    {/* Middle figure - pink/rose */}
                    <circle cx="60" cy="30" r="10" fill="#BE185D" />
                    <line x1="60" y1="40" x2="60" y2="62" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="47" x2="50" y2="55" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="47" x2="70" y2="55" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="62" x2="50" y2="78" stroke="#BE185D" strokeWidth="2.5" />
                    <line x1="60" y1="62" x2="70" y2="78" stroke="#BE185D" strokeWidth="2.5" />
                    
                    {/* Right figure - gray */}
                    <circle cx="90" cy="30" r="10" fill="#94A3B8" />
                    <line x1="90" y1="40" x2="90" y2="62" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="90" y1="47" x2="80" y2="55" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="90" y1="47" x2="100" y2="55" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="90" y1="62" x2="80" y2="78" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="90" y1="62" x2="100" y2="78" stroke="#94A3B8" strokeWidth="2.5" />
                  </svg>
                )}
                {item.pronoun === 'ние' && (
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    {/* Two figures */}
                    <circle cx="35" cy="25" r="10" fill="#374151" />
                    <line x1="35" y1="35" x2="35" y2="60" stroke="#374151" strokeWidth="2.5" />
                    <line x1="35" y1="43" x2="25" y2="51" stroke="#374151" strokeWidth="2.5" />
                    <line x1="35" y1="43" x2="45" y2="51" stroke="#374151" strokeWidth="2.5" />
                    <line x1="35" y1="60" x2="25" y2="75" stroke="#374151" strokeWidth="2.5" />
                    <line x1="35" y1="60" x2="45" y2="75" stroke="#374151" strokeWidth="2.5" />
                    
                    <circle cx="65" cy="25" r="10" fill="#374151" />
                    <line x1="65" y1="35" x2="65" y2="60" stroke="#374151" strokeWidth="2.5" />
                    <line x1="65" y1="43" x2="55" y2="51" stroke="#374151" strokeWidth="2.5" />
                    <line x1="65" y1="43" x2="75" y2="51" stroke="#374151" strokeWidth="2.5" />
                    <line x1="65" y1="60" x2="55" y2="75" stroke="#374151" strokeWidth="2.5" />
                    <line x1="65" y1="60" x2="75" y2="75" stroke="#374151" strokeWidth="2.5" />
                  </svg>
                )}
                {item.pronoun === 'вие' && (
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    {/* Two figures */}
                    <circle cx="35" cy="25" r="10" fill="#1F2937" />
                    <line x1="35" y1="35" x2="35" y2="60" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="35" y1="43" x2="25" y2="51" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="35" y1="43" x2="45" y2="51" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="35" y1="60" x2="25" y2="75" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="35" y1="60" x2="45" y2="75" stroke="#1F2937" strokeWidth="2.5" />
                    
                    <circle cx="65" cy="25" r="10" fill="#1F2937" />
                    <line x1="65" y1="35" x2="65" y2="60" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="65" y1="43" x2="55" y2="51" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="65" y1="43" x2="75" y2="51" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="65" y1="60" x2="55" y2="75" stroke="#1F2937" strokeWidth="2.5" />
                    <line x1="65" y1="60" x2="75" y2="75" stroke="#1F2937" strokeWidth="2.5" />
                  </svg>
                )}
                {item.pronoun === 'те' && (
                  <svg className="w-28 h-24" viewBox="0 0 120 100">
                    {/* Multiple figures */}
                    <circle cx="25" cy="28" r="9" fill="#111827" />
                    <line x1="25" y1="37" x2="25" y2="58" stroke="#111827" strokeWidth="2" />
                    <line x1="25" y1="44" x2="17" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="25" y1="44" x2="33" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="25" y1="58" x2="17" y2="72" stroke="#111827" strokeWidth="2" />
                    <line x1="25" y1="58" x2="33" y2="72" stroke="#111827" strokeWidth="2" />
                    
                    <circle cx="50" cy="28" r="9" fill="#111827" />
                    <line x1="50" y1="37" x2="50" y2="58" stroke="#111827" strokeWidth="2" />
                    <line x1="50" y1="44" x2="42" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="50" y1="44" x2="58" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="50" y1="58" x2="42" y2="72" stroke="#111827" strokeWidth="2" />
                    <line x1="50" y1="58" x2="58" y2="72" stroke="#111827" strokeWidth="2" />
                    
                    <circle cx="75" cy="28" r="9" fill="#111827" />
                    <line x1="75" y1="37" x2="75" y2="58" stroke="#111827" strokeWidth="2" />
                    <line x1="75" y1="44" x2="67" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="75" y1="44" x2="83" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="75" y1="58" x2="67" y2="72" stroke="#111827" strokeWidth="2" />
                    <line x1="75" y1="58" x2="83" y2="72" stroke="#111827" strokeWidth="2" />
                    
                    <circle cx="100" cy="28" r="9" fill="#111827" />
                    <line x1="100" y1="37" x2="100" y2="58" stroke="#111827" strokeWidth="2" />
                    <line x1="100" y1="44" x2="92" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="100" y1="44" x2="108" y2="51" stroke="#111827" strokeWidth="2" />
                    <line x1="100" y1="58" x2="92" y2="72" stroke="#111827" strokeWidth="2" />
                    <line x1="100" y1="58" x2="108" y2="72" stroke="#111827" strokeWidth="2" />
                  </svg>
                )}
              </div>
            )}

            {/* Pronoun label */}
            <p className="text-center text-xl md:text-2xl font-bold text-gray-800">
              {item.pronoun}
            </p>

            {/* Optional description */}
            {item.description && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Note at bottom */}
      <div className="mt-8 p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
        <p className="text-sm text-gray-700 text-center italic">
          {subtitle || 'Граматика – Лични местоимения'}
        </p>
      </div>
    </div>
  );
}
