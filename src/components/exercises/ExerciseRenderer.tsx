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
import { WordSearchGrid } from './WordSearchGrid';
import { GrammarWithExamples } from './GrammarWithExamples';
import { Dialogues } from './Dialogues';
import { DialogueBuilder } from './DialogueBuilder';
import { DropdownMatch } from './DropdownMatch';
import { DragToColumns } from './DragToColumns';
import { LetterChoice } from './LetterChoice';
import { FillWithFlags } from './FillWithFlags';
import { WorkbookFillBlank } from './WorkbookFillBlank';
import { GrammarTable } from './GrammarTable';
import { ReadingText } from './ReadingText';
import { TrueFalse } from './TrueFalse';
import { PersonalChoice } from './PersonalChoice';
import { ConnectDots } from './ConnectDots';
import { AlphabetMaze } from './AlphabetMaze';
import { TableFill } from './TableFill';
import { GrammarHighlight } from './GrammarHighlight';
import { MapWithLabels } from './MapWithLabels';
import { A2_CUSTOM_RENDERERS, type CustomExerciseRenderer } from '@/content/a2/exercise-components';
import { B1_CUSTOM_RENDERERS } from '@/content/b1/exercise-components';

/**
 * Custom exercise renderers contributed by per-level domains.
 * Looked up BEFORE the built-in switch so levels can add new types (or
 * level-specific variants of existing types) without editing this file. See
 * `src/content/a2/exercise-components.ts` and `src/content/b1/exercise-components.ts`
 * for the per-level entries.
 */
const CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
  ...A2_CUSTOM_RENDERERS,
  ...B1_CUSTOM_RENDERERS,
  // Future levels (B2) can spread their maps here.
};

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

interface ExerciseHeaderProps {
  title: string;
  instruction: string;
  instructionKey?: string;
  subtitle?: string;
  prominentSubtitle?: boolean;
}

/** Converts **bold** markers in instruction strings to <strong> elements. */
function renderInstructionText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function ExerciseHeader({ title, instruction, instructionKey, subtitle, prominentSubtitle }: ExerciseHeaderProps) {
  const t = useT();
  const translatedTitle = useTranslate(title);
  const translatedInstruction = useTranslate(instruction);
  const translatedSubtitle = useTranslate(subtitle ?? '');
  const displayInstruction = instructionKey ? t(instructionKey) : translatedInstruction;
  return (
    <div className="mb-5 pb-4 border-b border-gray-100">
      <h3 className="text-[#0072BC] font-bold text-xl md:text-2xl leading-tight">
        {translatedTitle}
      </h3>
      {subtitle && (
        <p className={prominentSubtitle
          ? 'text-gray-500 text-sm md:text-base mt-1.5 leading-snug'
          : 'text-gray-400 text-xs mt-1'
        }>
          {translatedSubtitle}
        </p>
      )}
      {instruction && (
        <p className="text-gray-500 text-sm md:text-base mt-1.5 leading-snug">
          {renderInstructionText(displayInstruction)}
        </p>
      )}
    </div>
  );
}

