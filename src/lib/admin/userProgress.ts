/**
 * Per-user lesson progress helper.
 *
 * Used by the admin dashboard, the users list, and the user-detail page to
 * compute how far a learner has gotten in the content. We derive progress
 * from `exerciseStatesTable` — every row there represents one exercise the
 * user has interacted with. The "total" denominator comes from the content
 * registry (`ALL_LESSON_EXERCISE_COUNTS`) so the math always matches the live
 * content, not a stale snapshot.
 *
 * Definitions used throughout the admin UI:
 *   • attempted = user has saved at least one piece of state for the exercise
 *   • progress %  = attempted / total exercises in that lesson * 100
 *   • level %  = average of per-lesson progress for lessons in that level
 *                that the user has touched (lessons with 0 attempted are
 *                excluded from the average so a brand-new learner shows
 *                their actual progress on lessons they've started, not 0/11)
 *   • highestLevel = the level with the highest average % across users (used
 *                as the user's "current level" badge)
 */

import { db } from '@/db';
import { exerciseStatesTable } from '@/db/schema';
import { eq, sql, inArray } from 'drizzle-orm';
import {
  ALL_LESSON_EXERCISE_COUNTS,
  LESSON_LEVEL_MAP,
  TEST_LEVEL_MAP,
  type Level,
  LEVELS,
  loadTest,
  getLevelDef,
} from '@/content/registry';
import { summarizeLessonProgress } from '@/lib/chat/progressAnalyzer';
import { getSectionScore } from '@/lib/testScoring';

export interface UserLessonProgress {
  lessonId: string;
  level: Level | 'unknown';
  attemptedCount: number;
  totalCount: number;
  pct: number; // 0-100
}

export interface UserProgressSummary {
  userId: number;
  totalLessonsAttempted: number;
  byLevel: Record<Level, { lessonsAttempted: number; avgPct: number }>;
  /** The level with the most lessons-attempted (ties broken by highest avg). */
  highestLevel: Level | null;
  highestLevelPct: number;
  perLesson: UserLessonProgress[];
}

/**
 * Tests are stored under their testId in `exercise_states.lesson_id` too, so
 * we filter them out (they don't have entries in ALL_LESSON_EXERCISE_COUNTS).
 */
function getLessonTotal(lessonId: string): number | null {
  return ALL_LESSON_EXERCISE_COUNTS[lessonId] ?? null;
}

export async function getUserProgressSummary(userId: number): Promise<UserProgressSummary> {
  // Pull all (lessonId, attemptedCount) pairs for this user in a single query.
  const rows = await db
    .select({
      lessonId: exerciseStatesTable.lessonId,
      attempted: sql<number>`COUNT(*)`,
    })
    .from(exerciseStatesTable)
    .where(eq(exerciseStatesTable.userId, userId))
    .groupBy(exerciseStatesTable.lessonId);

  const perLesson: UserLessonProgress[] = [];
  for (const r of rows) {
    const total = getLessonTotal(r.lessonId);
    if (total === null) continue; // skip tests & unknown ids
    const attemptedCount = Math.min(Number(r.attempted), total);
    const pct = total > 0 ? Math.round((attemptedCount / total) * 100) : 0;
    perLesson.push({
      lessonId: r.lessonId,
      level: LESSON_LEVEL_MAP[r.lessonId] ?? 'unknown',
      attemptedCount,
      totalCount: total,
      pct,
    });
  }

  // Sort per-lesson by level then lesson id for stable UI output.
  perLesson.sort((a, b) => {
    if (a.level !== b.level) return String(a.level).localeCompare(String(b.level));
    return a.lessonId.localeCompare(b.lessonId);
  });

  // Per-level summary.
  const byLevel: Record<Level, { lessonsAttempted: number; avgPct: number }> = {
    a1: { lessonsAttempted: 0, avgPct: 0 },
    a2: { lessonsAttempted: 0, avgPct: 0 },
    b1: { lessonsAttempted: 0, avgPct: 0 },
    b2: { lessonsAttempted: 0, avgPct: 0 },
  };

  for (const lvl of LEVELS) {
    const lessonsInLevel = perLesson.filter((l) => l.level === lvl);
    byLevel[lvl].lessonsAttempted = lessonsInLevel.length;
    byLevel[lvl].avgPct = lessonsInLevel.length
      ? Math.round(lessonsInLevel.reduce((s, l) => s + l.pct, 0) / lessonsInLevel.length)
      : 0;
  }

  // Pick the "current level" for the user: the one with the most lessons
  // attempted; if tied, the highest avg pct; if still tied, the lower-level
  // one (a1 before a2 etc.).
  let highestLevel: Level | null = null;
  for (const lvl of LEVELS) {
    if (byLevel[lvl].lessonsAttempted === 0) continue;
    if (
      !highestLevel ||
      byLevel[lvl].lessonsAttempted > byLevel[highestLevel].lessonsAttempted ||
      (byLevel[lvl].lessonsAttempted === byLevel[highestLevel].lessonsAttempted &&
        byLevel[lvl].avgPct > byLevel[highestLevel].avgPct)
    ) {
      highestLevel = lvl;
    }
  }

  return {
    userId,
    totalLessonsAttempted: perLesson.length,
    byLevel,
    highestLevel,
    highestLevelPct: highestLevel ? byLevel[highestLevel].avgPct : 0,
    perLesson,
  };
}

