# HANDOFF — A2: мърдж към master + финализиране на нивото

**Режим:** план / изпълнение по фази. **1 чат = 1 фаза.** Всеки нов чат чете
**само** секция „Факти“ + своята фаза. Не разглеждай уроци извън фазата си.
Не чети `exercises.ts` на уроци, които не са в обхвата ти.

**Задължение на всеки агент (не пропускай):**
1. Обнови чекбокса в „Статус“ най-долу.
2. Добави запис в „Работен дневник“ — какво е направено, кой комит, кой гейт е минал.
3. Фазата **не е готова**, докато `git status` не е чист. „Изпълнено“ ≠ „комитнато“
   — това е реалният провал от предишния handoff (виж Фаза 4.5 в
   [HANDOFF-alex-merge.md](HANDOFF-alex-merge.md)).

**Правила, които важат навсякъде:**
[branch-hygiene](../.cursor/rules/branch-hygiene.mdc) ·
[philip-team-lead](../.cursor/rules/philip-team-lead.mdc) ·
[i18n-translations](../.cursor/rules/i18n-translations.mdc) ·
[content-quality-checklist](../.cursor/rules/content-quality-checklist.mdc) ·
[cost-optimization](../.cursor/rules/cost-optimization.mdc)

---

## Факти (не преоткривай — платено е)

