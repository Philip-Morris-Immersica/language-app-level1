'use client';

import { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExercisePersistenceContext } from '@/contexts/ExercisePersistenceContext';
import { useTranslate } from '@/i18n/useTranslate';
import { useT } from '@/i18n/useT';
import type { TestData, TestSection, Exercise } from '@/content/types';

function TranslatedText({ text }: { text: string }) {
  const translated = useTranslate(text);
  return <>{translated}</>;
}

function getExerciseScore(exercise: Exercise, savedState: unknown): number | null {
  const s = savedState as any;
  if (!s) return null;

  switch (exercise.type) {
    case 'true_false': {
      if (!s.checked) return null;
      const ex = exercise as any;
      let correct = 0;
      for (const sentence of ex.sentences) {
        if ((s.answers?.[sentence.id] === 'true') === sentence.isTrue) correct++;
      }
      return correct;
    }

    case 'workbook_fill_blank': {
      if (!s.isSubmitted) return null;
      const v = s.validation as Record<string, boolean | null> | undefined;
      if (!v) return null;
      return Object.values(v).filter(val => val === true).length;
    }

    case 'multiple_choice': {
      if (!s.isSubmitted) return null;
      const ex = exercise as any;
      let correct = 0;
      for (let i = 0; i < ex.questions.length; i++) {
        if (s.selectedAnswers?.[i] === ex.questions[i].correctIndex) correct++;
      }
      return correct;
    }

    case 'word_order': {
      if (!s.isSubmitted) return null;
      const ex = exercise as any;
      let correct = 0;
      const states = s.questionStates as any[] | undefined;
      if (!states) return null;
      for (let i = 0; i < ex.questions.length; i++) {
        const qs = states[i];
        if (qs?.built?.join(' ') === ex.questions[i].correctSentence) correct++;
      }
      return correct;
    }

    case 'syllable_blocks': {
      const completed = s.completed as Record<string, boolean> | undefined;
      if (!completed) return null;
      return Object.values(completed).filter(Boolean).length;
    }

    default:
      return null;
  }
}

function getSectionScore(
  section: TestSection,
  savedStates: Record<string, unknown>
): { earned: number; total: number; completed: boolean } {
  let earned = 0;
  let total = section.maxPoints;
  let allCompleted = true;

  for (const ex of section.exercises) {
    if (!ex.points || ex.points === 0) continue;
    const score = getExerciseScore(ex, savedStates[ex.id]);
    if (score === null) {
      allCompleted = false;
    } else {
      earned += score;
    }
  }

  return { earned, total, completed: allCompleted };
}

function getTier(pct: number): 'low' | 'mid' | 'high' {
  if (pct < 50) return 'low';
  if (pct < 76) return 'mid';
  return 'high';
}

function buildTierMessages(testTitle: string): Record<'low' | 'mid' | 'high', string> {
  // Extract "урок 4" / "уроци 1, 2 и 3" from the title "Тест – ..."
  const lessonLabel = testTitle.replace(/^Тест\s*[–-]\s*/i, '');
  return {
    low: `Нужна е още практика. Прегледайте ${lessonLabel} отново и обърнете внимание на по-слабите компоненти.`,
    mid: 'Добро начало! Имате основни познания, но трябва да упражнявате повече някои компоненти.',
    high: `Отлично! Справяте се много добре с материала от ${lessonLabel}. Продължавайте напред!`,
  };
}

const tierColors: Record<'low' | 'mid' | 'high', { bg: string; border: string; text: string; bar: string }> = {
  low:  { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    bar: 'bg-red-400' },
  mid:  { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700',  bar: 'bg-amber-400' },
  high: { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  bar: 'bg-green-500' },
};

interface TestScoreSummaryProps {
  testData: TestData;
}

export function TestScoreSummary({ testData }: TestScoreSummaryProps) {
  const { savedStates } = useExercisePersistenceContext();
  const t = useT();
  const [expanded, setExpanded] = useState(true);

  const sectionScores = testData.sections.map(section => ({
    section,
    ...getSectionScore(section, savedStates),
  }));

  const allCompleted = sectionScores.every(s => s.completed || s.total === 0);
  const totalEarned = sectionScores.reduce((sum, s) => sum + s.earned, 0);
  const totalMax = testData.totalPoints;
  const pct = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const tier = getTier(pct);
  const colors = tierColors[tier];
  const tierMessages = buildTierMessages(testData.title);

  // Show as soon as any exercise state is saved (even before submission)
  const hasAnyState = Object.keys(savedStates).length > 0;

  if (!hasAnyState) {
    return null;
  }

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 md:p-8 space-y-5`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <BarChart3 className={`w-6 h-6 ${colors.text}`} />
          <h3 className={`text-xl font-bold ${colors.text}`}>
            <TranslatedText text="Резултат от теста" />
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-2xl font-bold ${colors.text}`}>
            {totalEarned}/{totalMax}
          </span>
          {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Overall bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-600">{pct}%</span>
              {!allCompleted && (
                <span className="text-gray-400 italic text-xs">
                  <TranslatedText text="Не всички упражнения са завършени" />
                </span>
              )}
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Per-section breakdown */}
          <div className="space-y-3">
            {sectionScores
              .filter(s => s.total > 0)
              .map(({ section, earned, total, completed }) => {
                const sPct = total > 0 ? Math.round((earned / total) * 100) : 0;
                const needsWork = sPct < 50;
                return (
                  <div key={section.id} className="flex items-center gap-3">
                    <span className={`text-sm font-medium w-48 truncate ${needsWork ? 'text-red-600' : 'text-gray-700'}`}>
                      <TranslatedText text={section.name.replace('КОМПОНЕНТ ', '')} />
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${needsWork ? 'bg-red-400' : 'bg-green-400'}`}
                        style={{ width: `${sPct}%` }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-14 text-right ${needsWork ? 'text-red-600' : 'text-gray-700'}`}>
                      {earned}/{total}
                    </span>
                    {!completed && (
                      <span className="text-[10px] text-gray-400">⏳</span>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Tier feedback */}
          <div className={`rounded-lg border ${colors.border} bg-white/60 p-4`}>
            <p className={`text-sm leading-relaxed ${colors.text}`}>
              <TranslatedText text={tierMessages[tier]} />
            </p>
          </div>

          {/* Weak areas hint */}
          {sectionScores.some(s => s.total > 0 && s.completed && Math.round((s.earned / s.total) * 100) < 50) && (
            <p className="text-xs text-gray-500 italic">
              <TranslatedText text="Компонентите в червено се нуждаят от допълнителна практика." />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
