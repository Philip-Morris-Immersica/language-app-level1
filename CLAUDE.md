# Инструкции за Claude Code

Източникът на истината за правилата са файловете в `.cursor/rules/*.mdc` и `.cursor/commands/*.md`.
Не ги дублираме тук — този файл само ги свързва, за да работят еднакво в Cursor и в Claude Code.
Когато правило се промени в `.cursor/`, важи автоматично и тук.

**Език:** потребителят (Philip, team lead) говори на български — винаги отговаряй на български.

## Винаги активни правила (зареждат се автоматично)

@.cursor/rules/project-overview.mdc
@.cursor/rules/branch-hygiene.mdc
@.cursor/rules/git-workflow.mdc
@.cursor/rules/cost-optimization.mdc

## Правила по контекст — прочети ги ПРЕДИ да пипаш съответните файлове

Правилата с `globs` в Cursor се прилагат сами; тук ги чети ръчно с Read.

| Работиш по | Прочети |
|---|---|
| `src/content/**` | `content-lessons.mdc`, `content-quality-checklist.mdc` |
| `src/content/**/tests/**` | `content-tests.mdc` |
| `src/content/b1/**`, `src/content/b2/**`, `src/i18n/b1.ts`, `src/i18n/b2.ts`, `public/assets/b1-*|b2-*` | `alex-b1-b2.mdc` |
| `src/content/a2/**`, `src/i18n/a2.ts` | `nina-a2.mdc` |
| `src/components/**` | `design-system.mdc`; за `components/exercises/**` и `exercise-ui.mdc`; `shadcn-ui.mdc` |
| `src/app/**`, `components/layout/**` | `platform-ui.mdc` |
| `src/i18n/**` | `i18n-translations.mdc` |
| `src/db/**` | `drizzle-database.mdc` |
| TTS / `public/assets/**/audio/tts/**` / `scripts/generate-tts.ts` | `tts-audio.mdc` |
| ревю на урок | `lesson-qa-review.mdc` |
| финализиране на ниво, `pretranslate.ts`, `celebration.ts` | `level-finalize.mdc` |
| мърдж на PR-и от Нина/Алекс, споделен код | `philip-team-lead.mdc` |

## Команди от Cursor

Когато потребителят напише `/b2-lesson`, `/b2-plan`, `/b2-build`, `/b2-review`, `/b2-fix`,
`/b2-tts`, `/generate-tts` или `/generate-cursor-rules`, прочети `.cursor/commands/<име>.md`
и изпълни написаното в него. Разпределението на модели по роли (Opus/Sonnet/Composer)
от правилата тук не се прилага автоматично — работи с текущия модел.

## Предпазни мерки

- Никога не отваряй и не показвай `.env`, `.env.local`, `service-account.json`.
- Спазвай файловата собственост от `branch-hygiene.mdc`: ако работиш като Alex/Nina, не пипай A1/A2,
  `shared/**`, `components`, `lib`, `app`, `db`, `scripts`, `ui.ts`.
- Проверка на съдържание: `npm run content:lint -- --lesson <пълен-id>`; аудио: `npm run check:audio`.
- Не комитвай и не пушвай без изрична заявка. Текущ клон за Philip: `philip`.
