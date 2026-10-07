/**
 * Learner progress, shaped for the profile page, the admin panel, reports and
 * the chatbot. All numbers come from `lib/learnerProgress` (which in turn uses
 * `lib/grading` and `lib/testScoring`), so every screen agrees with the score
 * block inside the test and with the sidebar / level map.
 *
 * Definitions (see `lib/learnerProgress/core.ts` for the full list):
 *   • attempted / touched — the learner clicked inside the exercise
 *   • progress %          — touched ÷ exercises with something to do (100 when completed)
 *   • lesson completed    — every exercise with points has been checked at least once
 *   • test completed      — every exercise with points in the test has been checked
 *   • level %             — average over ALL lessons and tests of the level
 *                           (untouched ones count as 0)
 *   • current level       — highest level with any progress
 *
 * Single learner → computed live (exact). Many learners → read from the
 * `lesson_progress_summary` cache. Platform aggregates → daily snapshot.
 */

import { db } from '@/db';
import { adminStatsSnapshotTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { LEVELS, TEST_LEVEL_MAP, type Level } from '@/content/registry';
import {
  getAllLevelItems,
  getLevelItems,
  getUserProgress,
  getUsersItemProgress,
  getUsersProgress,
  recomputeUsers,
  type ItemProgress,
  type LevelProgress,
  type UserProgress,
} from '@/lib/learnerProgress';

export interface UserLessonProgress {
  lessonId: string;
  level: Level | 'unknown';
  /** Exercises touched. */
  attemptedCount: number;
  /** Exercises with something to do. */
  totalCount: number;
  /** Progress % (100 once completed). */
  pct: number;
  completed: boolean;
  /** Exercises with points, and how many of them were checked. */
  gradedTotal: number;
  gradedChecked: number;
  /** Correct answers ÷ answers over checked exercises; null if nothing checked. */
  accuracyPct: number | null;
  lastActivityAt: string | null;
}

export interface UserLevelSummary extends LevelProgress {
  /** Lessons with any activity (kept for older UI code). */
  lessonsAttempted: number;
  /** Level % (same as `percent`, kept for older UI code). */
  avgPct: number;
}

export interface UserProgressSummary {
  userId: number;
  totalLessonsAttempted: number;
  lessonsCompleted: number;
  testsStarted: number;
  testsCompleted: number;
  byLevel: Record<Level, UserLevelSummary>;
  /** Current level: the highest level with any progress. */
  highestLevel: Level | null;
  highestLevelPct: number;
  /** Lessons the learner has started, in content order. */
  perLesson: UserLessonProgress[];
  lastActivityAt: string | null;
}

function toLessonRow(p: ItemProgress): UserLessonProgress {
  return {
    lessonId: p.itemId,
    level: p.level,
    attemptedCount: p.touched,
    totalCount: p.countable,
    pct: p.percent,
    completed: p.completed,
    gradedTotal: p.graded,
    gradedChecked: p.gradedSubmitted,
    accuracyPct: p.accuracyPct,
    lastActivityAt: p.lastActivityAt ? p.lastActivityAt.toISOString() : null,
  };
}

function toSummary(up: UserProgress): UserProgressSummary {
  const byLevel = {} as Record<Level, UserLevelSummary>;
  for (const l of up.levels) {
    byLevel[l.level] = { ...l, lessonsAttempted: l.lessonsStarted, avgPct: l.percent };
  }
  const perLesson = up.items.filter((p) => !p.isTest && p.touched > 0).map(toLessonRow);
  const current = up.currentLevel;
  return {
    userId: up.userId,
    totalLessonsAttempted: up.lessonsStarted,
    lessonsCompleted: up.lessonsCompleted,
    testsStarted: up.testsStarted,
    testsCompleted: up.testsCompleted,
    byLevel,
    highestLevel: current,
    highestLevelPct: current ? byLevel[current].percent : 0,
    perLesson,
    lastActivityAt: up.lastActivityAt ? up.lastActivityAt.toISOString() : null,
  };
}

/** One learner — live and exact (profile, admin user detail, chatbot). */
export async function getUserProgressSummary(userId: number): Promise<UserProgressSummary> {
  return toSummary(await getUserProgress(userId));
}

/** Many learners — from the progress cache (admin users list, reports). */
export async function getUserProgressSummaries(
  userIds: number[],
): Promise<Map<number, UserProgressSummary>> {
  const result = new Map<number, UserProgressSummary>();
  if (userIds.length === 0) return result;
  const all = await getUsersProgress(userIds);
  for (const [uid, up] of all) result.set(uid, toSummary(up));
  return result;
}

// ── Platform aggregates (dashboard) ───────────────────────────────────────────

export interface PlatformProgressStats {
  byLevel: Record<
    Level,
    {
      /** Learners with any activity in the level. */
      activeUsers: number;
      /** Average level % over those learners. */
      avgPct: number;
      /** Learners who completed the whole level (all lessons + all tests). */
      usersCompleted: number;
      /** Average number of completed lessons per active learner. */
      avgLessonsCompleted: number;
      lessonsTotal: number;
      testsTotal: number;
    }
  >;
  histogramByLevel: Record<Level, { bucket: string; users: number }[]>;
  /** When these numbers were computed (ISO). */
  computedAt: string;
  /** Since when clicks are tracked; earlier activity is reconstructed from saved answers. */
  trackingSince: string | null;
}

const BUCKET_DEFS = [
  { bucket: '0–10%', min: 0, max: 10 },
  { bucket: '10–30%', min: 10, max: 30 },
  { bucket: '30–50%', min: 30, max: 50 },
  { bucket: '50–70%', min: 50, max: 70 },
  { bucket: '70–100%', min: 70, max: 101 },
] as const;

const PLATFORM_SNAPSHOT_KEY = 'platform_progress_v1';
const TRACKING_SINCE_KEY = 'activity_tracking_since';

async function readSnapshot<T>(key: string): Promise<{ data: T; computedAt: Date } | null> {
  const [row] = await db
    .select()
    .from(adminStatsSnapshotTable)
    .where(eq(adminStatsSnapshotTable.key, key))
    .catch(() => []);
  if (!row) return null;
  try {
    return { data: JSON.parse(row.dataJson) as T, computedAt: row.computedAt };
  } catch {
    return null;
  }
}

async function writeSnapshot(key: string, data: unknown) {
  const now = new Date();
  await db
    .insert(adminStatsSnapshotTable)
    .values({ key, dataJson: JSON.stringify(data), computedAt: now })
    .onConflictDoUpdate({ target: adminStatsSnapshotTable.key, set: { dataJson: JSON.stringify(data), computedAt: now } });
}

export async function getTrackingSince(): Promise<string | null> {
  const snap = await readSnapshot<{ since: string }>(TRACKING_SINCE_KEY);
  return snap?.data.since ?? null;
}

async function computePlatformProgressStats(): Promise<Omit<PlatformProgressStats, 'computedAt' | 'trackingSince'>> {
  const all = await getUsersProgress();
  const byLevel = {} as PlatformProgressStats['byLevel'];
  const histogramByLevel = {} as PlatformProgressStats['histogramByLevel'];

  for (const lvl of LEVELS) {
    const levels = [...all.values()].map((u) => u.levels.find((l) => l.level === lvl)!).filter((l) => l?.started);
    const pcts = levels.map((l) => l.percent);
    const items = (await getLevelItems(lvl));
    byLevel[lvl] = {
      activeUsers: levels.length,
      avgPct: pcts.length ? Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length) : 0,
      usersCompleted: levels.filter((l) => l.completed).length,
      avgLessonsCompleted: levels.length
        ? Math.round((levels.reduce((s, l) => s + l.lessonsCompleted, 0) / levels.length) * 10) / 10
        : 0,
      lessonsTotal: items.lessons.length,
      testsTotal: items.tests.length,
    };
    histogramByLevel[lvl] = BUCKET_DEFS.map((b) => ({
      bucket: b.bucket,
      users: pcts.filter((p) => p >= b.min && p < b.max).length,
    }));
  }
  return { byLevel, histogramByLevel };
}

