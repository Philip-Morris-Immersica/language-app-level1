/**
 * Creates the three progress tables (exercise_activity, lesson_progress_summary,
 * admin_stats_snapshot) if they don't exist yet. Additive only — never alters
 * or drops anything, unlike `drizzle-kit push`, which would also "fix" any
 * unrelated drift in the production schema. Names match what drizzle-kit
 * generates from `src/db/schema.ts`, so a later `db:push` sees no difference.
 *
 *   npx tsx scripts/create-progress-tables.ts --dry-run   # print SQL only
 *   npx tsx scripts/create-progress-tables.ts
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "exercise_activity" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE cascade,
    "lesson_id" varchar(50) NOT NULL,
    "exercise_id" varchar(50) NOT NULL,
    "first_touched_at" timestamp DEFAULT now() NOT NULL,
    "last_touched_at" timestamp DEFAULT now() NOT NULL,
    "first_submitted_at" timestamp,
    "last_submitted_at" timestamp,
    "best_score_permille" integer,
    CONSTRAINT "exercise_activity_user_id_lesson_id_exercise_id_unique" UNIQUE("user_id","lesson_id","exercise_id")
  )`,
  `CREATE TABLE IF NOT EXISTS "lesson_progress_summary" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE cascade,
    "item_id" varchar(50) NOT NULL,
    "level" varchar(5) NOT NULL,
    "is_test" boolean DEFAULT false NOT NULL,
    "percent" integer DEFAULT 0 NOT NULL,
    "completed" boolean DEFAULT false NOT NULL,
    "countable" integer DEFAULT 0 NOT NULL,
    "touched" integer DEFAULT 0 NOT NULL,
    "graded" integer DEFAULT 0 NOT NULL,
    "graded_submitted" integer DEFAULT 0 NOT NULL,
    "correct_units" integer DEFAULT 0 NOT NULL,
    "total_units" integer DEFAULT 0 NOT NULL,
    "points_earned" integer,
    "points_best" integer,
    "points_total" integer,
    "detail_json" text,
    "last_activity_at" timestamp,
    "engine_version" integer NOT NULL,
    "content_sig" varchar(64) NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "lesson_progress_summary_user_id_item_id_unique" UNIQUE("user_id","item_id")
  )`,
  `CREATE TABLE IF NOT EXISTS "admin_stats_snapshot" (
    "key" varchar(64) PRIMARY KEY NOT NULL,
    "data_json" text NOT NULL,
    "computed_at" timestamp DEFAULT now() NOT NULL
  )`,
];

async function main() {
  if (process.argv.includes('--dry-run')) {
    for (const s of STATEMENTS) console.log(s + ';\n');
    return;
  }
  const sql = neon(process.env.DATABASE_URL!);
  for (const s of STATEMENTS) {
    await sql.query(s);
    console.log('ok:', s.split('\n')[0]);
  }
  const rows = await sql.query(
    `SELECT table_name FROM information_schema.tables WHERE table_name IN ('exercise_activity','lesson_progress_summary','admin_stats_snapshot')`,
  );
  console.log('present:', rows.map((r) => String(r.table_name)).join(', '));
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
