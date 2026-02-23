'use client';

import type { Exercise } from '@/content/types';
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
import { DropdownMatch } from './DropdownMatch';
import { LetterChoice } from './LetterChoice';
import { FillWithFlags } from './FillWithFlags';
import { WorkbookFillBlank } from './WorkbookFillBlank';

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function ExerciseRenderer({ exercise, onComplete, exerciseNumber }: ExerciseRendererProps) {
  const number = exerciseNumber || exercise.order;
  
  switch (exercise.type) {
    case 'fill_in_blank':
      return <FillInBlank exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;

    case 'workbook_fill_blank':
      return (
        <WorkbookFillBlank
          exerciseNumber={number}
          instruction={exercise.instruction}
          sentences={exercise.sentences}
          layout={exercise.layout}
          onComplete={onComplete}
        />
      );
    
    case 'multiple_choice':
      return <MultipleChoice exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'match_pairs':
      return <MatchPairs exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'dropdown_match':
      return (
        <DropdownMatch
          exerciseNumber={number}
          instruction={exercise.instruction}
          questions={exercise.questions}
          onComplete={onComplete}
        />
      );
    
    case 'letter_choice':
      return (
        <LetterChoice
          exerciseNumber={number}
          instruction={exercise.instruction}
          puzzles={exercise.puzzles}
          onComplete={onComplete}
        />
      );
    
    case 'word_order':
      return <WordOrder exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'image_labeling':
      return <ImageLabeling exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'illustrated_cards':
      return <IllustratedCards exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'syllable_blocks':
      return (
        <SyllableBlocks
          exerciseNumber={number}
          instruction={exercise.instruction}
          puzzles={exercise.puzzles}
          onComplete={onComplete}
        />
      );
    
    case 'word_search':
      return (
        <WordSearch
          exerciseNumber={number}
          instruction={exercise.instruction}
          letterString={exercise.letterString}
          correctWords={exercise.correctWords}
          distractorWords={exercise.distractorWords}
          hint={exercise.hint}
          onComplete={onComplete}
        />
      );
    
    case 'grammar_visual':
      return (
        <GrammarVisual
          order={number}
          title={exercise.title}
          subtitle={exercise.subtitle}
          pronouns={exercise.pronouns}
        />
      );
    
    case 'grammar_examples':
      return (
        <GrammarWithExamples
          order={number}
          title={exercise.title}
          subtitle={exercise.subtitle}
          examples={exercise.examples}
        />
      );
    
    case 'dialogues':
      return (
        <Dialogues
          order={number}
          title={exercise.title}
          subtitle={exercise.subtitle}
          audioUrl={exercise.audioUrl}
          sections={exercise.sections}
        />
      );
    
    // Placeholder for other exercise types
    case 'fill_with_images':
      return (
        <FillWithFlags
          exerciseNumber={number}
          instruction={exercise.instruction}
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
      return (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            Exercise type &quot;{exercise.type}&quot; not yet implemented.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            {exercise.instruction}
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
