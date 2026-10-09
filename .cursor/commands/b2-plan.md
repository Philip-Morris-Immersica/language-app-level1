# B2 lesson plan

Use **Opus 5.5 High**, Agent mode, in a new chat.

Expected input:

```text
Урок: b2-lesson-NN
Материали: C:\...\B2-MATERIALS\lesson-NN
Допълнителни решения: няма | кратък текст
```

Read `.cursor/rules/alex-b1-b2.mdc`, then list the source folder (names only).

**Step 0 — extract once (no manual PDF splitting needed).** If `SOURCE-*.md`
files are missing or older than the PDF/DOCX, run:

```powershell
npm run source:extract -- --dir "<materials folder>" --first-page <printed page number of PDF page 1>
```

Find the printed page number in `SOURCE-PAGES/page-01.png` or the text layer;
if unsure, run with the default and re-run with `--force --first-page N` once
known. The script writes, inside the materials folder (outside Git):

- `SOURCE-TEXTBOOK.md` — text per printed page; two-column pages are split
  into column 1 / column 2 — verify the reading order against `SOURCE-PAGES/`
  and fix the Markdown where the columns interleave;
- `SOURCE-CLIENT.md` — DOCX text; `**bold**` = coloured/bold in the original
  (usually the answer key);
- `SOURCE-ASSETS.md` — every embedded image with page/position, plus any
  prepared images already in the folder;
- `SOURCE-IMAGES/` and `SOURCE-PAGES/`.

Then open `SOURCE-IMAGES/*.png` once to fill the Съдържание / Упражнение /
Решение columns of `SOURCE-ASSETS.md` (reading order: textbook order). Mark
unclear text as `[CHECK ORIGINAL: file, page]`. Do not re-read the PDF when the
Markdown already answers the question.

Use these Markdown source files to make the crosswalk:

`source file + page → textbook exercise → client change → include/skip`.

If numbering, wording, source versions or answer keys conflict, ask concise
questions and stop. Correct obvious typos only when the textbook confirms them.

Conventions (do not invent others):

- exercise ids `b2-lNN-ex-NN` (sequential digital order), sections
  `b2-lNN-novi-dumi-NN` / `b2-lNN-gramatika-NN` / `b2-lNN-dialozi-NN`;
- vocabulary ids `b2-lNN-vocab-NN`; instruction keys `b2.lNN.exNN` in `b2.ts`;
- cite printed textbook pages, with the PDF index in parentheses;
- titles keep the textbook number (`УПРАЖНЕНИЕ 6`); the app shows its own
  sequence number — do not try to force textbook numbering in the UI;
- `table_fill` points = cells with a dropdown (usually rows × columns), not rows.

Inside the repository, save only `_PLAN-b2-lesson-NN.md`. It must record:

1. Absolute source-folder path and exact authoritative filenames/pages.
2. Every included/skipped source item in order.
3. For every digital item:
   - source page/exercise;
   - id, order, type and points;
   - what the learner sees and does;
   - exact correct/alternate answers;
   - client override;
   - assets and TTS risks.
4. Vocabulary and grammar placement.
5. Shared/B2 component choice and justification for anything new.
6. 1–3 precise Sonnet build batches for a large lesson.
7. Remaining questions and `READY` / `NOT READY`.

Use shared/B2 templates first. Do not invent content, factual distractors or
Bulgarian free-writing tasks. Reference long source passages instead of copying
them, but include enough exact decisions that Sonnet does not need to guess what
Opus intended. Length is a guideline (~150–250 lines): a 40-item lesson may
legitimately need more; a client questionnaire never belongs in the plan.

Do not implement, generate TTS or commit. End with the exact `/b2-build` prompt.
