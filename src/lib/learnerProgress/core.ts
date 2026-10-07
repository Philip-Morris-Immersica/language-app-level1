/**
 * Progress core — pure computation of lesson / test / level progress.
 *
 * Definitions (the same everywhere: sidebar, level map, home, profile, admin,
 * reports, chatbot):
 *
 *   • countable exercise — anything the learner can press (graded or not)
 *   • touched            — the learner clicked anywhere inside the exercise
 *                          (or it has saved answers)
 *   • graded exercise    — has points and a «Провери»-style check
 *   • progress %         — touched countable ÷ countable; 100 once completed
 *   • lesson completed   — every graded exercise has been checked at least once
 *                          (lessons without graded exercises: everything touched)
 *   • test completed     — every graded exercise in the test has been checked
 *   • accuracy           — correct units ÷ units over the checked exercises
 *   • test points        — current answers, proportional per exercise
 *                          (`lib/testScoring.ts`); best-ever points kept too
 *   • level %            — average of all lesson and test % in the level,
 *                          untouched items counting as 0
 *   • level completed    — all lessons completed and all tests completed
 *   • current level      — highest level with any progress
 *
 * No DB access here — `store.ts` feeds it rows.
 */

import {
  LEVELS,
  LESSON_LEVEL_MAP,
  TEST_LEVEL_MAP,
  getLevelDef,
  loadLesson,
  loadTest,
  type Level,
} from '@/content/registry';
import type { Exercise, TestData } from '@/content/types';
import {
  GRADING_ENGINE_VERSION,
  classifyExercise,
  contentUnits,
  gradeExercise,
  hasUserInput,
  isRequiredForCompletion,
  type ExerciseKind,
} from '@/lib/grading';
import { getTestScore } from '@/lib/testScoring';

export { GRADING_ENGINE_VERSION };

// ── Item definitions (content side) ─────────────────────────────────────────

export interface ExerciseDef {
  id: string;
  kind: ExerciseKind;
  points: number;
  units: number;
  /** Must be checked for the lesson/test to count as completed. */
  required: boolean;
  exercise: Exercise;
}

export interface ItemDefinition {
  itemId: string;
  isTest: boolean;
  level: Level;
  number: number;
  title: string;
  exercises: ExerciseDef[];
  countable: number;
  /** Exercises required for completion (graded, excluding COMPLETION_OPTIONAL_TYPES). */
  graded: number;
  /** Changes whenever the set of countable / graded exercises changes. */
  contentSig: string;
  test: TestData | null;
}

const defCache = new Map<string, Promise<ItemDefinition | null>>();

export function isTestId(itemId: string): boolean {
  return itemId in TEST_LEVEL_MAP;
}

export function getItemLevel(itemId: string): Level | undefined {
  return LESSON_LEVEL_MAP[itemId] ?? TEST_LEVEL_MAP[itemId];
}

async function buildDefinition(itemId: string): Promise<ItemDefinition | null> {
  const level = getItemLevel(itemId);
  if (!level) return null;
  const isTest = isTestId(itemId);

  let exercises: Exercise[] = [];
  let number = 0;
  let title = itemId;
  let test: TestData | null = null;
  if (isTest) {
    test = await loadTest(itemId);
    if (!test) return null;
    exercises = test.sections.flatMap((s) => s.exercises);
    number = test.number;
    title = test.title;
  } else {
    const lesson = await loadLesson(itemId);
    if (!lesson) return null;
    exercises = [...(lesson.exercises ?? []), ...(lesson.workbookExercises ?? [])];
    const meta = getLevelDef(level).lessonsMetadata.find((m) => m.id === itemId);
    number = meta?.number ?? lesson.number ?? 0;
    title = meta?.title ?? lesson.title ?? itemId;
  }

  const defs: ExerciseDef[] = exercises.map((ex) => ({
    id: ex.id,
    kind: classifyExercise(ex as never),
    points: (ex as { points?: number }).points ?? 0,
    units: contentUnits(ex as never),
    required: isRequiredForCompletion(ex as never),
    exercise: ex,
  }));
  const countable = defs.filter((d) => d.kind !== 'none').length;
  const graded = defs.filter((d) => d.required).length;
  const totalUnits = defs.reduce((n, d) => n + (d.kind === 'graded' ? d.units : 0), 0);
  const gradedAll = defs.filter((d) => d.kind === 'graded').length;

  return {
    itemId,
    isTest,
    level,
    number,
    title,
    exercises: defs,
    countable,
    graded,
    contentSig: `${countable}:${graded}:${gradedAll}:${totalUnits}:${test?.totalPoints ?? 0}`,
    test,
  };
}

