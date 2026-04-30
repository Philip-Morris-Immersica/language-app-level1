# Onboarding Guide

This document is for a second developer joining the **UNHCR Bulgarian Language
Platform**. It explains how the project is structured for multi-level work
(A1 / A2 / B1 / B2), how to set up your machine, and how to collaborate
without stepping on each other's toes.

---

## 1. The 60-second mental model

- **One repo, one Next.js app, four CEFR levels.** A1 is in production;
A2 is the current focus for the new collaborator; B1 / B2 are skeleton
placeholders.
- **Templates, types, UI components, i18n, TTS pipeline, and Cursor rules
are SHARED.** Add a new exercise type or rule once → it applies to every
level automatically.
- **Lesson and test CONTENT is per-level.** Each level has its own folder
under `src/content/<level>/`. You can write A2 freely without ever
touching A1.
- **GitHub is the synchronisation layer.** No copying folders on USB sticks.
Everyone clones the same repo, works on a feature branch, opens a PR.

```
src/content/
├── shared/                ← types, EXERCISE_TEMPLATES, TEST_TEMPLATES (USED BY ALL)
├── a1/lessons/, a1/tests/ ← A1 content (production)
├── a2/lessons/, a2/tests/ ← A2 content (start here)
├── b1/, b2/               ← skeletons for the future
├── registry.ts            ← cross-level loaders + lookups
└── index.ts               ← public barrel (back-compat helpers)
```

---

## 2. Machine setup (do this once)

### Prerequisites

- **Node.js 22.x** (use `nvm` so you pick up the version pinned in `.nvmrc`).
- **Git** + a GitHub account that has access to
`Philip-Morris-Immersica/language-app-level1`.
- **Cursor** desktop app (any recent version) — Cursor will read `.cursor/rules/`
automatically once you open the project folder.

### Steps

```bash
git clone https://github.com/Philip-Morris-Immersica/language-app-level1.git
cd language-app-level1
nvm use            # picks up the version from .nvmrc
npm install
```

Then ask the project owner for these three files via a secure channel
(1Password / Bitwarden / Signal — **never email or chat**) and drop them at
the project root:


