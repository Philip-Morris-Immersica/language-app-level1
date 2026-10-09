# Correct a B2 lesson

Use **Sonnet 5.5 High** for content/answer/component changes. Composer/Grok is
enough for one exact spelling or path fix.

Read `.cursor/rules/alex-b1-b2.mdc`. Change only the named exercise IDs and use
the smallest correct diff. Do not refactor unrelated work or generate TTS.

Run:

```powershell
npm run content:lint -- --lesson b2-lesson-NN
```

Report what was fixed and any decision still needed. If generated spoken text
changed, list the affected audio clips for later TTS regeneration.
