# Review a B2 lesson

Use **Sonnet 5.5 High**. Report first; do not edit without approval.

Follow `.cursor/rules/lesson-qa-review.mdc` and run full-ID lint first.

Read the `_PLAN` to find the source folder. Use its local:

- `SOURCE-TEXTBOOK.md`;
- `SOURCE-CLIENT.md`;
- `SOURCE-ASSETS.md`.

Compare every reading/dialogue/grammar text block in the lesson against
`SOURCE-TEXTBOOK.md` sentence by sentence — a silently omitted or altered
sentence is a blocker. Reopen original PDF/DOCX/screenshots (or
`SOURCE-PAGES/`) only for `[CHECK ORIGINAL]` markers, changed source files,
visual image/layout questions or a suspicious answer. Do not reread every page.
Treat plan decisions (R*/D*) as final; flag only their side effects.

Compare three layers:

1. Original textbook.
2. Explicit client changes.
3. Implemented lesson.

Verify include/skip decisions, order, wording, answer keys, alternatives,
points, assets, vocabulary/grammar placement, invented distractors,
free-writing, component behavior and TTS-sensitive text. If an original file
cannot be read, report a blocker instead of guessing.

Return only:

- blockers;
- should-fix;
- nits;
- passed checks (short);
- the correction batch.

Each finding: exercise id, exact current text and exact replacement text or
code, so it can be applied without rereading the sources. Mark findings that
change scoring or a plan decision as `needs decision`.
