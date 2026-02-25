'use client';

import type { Exercise } from '@/content/types';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { FillInBlank } from './FillInBlank';
import { MultipleChoice } from './MultipleChoice';
import { MatchPairs } from './MatchPairs';
import { WordOrder } from './WordOrder';
import { ImageLabeling } from './ImageLabeling';
import { IllustratedCards } from './IllustratedCards';
import { SyllableBlocks } from './SyllableBlocks';
import { GrammarVisual } from './GrammarVisual';
import { WordSearch } from './WordSearch';
import { GrammarWithExamples } from './GrammarWithExamples';
import { Dialogues } from './Dialogues';
import { DialogueBuilder } from './DialogueBuilder';
import { DropdownMatch } from './DropdownMatch';
import { LetterChoice } from './LetterChoice';
import { FillWithFlags } from './FillWithFlags';
import { WorkbookFillBlank } from './WorkbookFillBlank';
import { GrammarTable } from './GrammarTable';

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

interface ExerciseHeaderProps {
  title: string;
  instruction: string;
}

function ExerciseHeader({ title, instruction }: ExerciseHeaderProps) {
  const translatedTitle = useTranslate(title);
  const translatedInstruction = useTranslate(instruction);
  return (
    <div className="mb-5 pb-4 border-b border-gray-100">
      <h3 className="text-[#0279C3] font-bold text-xl md:text-2xl leading-tight">
        {translatedTitle}
      </h3>
      {instruction && (
        <p className="text-gray-500 text-sm md:text-base mt-1.5 leading-snug">
          {translatedInstruction}
        </p>
      )}
    </div>
  );
}

export function ExerciseRenderer({ exercise, onComplete, exerciseNumber }: ExerciseRendererProps) {
  const number = exerciseNumber ?? exercise.order;
  const t = useT();

  // Base title: use custom title or generic "УПРАЖНЕНИЕ", strip any trailing sub-number
  const baseTitle = (exercise.title ?? t('exercise.prefix')).replace(/\s+\d+$/, '');
  // Sequential prefix: "1. НОВИ ДУМИ", "8. ГРАМАТИКА", "3. УПРАЖНЕНИЕ"
  const resolvedTitle = number != null ? `${number}. ${baseTitle}` : baseTitle;

  function wrap(component: React.ReactNode) {
    return (
      <div>
        <ExerciseHeader title={resolvedTitle} instruction={exercise.instruction} />
        {component}
      </div>
    );
  }

  switch (exercise.type) {
    case 'fill_in_blank':
      return wrap(<FillInBlank exercise={exercise} onComplete={onComplete} />);

    case 'workbook_fill_blank':
      return wrap(
        <WorkbookFillBlank
          sentences={exercise.sentences}
          layout={exercise.layout}
          onComplete={onComplete}
        />
      );

    case 'multiple_choice':
      return wrap(<MultipleChoice exercise={exercise} onComplete={onComplete} />);

    case 'match_pairs':
      return wrap(<MatchPairs exercise={exercise} onComplete={onComplete} />);

    case 'dropdown_match':
      return wrap(
        <DropdownMatch
          questions={exercise.questions}
          onComplete={onComplete}
        />
      );

    case 'letter_choice':
      return wrap(
        <LetterChoice
          puzzles={exercise.puzzles}
          onComplete={onComplete}
        />
      );

    case 'word_order':
      return wrap(<WordOrder exercise={exercise} onComplete={onComplete} />);

    case 'image_labeling':
      return wrap(<ImageLabeling exercise={exercise} onComplete={onComplete} />);

    case 'illustrated_cards':
      return wrap(<IllustratedCards exercise={exercise} onComplete={onComplete} />);

    case 'syllable_blocks':
      return wrap(
        <SyllableBlocks
          puzzles={exercise.puzzles}
          onComplete={onComplete}
        />
      );

    case 'word_search':
      return wrap(
        <WordSearch
          letterString={exercise.letterString}
          correctWords={exercise.correctWords}
          distractorWords={exercise.distractorWords}
          hint={exercise.hint}
          onComplete={onComplete}
        />
      );

    case 'grammar_visual':
      return wrap(
        <GrammarVisual
          subtitle={exercise.subtitle}
          pronouns={exercise.pronouns}
        />
      );

    case 'grammar_examples':
      return wrap(
        <GrammarWithExamples
          subtitle={exercise.subtitle}
          examples={exercise.examples}
        />
      );

    case 'grammar_table':
      return wrap(
        <GrammarTable
          tableTitle={exercise.tableTitle}
          columns={exercise.columns}
          rows={exercise.rows}
          notes={exercise.notes}
          subtitle={exercise.subtitle}
        />
      );

    case 'dialogues':
      return wrap(
        <Dialogues
          subtitle={exercise.subtitle}
          audioUrl={exercise.audioUrl}
          sections={exercise.sections}
        />
      );

    case 'dialogue_builder':
      return wrap(
        <DialogueBuilder
          sections={exercise.sections}
        />
      );

    case 'fill_with_images':
      return wrap(
        <FillWithFlags
          modelText={exercise.modelText}
          modelFlag={exercise.modelFlag}
          sentences={exercise.sentences}
          verbOptions={exercise.verbOptions}
          countryOptions={exercise.countryOptions}
          onComplete={onComplete}
        />
      );

    case 'verb_conjugation':
    case 'number_writing':
    case 'dialogue_reading':
    case 'text_comprehension':
    case 'listening':
      return wrap(
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            Exercise type &quot;{exercise.type}&quot; not yet implemented.
          </p>
        </div>
      );

    default:
      return (
        <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6">
          <p className="text-gray-600">Unknown exercise type</p>
        </div>
      );
  }
}
