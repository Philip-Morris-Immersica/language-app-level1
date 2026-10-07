/**
 * One-off: build `exercise_activity` history from existing `exercise_states`.
 *
 * Before click tracking existed, the only evidence of activity is the saved
 * answer state. For every saved state with real learner input we create an
 * activity row (touched at `updated_at`; checked at `updated_at` if the state
 * is checked; best score = current score). Existing activity rows are never
 * overwritten, so the script is safe to re-run.
 *
 * Also stores the "click tracking since" date shown in admin reports (only
 * the first time, unless --reset-tracking-date).
 *
 *   npx tsx scripts/backfill-activity.ts --dry-run
 *   npx tsx scripts/backfill-activity.ts
 *   npx tsx scripts/backfill-activity.ts --reset-tracking-date   # after deploy
 */

import 'dotenv/config';
import { gt, asc, sql } from 'drizzle-orm';
import { db } from '../src/db';
import { adminStatsSnapshotTable, exerciseActivityTable, exerciseStatesTable } from '../src/db/schema';
import { gradeExercise, hasUserInput, isStateSubmitted } from '../src/lib/grading';
import { getItemDefinition } from '../src/lib/learnerProgress/core';

const dryRun = process.argv.includes('--dry-run');
/** Run once right after the production deploy so the date matches live click tracking. */
const resetTrackingDate = process.argv.includes('--reset-tracking-date');
const PAGE = 2000;

async function main() {
  let lastId = 0;
  let scanned = 0;
  let withInput = 0;
  let submitted = 0;
  let inserted = 0;

  for (;;) {
    const rows = await db
      .select()
      .from(exerciseStatesTable)
      .where(gt(exerciseStatesTable.id, lastId))
      .orderBy(asc(exerciseStatesTable.id))
      .limit(PAGE);
    if (rows.length === 0) break;
    lastId = rows[rows.length - 1].id;
    scanned += rows.length;

    const values = [];
    for (const r of rows) {
      let state: unknown;
      try {
        state = JSON.parse(r.state);
      } catch {
        continue;
      }
      if (!hasUserInput(state)) continue;
      withInput++;

      const def = await getItemDefinition(r.lessonId);
      const exDef = def?.exercises.find((e) => e.id === r.exerciseId);
      if (!exDef) continue; // orphan (renamed / removed exercise)

      const grade = gradeExercise(exDef.exercise as never, state);
      const isSubmitted = grade ? grade.submitted : isStateSubmitted(state);
      if (isSubmitted) submitted++;
      values.push({
        userId: r.userId,
        lessonId: r.lessonId,
        exerciseId: r.exerciseId,
        firstTouchedAt: r.updatedAt,
        lastTouchedAt: r.updatedAt,
        firstSubmittedAt: isSubmitted ? r.updatedAt : null,
        lastSubmittedAt: isSubmitted ? r.updatedAt : null,
        bestScorePermille:
          isSubmitted && grade && grade.total > 0 ? Math.round((grade.correct / grade.total) * 1000) : null,
      });
    }

    if (!dryRun) {
      for (let i = 0; i < values.length; i += 500) {
        const chunk = values.slice(i, i + 500);
        const res = await db
          .insert(exerciseActivityTable)
          .values(chunk)
          .onConflictDoNothing()
          .returning({ id: exerciseActivityTable.id });
        inserted += res.length;
      }
    }
    console.log(`  scanned ${scanned} states…`);
  }

  console.log(`\nStates scanned:        ${scanned}`);
  console.log(`With learner input:    ${withInput}`);
  console.log(`Of which checked:      ${submitted}`);
  console.log(dryRun ? 'Dry run — nothing written.' : `Activity rows created: ${inserted}`);

  if (!dryRun) {
    const row = {
      key: 'activity_tracking_since',
      dataJson: JSON.stringify({ since: new Date().toISOString() }),
      computedAt: sql`now()`,
    };
    const insert = db.insert(adminStatsSnapshotTable).values(row);
    await (resetTrackingDate
      ? insert.onConflictDoUpdate({ target: adminStatsSnapshotTable.key, set: { dataJson: row.dataJson, computedAt: row.computedAt } })
      : insert.onConflictDoNothing());
  }
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
