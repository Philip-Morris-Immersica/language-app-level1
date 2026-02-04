'use client';

import type { Exercise } from '@/content/types';
import { FillInBlank } from './FillInBlank';
import { MultipleChoice } from './MultipleChoice';
import { MatchPairs } from './MatchPairs';
import { WordOrder } from './WordOrder';
import { ImageLabeling } from './ImageLabeling';

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
    
    case 'multiple_choice':
      return <MultipleChoice exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'match_pairs':
      return <MatchPairs exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'word_order':
      return <WordOrder exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    case 'image_labeling':
      return <ImageLabeling exercise={exercise} onComplete={onComplete} exerciseNumber={number} />;
    
    // Placeholder for other exercise types
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
