/**
 * Single source of truth: which Bulgarian display strings of a lesson/test are
 * sent to `useTranslate()` at runtime. Used by BOTH `scripts/pretranslate.ts`
 * (to translate them) and `scripts/check-translation-coverage.ts` (to verify
 * that nothing falls back to live Google Translate).
 */
import type { LessonData, TestData, Exercise } from '@/content/shared/types';

// ---------------------------------------------------------------------------
// Field extraction — one Bulgarian string per hit, with a path (for the
// human-readable context outline fed to the model alongside each batch).
// ---------------------------------------------------------------------------
export interface FieldHit {
  path: string;
  text: string;
  /** Grammar-terminology fields feed the Step 0 glossary pass; everything else is "content". */
  isGlossary: boolean;
}

/** True if the string contains at least one letter (skips pure numbers/punctuation/dashes). */
export function hasLetters(s: string): boolean {
  return /[a-zA-Zа-яА-ЯёЁіїєґІЇЄҮ]/.test(s);
}

/** Same transform `MultipleChoice.tsx` applies before calling useTranslate() on an option label. */
export function stripEmojiAndParen(text: string): string {
  return text
    .replace(/^[\p{Emoji}\p{Emoji_Presentation}\s]+/u, '')
    .replace(/\s*\(.*\)$/, '')
    .trim();
}

export function collectFromExercise(ex: Exercise, hits: FieldHit[], pathPrefix: string) {
  const add = (path: string, text: string | undefined | null, isGlossary = false) => {
    if (!text) return;
    const trimmed = text.trim();
    if (!trimmed || !hasLetters(trimmed)) return;
    hits.push({ path: `${pathPrefix}${path}`, text: trimmed, isGlossary });
  };

  if (ex.title) {
    const titleBase = ex.title.replace(/\s+\d+$/, '');
    add('title', titleBase);
  }
  if (!ex.instructionKey) add('instruction', ex.instruction);
  if ('subtitle' in ex && (ex as { subtitle?: string }).subtitle) {
    add('subtitle', (ex as { subtitle?: string }).subtitle);
  }
  if (ex.grammarHighlight && !ex.grammarHighlight.textKey) {
    add('grammarHighlight.text', ex.grammarHighlight.text);
  }

  switch (ex.type) {
    case 'grammar_table': {
      add('tableTitle', ex.tableTitle, true);
      (ex.columns ?? []).forEach((c, i) => add(`columns[${i}]`, c, true));
      (ex.notes ?? []).forEach((n, i) => add(`notes[${i}]`, n, true));
      (ex.rows ?? []).forEach((row, ri) => {
        if (row.pronunciations) return; // pre-filled — GrammarTable shows that map instead
        add(`rows[${ri}].pronoun`, row.pronoun, true);
        (row.cells ?? []).forEach((cell, ci) => {
          const clean = cell.replace(/\*\*/g, '').trim();
          if (clean && clean !== '-') add(`rows[${ri}].cells[${ci}]`, clean, true);
        });
      });
      break;
    }
    case 'table_fill': {
      (ex.tables ?? []).forEach((table, ti) => {
        add(`tables[${ti}].name`, table.name, true);
        (table.columns ?? []).forEach((c, ci) => add(`tables[${ti}].columns[${ci}]`, c, true));
      });
      (ex.paragraphs ?? []).forEach((p, pi) => add(`paragraphs[${pi}].text`, p.text));
      break;
    }
    case 'multiple_choice': {
      (ex.questions ?? []).forEach((q, qi) => {
        // MultipleChoice.tsx → <TranslatedLabel text={question.question} /> (same emoji/paren strip).
        add(`questions[${qi}].question`, stripEmojiAndParen(q.question ?? ''));
        (q.options ?? []).forEach((opt, oi) => {
          const stripped = stripEmojiAndParen(opt);
          add(`questions[${qi}].options[${oi}]`, stripped);
        });
      });
      break;
    }
    case 'grammar_examples': {
      (ex.examples ?? []).forEach((example, ei) => {
        add(`examples[${ei}].text`, example.text);
        add(`examples[${ei}].subtext`, example.subtext);
        add(`examples[${ei}].label`, example.label);
        (example.lines ?? []).forEach((line, li) => {
          if (line === '') return;
          // Matches GrammarWithExamples.tsx: strip **bold** markers, then a leading ✓/✗ marker.
          const plain = line.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^\s*[✓✗]\s*/, '').trim();
          add(`examples[${ei}].lines[${li}]`, plain);
        });
      });
      break;
    }
    case 'grammar_visual': {
      (ex.pronouns ?? []).forEach((p, pi) => {
        add(`pronouns[${pi}].pronoun`, p.pronoun);
        add(`pronouns[${pi}].description`, p.description);
      });
      break;
    }
    case 'dialogues': {
      (ex.sections ?? []).forEach((section, si) => {
        (section.lines ?? []).forEach((line, li) => {
          add(`sections[${si}].lines[${li}].text`, line.text);
        });
      });
      break;
    }
    case 'reading_text': {
      add('textTitle', ex.textTitle);
      (ex.paragraphs ?? []).forEach((p, pi) => add(`paragraphs[${pi}]`, p));
      (ex.images ?? []).forEach((img, ii) => add(`images[${ii}].label`, img.label));
      if (ex.checklist?.instruction) add('checklist.instruction', ex.checklist.instruction);
      break;
    }
    case 'illustrated_cards': {
      add('headerCaption', ex.headerCaption);
      (ex.cards ?? []).forEach((card, ci) => {
        add(`cards[${ci}].label`, card.label);
        (card.sublabels ?? []).forEach((sub, si) => add(`cards[${ci}].sublabels[${si}]`, sub));
      });
      break;
    }
    case 'personal_choice': {
      if (ex.model) {
        add('model.question', ex.model.question);
        add('model.positiveAnswer', ex.model.positiveAnswer);
        add('model.negativeAnswer', ex.model.negativeAnswer);
      }
      (ex.items ?? []).forEach((item, ii) => {
        add(`items[${ii}].question`, item.question);
        // PersonalChoice.tsx shows the completed sentence (template with `___` filled) once answered.
        add(`items[${ii}].positive`, item.positiveTemplate?.replace('___', item.positiveBlank ?? ''));
        add(`items[${ii}].negative`, item.negativeTemplate?.replace('___', item.negativeBlank ?? ''));
      });
      break;
    }
    case 'drag_to_columns': {
      // DragToColumns.tsx → ColumnTitle translates `column.title`.
      ((ex as { columns?: { title?: string }[] }).columns ?? []).forEach((c, ci) => add(`columns[${ci}].title`, c.title));
      break;
    }
  }

  collectFromLevelSpecific(ex as unknown as LooseExercise, add);
}