### Клонове (към 2026-09-03)
- `master` tip: `e5564c8` (PR #14 — phase 4 findings and asset audit)
- `origin/nina`: `ccb3173`, **9 комита пред** master, **63 назад**. Всичко е
  корекции от обратната връзка на клиента по уроци 05–10 и тестове 4–6.
- Работен клон за мърджа: **`a2-merge`** (създаден от `origin/nina`, master вече
  е мърджнат в него). Локалният `nina-merge` е стар (`c6df49f`, вече в master
  чрез PR #10) — **игнорирай го, не го force-move-вай, не го push-вай.**
- `philip` — клонът за финализиращата работа (Фази 2–5).

### Мърджът е чист — проверено детерминистично
- 68 файла в diff-а спрямо master, **всичките** в домейна на Нина:
  `src/content/a2/**`, `public/assets/a2-lesson-*`, `public/assets/test-a2-*`,
  `src/i18n/a2.ts`.
- `git merge master` → **нула конфликта**.
- Diff спрямо master по `src/content/shared`, `registry.ts`, `content/index.ts`,
  `src/components`, `src/lib`, `src/app`, `src/db`, `src/i18n/ui.ts`, `scripts`,
  `package.json`, `next.config.ts` → **празно**. Нищо споделено не е пипнато.
- `npm run content:lint` → **0 errors, 32 warnings** — идентично на заварената
  база от предишния мърдж. Всичките 32 са в **A1** уроци 05/06/11. **Нула нови
  от A2.**

### Обхват на A2
11 урока (`a2-lesson-00` … `a2-lesson-10`) + 6 теста (`test-a2-1` … `test-a2-6`).
Брой упражнения по урок: 00=32, 01=25, 02=45, 03=31, 04=26, 05=21, 06=26,
07=43, 08=31, 09=22, 10=41. Общо **343**.

### Какво липсва на A2 спрямо финализирания A1

| Стъпка | Механизъм | A1 | A2 | Фаза |
|---|---|---|---|---|
| Предварителни преводи | `scripts/pretranslate.ts` → `src/i18n/generated/translations.json` | 2 598 записа | **0** | 2 |
| Раздели (сгъваеми части) | `sectionStart` в `exercises.ts` | 56 в 11 урока | **0** | 3–4 |
| Празненства при завършване | `CELEBRATION_ENABLED_LESSONS` в `src/lib/celebration.ts` | уроци 01–11 | **нито един** | 5 |

### Какво A2 ВЕЧЕ има — не го пипай
- **Граматичен справочник** `grammarReference` на 7 езика: 11/11 урока. Готово.
- **`instructionKey`**: 75 употреби, 60 ключа в `src/i18n/a2.ts`. A2 е **пред** A1
  (54). Готово.
- Всичко от `src/components` / `src/lib` работи за A2 **автоматично**, без
  промяна в съдържанието: `renderBoldText`, `AudioIcon`, `AudioChoice`,
  чатбот `currentExercise` контекст, „продължи откъдето спря“ банер.

### Какво липсва и на двете нива (НЕ е регресия на A2)
Речниковите глоси (`VocabularyItem.translation` / `translations`) са празни и в
A1, и в A2. A1 се спасява през pretranslate кеша → **Фаза 2 покрива и A2.**
Не пипай полето ръчно.

### Тестовете НЕ получават раздели
A1 тестовете имат **нула** `sectionStart` — тестовете ползват друг механизъм
(`sections` в test обекта). Обхватът на Фази 3–4 е **само 11-те `exercises.ts`
на уроците**. Не пипай `workbook.ts` — `celebration.ts` третира workbook масива
като финалния раздел „Преговор“ автоматично.

### `sectionStart` — точният тип и шаблон

Дефиниция: `src/content/shared/types.ts:82-93` (в `BaseExercise`).

```ts
sectionStart?: {
  title: string;        // чист български, БЕЗ markdown
  subtitle?: string;    // кратко описание, БЕЗ markdown
  titleI18n?: Record<string, string>;     // 6 езика: en, fr, ar, fa, uk, ru (БЕЗ bg)
  subtitleI18n?: Record<string, string>;  // 6 езика
  theme?: 'vocabulary' | 'grammar' | 'dialogue' | 'reading' | 'review';
};
```

Еталонен пример — `src/content/a1/lessons/lesson-05/exercises.ts:30-50`:

```ts
{
  id: 'l05-ex-01',
  type: 'image_labeling',
  instruction: 'Знаете ли тези места? Изберете в кои градове се намират.',
  order: 1,
  sectionStart: {
    title: 'Места в града и селото',
    subtitle: 'Нови думи за сгради и места, снимки и упражнения за разпознаване',
    titleI18n: {
      en: 'Places in the town and the village',
      fr: 'Lieux en ville et au village',
      ar: 'أماكن في المدينة والقرية',
      fa: 'مکان‌ها در شهر و روستا',
      uk: 'Місця в місті та селі',
      ru: 'Места в городе и селе',
    },
    subtitleI18n: {
      en: 'New words for buildings and places, photos and recognition exercises',
      fr: 'Nouveaux mots pour les bâtiments et les lieux, photos et exercices de reconnaissance',
      ar: 'كلمات جديدة عن المباني والأماكن، وصور وتمارين تمييز',
      fa: 'کلمات جدید برای ساختمان‌ها و مکان‌ها، عکس‌ها و تمرین‌های تشخیص',
      uk: 'Нові слова для будівель і місць, фото та вправи на впізнавання',
      ru: 'Новые слова для зданий и мест, фотографии и упражнения на распознавание',
    },
    theme: 'vocabulary',
  },
  points: 5,
  // …останалото на упражнението остава непокътнато
}
```

Наблюдения от A1, които са задължителни и за A2:
- `sectionStart` стои на **първото упражнение** на раздела, вмъкнат веднага
  след `order: N,`.
- Заглавията са **смислови теми** („Адрес и диалози“, „Предлози, посоки и числа“),
  **не** генерични етикети („НОВИ ДУМИ“, „ГРАМАТИКА 1“). Затова `titleI18n`
  блоковете от A1 **не са** за копиране — A2 иска свои.
- Български термин в превода се оставя в кавички + гло̀са в скоби:
  `„живея" (to live)`, `«улица» (شارع)`.
- A1 има **4–7 раздела на урок**. Рендерирането е `src/components/LessonParts.tsx`;
  липсващ език пада на авто-превод, нищо не се чупи.

### Операционни капани (наследени, потвърдени)
- **Не пускай `npm run build` докато `next dev` работи.** Споделената `.next`
  папка се чупи → `ChunkLoadError` / страница без CSS / `MODULE_NOT_FOUND` за
  `vendor-chunks`. Лек: спри dev процеса, `Remove-Item -Recurse -Force .next`,
  `npm run dev`. Не е симптом за проблем в кода.
- **`npm run build` НЕ прави type-check** — `next.config.ts` има
  `typescript.ignoreBuildErrors: true` + `eslint.ignoreDuringBuilds: true`.
  За типова проверка: `npx tsc --noEmit`, но там има **заварени** грешки в
  `a2/types.ts`, `b1/types.ts` и някои уроци — не са регресия, извън обхвата.
- **`content:lint --lesson` приема само НОМЕР**, не пълен id.
  `--lesson 03` → линтва `lesson-03` + `a2-lesson-03` + `b1-lesson-03`.
  `--lesson a2-lesson-03` → „No lessons matched“. (`scripts/content-lint.ts:868-874`)
- **Непрефиксиран ключ в `<level>/exercise-components.ts` е тих leak към A1.**
  Не добавяй такива. Няма нужда в този поток, но го знай при ревю.
- `rg` не е в PATH на тази машина. Ползвай Grep tool-а, не `rg` в терминала.
  `| cat` в PowerShell гърми — не го ползвай в git команди.

### Pretranslate — инфраструктурата, както е днес

- Скрипт: `scripts/pretranslate.ts`. npm: `package.json:22` →
  `"pretranslate": "dotenv -e .env.local -- tsx scripts/pretranslate.ts"`.
- Модел: **GPT-5.5** през OpenAI SDK. Ключ: `OPENAI_API_KEY` в `.env.local`
  — **потвърдено, че е налице** на тази машина. Харчи **OpenAI кредити, не
  Cursor токени.**
- Аргументи: `--lesson 05`, `--test 3`, `--all`, `--glossary-only`, `--dry-run`,
  `--force`.
- Изход: **само** `src/i18n/generated/translations.json`. Работи
  **merge/append**, презаписва файла след всеки батч → безопасно е да се
  прекъсва и да се пуска повторно. `--force` пре-превежда вече съществуващи
  ключове.
- **НЕ** пише в `src/i18n/translationOverrides.ts` — чете го само като филтър
  „вече покрито“ (116 ръчни записа, ключове = суров български текст, не са
  привързани към ниво).
- Runtime lookup (`src/i18n/useTranslate.ts:120-152`):
  `translationOverrides` → `generated/translations.json` → `localStorage` кеш →
  жив Google Translate. Тоест празен слот никога не чупи UI.
- **Закован е за A1** — трите места, които искат кръпка:
  - `import { A1_LESSONS_METADATA } from '@/content/a1'` (`:66`), ползван в
    glossary pass-а (`:430`) и в `--all` (`:526`)
  - нормализация на lesson id (`:536`) — прави `lesson-${padStart}`, затова
    `--lesson a2-lesson-03` става `lesson-a2-lesson-03` → не се намира
  - test id (`:546`) — твърдо `test-a1-${n}`; `--all` цикли `test-a1-1..6` (`:531-534`)
- **`sectionStart` НЕ се събира от скрипта** (проверено — нула съвпадения).
  Затова разделите в A2 се превеждат ръчно през `titleI18n` / `subtitleI18n`,
  както в A1 — реши се в D3.

### Gating — A2 е скрит само на един домейн
`src/lib/enabledLevels.ts` е **fail-open**: връща всички нива за всеки хост,
който не е изрично в `A1_ONLY_HOSTS` (там е само
`bulgarian-for-refugees-unhcr.vercel.app`). Тоест localhost, preview линковете и
всеки друг домейн **вече показват A2**. Пускането на A2 публично = решение за
този списък / `NEXT_PUBLIC_ENABLED_LEVELS`, не код. Не е част от този поток.

---

## Решения (Philip, взети преди старта)

| # | Въпрос | Решение |
|---|---|---|
| D1 | Ред на работа | **Мърдж първо.** A2 влиза в master както е (само корекциите на Нина), после финализирането идва в отделни PR-и от `philip`. Причина: не смесваме съдържателните корекции от клиента с инфраструктурна работа в един PR — ако нещо гръмне, ясно е какво да се върне. |
| D2 | Клон за мърджа | `a2-merge` от `origin/nina` + `merge master`. **Не** force-move-вай стария `nina-merge`. **Никога** `git push origin nina`. |
| D3 | Механизъм за преводите на разделите | **Като A1** — inline `titleI18n` / `subtitleI18n` в content файла, 6 езика. Не разширяваме `pretranslate.ts` да покрива `sectionStart`. Причина: консистентност с A1 и гарантирано качество на най-видимия UI елемент. |
| D4 | Раздели + празненства за A2 | **Да, всички 11 урока.** Потвърдено от Philip — това е дизайнът на платформата. Уговорка: **дизайнът на самите упражнения и останалите елементи не се променя** (виж „Гаранцията“ по-долу). |
| D5 | Тестове | Извън обхвата. A1 тестовете също нямат раздели. |
| D6 | Обхват на pretranslate кръпката | Направи флага **generic** (`--level a1\|a2\|b1\|b2`), не A2-специфичен — B1 ще иска същото и е безплатно да се направи веднага. |
| D7 | PR-и | Три отделни: **PR A** = мърдж (Фаза 1) · **PR B** = pretranslate (Фаза 2) · **PR C** = раздели + празненства (Фази 3–5). |

### Гаранцията „нищо по A2 не се омазва“

`sectionStart` е **допълнително поле** върху съществуващ обект — не пренаписва
упражнението. Затова има механична проверка, която всеки агент от Фази 3–4
**е длъжен** да пусне и да я запише в дневника:

```
git diff --numstat HEAD -- src/content/a2/lessons/<lesson>/exercises.ts
```

Второто число (изтрити редове) трябва да е **0**. Ако не е — агентът е пипнал
съдържание и промяната се отхвърля. Допустимо изключение няма.

Допълнително, за целия PR C:
```
git diff --stat master -- . ":!src/content/a2/lessons/*/exercises.ts" ":!src/lib/celebration.ts" ":!docs/HANDOFF-a2-finalize.md"
```
→ трябва да е **празно**.

---

## Фази (1 чат = 1 фаза)

### Фаза 0 — този документ · модел: текущият
Готово в planning чата (2026-09-03). Не повтаряй git inventory-то, не
преоткривай кое липсва — всичко е в „Факти“.

---

### Фаза 1 — мърдж на A2 → master · модел: **евтин (почти само shell)** · ГОТОВО

Изпълнено в planning чата. **[PR #15](https://github.com/Philip-Morris-Immersica/language-app-level1/pull/15)**
е отворен и чака мърдж от Philip през GitHub.

PR-ът се мърджва с **merge commit**, не squash — така историята на Нина остава
в master и нейният ре-синк е fast-forward.

Остава за Philip (ръчно, в GitHub):
1. Мърджни PR #15 (merge commit).
2. Провери Vercel production deploy на master → success.
3. Кажи на Нина да си ре-синкне: `git checkout nina; git fetch origin; git merge origin/master`.
   Мърджът ѝ е **fast-forward** (`origin/nina` става ancestor на master) →
   няма как да гръмне конфликт. После да изтрие `.next` и да рестартира dev.

Подробностите са в „Работен дневник“ → Фаза 1.

---

### Фаза 2 — pretranslate за A2 · модел: **Sonnet 5**

Два под-етапа в един чат.

**2а. Кръпка на скрипта** (`scripts/pretranslate.ts` — само Philip може):
- Добави `--level a1|a2|b1|b2`, по подразбиране `a1` (за да не счупиш стария
  поток).
- Смени твърдия `A1_LESSONS_METADATA` внос с избор по ниво
  (`A2_LESSONS_METADATA` е в `src/content/a2/index.ts:58-72`, структурно
  идентичен).
- Оправи нормализацията на lesson id: ако аргументът вече съдържа `lesson-`,
  не му слагай втори префикс.
- Обобщи test id-то: `test-${level}-${n}` вместо `test-a1-${n}`, и вземи броя
  тестове от нивото, не от твърдото 6.
- Гейт: `npm run pretranslate -- --level a2 --all --dry-run` изброява **11
  урока + 6 теста**, и `npm run pretranslate -- --all --dry-run` (без `--level`)
  все още изброява A1 непроменено.

**2б. Пускане:**
```
npm run pretranslate -- --level a2 --all
```
Дълго е и харчи OpenAI кредити. Прекъсването е безопасно — append/merge е.
Променя се **само** `src/i18n/generated/translations.json`.

Гейт след това: `git diff --stat` показва `pretranslate.ts` + `translations.json`
и **нищо друго**. Нула промени в `src/content/a2`.

Промпт:
```
Прочети docs/HANDOFF-a2-finalize.md секции „Факти“ (подсекция „Pretranslate“),
D6 и „Фаза 2“.
Направи 2а (кръпка на scripts/pretranslate.ts за --level) и 2б (пусни за a2).
Не пипай никакво съдържание в src/content. Обнови Статус + дневника.
```

---

### Фаза 3 — раздели: пилотен урок · модел: **Sonnet 5**

Цел: **един** урок, направен внимателно, който после служи като еталон на
паралелните агенти от Фаза 4. Урок: **`a2-lesson-01`** („Ало, ало!“, 25
упражнения — най-малкият след 05).

Как:
1. Прочети структурата **икономично** — само `id`, `type`, `title`, `order`
   редовете на `src/content/a2/lessons/a2-lesson-01/exercises.ts` (през Grep,
   не пълно четене на файла).
2. Определи 4–6 раздела по естествените граници (НОВИ ДУМИ → ГРАМАТИКА →
   ДИАЛОЗИ → ТЕКСТ). Раздел започва на упражнението, което открива блока.
3. Измисли смислово българско `title` + `subtitle` за всеки раздел — по модела
   на A1, **не** генерични етикети. Виж §C1 в
   [content-quality-checklist](../.cursor/rules/content-quality-checklist.mdc)
   (подзаглавие само когато добавя стойност).
4. Преведи на 6 езика (`en, fr, ar, fa, uk, ru` — **без** `bg`).
5. Вмъкни през прицелени StrReplace веднага след `order: N,`. **Нула** промени
   по други редове.
6. Пусни гаранцията: `git diff --numstat HEAD -- <файла>` → изтрити редове = 0.
7. `npm run content:lint -- --lesson 01` → 0 errors.
8. Запиши в дневника **окончателния списък раздели** (bg заглавия + `theme`),
   за да го ползва Фаза 4 като еталон за тон и дължина.

Промпт:
```
Прочети docs/HANDOFF-a2-finalize.md секции „Факти“ (подсекциите за sectionStart
и операционните капани), D3, D4, „Гаранцията“ и „Фаза 3“.
Направи разделите САМО за a2-lesson-01, по еталона от A1 lesson-05.
Не пипай нищо друго в упражненията. Пусни numstat гаранцията и lint.
Обнови Статус + дневника, включително списъка раздели.
```

---

### Фаза 4 — раздели: останалите 10 урока · модел: **`cursor-grok-4.6-high-fast` или `composer-2.5-fast`, по един субагент на урок, паралелно**

Стартира се **само след** като Philip е погледнал пилотния урок в браузъра.

Уроци: `a2-lesson-00, 02, 03, 04, 05, 06, 07, 08, 09, 10`.

Всеки субагент получава: този документ + пилотния урок като еталон + **само
своя** урок. Не чете другите уроци. Не чете `content.ts`, `workbook.ts`,
`metadata.ts`.

Икономията идва от това, че субагентът чете само `id`/`type`/`title`/`order`
редовете през Grep, а не целия файл (те са 660–1824 реда).

Гейт на всеки: `numstat` с 0 изтрити реда + `content:lint -- --lesson NN`.

Промпт (по един за всеки урок, сменяш само номера):
```
Прочети docs/HANDOFF-a2-finalize.md секции „Факти“ (подсекциите за sectionStart
и операционните капани), D3, D4, „Гаранцията“, „Фаза 3“ (еталонът) и „Фаза 4“.
Направи разделите САМО за a2-lesson-NN, по същия шаблон като пилотния a2-lesson-01.
НЕ чети други уроци. НЕ пипай нищо освен вмъкването на sectionStart.
Пусни git diff --numstat — изтрити редове трябва да е 0.
Пусни npm run content:lint -- --lesson NN.
Обнови Статус + дневника.
```

---

### Фаза 5 — празненства · модел: **евтин**

Един файл: `src/lib/celebration.ts`. Добави 11-те A2 id-та в
`CELEBRATION_ENABLED_LESSONS` (ред 21–33).

Внимание: `a2-lesson-00` е „Преговор A1“. A1 изключва `lesson-00` (Азбука),
защото няма раздели и няма workbook. За A2 урок 00 — **включи го само ако
Фаза 4 наистина му е сложила раздели**; провери `buildCelebrationPlan` не
връща празен план. Ако няма workbook, последният раздел става финалът —
това е коректно поведение, не бъг (`celebration.ts:196-206`).

Промпт:
```
Прочети docs/HANDOFF-a2-finalize.md „Фаза 5“.
Добави A2 уроците в CELEBRATION_ENABLED_LESSONS в src/lib/celebration.ts.
Провери дали a2-lesson-00 има раздели преди да го включиш.
Не пипай нищо друго. Обнови Статус + дневника.
```

---

### Фаза 6 — гейтове + браузър smoke · модел: **човек + евтин Sonnet само при бъг**

```
npm run content:lint          # 0 errors; очаквай същите 32 A1 warnings
npm run build                 # спри dev сървъра първо
```
Плюс двете проверки от „Гаранцията“.

Браузър на `localhost:3010` (localhost показва всички нива). **Рестартирай dev
сървъра** след смяна на клон.

Списък за преглед:
- **A2 уроци 01 (пилотът), 02 (45 упражнения — най-натовареният) и 10** —
  разделите се разгъват/сгъват, номерацията на упражненията е непроменена,
  празненството излиза на края на раздел.
- **A2 урок 00** — потвърди дали има раздели и дали празненството работи.
- **Един A2 урок на неанглийски език** (напр. `ar` — RTL, и `uk`) — заглавието
  на раздела показва ръчния превод, не Google.
- **Един A2 тест** (напр. `test-a2-3`) — трябва да е буквално непроменен.
- **A1 уроци 05 и 06** — контрола. Всяка визуална разлика в A1 = **спри**.

---

### Фаза 7 — PR-и · модел: евтин

По D7 — три PR-а, в този ред. PR B и PR C тръгват от `philip`.
```
git push origin philip
gh pr create --base master --head philip
```
Philip мърджва през GitHub. **Никога** push към `origin/nina` или директен
commit на `master`.

---

### Фаза 8 — follow-up (НЕ сега)
- Разшири `scripts/content-lint.ts` с правило за пълнота на преводите (липсващ
  `titleI18n` / `subtitleI18n` / `instructionKey`). Днес линтерът има 17 правила
  и **нито едно** не проверява преводи — затова тази дупка е невидима.
- Речниковите глоси (`VocabularyItem.translation`) — и за A1, и за A2, ако
  pretranslate кешът не е достатъчен.
- Pretranslate за B1, щом флагът от Фаза 2 е generic.
- Решение за публичното пускане на A2 (`A1_ONLY_HOSTS`).

---

## Какво НЕ прави никой агент в този поток
- Не променя **съдържание** на A2 — упражнения, отговори, снимки, TTS, ред.
  Единствената допустима промяна в `a2/**` е **вмъкване** на `sectionStart`.
- Не пипа `src/content/shared/**`, `registry.ts`, `content/index.ts`,
  `src/i18n/ui.ts`, `src/components/**`, `src/app/**`, `src/db/**`, конфигурации.
- Не генерира TTS. Не пипа `scripts/generate-tts.ts`.
- Не push-ва към `origin/nina`. Не commit-ва на `master`. Не force-push-ва.
- Не прави съдържателен QA на A2 (клиентът вече е дал обратна връзка и Нина я е
  отработила).
- Не чете `exercises.ts` на уроци извън своята фаза.

---

## Работен дневник

### Фаза 0 + Фаза 1 — 2026-09-03, planning чат

Inventory + този документ, после целият мърдж:
```
git checkout master && git pull            # e5564c8
git checkout -b a2-merge origin/nina       # ccb3173
git merge master --no-edit                 # exit 0, НУЛА конфликта
npm run content:lint                       # 0 errors, 32 warnings
npm run build                              # exit 0, 542s, 53 страници
git push origin a2-merge                   # нов клон, dc8216f
gh pr create --base master --head a2-merge # PR #15
```

Шест детерминистични проверки, всички чисти:

| # | Проверка | Резултат |
|---|---|---|
| 1 | `git merge master` | exit 0, нула конфликта — git auto-merge не произведе хибриди, защото Нина не е пипала нито един файл, който master пипа |
| 2 | Diff извън домейна на Нина | празно |
| 3 | Diff по `shared/`, `registry.ts`, `content/index.ts`, `components/`, `lib/`, `app/`, `db/`, `i18n/ui.ts`, `scripts/`, `package.json`, `next.config.ts` | празно |
| 4 | `content:lint` | 0 errors, 32 warnings — байт за байт същите като базата от PR #12 (A1 уроци 05/06/11) |
| 5 | `npm run build` | exit 0 |
| 6 | `origin/nina` след push | `ccb3173`, непроменен ✓ |

**Разлика спрямо мърджа на Алекс:** там `scripts/generate-tts.ts` се auto-merge-на
в хибрид и трябваше ръчна намеса. Тук такъв риск няма — пресечното множество
между файловете на Нина и файловете на master е **празно**.

**Бележка за клоновете:** `git checkout -b a2-merge origin/nina` слага
`origin/nina` като upstream, което е капан — един разсеян `git push` без аргументи
би стрелял по чужд клон. Пренасочено веднага след push-а:
`git branch --set-upstream-to=origin/a2-merge a2-merge`. Проверено, че
`origin/nina` е непроменен.

_(следващият агент допълва тук)_

---

## Статус
- [x] Фаза 0 — inventory + план (2026-09-03)
- [x] D1–D7 потвърдени от Philip
- [x] Фаза 1 — мърдж → [PR #15](https://github.com/Philip-Morris-Immersica/language-app-level1/pull/15) отворен (чака мърдж от Philip в GitHub)
- [ ] Фаза 2 — pretranslate (2а кръпка, 2б пускане)
- [ ] Фаза 3 — раздели, пилот `a2-lesson-01`
- [ ] Фаза 3.5 — Philip гледа пилота в браузъра
- [ ] Фаза 4 — раздели, уроци 00, 02–10
- [ ] Фаза 5 — празненства
- [ ] Фаза 6 — гейтове + браузър smoke
- [ ] Фаза 7 — PR B + PR C
