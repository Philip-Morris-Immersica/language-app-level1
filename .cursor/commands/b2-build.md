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

For the final batch, verify every plan `order + id`, client factual correction,
loader and scored exercise count.

Run:

```powershell
npm run content:lint -- --lesson b2-lesson-NN
```

Fix errors and report warnings/blockers. Do not commit unless explicitly asked.