/**
 * Dashboard aggregates. Served from the daily snapshot; computed on the spot
 * the first time (or when `refresh` is set — the «Обнови сега» button / cron).
 */
export async function getPlatformProgressStats(opts: { refresh?: boolean } = {}): Promise<PlatformProgressStats> {
  const trackingSince = await getTrackingSince();
  if (!opts.refresh) {
    const snap = await readSnapshot<Omit<PlatformProgressStats, 'computedAt' | 'trackingSince'>>(PLATFORM_SNAPSHOT_KEY);
    if (snap) return { ...snap.data, computedAt: snap.computedAt.toISOString(), trackingSince };
  }
  const data = await computePlatformProgressStats();
  await writeSnapshot(PLATFORM_SNAPSHOT_KEY, data);
  return { ...data, computedAt: new Date().toISOString(), trackingSince };
}

/**
 * Daily job: rebuild every learner's cached progress, then the dashboard
 * snapshot. Used by `/api/cron/refresh-stats` and the «Обнови сега» button.
 */
export async function refreshAllProgressStats(): Promise<{ users: number; computedAt: string }> {
  const users = await recomputeUsers();
  const stats = await getPlatformProgressStats({ refresh: true });
  return { users, computedAt: stats.computedAt };
}

// ── Per-level detail (used by /admin/levels/[level]) ──────────────────────────

