# Build a B2 lesson

Use **Sonnet 5.5 High**, Agent mode, in a new chat.

Read `.cursor/rules/alex-b1-b2.mdc` and the approved
`_PLAN-b2-lesson-NN.md`. Take exact texts and answers from the
`SOURCE-TEXTBOOK.md` / `SOURCE-CLIENT.md` files the plan points to; open an
original PDF/DOCX only for a `[CHECK ORIGINAL]` marker. Implement only the
requested lesson or build batch.

Use shared templates first; B1 is reference only. Keep all new B2 code inside
the B2 domain. Do not invent missing content, require Bulgarian typing, add
sections/finalization, generate TTS or edit shared/scripts.

Copy every text exactly; count paragraphs/bullets against the source. Never
give two different words the same dictionary gloss.

For the final batch, verify every plan `order + id`, client factual correction,
loader, scored exercise count and total points.

Run:

```powershell
npm run content:lint -- --lesson b2-lesson-NN
npx tsc --noEmit -p . 2>&1 | Select-String "b2-lesson-NN|b2/index|i18n/b2"
```

Lint must have 0 errors. `tsc` exits with code 2 because of old errors in other
levels — only lines for this lesson matter. A warning caused by the source
order (e.g. true/false sequence) stays; note it in the report.

At the end, append 1–3 `Handoff Batch N:` lines to the plan's Build batches
section (things the next batch must know, e.g. vocabulary already added).
Report deviations from the plan. Do not commit unless explicitly asked.
