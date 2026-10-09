# B2-specific exercise components

Use this folder only when no shared exercise template can reproduce the B2
textbook interaction correctly.

## Decision order

1. Check `src/content/shared/EXERCISE_TEMPLATES.ts`.
2. For the current B2-only types, copy from `../B2_EXERCISE_TEMPLATES.ts`.
3. Inspect at most one or two relevant B1 examples for interaction ideas.
4. Prefer a shared type when its behavior is correct.
5. If a B2-only interaction is necessary:
   - add a `b2-...` interface in `../types.ts`;
   - create the component in this folder;
   - register it in `../exercise-components.ts`.

Do not edit or import a B1 component directly. B1 can be a reference, but B2
must remain independent.

## Current B2 components

- `SelectWordsInline` — select words directly inside a text:
  - `mode: 'scored'` checks stable token occurrences;
  - `mode: 'free'` lets learners underline any unfamiliar words without grading.
- `OpinionChoice` — ungraded opinion questions where every response is valid.

## TTS

These two interactions do not expose audio controls and need no TTS collector.
If a future B2 component displays a Listen button or calls
`getTtsAudioPath()`, stop and ask Philip to register its TTS jobs. Alex must not
edit `scripts/generate-tts.ts`.