export interface LevelLessonStats {
  lessonId: string;
  number: number;
  title: string;
  totalExercises: number;
  /** Exercises with points. */
  gradedExercises: number;
  usersAttempted: number;
  /** Average progress % over learners who started the lesson. */
  avgPct: number;
  /** Learners who checked every exercise with points. */
  usersCompleted: number;
  /** Average accuracy over learners who checked anything; null if nobody did. */
  avgAccuracyPct: number | null;
}

export interface LevelTestStats {
  testId: string;
  number: number;
  title: string;
  totalExercises: number;
  totalPoints: number;
  usersAttempted: number;
  /** Learners who checked every exercise with points. */
  usersCompleted: number;
  avgAttemptedPct: number;
  /** Average points % over learners who checked at least one exercise. */
  avgScorePctAll: number;
  /** Average points % over learners who completed the test. */
  avgScorePctCompleters: number;
  bySection: Array<{
    sectionId: string;
    name: string;
    totalExercises: number;
    maxPoints: number;
    /** Average share of the section's exercises that were checked. */
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

const avg = (arr: number[]) => (arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0);
const pctOf = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

export async function getLevelDetailStats(level: Level): Promise<LevelDetailStats> {
  const items = await getLevelItems(level);
  const itemIds = [...items.lessons, ...items.tests].map((d) => d.itemId);
  const byUser = await getUsersItemProgress(undefined, { itemIds });

  const progressFor = (itemId: string) => {
    const out: ItemProgress[] = [];
    for (const m of byUser.values()) {
      const p = m.get(itemId);
      if (p && p.touched > 0) out.push(p);
    }
    return out;
  };

  const lessons: LevelLessonStats[] = items.lessons.map((d) => {
    const ps = progressFor(d.itemId);
    const acc = ps.map((p) => p.accuracyPct).filter((v): v is number => v !== null);
    return {
      lessonId: d.itemId,
      number: d.number,
      title: d.title,
      totalExercises: d.countable,
      gradedExercises: d.graded,
      usersAttempted: ps.length,
      avgPct: avg(ps.map((p) => p.percent)),
      usersCompleted: ps.filter((p) => p.completed).length,
      avgAccuracyPct: acc.length ? avg(acc) : null,
    };
  });

  const tests: LevelTestStats[] = items.tests.map((d) => {
    const ps = progressFor(d.itemId);
    const total = d.test?.totalPoints ?? 0;
    const scored = ps.filter((p) => p.gradedSubmitted > 0);
    const completers = ps.filter((p) => p.completed);
    return {
      testId: d.itemId,
      number: d.number,
      title: d.title,
      totalExercises: d.graded,
      totalPoints: total,
      usersAttempted: ps.length,
      usersCompleted: completers.length,
      avgAttemptedPct: avg(ps.map((p) => p.percent)),
      avgScorePctAll: avg(scored.map((p) => pctOf(p.pointsEarned ?? 0, total))),
      avgScorePctCompleters: avg(completers.map((p) => pctOf(p.pointsEarned ?? 0, total))),
      bySection: (d.test?.sections ?? []).map((s, i) => {
        const secOf = (p: ItemProgress) => p.sections?.[i];
        const secScored = ps.filter((p) => (secOf(p)?.checkedCount ?? 0) > 0);
        return {
          sectionId: s.id,
          name: s.name,
          totalExercises: secOf(ps[0] ?? ({} as ItemProgress))?.gradedCount ?? s.exercises.length,
          maxPoints: s.maxPoints,
          avgAttemptedPct: avg(ps.map((p) => pctOf(secOf(p)?.checkedCount ?? 0, secOf(p)?.gradedCount ?? 0))),
          avgScorePctAll: avg(secScored.map((p) => pctOf(secOf(p)?.earned ?? 0, s.maxPoints))),
          avgScorePctCompleters: avg(completers.map((p) => pctOf(secOf(p)?.earned ?? 0, s.maxPoints))),
        };
      }),
    };
  });

  tests.sort((a, b) => a.number - b.number);
  return { level, lessons, tests };
}

export { TEST_LEVEL_MAP };

// ── Per-user test summary (profile, admin user detail, chatbot) ───────────────

export interface UserTestProgress {
  testId: string;
  level: Level | 'unknown';
  number: number;
  title: string;
  /** Exercises with points. */
  totalExercises: number;
  /** Exercises touched. */
  attemptedCount: number;
  /** Progress % (100 once completed). */
  attemptedPct: number;
  /** Exercises with points that were checked («Провери»). */
  submittedCount: number;
  /** Correct / wrong answers (blanks, statements, questions …) over checked exercises. */
  correctCount: number;
  wrongCount: number;
  /** correctCount ÷ (correctCount + wrongCount). */
  scorePct: number;
  /** Every exercise with points has been checked. */
  completed: boolean;
  /** Points with the current answers — matches the score block inside the test. */
  pointsEarned: number;
  /** Best points ever reached (answers may have been changed since). */
  pointsBest: number;
  totalPoints: number;
  pointsScorePct: number;
  bySection: Array<{
    sectionId: string;
    name: string;
    totalExercises: number;
    attemptedCount: number;
    attemptedPct: number;
    submittedCount: number;
    /** Kept for older UI code; points are the meaningful per-section score. */
    correctCount: number;
    wrongCount: number;
    scorePct: number;
    pointsEarned: number;
    pointsBest: number;
    maxPoints: number;
    pointsScorePct: number;
  }>;
}

function toTestRow(p: ItemProgress, number: number, title: string, gradedTotal: number): UserTestProgress {
  const total = p.pointsTotal ?? 0;
  const earned = p.pointsEarned ?? 0;
  return {
    testId: p.itemId,
    level: TEST_LEVEL_MAP[p.itemId] ?? 'unknown',
    number,
    title,
    totalExercises: gradedTotal,
    attemptedCount: p.touched,
    attemptedPct: p.percent,
    submittedCount: p.gradedSubmitted,
    correctCount: p.correctUnits,
    wrongCount: p.totalUnits - p.correctUnits,
    scorePct: p.accuracyPct ?? 0,
    completed: p.completed,
    pointsEarned: earned,
    pointsBest: p.pointsBest ?? earned,
    totalPoints: total,
    pointsScorePct: pctOf(earned, total),
    bySection: (p.sections ?? []).map((s) => ({
      sectionId: s.sectionId,
      name: s.name,
      totalExercises: s.gradedCount,
      attemptedCount: s.checkedCount,
      attemptedPct: pctOf(s.checkedCount, s.gradedCount),
      submittedCount: s.checkedCount,
      correctCount: s.earned,
      wrongCount: s.maxPoints - s.earned,
      scorePct: pctOf(s.earned, s.maxPoints),
      pointsEarned: s.earned,
      pointsBest: s.best,
      maxPoints: s.maxPoints,
      pointsScorePct: pctOf(s.earned, s.maxPoints),
    })),
  };
}

/** Tests the learner has started, sorted by level then number. */
export async function getUserTestSummary(userId: number): Promise<UserTestProgress[]> {
  return toTestSummary(await getUserProgress(userId));
}

/** Lessons + tests for one learner from a single live computation. */
export async function getUserProgressBundle(
  userId: number,
): Promise<{ summary: UserProgressSummary; tests: UserTestProgress[] }> {
  const up = await getUserProgress(userId);
  return { summary: toSummary(up), tests: await toTestSummary(up) };
}

async function toTestSummary(up: UserProgress): Promise<UserTestProgress[]> {
  const levelItems = await getAllLevelItems();
  const defs = new Map(levelItems.flatMap((li) => li.tests).map((d) => [d.itemId, d]));
  const levelOrder: Record<string, number> = { a1: 0, a2: 1, b1: 2, b2: 3 };
  return up.items
    .filter((p) => p.isTest && p.touched > 0)
    .map((p) => {
      const d = defs.get(p.itemId);
      return toTestRow(p, d?.number ?? 0, d?.title ?? p.itemId, d?.graded ?? 0);
    })
    .sort((a, b) => (levelOrder[a.level] ?? 9) - (levelOrder[b.level] ?? 9) || a.number - b.number);
}
