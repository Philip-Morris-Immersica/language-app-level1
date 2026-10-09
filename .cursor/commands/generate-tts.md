# Generate or Correct Lesson TTS

Recommended agent: Composer 2.5 Fast or Grok 4.7 High Fast. Use Sonnet only
when the audit reveals a linguistic/content problem.

Read `.cursor/rules/tts-audio.mdc`.

## Inputs

- Full lesson id (`lesson-04`, `a2-lesson-03`, `b1-lesson-12`,
  `b2-lesson-01`) or test suffix.
- First generation or correction.
- For correction: exact exercise/clip and what sounds wrong.

## Workflow

1. Content must be frozen.
2. Run exact lesson lint:

   ```powershell
   npm run content:lint -- --lesson <full-lesson-id>
   ```

3. Run read-only preflight:

   ```powershell
   npm run tts:audit -- --lesson <full-lesson-id>
   ```

4. Fix obvious spoken-form issues in content fields only. Never edit the TTS
   script from an author branch.
5. First generation: delete nothing.
6. Correction: delete only the exact affected MP3.
7. Generate:

   ```powershell
   npm run tts:generate -- --lesson <full-lesson-id> --model gemini
   ```

8. Verify:

   ```powershell
   npm run tts:audit -- --lesson <full-lesson-id>
   npm run check:audio
   ```

9. Report generated/skipped/failed files and a short human listening checklist.

Do not commit before the user approves the sound. For B2 prefer `/b2-tts`,
which includes the same workflow plus B2 ownership rules.