export function ExerciseRenderer({ exercise, onComplete, exerciseNumber }: ExerciseRendererProps) {
  const number = exerciseNumber ?? exercise.order;
  const t = useT();
  const translatedInstruction = useTranslate(exercise.instruction);

  // Base title: use custom title or generic "УПРАЖНЕНИЕ", strip any trailing sub-number
  const baseTitle = (exercise.title ?? t('exercise.prefix')).replace(/\s+\d+$/, '');
  // Sequential prefix: "1. НОВИ ДУМИ", "8. ГРАМАТИКА", "3. УПРАЖНЕНИЕ"
  const resolvedTitle = number != null ? `${number}. ${baseTitle}` : baseTitle;

  /** Some child components only call onComplete(isCorrect); normalize to (correct, score). */
  function wrapOneArgOnComplete(scoreIfCorrect: number) {
    if (!onComplete) return undefined;
    return (isCorrect: boolean) => onComplete(isCorrect, isCorrect ? scoreIfCorrect : 0);
  }

  const subtitle = 'subtitle' in exercise ? (exercise as any).subtitle as string | undefined : undefined;
  const prominentSubtitle = exercise.prominentSubtitle;

  function wrap(component: React.ReactNode) {
    const gh = exercise.grammarHighlight;
    const ghAfter = gh && exercise.grammarHighlightAfterBody;
    const ghBefore = gh && !exercise.grammarHighlightAfterBody;
    const hideHeader = 'hideHeader' in exercise && exercise.hideHeader === true;
    // title === '' means "continuation section" — hide header + number entirely
    const showHeader = exercise.title !== '' && !hideHeader;
    return (
      <div>
        {showHeader && <ExerciseHeader title={resolvedTitle} instruction={exercise.instruction} instructionKey={exercise.instructionKey} subtitle={subtitle} prominentSubtitle={prominentSubtitle} />}
        {hideHeader && exercise.instruction && (
          <p className="text-gray-500 text-sm md:text-base mb-5 leading-snug">
            {renderInstructionText(
              exercise.instructionKey ? t(exercise.instructionKey) : translatedInstruction,
            )}
          </p>
        )}
        {ghBefore && (
          <div className="mb-5">
            <GrammarHighlight highlight={gh} exerciseId={exercise.id} />
          </div>
        )}
        {exercise.mapLabels && exercise.mapLabels.length > 0 && (
          <MapWithLabels
            imageUrl={(exercise as any).imageUrl ?? ''}
            labels={exercise.mapLabels}
            legendItems={exercise.mapLegend}
            legendTitle="Легенда"
          />
        )}
        {component}
        {ghAfter && (
          <div className="mt-8">
            <GrammarHighlight highlight={gh} exerciseId={exercise.id} />
          </div>
        )}
      </div>
    );
  }

  // Custom (per-level) renderer takes priority. Levels register their renderers
  // in their own `exercise-components.ts` so this file never needs editing.
  const CustomRenderer = CUSTOM_RENDERERS[exercise.type];
  if (CustomRenderer) {
    return wrap(
      <CustomRenderer
        exercise={exercise as unknown as { id: string; type: string; [key: string]: unknown }}
        onComplete={onComplete}
        exerciseId={exercise.id}
      />,
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
          columnSplitAt={exercise.columnSplitAt}
          hideSentenceNumbers={exercise.hideSentenceNumbers}
          columnLabels={exercise.columnLabels}
          imageUrl={exercise.imageUrl}
          images={exercise.images}
          headerImages={exercise.headerImages}
          listeningText={exercise.listeningText}
          onComplete={onComplete}
          exerciseId={exercise.id}
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
          imageUrl={exercise.imageUrl}
          images={exercise.images}
          listeningText={exercise.listeningText}
          onComplete={onComplete}
          exerciseId={exercise.id}
        />
      );

    case 'drag_to_columns':
      return wrap(
        <DragToColumns
          imageUrl={exercise.imageUrl}
          items={exercise.items}
          columns={exercise.columns}
          onComplete={wrapOneArgOnComplete(exercise.points ?? exercise.items.length)}
        />
      );

    case 'letter_choice':
      return wrap(
        <LetterChoice
          puzzles={exercise.puzzles.map((p) => ({
            ...p,
            availableLetters: p.availableLetters ?? p.correctLetters,
          }))}
          onComplete={onComplete}
          exerciseId={exercise.id}
        />
      );

    case 'word_order':
      return wrap(<WordOrder exercise={exercise} onComplete={onComplete} />);

    case 'image_labeling':
      return wrap(<ImageLabeling exercise={exercise} onComplete={onComplete} />);

    case 'illustrated_cards':
      return wrap(<IllustratedCards exercise={exercise} onComplete={onComplete} exerciseId={exercise.id} />);

    case 'syllable_blocks':
      return wrap(
        <SyllableBlocks
          puzzles={exercise.puzzles}
          imageUrl={exercise.imageUrl}
          columns={exercise.columns}
          onComplete={onComplete}
          exerciseId={exercise.id}
        />
      );

    case 'word_search':
      // Use new 2D grid component when hiddenWords is present
      if (exercise.hiddenWords && exercise.hiddenWords.length > 0) {
        return wrap(
          <WordSearchGrid
            hiddenWords={exercise.hiddenWords}
            grid={exercise.grid}
            allowDiagonal={exercise.allowDiagonal}
            onComplete={onComplete}
            exerciseId={exercise.id}
          />
        );
      }
      return wrap(
        <WordSearch
          letterString={exercise.letterString}
          correctWords={exercise.correctWords}
          distractorWords={exercise.distractorWords}
          hint={exercise.hint}
          onComplete={onComplete}
          exerciseId={exercise.id}
        />
      );

    case 'grammar_visual':
      return wrap(
        <GrammarVisual
          subtitle={exercise.subtitle}
          pronouns={exercise.pronouns}
          exerciseId={exercise.id}
        />
      );

    case 'grammar_examples':
      return wrap(
        <GrammarWithExamples
          subtitle={exercise.subtitle}
          examples={exercise.examples}
          disableTts={exercise.disableTts}
          showLikeDislike={exercise.showLikeDislike}
          layout={exercise.layout}
          exerciseId={exercise.id}
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
          exerciseId={exercise.id}
          boldColumns={exercise.boldColumns}
          widePronouns={exercise.widePronouns}
        />
      );

    case 'dialogues':
      return wrap(
        <Dialogues
          subtitle={exercise.subtitle}
          audioUrl={exercise.audioUrl}
          imageUrl={exercise.imageUrl}
          images={exercise.images}
          displayLayout={exercise.displayLayout}
          sections={exercise.sections}
          exerciseId={exercise.id}
        />
      );

    case 'dialogue_builder':
      return wrap(
        <DialogueBuilder
          sections={exercise.sections}
          exerciseId={exercise.id}
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
          exerciseId={exercise.id}
        />
      );

    case 'reading_text':
      return wrap(
        <ReadingText
          audioUrl={exercise.audioUrl}
          songUrl={exercise.songUrl}
          disableParagraphAudio={exercise.disableParagraphAudio}
          textTitle={exercise.textTitle}
          images={exercise.images}
          imageFlashcards={exercise.imageFlashcards}
          imageColumns={exercise.imageColumns}
          imageEqualHeight={exercise.imageEqualHeight}
          paragraphs={exercise.paragraphs}
          paragraphTranslations={exercise.paragraphTranslations}
          showDictionary={exercise.showDictionary}
          hideText={exercise.hideText}
          noTranslation={exercise.noTranslation}
          checklist={exercise.checklist}
          exerciseId={exercise.id}
          onComplete={wrapOneArgOnComplete(
            exercise.checklist?.items.length ?? exercise.points ?? 1,
          )}
        />
      );

    case 'true_false':
      return wrap(
        <TrueFalse
          sentences={exercise.sentences}
          imageUrl={exercise.imageUrl}
          model={exercise.model}
          onComplete={onComplete}
          exerciseId={exercise.id}
        />
      );

    case 'personal_choice':
      return wrap(
        <PersonalChoice
          exerciseId={exercise.id}
          imageUrls={exercise.imageUrls}
          model={exercise.model}
          items={exercise.items}
          blankOptions={exercise.blankOptions}
          onComplete={onComplete}
        />
      );

    case 'connect_dots':
      return wrap(
        <ConnectDots
          dots={exercise.dots}
          onComplete={wrapOneArgOnComplete(exercise.points ?? exercise.dots.length)}
        />
      );

    case 'alphabet_maze':
      return wrap(
        <AlphabetMaze
          grid={exercise.grid}
          correctPath={exercise.correctPath}
          startImageUrl={exercise.startImageUrl}
          endImageUrl={exercise.endImageUrl}
          onComplete={wrapOneArgOnComplete(exercise.points ?? exercise.correctPath.length)}
        />
      );

    case 'table_fill':
      return wrap(
        <TableFill
          tables={exercise.tables}
          paragraphs={exercise.paragraphs}
          onComplete={onComplete}
          exerciseId={exercise.id}
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