/**
 * Batched variant — when /admin/users renders 20 users at a time we don't
 * want to fire 20 separate progress queries. This returns a Map keyed by
 * userId so callers can `map.get(u.id)`.
 */
export async function getUserProgressSummaries(
  userIds: number[],
): Promise<Map<number, UserProgressSummary>> {
  const result = new Map<number, UserProgressSummary>();
  if (userIds.length === 0) return result;

  const rows = await db
    .select({
      userId: exerciseStatesTable.userId,
      lessonId: exerciseStatesTable.lessonId,
      attempted: sql<number>`COUNT(*)`,
    })
    .from(exerciseStatesTable)
    .where(inArray(exerciseStatesTable.userId, userIds))
    .groupBy(exerciseStatesTable.userId, exerciseStatesTable.lessonId);

  // Group rows by user
  const byUser = new Map<number, Array<{ lessonId: string; attempted: number }>>();
  for (const r of rows) {
    const list = byUser.get(r.userId) ?? [];
    list.push({ lessonId: r.lessonId, attempted: Number(r.attempted) });
    byUser.set(r.userId, list);
  }

  for (const uid of userIds) {
    const userRows = byUser.get(uid) ?? [];
    const perLesson: UserLessonProgress[] = [];
    for (const r of userRows) {
      const total = getLessonTotal(r.lessonId);
      if (total === null) continue;
      const attemptedCount = Math.min(r.attempted, total);
      const pct = total > 0 ? Math.round((attemptedCount / total) * 100) : 0;
      perLesson.push({
        lessonId: r.lessonId,
        level: LESSON_LEVEL_MAP[r.lessonId] ?? 'unknown',
        attemptedCount,
        totalCount: total,
        pct,
      });
    }
    perLesson.sort((a, b) => {
      if (a.level !== b.level) return String(a.level).localeCompare(String(b.level));
      return a.lessonId.localeCompare(b.lessonId);
    });

    const byLevel: Record<Level, { lessonsAttempted: number; avgPct: number }> = {
      a1: { lessonsAttempted: 0, avgPct: 0 },
      a2: { lessonsAttempted: 0, avgPct: 0 },
      b1: { lessonsAttempted: 0, avgPct: 0 },
      b2: { lessonsAttempted: 0, avgPct: 0 },
    };
    for (const lvl of LEVELS) {
      const ls = perLesson.filter((l) => l.level === lvl);
      byLevel[lvl].lessonsAttempted = ls.length;
      byLevel[lvl].avgPct = ls.length
        ? Math.round(ls.reduce((s, l) => s + l.pct, 0) / ls.length)
        : 0;
    }
    let highestLevel: Level | null = null;
    for (const lvl of LEVELS) {
      if (byLevel[lvl].lessonsAttempted === 0) continue;
      if (
        !highestLevel ||
        byLevel[lvl].lessonsAttempted > byLevel[highestLevel].lessonsAttempted ||
        (byLevel[lvl].lessonsAttempted === byLevel[highestLevel].lessonsAttempted &&
          byLevel[lvl].avgPct > byLevel[highestLevel].avgPct)
      ) {
        highestLevel = lvl;
      }
    }

    result.set(uid, {
      userId: uid,
      totalLessonsAttempted: perLesson.length,
      byLevel,
      highestLevel,
      highestLevelPct: highestLevel ? byLevel[highestLevel].avgPct : 0,
      perLesson,
    });
  }

  return result;
}

