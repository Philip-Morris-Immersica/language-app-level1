# B1 Custom Exercise Components

This folder is the **B1 domain** for new or B1-specific exercise components.
Anything Алекс adds here is picked up by `ExerciseRenderer` through the
`B1_CUSTOM_RENDERERS` map in `../exercise-components.ts` — **the shared
`ExerciseRenderer.tsx` switch does NOT need to be edited**.

This mirrors the A2 domain (`src/content/a2/components/`). Keeping B1
self-contained is what keeps merges into `master` clean.

## When to add a component here

| Need | Where it goes |
|---|---|
| Brand-new exercise type that doesn't fit any shared type | Here — create `MyNewType.tsx` + register it |
| B1-specific visual variant of an existing component (e.g. centered scene-dialogue) | Here — wrap the shared component or fork it for B1 |
| Tweak shared component for **all** levels | Ask Philip — that goes in `src/components/exercises/` |

The third row keeps the shared code consistent. Use this folder when the change
is **B1-only** or **opt-in via a new `type` value**.

## How to add a component

1. **Define the type** in `../types.ts`:

   ```ts
   export interface B1MyTypeExercise extends BaseExercise {
     type: 'b1-my-type';
     // …your fields…
   }

   // and add to the union:
   export type B1Exercise = B1MyTypeExercise;
   ```

2. **Build the component** in this folder. Keep the props signature compatible
   with the renderer call:

   ```tsx
   // src/content/b1/components/MyType.tsx
   'use client';

   import type { B1MyTypeExercise } from '../types';

   interface Props {
     exercise: B1MyTypeExercise;
     onComplete?: (correct: boolean, score: number) => void;
     exerciseId?: string;
   }

   export function MyType({ exercise, onComplete, exerciseId }: Props) {
     // …your UI…
     return <div>…</div>;
   }
   ```

3. **Register it** in `../exercise-components.ts`:

   ```ts
   import { MyType } from './components/MyType';
   export const B1_CUSTOM_RENDERERS: Record<string, CustomExerciseRenderer> = {
     'b1-my-type': MyType as unknown as CustomExerciseRenderer,
   };
   ```

4. **Use it** in your lesson `exercises.ts` like any other exercise:

   ```ts
   { id: 'b1-l03-ex-01', type: 'b1-my-type', instruction: '...', order: 1, ... }
   ```

That's it — no edits to `ExerciseRenderer.tsx`, no edits to `shared/types.ts`,
no edits to `ui.ts`. Clean mergeable diff.

## Variants of existing shared components

Sometimes you don't need a new exercise type — just a different look for an
existing one. Two options:

- **Wrap and customize**: import the shared component, render it in a wrapper
  with extra layout/styles. Register the wrapper under a new `type` (e.g.
  `'b1-dialogues-scene-v2'`).
- **Fork minimally**: copy the part of the shared component you need, edit
  only the visual bit. Document why the fork exists at the top of the file.

The first option keeps you in sync with future shared improvements.
