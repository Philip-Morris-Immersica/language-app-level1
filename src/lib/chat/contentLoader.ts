import { loadLesson, loadTest, getLessonLevel } from '@/content/registry';
import type { Exercise } from '@/content/types';

export interface ExerciseSummary {
  id: string;
  type: string;
  /** Short visible title or fallback like "Exercise 5". */
  title: string;
  /** The Bulgarian instruction shown to the user. */
  instruction: string;
  /** Compact JSON-string representation of items with their correct answers. */
  answers: string;
  points?: number;
}

/** A test section's exercises, grouped under its section name. */
export interface TestSectionSummary {
  id: string;
  name: string;
  maxPoints: number;
  exercises: ExerciseSummary[];
}

/**
 * Unified chat context returned for BOTH lesson and test pages.
 * `kind` discriminates so the prompt builder can apply different rules
 * (e.g. test answers must NOT be exposed to the model).
 */
export type ChatPageContext = LessonChatContext | TestChatContext;

export interface LessonChatContext {
  kind: 'lesson';
  lessonId: string;
  lessonTitle: string;
  level: string;
  grammarTopics: string[];
  vocabularyWords: string[];
  /** Exercises with correct answers — only scoring/checkable ones. */
  exercises: ExerciseSummary[];
}

export interface TestChatContext {
  kind: 'test';
  testId: string;
  testTitle: string;
  level: string;
  totalPoints: number;
  introText?: string;
  /** Test sections (e.g. Listening / Reading / Grammar / Writing). */
  sections: TestSectionSummary[];
  /** Flat exercise list (all sections combined) for quick lookups. */
  exercises: ExerciseSummary[];
}

/** Hard cap so the prompt doesn't explode for huge lessons. */
const MAX_EXERCISES = 40;
const MAX_ITEMS_PER_EXERCISE = 30;
const MAX_TEXT_LEN = 140;