/**
 * Platform-wide aggregate used by the dashboard:
 *   • per-level avg completion across all users with any activity in that level
 *   • per-level distribution histogram (so the dashboard can show shape, not
 *     just an average that hides "lots of beginners, few finishers")
 *
 * NOTE: We previously also returned a "most popular lesson" pick here; it was
 * removed after feedback that the average-per-level + distribution was more
 * actionable for UNHCR.
 */
export interface PlatformProgressStats {
  byLevel: Record<Level, { activeUsers: number; avgPct: number }>;
  histogramByLevel: Record<Level, { bucket: string; users: number }[]>;
}

const BUCKET_DEFS = [
  { bucket: '0–10%', min: 0, max: 10 },
  { bucket: '10–30%', min: 10, max: 30 },
  { bucket: '30–50%', min: 30, max: 50 },
  { bucket: '50–70%', min: 50, max: 70 },
  { bucket: '70–100%', min: 70, max: 101 },
] as const;

export async function getPlatformProgressStats(): Promise<PlatformProgressStats> {
  const stateRows = await db
    .select({
      userId: exerciseStatesTable.userId,
      lessonId: exerciseStatesTable.lessonId,
      attempted: sql<number>`COUNT(*)`,
    })
    .from(exerciseStatesTable)
    .groupBy(exerciseStatesTable.userId, exerciseStatesTable.lessonId);

  const userLessons = new Map<number, Map<string, number>>();
  for (const r of stateRows) {
    const total = getLessonTotal(r.lessonId);
    if (total === null) continue;
    const pct = total > 0 ? Math.round((Math.min(Number(r.attempted), total) / total) * 100) : 0;
    let lessons = userLessons.get(r.userId);
    if (!lessons) {
      lessons = new Map();
      userLessons.set(r.userId, lessons);
    }
    lessons.set(r.lessonId, pct);
  }

  const byLevel: Record<Level, { activeUsers: number; avgPct: number }> = {
    a1: { activeUsers: 0, avgPct: 0 },
    a2: { activeUsers: 0, avgPct: 0 },
    b1: { activeUsers: 0, avgPct: 0 },
    b2: { activeUsers: 0, avgPct: 0 },
  };
  const levelPctsByUser: Record<Level, number[]> = { a1: [], a2: [], b1: [], b2: [] };
  for (const [, lessons] of userLessons) {
    for (const lvl of LEVELS) {
      const lessonsInLevel = [...lessons.entries()].filter(
        ([lid]) => LESSON_LEVEL_MAP[lid] === lvl,
      );
      if (!lessonsInLevel.length) continue;
      const avg = lessonsInLevel.reduce((s, [, p]) => s + p, 0) / lessonsInLevel.length;
      levelPctsByUser[lvl].push(avg);
    }
  }
  for (const lvl of LEVELS) {
    const arr = levelPctsByUser[lvl];
    byLevel[lvl].activeUsers = arr.length;
    byLevel[lvl].avgPct = arr.length
      ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length)
      : 0;
  }

  const histogramByLevel: Record<Level, { bucket: string; users: number }[]> = {
    a1: BUCKET_DEFS.map((b) => ({ bucket: b.bucket, users: 0 })),
    a2: BUCKET_DEFS.map((b) => ({ bucket: b.bucket, users: 0 })),
    b1: BUCKET_DEFS.map((b) => ({ bucket: b.bucket, users: 0 })),
    b2: BUCKET_DEFS.map((b) => ({ bucket: b.bucket, users: 0 })),
  };
  for (const lvl of LEVELS) {
    for (const pct of levelPctsByUser[lvl]) {
      const idx = BUCKET_DEFS.findIndex((bk) => pct >= bk.min && pct < bk.max);
      if (idx >= 0) histogramByLevel[lvl][idx].users++;
    }
  }

  return { byLevel, histogramByLevel };
}

// ── Per-level detail (used by /admin/levels/[level]) ──────────────────────────

/**
 * Stats for a single lesson, across all users who touched it.
 */
export interface LevelLessonStats {
  lessonId: string;
  number: number;
  title: string;
  totalExercises: number;
  usersAttempted: number;
  /** average % attempted across users who touched the lesson */
  avgPct: number;
  /** users who reached 100% of attempted exercises (a rough "done" signal) */
  usersCompleted: number;
}

