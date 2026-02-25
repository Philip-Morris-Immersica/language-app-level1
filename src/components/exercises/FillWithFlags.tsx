'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface SentencePair {
  id: string;
  pronoun: string;
  name: string;
  country: string;
  flagUrl: string;
  correctVerb1: string;
  correctVerb2: string;
}

interface FillWithFlagsProps {
  modelText?: string;
  modelFlag?: string;
  sentences: SentencePair[];
  verbOptions: string[];
  countryOptions: string[];
  onComplete?: (correct: boolean, score: number) => void;
}

export function FillWithFlags({
  modelText,
  modelFlag,
  sentences,
  verbOptions,
  countryOptions,
  onComplete,
}: FillWithFlagsProps) {
  const t = useT();
  const [answers, setAnswers] = useState<Record<string, { verb1: string; verb2: string; country: string }>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVerbChange = (sentenceId: string, verbNum: 1 | 2, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [sentenceId]: {
        ...prev[sentenceId],
        [`verb${verbNum}`]: value,
      }
    }));
  };

  const handleCountryChange = (sentenceId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [sentenceId]: {
        ...prev[sentenceId],
        country: value,
      }
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    let correctCount = 0;
    const totalCount = sentences.length * 3; // 2 verbs + 1 country per sentence

    sentences.forEach(sentence => {
      const answer = answers[sentence.id] || {};
      if (answer.verb1?.toLowerCase() === sentence.correctVerb1.toLowerCase()) correctCount++;
      if (answer.verb2?.toLowerCase() === sentence.correctVerb2.toLowerCase()) correctCount++;
      if (answer.country?.toLowerCase() === sentence.country.toLowerCase()) correctCount++;
    });

    if (onComplete) {
      const score = (correctCount / totalCount) * 100;
      onComplete(correctCount === totalCount, score);
    }
  };

  const isAnswerCorrect = (sentenceId: string, field: 'verb1' | 'verb2' | 'country') => {
    if (!isSubmitted) return null;
    const answer = answers[sentenceId] || {};
    const sentence = sentences.find(s => s.id === sentenceId);
    if (!sentence) return null;

    if (field === 'verb1') {
      return answer.verb1?.toLowerCase() === sentence.correctVerb1.toLowerCase();
    } else if (field === 'verb2') {
      return answer.verb2?.toLowerCase() === sentence.correctVerb2.toLowerCase();
    } else {
      return answer.country?.toLowerCase() === sentence.country.toLowerCase();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      {/* Model */}
      {modelText && (
        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-[#8FC412] flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600 mb-1">{t('exercise.model')}</p>
            <p className="text-base md:text-lg text-gray-800">{modelText}</p>
          </div>
          {modelFlag && (
            <div className="relative w-16 h-12 flex-shrink-0 border border-gray-300 rounded overflow-hidden">
              <Image
                src={modelFlag}
                alt="Model flag"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Sentences */}
      <div className="space-y-4">
        {sentences.map((sentence, index) => {
          const answer = answers[sentence.id] || {};
          const verb1Correct = isAnswerCorrect(sentence.id, 'verb1');
          const verb2Correct = isAnswerCorrect(sentence.id, 'verb2');
          const countryCorrect = isAnswerCorrect(sentence.id, 'country');

          return (
            <div
              key={sentence.id}
              className="bg-white rounded-xl border-2 border-gray-200 p-4 flex flex-col gap-2"
            >
              {/* Header row: number + flag */}
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#0279C3]">{index + 1}.</span>
                <div className="relative w-10 h-7 flex-shrink-0 border border-gray-300 rounded overflow-hidden">
                  <Image
                    src={sentence.flagUrl}
                    alt={sentence.country}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600">{sentence.pronoun} – {sentence.name}</span>
              </div>

              {/* First sentence line */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm md:text-base text-gray-800">{sentence.pronoun}</span>
                
                <Select
                  value={answer.verb1 || ''}
                  onValueChange={(value) => handleVerbChange(sentence.id, 1, value)}
                  disabled={isSubmitted}
                >
                  <SelectTrigger 
                    className={`w-16 md:w-20 h-8 text-sm ${
                      isSubmitted && verb1Correct === false
                        ? 'border-red-500 bg-red-50'
                        : isSubmitted && verb1Correct === true
                        ? 'border-green-500 bg-green-50'
                        : ''
                    }`}
                  >
                    <SelectValue placeholder="___" />
                  </SelectTrigger>
                  <SelectContent>
                    {verbOptions.map((verb) => (
                      <SelectItem key={verb} value={verb}>{verb}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-sm md:text-base text-gray-800">{sentence.name}.</span>
              </div>

              {/* Second sentence line */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm md:text-base text-gray-800">{sentence.pronoun}</span>

                <Select
                  value={answer.verb2 || ''}
                  onValueChange={(value) => handleVerbChange(sentence.id, 2, value)}
                  disabled={isSubmitted}
                >
                  <SelectTrigger 
                    className={`w-16 md:w-20 h-8 text-sm ${
                      isSubmitted && verb2Correct === false
                        ? 'border-red-500 bg-red-50'
                        : isSubmitted && verb2Correct === true
                        ? 'border-green-500 bg-green-50'
                        : ''
                    }`}
                  >
                    <SelectValue placeholder="___" />
                  </SelectTrigger>
                  <SelectContent>
                    {verbOptions.map((verb) => (
                      <SelectItem key={verb} value={verb}>{verb}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-sm md:text-base text-gray-800">от</span>

                <Select
                  value={answer.country || ''}
                  onValueChange={(value) => handleCountryChange(sentence.id, value)}
                  disabled={isSubmitted}
                >
                  <SelectTrigger 
                    className={`w-28 md:w-32 h-8 text-sm ${
                      isSubmitted && countryCorrect === false
                        ? 'border-red-500 bg-red-50'
                        : isSubmitted && countryCorrect === true
                        ? 'border-green-500 bg-green-50'
                        : ''
                    }`}
                  >
                    <SelectValue placeholder="_______" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-sm md:text-base text-gray-800">.</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
      )}

      {/* Results */}
      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
          <div className="flex items-center gap-2">
            {sentences.every(s => {
              const answer = answers[s.id] || {};
              return (
                answer.verb1?.toLowerCase() === s.correctVerb1.toLowerCase() &&
                answer.verb2?.toLowerCase() === s.correctVerb2.toLowerCase() &&
                answer.country?.toLowerCase() === s.country.toLowerCase()
              );
            }) ? (
              <>
                <Check className="w-6 h-6 text-green-600" />
                <p className="text-base font-semibold text-green-800">
                  {t('exercise.allCorrect')}
                </p>
              </>
            ) : (
              <>
                <X className="w-6 h-6 text-orange-600" />
                <p className="text-base font-semibold text-orange-800">
                  {t('exercise.reviewErrors')}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
