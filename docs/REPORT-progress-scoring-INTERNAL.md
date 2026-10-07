# Progress & scoring overhaul — internal report

Решенията и мотивите са описани в `docs/progress-scoring-DECISIONS.md`. Тук: бъгове,
архитектура, данни, deploy и как да се поддържа.

## Root causes

| # | Бъг | Причина |
|---|---|---|
| 1 | Тестовете дават 0–10% при почти пълен тест | `testScoring.ts` разпознаваше само няколко формата на state; за `dropdown_match`, `word_order` (state като обект), `dialogue_builder`, `workbook_fill_blank` (legacy) и др. връщаше 0 или `null`. |
| 2 | Различен % на Home / LevelMap / профил / админ | Три независими формули (`/api/progress/summary`, `userProgress.ts`, клиентски сметки), различни знаменатели (с/без пасивни упражнения, с/без `lesson-00`). |
| 3 | Урокът никога не е 100% | Броеше се „има state", а пасивните упражнения (аудио, речник, граматика, flip карти) не записват state. Някои компоненти пък записват при mount → фалшив напредък. |
| 4 | Админ данните орязани | `wrong.slice(0, 8)` в обобщението; тест „завършен" при ≥80% опит, независимо от проверката. |
| 5 | Примерите носят точки | `true_false` / dropdown / image labeling с `isExample` се броят в `validation`. |

## Архитектура

```
src/lib/grading/index.ts        classifyExercise · gradeExercise · contentUnits · isRequiredForCompletion
src/lib/testScoring.ts          точки = Σ round(correct/total × points) по секция, cap до maxPoints
src/lib/learnerProgress/core.ts чисто изчисление: ItemDefinition (cached) + computeItemProgress / computeLevelProgress
src/lib/learnerProgress/store.ts DB: loadInputs, recordTouches, recordSave, кеш (write-through)
src/lib/admin/userProgress.ts   API-съвместими обвивки за админ / профил / чат / отчети
```

**Нови таблици** (създадени в production със `scripts/create-progress-tables.ts`):

- `exercise_activity` — по (user, lesson, exercise): first/last touched, first/last submitted,
  `best_score_permille`. Пише се от `/api/progress/activity` (кликове, batch 1 s +
  `sendBeacon`) и от `/api/progress/save` (при submit).
- `lesson_progress_summary` — кеш на `ItemProgress` за всеки (user, item). Невалиден при
  промяна на `GRADING_ENGINE_VERSION` или `contentSig` (брой countable/required/graded,
  units, точки на теста) → преизчислява се при четене.
- `admin_stats_snapshot` — `platform_progress_v1` (дашборд), `activity_tracking_since`.

**Пътища на четене**

- Един ученик (профил, sidebar, level map, чат): live изчисление + write-through в кеша.
- Много ученици (списък, нива, отчети): от кеша, stale редове се преизчисляват.
- Дашборд: snapshot. Cron `GET /api/cron/refresh-stats` (03:00 UTC, `vercel.json`) прави
  пълен recompute (~42 s / 827 users); бутонът `POST /api/admin/stats/refresh` пресмята
  само snapshot-а (~0.6 s).

## Дефиниции

| Термин | Дефиниция |
|---|---|
| countable | `kind !== 'none'` (`b1-info-highlight` е none) |
| touched | има activity ред ИЛИ state с реален вход (`hasUserInput`) |
| required | graded и типът не е в `COMPLETION_OPTIONAL_TYPES` |
| урок completed | всички required са проверени поне веднъж; ако няма required → всички countable са touched |
| percent | 100 ако completed, иначе `min(99, touched/countable)` |
| accuracy | Σ correct / Σ units само по проверени graded упражнения |
| ниво % | средно от всички items на нивото (непочнати = 0), items с countable = 0 се изключват |
| текущо ниво | най-високото с какъвто и да е напредък |

## Проверка

- `npx tsx scripts/audit-grading.ts` — перфектен state за всяко graded упражнение →
  пълни точки и сума по секции = `maxPoints`. **805 / 805 OK.** Пусни го след всяко
  ново упражнение или нов тип (exit 1 при грешка). Замества planned content:lint правилото.
- Реални данни: 18 516 проверени states минаха през новия грейдър; ~50 legacy states
  с проверка по изречение дават очаквана разлика само в checker-а.
- Юрий (user live = кеш):
  - тестове A1-1 98/99, A1-2 77/77, A1-3 107/112 (СЛУШАНЕ не е проверено),
    A1-4 67/69, A1-5 58/60, A1-6 69/69, A2-1 75/75;
  - A1 90%, уроци 8/12, тестове 5/6; A2 25%.
- Платформа (snapshot): A1 736 активни / 8% ср.; A2 38 / 8%; B1 9 / 27%.

## Данни в production (направено)

1. `scripts/create-progress-tables.ts` — additive `CREATE TABLE IF NOT EXISTS`.
2. `scripts/backfill-activity.ts` — 22 503 states → 20 232 activity реда (touched от
   `hasUserInput`, submitted от проверени states, best score от текущия).
3. `scripts/recompute-progress.ts` — 827 users.

## Deploy (остава)

1. Commit в `philip` → PR → merge в `master` (Philip).
2. Vercel → Environment Variables → `CRON_SECRET` (произволен дълъг низ). Vercel сам праща
   `Authorization: Bearer <CRON_SECRET>` към cron-а.
3. След deploy (за да хване кликовете между backfill-а и deploy-а):
   `npx tsx scripts/backfill-activity.ts --reset-tracking-date` и
   `npx tsx scripts/recompute-progress.ts`.

## Поддръжка

- **Нов тип упражнение:** добави го в `GRADABLE_TYPES` + адаптер в `gradeExercise`
  (или `validationKeys`), пусни `audit-grading.ts`.
- **Промяна на правило за оценяване/завършване:** вдигни `GRADING_ENGINE_VERSION` —
  кешът се самообновява при четене; за дашборда пусни `recompute-progress.ts` или изчакай cron-а.
- **Промяна на съдържание** (брой упражнения/точки): `contentSig` се сменя автоматично.
- Не добавяй нови места, които смятат % сами — ползвай `getUserProgressBundle` /
  `getUsersProgress` / `/api/progress/summary`.