| File                   | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `.env`                 | Database URL (Neon)                               |
| `.env.local`           | Google TTS API key + dev secrets                  |
| `service-account.json` | Google Cloud service account for the TTS pipeline |


Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3010](http://localhost:3010). You should see the level selection screen.
Click **A1** → you should see lessons 0–11 and tests 1–6.

### Optional but recommended

```bash
npm run content:lint       # static linter for content quality
npm run check:audio        # verifies MP3 files are real binaries (not LFS pointers)
```

These should both pass before you commit anything content-related.

---

## 3. Branch & PR workflow

We use plain GitHub flow:

- `main` — always deployable; reviewed code only.
- Feature branches per piece of work — short-lived (≤ 1 week).

**Branch naming convention:**


| Pattern        | Example                    | When                      |
| -------------- | -------------------------- | ------------------------- |
| `a2/lesson-NN` | `a2/lesson-01`             | New A2 lesson             |
| `a2/test-N`    | `a2/test-1`                | New A2 test               |
| `fix/<area>`   | `fix/tts-numbers`          | Fix shared infrastructure |
| `feat/<area>`  | `feat/dialogue-builder-v2` | Cross-level feature       |


**Daily loop:**

```bash
git checkout main
git pull
git checkout -b a2/lesson-01

# ... work, commit often ...

git push -u origin a2/lesson-01
# Open a Pull Request from this branch into main on GitHub
```

If your PR conflicts with `main` (because the other person merged something
first), rebase locally:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

**Code review:** the project owner reviews every A2 PR before merging. Don't
merge your own PRs without a review — that's how regressions sneak into A1.

**Anyone can push commits to anyone else's branch.** If the owner wants to
fix something on the collaborator's `a2/lesson-01` branch directly, they just:

```bash
git fetch
git checkout a2/lesson-01
# fix something
git commit -am "..."
git push
```

This is the answer to *"мога ли да и правя подобрнеия ако не се справя?"* — yes,
trivially.

---

## 4. Adding an A2 lesson — step by step

> Read the full content guide first: `.cursor/rules/content-lessons.mdc`. The
> rules apply 1:1 to A2.

1. **Create the folder** `src/content/a2/lessons/a2-lesson-01/` with five
  files (use lesson-01 from A1 as a reference for structure):
  - `metadata.ts` — `id: 'a2-lesson-01'`, number, title, description, grammarTopics, vocabulary
  - `content.ts` — introduction, dialogues, sections, vocabulary, cultural notes
  - `exercises.ts` — all in-lesson exercises in PDF order
  - `workbook.ts` — Преговор exercises
  - `index.ts` — re-export `lessonData`
2. **Register the lesson** in `src/content/a2/index.ts`:
  - Append a loader to `A2_LESSON_LOADERS`
  - Append metadata to `A2_LESSONS_METADATA`
  - Append a sidebar entry to `A2_NAV_ITEMS`
  - Set the exercise count in `A2_LESSON_EXERCISE_COUNTS`
3. **Drop assets** (images, PDFs) under `public/assets/a2-lesson-01/…`.
4. **Generate TTS:** `npm run tts:generate -- --lesson 01 --model gemini`
  (the script auto-detects which level the folder belongs to).
5. **Run the linter:** `npm run content:lint -- --lesson 01`
6. **Run the dev server,** click through the lesson in the browser, fix issues.
7. **Commit, push, open PR.**

The lesson is automatically picked up by `/lessons/a2-lesson-01` and the
sidebar — no other code changes needed.

### A2 ID conventions

A1 keeps un-prefixed IDs (`lesson-XX`) for backward compatibility with the
production database. **A2 IDs are level-prefixed:**


| Element  | Format         |
| -------- | -------------- |
| Lesson   | `a2-lesson-XX` |
| Exercise | `a2-lXX-ex-NN` |
| Workbook | `a2-lXX-wb-NN` |
| Test     | `test-a2-N`    |


The full table is in `.cursor/rules/content-lessons.mdc`.

---

## 5. Files you should NOT commit

- `.env`, `.env.local` — secrets (`.gitignore` already covers them)
- `service-account.json` — Google credentials (`.gitignore` already covers it)
- `node_modules/` — regenerated by `npm install`
- `.next/` — build output
- `*.tsbuildinfo` — TypeScript incremental cache

If you ever see one of these in `git status`, stop and ask before committing.

---

## 6. Cursor specifics

- The `.cursor/rules/` folder is committed to git, so we share the same AI
guardrails. When the project owner adds or refines a rule, you get it
with `git pull`.
- Cursor's chat history (transcripts) is **per-machine**, not shared. If
you want to hand off context after a long thinking session, write a
short summary into a markdown file in the repo (the project already
contains `IMPLEMENTATION_SUMMARY.md`, `FEEDBACK-RESPONSE-FULL.md` —
add similar files when needed).
- MCP servers are configured per-machine; the project doesn't currently
require any.

---

## 7. Where to look when something breaks


| Symptom                              | First place to look                                         |
| ------------------------------------ | ----------------------------------------------------------- |
| Lesson page 404                      | Is the loader registered in `src/content/<level>/index.ts`? |
| Test page "Съдържанието се подготвя" | Is the test loader registered? Does the folder exist?       |
| Sidebar missing an item              | `<LEVEL>_NAV_ITEMS` in the level's index file               |
| Audio not playing                    | `npm run check:audio`; then check `tts-audio` rule          |
| TypeScript errors after a refactor   | `npx tsc --noEmit` — never commit on red                    |
| Linter warnings                      | `npm run content:lint`                                      |
| Production progress lost             | **Stop.** Don't change A1 IDs. Talk to the project owner.   |


---

## 8. Useful commands

```bash
npm run dev                         # local dev server (port 3010)
npm run build                       # production build (also runs check:audio)
npx tsc --noEmit                    # full TypeScript check
npm run lint                        # next lint
npm run content:lint                # content quality linter
npm run content:lint -- --lesson 04 # single lesson
npm run tts:generate -- --lesson 04 --model gemini  # generate TTS
npm run check:audio                 # verify MP3 integrity
npm run db:studio                   # open Drizzle Studio
```