/**
 * Threshold above which a user is considered to have "completed" a test
 * (i.e. their score is representative). 80% means they attempted at least
 * 80% of the test's exercises. Used to separate engaged finishers from
 * users who only opened the test and gave up.
 */
export const TEST_COMPLETED_THRESHOLD_PCT = 80;

/**
 * Stats for a single test, across all users who attempted it. We compute:
 *   • usersAttempted — any exercise_states row for that testId
 *   • usersCompleted — users whose attempted% ≥ TEST_COMPLETED_THRESHOLD_PCT
 *   • avgAttemptedPct — engagement signal (how much of the test users do)
 *   • avgScorePctAll — score across everyone who submitted ≥1 exercise
 *   • avgScorePctCompleters — score across users who finished ≥80% of the
 *     test (the trustworthy "how hard is this test really" number)
 *   • bySection — the same numbers broken down per КОМПОНЕНТ
 */
export interface LevelTestStats {
  testId: string;
  number: number;
  title: string;
  totalExercises: number;
  usersAttempted: number;
  usersCompleted: number;
  avgAttemptedPct: number;
  avgScorePctAll: number;
  avgScorePctCompleters: number;
  bySection: Array<{
    sectionId: string;
    name: string;
    totalExercises: number;
    avgAttemptedPct: number;
    avgScorePctAll: number;
    avgScorePctCompleters: number;
  }>;
}

export interface LevelDetailStats {
  level: Level;
  lessons: LevelLessonStats[];
  tests: LevelTestStats[];
}

/**
 * For a single level, gather per-lesson and per-test stats. Heavy: scans all
 * `exercise_states` rows for that level and (for tests) loads each test's
 * content to score the user submissions. We only call this from the level
 * detail page, never from the dashboard.
 */
