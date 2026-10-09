# Whole B2 lesson in one chat — plan, questions, build, review, fixes

Use **Sonnet 5.5 High**, Agent mode, in a new chat.

Expected input:

```text
Урок: b2-lesson-NN
Материали: C:\...\B2-MATERIALS\lesson-NN
Допълнителни решения: няма | кратък текст
```

You are the coordinator. Do not read textbook sources or write lesson content
yourself; run every phase as a subagent and keep only its short report.

## 1. Plan (skip if `_PLAN-b2-lesson-NN.md` is already `READY`)

1. If the folder has no `SOURCE-*.md`, run
   `npm run source:extract -- --dir "<Материали>" --first-page <N>`.
   Find N on `SOURCE-PAGES/page-01.png` (printed page number); if it was wrong,
   re-run once with `--force --first-page N`.
2. Start a subagent with model **Opus 5.5 High**:
   `Follow .cursor/commands/b2-plan.md. Урок / Материали / Допълнителни решения: <input>.
   Step 0 is done; do not re-extract or open the PDF/DOCX. Use the previous
   B2 lesson as the only reference. Return READY/NOT READY, and for each
   question: recommendation + options.`
3. If NOT READY, ask the author **all questions at once** (recommendation
   first). Questions she cannot answer (client must decide) → stop here and
   list them.
4. Record the answers in plan §9 as `R1…Rn` and set the status to `READY`.
   If any answer differs from the recommendation, resume the same Opus
   subagent with the answers so it adjusts the affected rows.

## 2. Build

For each Build batch in the plan, in order, start a subagent with model
**Sonnet 5.5 High**:
`Follow .cursor/commands/b2-build.md. Урок: b2-lesson-NN. Batch: N. План: <path>.`
Add the previous batch's handoff lines. Never run two batches at once.

## 3. Review and fixes

1. Start a review subagent (**Sonnet 5.5 High**):
   `Follow .cursor/commands/b2-review.md. Урок: b2-lesson-NN.` plus the
   builders' reported deviations.
2. Apply the exact replacements yourself when they are spelling, gloss,
   punctuation, numbering or an extra accepted answer. Ask the author before
   any change to scoring, R*/D* decisions, client keys or removed/added items.
3. Run `npm run content:lint -- --lesson b2-lesson-NN` (0 errors). Start
   `npm run dev` in the background if nothing runs on port 3010, then open
   `http://localhost:3010/lessons/b2-lesson-NN` and confirm it renders.
4. Add a short `9а. След review` block to the plan (fixes, accepted warnings,
   client questions, TTS notes) and set the next prompt to `/b2-tts`.

If subagents or a requested model are unavailable, stop and tell the author to
use the separate chats (`/b2-plan`, `/b2-build`, `/b2-review`). Never
substitute another model silently.

Do not generate TTS, commit or push. Finish with: items, scored blocks, total
points, what was fixed, open client questions and the next prompt.