function truncate(s: string, n = MAX_TEXT_LEN): string {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function clip<T>(arr: T[], n = MAX_ITEMS_PER_EXERCISE): T[] {
  return arr.length > n ? [...arr.slice(0, n), ('…+' + (arr.length - n) + ' more') as unknown as T] : arr;
}

/**
 * Produce a compact list of {question → correctAnswer(s)} entries for a single exercise.
 * Returns null when the exercise has no "correct answers" to display (pure vocabulary /
 * presentation / open-ended). The bot only needs answers for checkable exercises.
 */
function summarizeAnswers(ex: Exercise): string | null {
  switch (ex.type) {
    case 'fill_in_blank': {
      const items = clip(
        ex.sentences.map((s, i) => `${i + 1}. "${truncate(s.text, 80)}" → ${s.correctAnswers.join(' / ')}`)
      );
      return items.join('\n');
    }
    case 'workbook_fill_blank': {
      const items = clip(
        ex.sentences
          .filter((s) => !s.isExample)
          .map((s, i) => `${i + 1}. "${truncate(s.text, 80)}" → ${s.correctAnswers.join(' / ')}`)
      );
      return items.join('\n');
    }
    case 'multiple_choice': {
      const items = clip(
        ex.questions.map(
          (q, i) =>
            `${i + 1}. "${truncate(q.question, 80)}" [${q.options.join(' | ')}] → ${q.options[q.correctIndex]}`
        )
      );
      return items.join('\n');
    }
    case 'match_pairs': {
      const items = clip(ex.pairs.map((p) => `${p.left} → ${p.correctRight}`));
      return items.join('\n');
    }
    case 'dropdown_match': {
      const items = clip(
        ex.questions
          .filter((q) => !q.isExample)
          .map((q, i) => {
            const alts = q.alternateCorrectAnswers?.length ? ' / ' + q.alternateCorrectAnswers.join(' / ') : '';
            return `${i + 1}. "${truncate(q.left, 80)}" → ${q.correctAnswer}${alts}`;
          })
      );
      return items.join('\n');
    }
    case 'drag_to_columns': {
      const items = ex.columns.map((c) => `${c.title}: ${c.correctItems.join(', ')}`);
      return items.join('\n');
    }
    case 'word_order': {
      const items = clip(
        ex.questions.map((q, i) => `${i + 1}. [${q.words.join(', ')}] → "${q.correctSentence}"`)
      );
      return items.join('\n');
    }
    case 'syllable_blocks': {
      const items = clip(ex.puzzles.map((p) => `[${p.syllables.join(', ')}] → ${p.correctWord}`));
      return items.join('\n');
    }
    case 'letter_choice': {
      const items = clip(ex.puzzles.map((p) => `${p.word} → letters: ${p.correctLetters.join(', ')}`));
      return items.join('\n');
    }
    case 'word_search': {
      const words = ex.hiddenWords ?? ex.correctWords ?? [];
      if (!words.length) return null;
      return `Words to find: ${words.join(', ')}`;
    }
    case 'true_false': {
      const items = clip(
        ex.sentences
          .filter((s) => !s.isExample)
          .map((s) => `"${truncate(s.text, 100)}" → ${s.isTrue ? 'TRUE' : 'FALSE'}`)
      );
      return items.join('\n');
    }
    case 'verb_conjugation': {
      const items = clip(
        ex.conjugations.filter((c) => !c.isExample).map((c) => `${c.pronoun} → ${c.correctForm}`)
      );
      return items ? `verb "${ex.verb}":\n` + items.join('\n') : null;
    }
    case 'image_labeling': {
      const items = clip(ex.images.map((im, i) => `image ${i + 1} → ${im.correctLabel}`));
      return items.join('\n');
    }
    case 'number_writing': {
      const items = clip(ex.numbers.map((n) => `${n.numeral} → ${n.correctWord}`));
      return items.join('\n');
    }
    case 'fill_with_images': {
      const items = clip(
        ex.sentences.map(
          (s) =>
            `${s.pronoun} ${s.name}, ${s.country}: verbs → ${s.correctVerb1}, ${s.correctVerb2}`
        )
      );
      return items.join('\n');
    }
    case 'dialogue_builder': {
      const items = clip(
        ex.sections.map((s) => `[${s.id}] correct order: ${s.sentences.join(' | ')}`)
      );
      return items.join('\n');
    }
    case 'table_fill': {
      const lines: string[] = [];
      for (const t of ex.tables) {
        lines.push(`Table "${t.name}" cols [${t.columns.join(', ')}]:`);
        for (const r of t.rows) {
          const cellAnswers = r.cells.map((c) => c.correctAnswers.join('/')).join(' | ');
          lines.push(`  ${r.label}: ${cellAnswers}`);
        }
      }
      return clip(lines).join('\n');
    }
    case 'listening': {
      const items = clip(
        ex.questions.map((q, i) => `${i + 1}. "${truncate(q.question, 80)}" → ${q.correctAnswer}`)
      );
      return items.join('\n');
    }
    case 'text_comprehension': {
      const items = clip(
        ex.questions.map((q, i) => `${i + 1}. "${truncate(q.question, 80)}" → ${q.correctAnswer}`)
      );
      return items.join('\n');
    }
    case 'reading_text': {
      if (ex.checklist?.items?.length) {
        const items = clip(
          ex.checklist.items.map((it) => `"${truncate(it.text, 100)}" → ${it.isTrue ? 'TRUE' : 'FALSE'}`)
        );
        return `Checklist:\n` + items.join('\n');
      }
      return null;
    }
    case 'alphabet_maze': {
      const path = ex.correctPath.map((p) => `(${p.row},${p.col})`).join(' → ');
      return `Path: ${path}`;
    }
    case 'connect_dots': {
      const ordered = [...ex.dots].sort((a, b) => a.position - b.position).map((d) => d.label);
      return `Order: ${ordered.join(' → ')}`;
    }
    // Presentation-only types — no "correct answer" to teach
    case 'illustrated_cards':
    case 'dialogues':
    case 'grammar_visual':
    case 'grammar_examples':
    case 'grammar_table':
    case 'personal_choice':
    case 'dialogue_reading':
      return null;
    default:
      return null;
  }
}

function summarizeExercises(all: Exercise[]): ExerciseSummary[] {
  const out: ExerciseSummary[] = [];
  let counter = 1;
  for (const ex of all) {
    if (out.length >= MAX_EXERCISES) break;
    const answers = summarizeAnswers(ex);
    if (!answers) {
      counter++;
      continue;
    }
    const title = (ex as { title?: string }).title || `Exercise ${counter}`;
    out.push({
      id: ex.id,
      type: ex.type,
      title,
      instruction: truncate(ex.instruction ?? '', 200),
      answers,
      points: ex.points,
    });
    counter++;
  }
  return out;
}

export async function getLessonChatContext(lessonId: string): Promise<LessonChatContext | null> {
  const [lessonData, level] = await Promise.all([
    loadLesson(lessonId),
    Promise.resolve(getLessonLevel(lessonId)),
  ]);

  if (!lessonData || !level) return null;

  const grammarTopics = lessonData.grammarTopics ?? [];
  const vocabularyWords = lessonData.vocabulary ?? [];

  const allExercises: Exercise[] = [
    ...(lessonData.exercises ?? []),
    ...(lessonData.workbookExercises ?? []),
  ];

  return {
    kind: 'lesson',
    lessonId,
    lessonTitle: lessonData.title,
    level,
    grammarTopics,
    vocabularyWords: vocabularyWords.slice(0, 30),
    exercises: summarizeExercises(allExercises),
  };
}

/**
 * Loads a test's metadata + exercises for use in the chat system prompt.
 *
 * IMPORTANT: For tests the `answers` field on each ExerciseSummary is still
 * populated, but the prompt builder is responsible for STRIPPING it before
 * sending to the LLM (TEST POLICY = no answer reveals). We keep it here so
 * other callers (e.g. admin preview tool) can show the full data.
 */
export async function getTestChatContext(testId: string): Promise<TestChatContext | null> {
  const testData = await loadTest(testId);
  if (!testData) return null;

  // Derive level from the test ID (e.g. "test-a1-1" → "a1")
  const m = testId.match(/^test-(a1|a2|b1|b2)-/i);
  const level = (m?.[1] ?? 'a1').toLowerCase();

  const sections: TestSectionSummary[] = (testData.sections ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    maxPoints: s.maxPoints,
    exercises: summarizeExercises(s.exercises ?? []),
  }));

  // Flat list across all sections (for quick lookups in the prompt)
  const flatExercises: ExerciseSummary[] = sections.flatMap((s) => s.exercises);

  return {
    kind: 'test',
    testId,
    testTitle: testData.title,
    level,
    totalPoints: testData.totalPoints,
    introText: testData.introText,
    sections,
    exercises: flatExercises,
  };
}
