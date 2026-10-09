# B2 TTS

Use **Composer 2.5 Fast** or **Grok 4.7 High Fast** after content is approved.
Read `.cursor/rules/tts-audio.mdc`.

Run full-ID content lint and TTS audit first. Stop on audit errors; fix obvious
spoken-form issues only through lesson content fields. Never edit the TTS script.

For first generation, delete nothing. For a correction, delete only the named
affected MP3. Then run:

```powershell
npm run tts:generate -- --lesson b2-lesson-NN --model gemini
npm run tts:audit -- --lesson b2-lesson-NN
npm run check:audio
```

Report generated/failed files and what must be human-listened. Do not commit
before sound approval. Escalate linguistic or structural problems to Sonnet.