/** Content definition for a lesson or test id (cached per process). */
export function getItemDefinition(itemId: string): Promise<ItemDefinition | null> {
  let p = defCache.get(itemId);
  if (!p) {
    p = buildDefinition(itemId);
    defCache.set(itemId, p);
  }
  return p;
}

export interface LevelItems {
  level: Level;
  lessons: ItemDefinition[];
  tests: ItemDefinition[];
}

/** All items of a level that have something to do (empty placeholders skipped). */
export async function getLevelItems(level: Level): Promise<LevelItems> {
  const def = getLevelDef(level);
  const lessons = (await Promise.all(def.lessonsMetadata.map((m) => getItemDefinition(m.id)))).filter(
    (d): d is ItemDefinition => !!d && d.countable > 0,
  );
  const tests = (await Promise.all(Object.keys(def.testLoaders).map((id) => getItemDefinition(id)))).filter(
    (d): d is ItemDefinition => !!d && d.countable > 0,
  );
  return { level, lessons, tests };
}

export async function getAllLevelItems(): Promise<LevelItems[]> {
  return Promise.all(LEVELS.map((l) => getLevelItems(l)));
}

// ── Per-item progress (user side) ───────────────────────────────────────────

export interface ActivityFacts {
  firstTouchedAt: Date | null;
  lastTouchedAt: Date | null;
  firstSubmittedAt: Date | null;
  lastSubmittedAt: Date | null;
  bestScorePermille: number | null;
}

export interface ExerciseInput {
  state?: unknown;
  stateUpdatedAt?: Date | null;
  activity?: ActivityFacts | null;
}

export interface TestSectionProgress {
  sectionId: string;
  name: string;
  earned: number;
  best: number;
  maxPoints: number;
  checkedCount: number;
  gradedCount: number;
  completed: boolean;
}

export interface ItemProgress {
  itemId: string;
  isTest: boolean;
  level: Level;
  countable: number;
  touched: number;
  graded: number;
  gradedSubmitted: number;
  correctUnits: number;
  totalUnits: number;
  percent: number;
  completed: boolean;
  /** correctUnits ÷ totalUnits × 100 over checked exercises; null when nothing checked. */
  accuracyPct: number | null;
  pointsEarned: number | null;
  pointsBest: number | null;
  pointsTotal: number | null;
  sections: TestSectionProgress[] | null;
  lastActivityAt: Date | null;
}

const maxDate = (a: Date | null | undefined, b: Date | null | undefined): Date | null => {
  if (!a) return b ?? null;
  if (!b) return a;
  return a > b ? a : b;
};