export async function getLevelDetailStats(level: Level): Promise<LevelDetailStats> {
  const def = getLevelDef(level);
  const lessonIds = def.lessonsMetadata.map((m) => m.id);
  const testIds = Object.keys(def.testLoaders);

  // Pull all relevant rows up-front (lesson and test).
  const allIds = [...lessonIds, ...testIds];
  const rows = allIds.length
    ? await db
        .select({
          userId: exerciseStatesTable.userId,
          lessonId: exerciseStatesTable.lessonId,
          exerciseId: exerciseStatesTable.exerciseId,
          state: exerciseStatesTable.state,
        })
        .from(exerciseStatesTable)
        .where(inArray(exerciseStatesTable.lessonId, allIds))
    : [];

  // Group rows by (lessonId/testId) → userId → exerciseId
  const byLessonAndUser = new Map<string, Map<number, typeof rows>>();
  for (const r of rows) {
    let users = byLessonAndUser.get(r.lessonId);
    if (!users) {
      users = new Map();
      byLessonAndUser.set(r.lessonId, users);
    }
    const list = users.get(r.userId) ?? [];
    list.push(r);
    users.set(r.userId, list);
  }

  // ── Lessons ────────────────────────────────────────────────────────────────
  const lessons: LevelLessonStats[] = def.lessonsMetadata.map((meta) => {
    const total = def.lessonExerciseCounts[meta.id] ?? 0;
    const users = byLessonAndUser.get(meta.id);
    if (!users || total === 0) {
      return {
        lessonId: meta.id,
        number: meta.number,
        title: meta.title,
        totalExercises: total,
        usersAttempted: 0,
        avgPct: 0,
        usersCompleted: 0,
      };
    }
    const pcts: number[] = [];
    let completed = 0;
    for (const [, list] of users) {
      const attempted = Math.min(list.length, total);
      const pct = Math.round((attempted / total) * 100);
      pcts.push(pct);
      if (pct >= 100) completed++;
    }
    const avg = pcts.length ? Math.round(pcts.reduce((s, p) => s + p, 0) / pcts.length) : 0;
    return {
      lessonId: meta.id,
      number: meta.number,
      title: meta.title,
      totalExercises: total,
      usersAttempted: users.size,
      avgPct: avg,
      usersCompleted: completed,
    };
  });

  // ── Tests (need to load test content for section breakdown) ────────────────
  const tests: LevelTestStats[] = [];
  for (const testId of testIds) {
    const testData = await loadTest(testId);
    const users = byLessonAndUser.get(testId);
    if (!testData) {
      tests.push({
        testId,
        number: 0,
        title: testId,
        totalExercises: 0,
        usersAttempted: 0,
        usersCompleted: 0,
        avgAttemptedPct: 0,
        avgScorePctAll: 0,
        avgScorePctCompleters: 0,
        bySection: [],
      });
      continue;
    }

    // Build exercise → section map for quick lookup
    const exToSection = new Map<string, { id: string; name: string }>();
    let totalEx = 0;
    for (const section of testData.sections) {
      for (const ex of section.exercises) {
        exToSection.set(ex.id, { id: section.id, name: section.name });
        totalEx++;
      }
    }

    if (!users || totalEx === 0) {
      tests.push({
        testId,
        number: testData.number,
        title: testData.title,
        totalExercises: totalEx,
        usersAttempted: 0,
        usersCompleted: 0,
        avgAttemptedPct: 0,
        avgScorePctAll: 0,
        avgScorePctCompleters: 0,
        bySection: testData.sections.map((s) => ({
          sectionId: s.id,
          name: s.name,
          totalExercises: s.exercises.length,
          avgAttemptedPct: 0,
          avgScorePctAll: 0,
          avgScorePctCompleters: 0,
        })),
      });
      continue;
    }

    const attemptedPcts: number[] = [];
    const scorePctsAll: number[] = [];
    const scorePctsCompleters: number[] = [];
    let completersCount = 0;
    // Per-section: { sectionId -> [...pcts] }
    const sectionAttemptedPcts = new Map<string, number[]>();
    const sectionScoreAll = new Map<string, number[]>();
    const sectionScoreCompleters = new Map<string, number[]>();

    const validIds = new Set(exToSection.keys());

    for (const [, list] of users) {
      const summary = summarizeLessonProgress(
        testId,
        list.map((r) => ({ exerciseId: r.exerciseId, state: r.state })),
        totalEx,
        validIds,
      );
      const attemptedCount = summary.attemptedExerciseIds.length;
      const attemptedPct = Math.round((attemptedCount / totalEx) * 100);
      attemptedPcts.push(attemptedPct);

      const isCompleter = attemptedPct >= TEST_COMPLETED_THRESHOLD_PCT;
      if (isCompleter) completersCount++;

      // Use the summary's per-exercise classifications instead of re-running
      // summarizeLessonProgress per exercise (was O(n) → O(1) per user now).
      const rightIds = new Set(summary.exercisesAllCorrect);
      const wrongIds = new Set(summary.exercisesWithMistakes.map((m) => m.exerciseId));

      let right = 0;
      let wrong = 0;
      const secAttemptCount = new Map<string, number>();
      const secRight = new Map<string, number>();
      const secWrong = new Map<string, number>();

      for (const r of list) {
        const section = exToSection.get(r.exerciseId);
        if (!section) continue;
        secAttemptCount.set(section.id, (secAttemptCount.get(section.id) ?? 0) + 1);
        if (rightIds.has(r.exerciseId)) {
          right += 1;
          secRight.set(section.id, (secRight.get(section.id) ?? 0) + 1);
        } else if (wrongIds.has(r.exerciseId)) {
          wrong += 1;
          secWrong.set(section.id, (secWrong.get(section.id) ?? 0) + 1);
        }
      }

      const totalGraded = right + wrong;
      if (totalGraded > 0) {
        const userScore = Math.round((right / totalGraded) * 100);
        scorePctsAll.push(userScore);
        if (isCompleter) scorePctsCompleters.push(userScore);
      }

      for (const sec of testData.sections) {
        const secTotal = sec.exercises.length;
        const attempted = secAttemptCount.get(sec.id) ?? 0;
        const rCount = secRight.get(sec.id) ?? 0;
        const wCount = secWrong.get(sec.id) ?? 0;
        const secGraded = rCount + wCount;
        const attPct = secTotal > 0 ? Math.round((Math.min(attempted, secTotal) / secTotal) * 100) : 0;

        const arrA = sectionAttemptedPcts.get(sec.id) ?? [];
        arrA.push(attPct);
        sectionAttemptedPcts.set(sec.id, arrA);

        if (secGraded > 0) {
          const scorePct = Math.round((rCount / secGraded) * 100);
          const arrS = sectionScoreAll.get(sec.id) ?? [];
          arrS.push(scorePct);
          sectionScoreAll.set(sec.id, arrS);
          if (isCompleter) {
            const arrC = sectionScoreCompleters.get(sec.id) ?? [];
            arrC.push(scorePct);
            sectionScoreCompleters.set(sec.id, arrC);
          }
        }
      }
    }

    const avgFromArr = (arr: number[]) =>
      arr.length ? Math.round(arr.reduce((s, p) => s + p, 0) / arr.length) : 0;

    tests.push({
      testId,
      number: testData.number,
      title: testData.title,
      totalExercises: totalEx,
      usersAttempted: users.size,
      usersCompleted: completersCount,
      avgAttemptedPct: avgFromArr(attemptedPcts),
      avgScorePctAll: avgFromArr(scorePctsAll),
      avgScorePctCompleters: avgFromArr(scorePctsCompleters),
      bySection: testData.sections.map((s) => ({
        sectionId: s.id,
        name: s.name,
        totalExercises: s.exercises.length,
        avgAttemptedPct: avgFromArr(sectionAttemptedPcts.get(s.id) ?? []),
        avgScorePctAll: avgFromArr(sectionScoreAll.get(s.id) ?? []),
        avgScorePctCompleters: avgFromArr(sectionScoreCompleters.get(s.id) ?? []),
      })),
    });
  }

  // Tests sorted by number ascending
  tests.sort((a, b) => a.number - b.number);

  return { level, lessons, tests };
}