// ---------------------------------------------------------------------------
// Level-specific components (B1/A2 forks of the shared components). Their
// `InlineTranslation` keys differ from the shared ones, so each is mirrored here.
// Keep in sync with scripts/check-translation-coverage.ts.
// ---------------------------------------------------------------------------
type LooseExercise = Record<string, any> & { type: string };
type AddFn = (path: string, text: string | undefined | null, isGlossary?: boolean) => void;

/** `**bold**` markers are never part of a translation key. */
function stripBold(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, '$1');
}

/**
 * Level of the unit being extracted (set by extractLesson/extractTest from the id).
 * B1 registers its fork components under the SHARED type names too (see
 * b1/exercise-components.ts: `grammar_examples`, `grammar_table`), so for B1 those
 * shared types must also produce the B1 component's keys.
 */
let currentLevel: 'a1' | 'a2' | 'b1' | 'b2' = 'a1';

function levelFromId(id: string): typeof currentLevel {
  const m = id.match(/^(?:test-)?(a1|a2|b1|b2)(?:-|$)/);
  return (m?.[1] as typeof currentLevel) ?? 'a1';
}

const B1_TYPE_ALIASES: Record<string, string> = {
  grammar_examples: 'b1-grammar-examples',
  grammar_table: 'b1-grammar-table',
};

