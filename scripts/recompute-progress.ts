/**
 * Rebuild the `lesson_progress_summary` cache for every learner (or one).
 * Run after deploying a new grading engine version or after the activity
 * backfill. Safe to re-run.
 *
 *   npx tsx scripts/recompute-progress.ts
 *   npx tsx scripts/recompute-progress.ts --user 123
 */

import 'dotenv/config';
import { recomputeUsers } from '../src/lib/learnerProgress/store';

async function main() {
  const idx = process.argv.indexOf('--user');
  const userIds = idx >= 0 ? [Number(process.argv[idx + 1])] : undefined;
  const started = Date.now();
  const n = await recomputeUsers(userIds, (done, total) => console.log(`  ${done}/${total} users`));
  console.log(`\nRecomputed ${n} users in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
