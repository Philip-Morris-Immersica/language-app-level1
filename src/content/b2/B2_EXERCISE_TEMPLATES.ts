/**
 * Copy-paste templates for B2-only exercise types.
 *
 * Shared interactions remain in `src/content/shared/EXERCISE_TEMPLATES.ts`.
 */

import type {
  B2OpinionChoiceExercise,
  B2SelectWordsInlineExercise,
} from './types';

export const TEMPLATE_b2_select_words_scored = {
  id: 'b2-lXX-ex-NN',
  type: 'b2-select-words-inline',
  title: 'УПРАЖНЕНИЕ N',
  instruction: 'Натиснете правилните думи в текста.',
  instructionKey: 'b2.exercise.selectWordsScored',
  order: 1,
  points: 1,
  mode: 'scored',
  blocks: [
    {
      id: 'paragraph-1',
      tokens: [
        { id: 't1', text: 'Черно', correct: true },
        { id: 't2', text: 'море', trailing: ', ', correct: true },
        { id: 't3', text: 'е' },
        { id: 't4', text: 'красиво', trailing: '.' },
      ],
    },
  ],
} satisfies B2SelectWordsInlineExercise;

export const TEMPLATE_b2_select_words_free = {
  id: 'b2-lXX-ex-NN',
  type: 'b2-select-words-inline',
  title: 'УПРАЖНЕНИЕ N',
  instruction: 'Подчертайте непознатите думи.',
  instructionKey: 'b2.exercise.selectWordsFree',
  order: 1,
  points: 0,
  mode: 'free',
  blocks: [
    {
      id: 'paragraph-1',
      tokens: [
        { id: 't1', text: 'Примерен' },
        { id: 't2', text: 'текст', trailing: '.' },
      ],
    },
  ],
} satisfies B2SelectWordsInlineExercise;

export const TEMPLATE_b2_opinion_choice = {
  id: 'b2-lXX-ex-NN',
  type: 'b2-opinion-choice',
  title: 'УПРАЖНЕНИЕ N',
  instruction: 'Изберете отговора, който най-добре изразява Вашето мнение.',
  instructionKey: 'b2.exercise.opinionChoice',
  order: 1,
  points: 0,
  questions: [
    {
      id: 'q1',
      statement: 'Соларните панели са добра инвестиция.',
      options: [
        { id: 'a', text: 'Да.' },
        { id: 'b', text: 'Само в определени случаи.' },
        { id: 'c', text: 'Не.' },
        { id: 'd', text: 'Нямам мнение.' },
      ],
    },
  ],
} satisfies B2OpinionChoiceExercise;