function collectFromLevelSpecific(ex: LooseExercise, add: AddFn) {
  const effectiveType = currentLevel === 'b1' ? (B1_TYPE_ALIASES[ex.type] ?? ex.type) : ex.type;
  switch (effectiveType) {
    case 'b1-grammar-table': {
      add('tableTitle', ex.tableTitle, true);
      add('pronounHeader', ex.pronounHeader, true);
      (ex.columns ?? []).forEach((c: string, i: number) => add(`columns[${i}]`, c, true));
      (ex.notes ?? []).forEach((n: string, i: number) => add(`notes[${i}]`, n, true));
      const addRows = (rows: any[] | undefined, prefix: string) => {
        (rows ?? []).forEach((row, ri) => {
          if (row.pronunciations) return;
          add(`${prefix}rows[${ri}].pronoun`, row.pronoun, true);
          (row.cells ?? []).forEach((cell: string, ci: number) => {
            const clean = cell.replace(/\*\*/g, '').trim();
            if (clean && clean !== '-') add(`${prefix}rows[${ri}].cells[${ci}]`, clean, true);
          });
        });
      };
      addRows(ex.rows, '');
      (ex.panels ?? []).forEach((panel: any, pi: number) => {
        add(`panels[${pi}].tableTitle`, panel.tableTitle, true);
        add(`panels[${pi}].pronounHeader`, panel.pronounHeader, true);
        (panel.columns ?? []).forEach((c: string, ci: number) => add(`panels[${pi}].columns[${ci}]`, c, true));
        addRows(panel.rows, `panels[${pi}].`);
      });
      break;
    }
    case 'b1-grammar-examples': {
      // GrammarExamples.tsx → ONE key per example: lines joined with a space (bold stripped), else `text`.
      (ex.examples ?? []).forEach((example: any, ei: number) => {
        const lines: string[] = (example.lines ?? []).filter(Boolean);
        const joined = lines.map(stripBold).join(' ').trim();
        add(`examples[${ei}].joined`, joined || example.text);
      });
      break;
    }
    case 'b1-illustrated-cards-grouped':
    case 'a2-wide-cards': {
      (ex.cards ?? []).forEach((card: any, ci: number) => {
        if (card.translations) return; // pre-filled per-language map wins in InlineTranslation
        add(`cards[${ci}].label`, card.label);
      });
      break;
    }
    case 'a2-dialogues': {
      (ex.sections ?? []).forEach((section: any, si: number) => {
        (section.lines ?? []).forEach((line: any, li: number) => {
          if (line.translations) return;
          add(`sections[${si}].lines[${li}].text`, line.text);
        });
      });
      break;
    }
    case 'a2-grammar-examples': {
      // A2GrammarExamples.tsx → each line (bold stripped) and `text` (bold stripped) separately.
      (ex.examples ?? []).forEach((example: any, ei: number) => {
        if (example.translations) return;
        add(`examples[${ei}].text`, stripBold(example.text ?? ''));
        (example.lines ?? []).filter(Boolean).forEach((line: string, li: number) => {
          add(`examples[${ei}].lines[${li}]`, stripBold(line));
        });
      });
      break;
    }
  }
}

export interface ExtractedUnit {
  id: string;
  /** All display strings in this unit, deduped, in source order — used as LLM context. */
  allTexts: string[];
  /** Subset of `allTexts` flagged as grammar terminology (feeds the glossary pass). */
  glossaryTexts: string[];
  /** Human-readable outline (path: text) fed to the model as context for this unit. */
  outline: string;
}

export function buildUnit(id: string, hits: FieldHit[]): ExtractedUnit {
  const seen = new Set<string>();
  const allTexts: string[] = [];
  const glossaryTexts: string[] = [];
  const outlineLines: string[] = [];
  for (const hit of hits) {
    outlineLines.push(`${hit.path}: ${hit.text}`);
    if (seen.has(hit.text)) continue;
    seen.add(hit.text);
    allTexts.push(hit.text);
    if (hit.isGlossary) glossaryTexts.push(hit.text);
  }
  return { id, allTexts, glossaryTexts, outline: outlineLines.join('\n') };
}

export function extractLesson(lessonId: string, lesson: LessonData): ExtractedUnit {
  currentLevel = levelFromId(lessonId);
  const hits: FieldHit[] = [];
  const add = (path: string, text: string | undefined | null, isGlossary = false) => {
    if (!text) return;
    const trimmed = text.trim();
    if (!trimmed || !hasLetters(trimmed)) return;
    hits.push({ path, text: trimmed, isGlossary });
  };

  add('lesson.title', lesson.title);
  add('lesson.description', lesson.description);
  (lesson.grammarTopics ?? []).forEach((topic, i) => add(`lesson.grammarTopics[${i}]`, topic));

  if (lesson.content?.introduction) add('content.introduction', lesson.content.introduction);

  (lesson.content?.vocabulary ?? []).forEach((v, i) => add(`content.vocabulary[${i}].bulgarian`, v.bulgarian));

  (lesson.content?.culturalNotes ?? []).forEach((note, i) => {
    if (typeof note.title === 'string') add(`content.culturalNotes[${i}].title`, note.title);
    if (typeof note.content === 'string') add(`content.culturalNotes[${i}].content`, note.content);
  });

  [...(lesson.exercises ?? []), ...(lesson.workbookExercises ?? [])].forEach((ex, i) => {
    collectFromExercise(ex, hits, `exercises[${i}].`);
  });

  return buildUnit(lessonId, hits);
}

export function extractTest(testId: string, test: TestData): ExtractedUnit {
  currentLevel = levelFromId(testId);
  const hits: FieldHit[] = [];
  const add = (path: string, text: string | undefined | null, isGlossary = false) => {
    if (!text) return;
    const trimmed = text.trim();
    if (!trimmed || !hasLetters(trimmed)) return;
    hits.push({ path, text: trimmed, isGlossary });
  };

  add('test.title', test.title);
  if (test.introText) add('test.introText', test.introText);

  test.sections.forEach((section, si) => {
    add(`sections[${si}].name`, section.name);
    if (section.instructions) add(`sections[${si}].instructions`, section.instructions);
    section.exercises.forEach((ex, ei) => collectFromExercise(ex, hits, `sections[${si}].exercises[${ei}].`));
  });

  return buildUnit(testId, hits);
}