export function computeItemProgress(
  def: ItemDefinition,
  inputs: Map<string, ExerciseInput>,
): ItemProgress {
  let touched = 0;
  let gradedSubmitted = 0;
  let correctUnits = 0;
  let totalUnits = 0;
  let lastActivityAt: Date | null = null;
  const states: Record<string, unknown> = {};
  const bestRatio = new Map<string, number>();

  for (const d of def.exercises) {
    const input = inputs.get(d.id);
    if (!input) continue;
    if (input.state !== undefined) states[d.id] = input.state;
    lastActivityAt = maxDate(lastActivityAt, maxDate(input.stateUpdatedAt, input.activity?.lastTouchedAt));
    if (d.kind === 'none') continue;

    const hasState = input.state !== undefined;
    if (input.activity || (hasState && hasUserInput(input.state))) touched++;
    if (d.kind !== 'graded') continue;

    const grade = hasState ? gradeExercise(d.exercise as never, input.state) : null;
    const everSubmitted = !!input.activity?.firstSubmittedAt || !!grade?.submitted;
    if (everSubmitted && d.required) gradedSubmitted++;
    if (grade?.submitted) {
      correctUnits += grade.correct;
      totalUnits += grade.total;
    }
    const current = grade?.submitted && grade.total > 0 ? grade.correct / grade.total : null;
    const stored = input.activity?.bestScorePermille != null ? input.activity.bestScorePermille / 1000 : null;
    const best = Math.max(current ?? -1, stored ?? -1);
    if (best >= 0) bestRatio.set(d.id, best);
  }

  const completed =
    def.graded > 0 ? gradedSubmitted === def.graded : def.countable > 0 && touched >= def.countable;
  const percent = completed
    ? 100
    : def.countable > 0
      ? Math.min(99, Math.round((touched / def.countable) * 100))
      : 0;

  let pointsEarned: number | null = null;
  let pointsBest: number | null = null;
  let pointsTotal: number | null = null;
  let sections: TestSectionProgress[] | null = null;
  if (def.test) {
    const score = getTestScore(def.test, states);
    pointsTotal = score.total;
    pointsEarned = score.earned;
    sections = def.test.sections.map((section, i) => {
      const cur = score.sections[i];
      let bestRaw = 0;
      for (const ex of section.exercises) {
        const r = bestRatio.get(ex.id);
        if (r !== undefined) bestRaw += r * ((ex as { points?: number }).points ?? 0);
      }
      const best = Math.max(cur.earned, Math.min(section.maxPoints, Math.round(bestRaw)));
      return {
        sectionId: section.id,
        name: section.name,
        earned: cur.earned,
        best,
        maxPoints: section.maxPoints,
        checkedCount: cur.checkedCount,
        gradedCount: cur.gradedCount,
        completed: cur.completed,
      };
    });
    pointsBest = sections.reduce((n, s) => n + s.best, 0);
  }

  return {
    itemId: def.itemId,
    isTest: def.isTest,
    level: def.level,
    countable: def.countable,
    touched,
    graded: def.graded,
    gradedSubmitted,
    correctUnits,
    totalUnits,
    percent,
    completed,
    accuracyPct: totalUnits > 0 ? Math.round((correctUnits / totalUnits) * 100) : null,
    pointsEarned,
    pointsBest,
    pointsTotal,
    sections,
    lastActivityAt,
  };
}

/** Progress for an item the learner never opened. */
export function emptyItemProgress(def: ItemDefinition): ItemProgress {
  return computeItemProgress(def, new Map());
}

// ── Level aggregation ───────────────────────────────────────────────────────

export interface LevelProgress {
  level: Level;
  percent: number;
  started: boolean;
  completed: boolean;
  lessonsTotal: number;
  lessonsStarted: number;
  lessonsCompleted: number;
  testsTotal: number;
  testsStarted: number;
  testsCompleted: number;
  accuracyPct: number | null;
}

export function computeLevelProgress(items: LevelItems, byItem: Map<string, ItemProgress>): LevelProgress {
  const lessonP = items.lessons.map((d) => byItem.get(d.itemId) ?? emptyItemProgress(d));
  const testP = items.tests.map((d) => byItem.get(d.itemId) ?? emptyItemProgress(d));
  const all = [...lessonP, ...testP];
  const percentSum = all.reduce((n, p) => n + p.percent, 0);
  const correct = lessonP.reduce((n, p) => n + p.correctUnits, 0);
  const units = lessonP.reduce((n, p) => n + p.totalUnits, 0);
  return {
    level: items.level,
    percent: all.length ? Math.round(percentSum / all.length) : 0,
    started: all.some((p) => p.touched > 0),
    completed: all.length > 0 && all.every((p) => p.completed),
    lessonsTotal: lessonP.length,
    lessonsStarted: lessonP.filter((p) => p.touched > 0).length,
    lessonsCompleted: lessonP.filter((p) => p.completed).length,
    testsTotal: testP.length,
    testsStarted: testP.filter((p) => p.touched > 0).length,
    testsCompleted: testP.filter((p) => p.completed).length,
    accuracyPct: units > 0 ? Math.round((correct / units) * 100) : null,
  };
}

/** Highest level with any progress (null for a learner who never started). */
export function pickCurrentLevel(levels: LevelProgress[]): Level | null {
  let current: Level | null = null;
  for (const l of levels) if (l.started) current = l.level;
  return current;
}