// Re-export TEST_LEVEL_MAP for convenience (some pages may want it)
export { TEST_LEVEL_MAP };

// ── Per-user test summary (used by /admin/users/[id]) ─────────────────────────

/**
 * One user's results on a single test. Mirrors LevelTestStats but for a single
 * learner — used by the user-detail page to show "did this user actually
 * finish each test, and how did they do?".
 */
export interface UserTestProgress {
  testId: string;
  level: Level | 'unknown';
  number: number;
  title: string;
  totalExercises: number;
  attemptedCount: number;
  attemptedPct: number;
  /** Exercises the user actually submitted (clicked "Провери") */
  submittedCount: number;
  correctCount: number;
  wrongCount: number;
  /** correct / (correct + wrong). 0 if no exercises were graded. */
  scorePct: number;
  /** True if attemptedPct >= TEST_COMPLETED_THRESHOLD_PCT — i.e. the score
   *  is representative of an engaged attempt. */
  completed: boolean;
  /** Points earned across all sections (matches the in-test score block). */
  pointsEarned: number;
  /** Sum of section.maxPoints (i.e. test.totalPoints). */
  totalPoints: number;
  /** pointsEarned / totalPoints * 100, rounded. 0 if totalPoints is 0. */
  pointsScorePct: number;
  bySection: Array<{
    sectionId: string;
    name: string;
    totalExercises: number;
    attemptedCount: number;
    attemptedPct: number;
    submittedCount: number;
    correctCount: number;
    wrongCount: number;
    scorePct: number;
    /** Points earned in this section. */
    pointsEarned: number;
    /** section.maxPoints (e.g. 8 for СЛУШАНЕ). */
    maxPoints: number;
    /** pointsEarned / maxPoints * 100, rounded. */
    pointsScorePct: number;
  }>;
}

/**
 * Gather one user's test results, across all tests in all levels they touched.
 * Returns an empty array if the user hasn't started any test. Tests are sorted
 * by level (a1 → b2) then by test number.
 */
