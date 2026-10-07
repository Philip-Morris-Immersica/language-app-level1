/**
 * Grading audit — for every graded exercise in every lesson and test, build the
 * state a perfect learner would save and assert that `gradeExercise` returns
 * full marks. Also reports exercises whose `points` differ from their content
 * units (scored proportionally, but worth knowing about).
 *
 *   npx tsx scripts/audit-grading.ts            # summary + problems
 *   npx tsx scripts/audit-grading.ts --verbose  # every graded exercise
 *
 * Exit code 1 when any graded exercise can't reach full marks.
 */

import { LEVELS, getLevelDef, loadLesson, loadTest } from '../src/content/registry';
import { classifyExercise, contentUnits, gradeExercise, validationKeys } from '../src/lib/grading';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEx = any;

const verbose = process.argv.includes('--verbose');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function perfectState(ex: AnyEx): Record<string, any> {
  switch (ex.type) {
    case 'workbook_fill_blank':
      return {
        isSubmitted: true,
        blankValidation: Object.fromEntries(
          ex.sentences.map((s: AnyEx, i: number) => [
            i,
            s.isExample || !s.blanks?.length ? null : s.correctAnswers.map(() => true),
          ]),
        ),
      };
    case 'true_false':
      return {
        checked: true,
        answers: Object.fromEntries(ex.sentences.map((s: AnyEx) => [s.id, s.isTrue ? 'true' : 'false'])),
      };
    case 'multiple_choice':
    case 'audio_choice':
      return {
        isSubmitted: true,
        selectedAnswers: Object.fromEntries(ex.questions.map((q: AnyEx, i: number) => [i, q.correctIndex])),
      };
    case 'word_order':
    case 'a2-word-order':
      return {
        isSubmitted: true,
        questionStates: ex.questions.map((q: AnyEx) => ({ built: q.correctSentence.split(' ') })),
      };
    case 'syllable_blocks':
      return { completed: Object.fromEntries(ex.puzzles.map((p: AnyEx) => [p.id, true])) };
    case 'dialogue_builder':
    case 'a2-dialogue-builder':
      return {
        sectionStates: Object.fromEntries(
          ex.sections.map((s: AnyEx) => [
            s.id,
            { checked: true, correct: true, items: s.sentences.map((text: string, i: number) => ({ id: `${s.id}-${i}`, text })) },
          ]),
        ),
      };
    case 'fill_with_images':
      return {
        isSubmitted: true,
        answers: Object.fromEntries(
          ex.sentences.map((s: AnyEx) => [s.id, { verb1: s.correctVerb1, verb2: s.correctVerb2, country: s.country }]),
        ),
      };
    case 'word_search':
      return { isSubmitted: true, foundWords: ex.hiddenWords?.length ? ex.hiddenWords : ex.correctWords };
    case 'b1-select-words':
      return {
        submitted: true,
        picks: Object.fromEntries(
          ex.sentences.map((s: AnyEx) => [s.id, s.words.filter((w: AnyEx) => w.correct).map((w: AnyEx) => w.text)]),
        ),
      };
    case 'a2-free-fill':
      return { isSubmitted: true, answers: Object.fromEntries(ex.sentences.map((_: AnyEx, i: number) => [i, 'x'])) };
    case 'connect_dots':
    case 'alphabet_maze':
      return { finished: true, isSubmitted: true };
    default: {
      const keys = validationKeys(ex) ?? Array.from({ length: contentUnits(ex) }, (_, i) => String(i));
      return { isSubmitted: true, validation: Object.fromEntries(keys.map((k) => [k, true])) };
    }
  }
}

interface Problem {
  where: string;
  id: string;
  type: string;
  msg: string;
}

const failures: Problem[] = [];
const pointMismatches: Problem[] = [];
let gradedCount = 0;

function auditExercise(where: string, ex: AnyEx) {
  if (classifyExercise(ex) !== 'graded') return;
  gradedCount++;
  const grade = gradeExercise(ex, perfectState(ex));
  const units = contentUnits(ex);
  if (!grade || !grade.submitted || grade.total === 0 || grade.correct !== grade.total) {
    failures.push({ where, id: ex.id, type: ex.type, msg: `perfect state graded ${JSON.stringify(grade)}` });
  } else if (verbose) {
    console.log(`  ok  ${where} ${ex.id} ${ex.type} units=${units} points=${ex.points}`);
  }
  if (units !== ex.points) {
    pointMismatches.push({ where, id: ex.id, type: ex.type, msg: `points=${ex.points} units=${units}` });
  }
}

async function main() {
  for (const lvl of LEVELS) {
    const def = getLevelDef(lvl);
    for (const meta of def.lessonsMetadata) {
      const lesson = await loadLesson(meta.id);
      if (!lesson) continue;
      for (const ex of [...(lesson.exercises ?? []), ...(lesson.workbookExercises ?? [])]) {
        auditExercise(meta.id, ex);
      }
    }
    for (const testId of Object.keys(def.testLoaders)) {
      const test = await loadTest(testId);
      if (!test) continue;
      for (const section of test.sections) {
        let sectionPoints = 0;
        for (const ex of section.exercises) {
          sectionPoints += ex.points ?? 0;
          auditExercise(`${testId}/${section.name}`, ex);
        }
        if (sectionPoints !== section.maxPoints) {
          failures.push({
            where: testId,
            id: section.id,
            type: 'section',
            msg: `sum(points)=${sectionPoints} != maxPoints=${section.maxPoints}`,
          });
        }
      }
    }
  }

  console.log(`\nGraded exercises audited: ${gradedCount}`);
  console.log(`Failures (cannot reach full marks): ${failures.length}`);
  for (const f of failures) console.log(`  FAIL ${f.where} ${f.id} ${f.type}: ${f.msg}`);
  console.log(`Points != content units (scored proportionally): ${pointMismatches.length}`);
  for (const m of pointMismatches) console.log(`  warn ${m.where} ${m.id} ${m.type}: ${m.msg}`);

  process.exit(failures.length > 0 ? 1 : 0);
}

main();
