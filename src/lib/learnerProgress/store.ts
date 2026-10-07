/**
 * Progress store — DB side of `lib/learnerProgress`.
 *
 *   • recordTouches / recordSave  — write `exercise_activity` facts and refresh
 *                                   the cached summary of that lesson/test
 *   • getUserItemProgress         — one learner, computed live (always exact)
 *                                   and written through to the cache
 *   • getUsersItemProgress        — many learners, read from the cache;
 *                                   stale rows are recomputed on the fly
 *   • recomputeUsers              — full rebuild (script + daily cron)
 *
 * Server-only (imports the DB client).
 */

import { and, eq, inArray, sql } from 'drizzle-orm';
import { db } from '@/db';
import {
  exerciseActivityTable,
  exerciseStatesTable,
  lessonProgressSummaryTable,
} from '@/db/schema';
import { gradeExercise, isStateSubmitted } from '@/lib/grading';
import {
  GRADING_ENGINE_VERSION,
  computeItemProgress,
  getItemDefinition,
  type ExerciseInput,
  type ItemDefinition,
  type ItemProgress,
  type TestSectionProgress,
} from './core';
import type { Level } from '@/content/registry';

type InputsByItem = Map<string, Map<string, ExerciseInput>>;

function parseState(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function inputSlot(map: InputsByItem, itemId: string, exerciseId: string): ExerciseInput {
  let item = map.get(itemId);
  if (!item) {
    item = new Map();
    map.set(itemId, item);
  }
  let slot = item.get(exerciseId);
  if (!slot) {
    slot = {};
    item.set(exerciseId, slot);
  }
  return slot;
}

/** Loads saved answers + activity facts for the given users (optionally limited to some items). */
async function loadInputs(userIds: number[], itemIds?: string[]): Promise<Map<number, InputsByItem>> {
  const result = new Map<number, InputsByItem>();
  if (userIds.length === 0) return result;

  const stateWhere = itemIds
    ? and(inArray(exerciseStatesTable.userId, userIds), inArray(exerciseStatesTable.lessonId, itemIds))
    : inArray(exerciseStatesTable.userId, userIds);
  const activityWhere = itemIds
    ? and(inArray(exerciseActivityTable.userId, userIds), inArray(exerciseActivityTable.lessonId, itemIds))
    : inArray(exerciseActivityTable.userId, userIds);

  const [stateRows, activityRows] = await Promise.all([
    db
      .select({
        userId: exerciseStatesTable.userId,
        lessonId: exerciseStatesTable.lessonId,
        exerciseId: exerciseStatesTable.exerciseId,
        state: exerciseStatesTable.state,
        updatedAt: exerciseStatesTable.updatedAt,
      })
      .from(exerciseStatesTable)
      .where(stateWhere),
    db
      .select()
      .from(exerciseActivityTable)
      .where(activityWhere)
      .catch((err) => {
        // Answers alone still give correct scores; only click history is missing.
        console.error('[learnerProgress] exercise_activity unavailable', err);
        return [] as (typeof exerciseActivityTable.$inferSelect)[];
      }),
  ]);

  const forUser = (uid: number) => {
    let m = result.get(uid);
    if (!m) {
      m = new Map();
      result.set(uid, m);
    }
    return m;
  };

  for (const r of stateRows) {
    const slot = inputSlot(forUser(r.userId), r.lessonId, r.exerciseId);
    slot.state = parseState(r.state);
    slot.stateUpdatedAt = r.updatedAt;
  }
  for (const r of activityRows) {
    const slot = inputSlot(forUser(r.userId), r.lessonId, r.exerciseId);
    slot.activity = {
      firstTouchedAt: r.firstTouchedAt,
      lastTouchedAt: r.lastTouchedAt,
      firstSubmittedAt: r.firstSubmittedAt,
      lastSubmittedAt: r.lastSubmittedAt,
      bestScorePermille: r.bestScorePermille,
    };
  }
  return result;
}

async function computeFromInputs(inputs: InputsByItem): Promise<Map<string, ItemProgress>> {
  const out = new Map<string, ItemProgress>();
  for (const [itemId, exInputs] of inputs) {
    const def = await getItemDefinition(itemId);
    if (!def || def.countable === 0) continue; // orphan ids (renamed / removed content)
    out.set(itemId, computeItemProgress(def, exInputs));
  }
  return out;
}

// ── Cache rows ──────────────────────────────────────────────────────────────

type SummaryRow = typeof lessonProgressSummaryTable.$inferSelect;

function toRowValues(userId: number, p: ItemProgress, def: ItemDefinition) {
  return {
    userId,
    itemId: p.itemId,
    level: p.level,
    isTest: p.isTest,
    percent: p.percent,
    completed: p.completed,
    countable: p.countable,
    touched: p.touched,
    graded: p.graded,
    gradedSubmitted: p.gradedSubmitted,
    correctUnits: p.correctUnits,
    totalUnits: p.totalUnits,
    pointsEarned: p.pointsEarned,
    pointsBest: p.pointsBest,
    pointsTotal: p.pointsTotal,
    detailJson: p.sections ? JSON.stringify(p.sections) : null,
    lastActivityAt: p.lastActivityAt,
    engineVersion: GRADING_ENGINE_VERSION,
    contentSig: def.contentSig,
    updatedAt: new Date(),
  };
}

function fromRow(r: SummaryRow): ItemProgress {
  let sections: TestSectionProgress[] | null = null;
  if (r.detailJson) {
    try {
      sections = JSON.parse(r.detailJson);
    } catch {
      sections = null;
    }
  }
  return {
    itemId: r.itemId,
    isTest: r.isTest,
    level: r.level as Level,
    countable: r.countable,
    touched: r.touched,
    graded: r.graded,
    gradedSubmitted: r.gradedSubmitted,
    correctUnits: r.correctUnits,
    totalUnits: r.totalUnits,
    percent: r.percent,
    completed: r.completed,
    accuracyPct: r.totalUnits > 0 ? Math.round((r.correctUnits / r.totalUnits) * 100) : null,
    pointsEarned: r.pointsEarned,
    pointsBest: r.pointsBest,
    pointsTotal: r.pointsTotal,
    sections,
    lastActivityAt: r.lastActivityAt,
  };
}

async function upsertSummaries(userId: number, progresses: Map<string, ItemProgress>) {
  const values = [];
  for (const p of progresses.values()) {
    const def = await getItemDefinition(p.itemId);
    if (def) values.push(toRowValues(userId, p, def));
  }
  if (values.length === 0) return;
  await db
    .insert(lessonProgressSummaryTable)
    .values(values)
    .onConflictDoUpdate({
      target: [lessonProgressSummaryTable.userId, lessonProgressSummaryTable.itemId],
      set: {
        level: sql`excluded.level`,
        isTest: sql`excluded.is_test`,
        percent: sql`excluded.percent`,
        completed: sql`excluded.completed`,
        countable: sql`excluded.countable`,
        touched: sql`excluded.touched`,
        graded: sql`excluded.graded`,
        gradedSubmitted: sql`excluded.graded_submitted`,
        correctUnits: sql`excluded.correct_units`,
        totalUnits: sql`excluded.total_units`,
        pointsEarned: sql`excluded.points_earned`,
        pointsBest: sql`excluded.points_best`,
        pointsTotal: sql`excluded.points_total`,
        detailJson: sql`excluded.detail_json`,
        lastActivityAt: sql`excluded.last_activity_at`,
        engineVersion: sql`excluded.engine_version`,
        contentSig: sql`excluded.content_sig`,
        updatedAt: sql`excluded.updated_at`,
      },
    });
}

/** Recompute and cache one learner's progress for the given lessons/tests. */
export async function refreshUserItems(userId: number, itemIds: string[]): Promise<Map<string, ItemProgress>> {
  const inputs = (await loadInputs([userId], itemIds)).get(userId) ?? new Map();
  const progress = await computeFromInputs(inputs);
  await upsertSummaries(userId, progress);
  return progress;
}

// ── Writes from the learner's browser ───────────────────────────────────────

/** Any click inside an exercise. Idempotent; called in small batches. */
export async function recordTouches(userId: number, lessonId: string, exerciseIds: string[]) {
  const def = await getItemDefinition(lessonId);
  if (!def) return;
  const known = new Set(def.exercises.map((e) => e.id));
  const ids = [...new Set(exerciseIds)].filter((id) => known.has(id));
  if (ids.length === 0) return;
  const now = new Date();
  await db
    .insert(exerciseActivityTable)
    .values(ids.map((exerciseId) => ({ userId, lessonId, exerciseId, firstTouchedAt: now, lastTouchedAt: now })))
    .onConflictDoUpdate({
      target: [exerciseActivityTable.userId, exerciseActivityTable.lessonId, exerciseActivityTable.exerciseId],
      set: { lastTouchedAt: now },
    });
  await refreshUserItems(userId, [lessonId]);
}

/** Called after an answer state has been saved. Stamps check time + best score. */
export async function recordSave(userId: number, lessonId: string, exerciseId: string, state: unknown) {
  const def = await getItemDefinition(lessonId);
  const exDef = def?.exercises.find((e) => e.id === exerciseId);
  const grade = exDef ? gradeExercise(exDef.exercise as never, state) : null;
  const submitted = grade ? grade.submitted : isStateSubmitted(state);

  if (submitted) {
    const now = new Date();
    const permille = grade && grade.total > 0 ? Math.round((grade.correct / grade.total) * 1000) : null;
    await db
      .insert(exerciseActivityTable)
      .values({
        userId,
        lessonId,
        exerciseId,
        firstTouchedAt: now,
        lastTouchedAt: now,
        firstSubmittedAt: now,
        lastSubmittedAt: now,
        bestScorePermille: permille,
      })
      .onConflictDoUpdate({
        target: [exerciseActivityTable.userId, exerciseActivityTable.lessonId, exerciseActivityTable.exerciseId],
        set: {
          lastTouchedAt: now,
          firstSubmittedAt: sql`COALESCE(${exerciseActivityTable.firstSubmittedAt}, excluded.first_submitted_at)`,
          lastSubmittedAt: now,
          bestScorePermille: sql`GREATEST(${exerciseActivityTable.bestScorePermille}, excluded.best_score_permille)`,
        },
      });
  }
  if (def) await refreshUserItems(userId, [lessonId]);
}

// ── Reads ───────────────────────────────────────────────────────────────────

/**
 * One learner, computed live from answers + activity, then written through
 * to the cache. Used by the profile, sidebar/level map, admin user detail and
 * the chatbot.
 */
export async function getUserItemProgress(userId: number): Promise<Map<string, ItemProgress>> {
  const inputs = (await loadInputs([userId])).get(userId) ?? new Map();
  const progress = await computeFromInputs(inputs);

  const cached = await db
    .select()
    .from(lessonProgressSummaryTable)
    .where(eq(lessonProgressSummaryTable.userId, userId))
    .catch(() => [] as SummaryRow[]);
  const cachedById = new Map(cached.map((r) => [r.itemId, r]));
  const changed = new Map<string, ItemProgress>();
  for (const [itemId, p] of progress) {
    const row = cachedById.get(itemId);
    const def = await getItemDefinition(itemId);
    if (
      !row ||
      !def ||
      row.engineVersion !== GRADING_ENGINE_VERSION ||
      row.contentSig !== def.contentSig ||
      row.percent !== p.percent ||
      row.completed !== p.completed ||
      row.touched !== p.touched ||
      row.gradedSubmitted !== p.gradedSubmitted ||
      row.correctUnits !== p.correctUnits ||
      row.pointsEarned !== p.pointsEarned ||
      row.pointsBest !== p.pointsBest
    ) {
      changed.set(itemId, p);
    }
  }
  if (changed.size > 0) {
    try {
      await upsertSummaries(userId, changed);
    } catch {
      // Cache write is best-effort; the live numbers are already correct.
    }
  }
  return progress;
}

/**
 * Many learners, from the cache. Rows written by an older grading engine or
 * for content that has since changed are recomputed (and re-cached) first.
 * Pass `undefined` for all learners.
 */
export async function getUsersItemProgress(
  userIds?: number[],
  opts: { itemIds?: string[] } = {},
): Promise<Map<number, Map<string, ItemProgress>>> {
  if (userIds && userIds.length === 0) return new Map();
  if (opts.itemIds && opts.itemIds.length === 0) return new Map();
  const conds = [];
  if (userIds) conds.push(inArray(lessonProgressSummaryTable.userId, userIds));
  if (opts.itemIds) conds.push(inArray(lessonProgressSummaryTable.itemId, opts.itemIds));
  const rows = await db
    .select()
    .from(lessonProgressSummaryTable)
    .where(conds.length ? and(...conds) : undefined);

  const result = new Map<number, Map<string, ItemProgress>>();
  const stale = new Map<number, Set<string>>();
  for (const r of rows) {
    const def = await getItemDefinition(r.itemId);
    if (!def || def.countable === 0) continue;
    if (r.engineVersion !== GRADING_ENGINE_VERSION || r.contentSig !== def.contentSig) {
      const s = stale.get(r.userId) ?? new Set();
      s.add(r.itemId);
      stale.set(r.userId, s);
      continue;
    }
    let m = result.get(r.userId);
    if (!m) {
      m = new Map();
      result.set(r.userId, m);
    }
    m.set(r.itemId, fromRow(r));
  }

  for (const [uid, itemIds] of stale) {
    const fresh = await refreshUserItems(uid, [...itemIds]);
    let m = result.get(uid);
    if (!m) {
      m = new Map();
      result.set(uid, m);
    }
    for (const [id, p] of fresh) m.set(id, p);
  }
  return result;
}

/**
 * Full rebuild of the cache for the given learners (all learners with any
 * saved answer or activity when omitted). Processes users in chunks.
 */
export async function recomputeUsers(
  userIds?: number[],
  onProgress?: (done: number, total: number) => void,
): Promise<number> {
  let ids = userIds;
  if (!ids) {
    const [a, b] = await Promise.all([
      db.selectDistinct({ userId: exerciseStatesTable.userId }).from(exerciseStatesTable),
      db.selectDistinct({ userId: exerciseActivityTable.userId }).from(exerciseActivityTable),
    ]);
    ids = [...new Set([...a, ...b].map((r) => r.userId))];
  }
  const CHUNK = 25;
  for (let i = 0; i < ids.length; i += CHUNK) {
    const chunk = ids.slice(i, i + CHUNK);
    const inputs = await loadInputs(chunk);
    for (const uid of chunk) {
      const progress = await computeFromInputs(inputs.get(uid) ?? new Map());
      await upsertSummaries(uid, progress);
    }
    onProgress?.(Math.min(i + CHUNK, ids.length), ids.length);
  }
  return ids.length;
}