export async function getUserTestSummary(userId: number): Promise<UserTestProgress[]> {
  const allTestIds = Object.keys(TEST_LEVEL_MAP);
  if (allTestIds.length === 0) return [];

  const rows = await db
    .select({
      lessonId: exerciseStatesTable.lessonId,
      exerciseId: exerciseStatesTable.exerciseId,
      state: exerciseStatesTable.state,
    })
    .from(exerciseStatesTable)
    .where(
      sql`${exerciseStatesTable.userId} = ${userId} AND ${exerciseStatesTable.lessonId} IN (${sql.join(
        allTestIds.map((id) => sql`${id}`),
        sql`, `,
      )})`,
    );

  // Group rows by testId
  const byTest = new Map<string, typeof rows>();
  for (const r of rows) {
    const list = byTest.get(r.lessonId) ?? [];
    list.push(r);
    byTest.set(r.lessonId, list);
  }
  if (byTest.size === 0) return [];

  const results: UserTestProgress[] = [];
  for (const [testId, list] of byTest) {
    const testData = await loadTest(testId);
    if (!testData) continue;

    const exToSection = new Map<string, { id: string; name: string }>();
    let totalEx = 0;
    for (const section of testData.sections) {
      for (const ex of section.exercises) {
        exToSection.set(ex.id, { id: section.id, name: section.name });
        totalEx++;
      }
    }
    if (totalEx === 0) continue;

    const validIds = new Set(exToSection.keys());
    const summary = summarizeLessonProgress(
      testId,
      list.map((r) => ({ exerciseId: r.exerciseId, state: r.state })),
      totalEx,
      validIds,
    );
    const attemptedCount = summary.attemptedExerciseIds.length;
    const attemptedPct = Math.round((attemptedCount / totalEx) * 100);
    const completed = attemptedPct >= TEST_COMPLETED_THRESHOLD_PCT;

    const rightIds = new Set(summary.exercisesAllCorrect);
    const wrongIds = new Set(summary.exercisesWithMistakes.map((m) => m.exerciseId));

    // Per-section accumulators
    const secAttempted = new Map<string, number>();
    const secRight = new Map<string, number>();
    const secWrong = new Map<string, number>();

    for (const r of list) {
      const section = exToSection.get(r.exerciseId);
      if (!section) continue;
      secAttempted.set(section.id, (secAttempted.get(section.id) ?? 0) + 1);
      if (rightIds.has(r.exerciseId)) {
        secRight.set(section.id, (secRight.get(section.id) ?? 0) + 1);
      } else if (wrongIds.has(r.exerciseId)) {
        secWrong.set(section.id, (secWrong.get(section.id) ?? 0) + 1);
      }
    }

    const right = summary.exercisesAllCorrect.length;
    const wrong = summary.exercisesWithMistakes.length;
    const submittedCount = right + wrong;
    const scorePct = submittedCount > 0 ? Math.round((right / submittedCount) * 100) : 0;

    // Build the savedStates map shape that getSectionScore expects.
    // Each row's `state` is JSON; parse once and pass through.
    const savedStates: Record<string, unknown> = {};
    for (const r of list) {
      try {
        savedStates[r.exerciseId] = JSON.parse(r.state);
      } catch {
        // Ignore malformed rows; absence from the map = "no state for this id"
      }
    }

    // Score each section by points (mirrors the in-test score block)
    const sectionPointResults = testData.sections.map((s) => getSectionScore(s, savedStates));
    const totalPointsEarned = sectionPointResults.reduce((sum, sec) => sum + sec.earned, 0);
    const totalPoints = testData.totalPoints;
    const pointsScorePct = totalPoints > 0 ? Math.round((totalPointsEarned / totalPoints) * 100) : 0;

    results.push({
      testId,
      level: TEST_LEVEL_MAP[testId] ?? 'unknown',
      number: testData.number,
      title: testData.title,
      totalExercises: totalEx,
      attemptedCount,
      attemptedPct,
      submittedCount,
      correctCount: right,
      wrongCount: wrong,
      scorePct,
      completed,
      pointsEarned: totalPointsEarned,
      totalPoints,
      pointsScorePct,
      bySection: testData.sections.map((s, idx) => {
        const secTotal = s.exercises.length;
        const attempted = secAttempted.get(s.id) ?? 0;
        const rCount = secRight.get(s.id) ?? 0;
        const wCount = secWrong.get(s.id) ?? 0;
        const submitted = rCount + wCount;
        const pts = sectionPointResults[idx];
        return {
          sectionId: s.id,
          name: s.name,
          totalExercises: secTotal,
          attemptedCount: attempted,
          attemptedPct: secTotal > 0 ? Math.round((Math.min(attempted, secTotal) / secTotal) * 100) : 0,
          submittedCount: submitted,
          correctCount: rCount,
          wrongCount: wCount,
          scorePct: submitted > 0 ? Math.round((rCount / submitted) * 100) : 0,
          pointsEarned: pts.earned,
          maxPoints: pts.total,
          pointsScorePct: pts.total > 0 ? Math.round((pts.earned / pts.total) * 100) : 0,
        };
      }),
    });
  }

  // Sort by level then number
  const levelOrder: Record<string, number> = { a1: 0, a2: 1, b1: 2, b2: 3, unknown: 9 };
  results.sort((a, b) => {
    const lo = (levelOrder[a.level] ?? 9) - (levelOrder[b.level] ?? 9);
    if (lo !== 0) return lo;
    return a.number - b.number;
  });
  return results;
}
