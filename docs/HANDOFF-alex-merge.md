# HANDOFF — alex (B1) → philip → master

**Режим:** план / изпълнение по фази. Всеки нов чат чете **само своята секция** + „Факти“. Не разглеждай уроци. Не чети `exercises.ts`.

**Клонове (към 2026-08-18):**
- Текущ checkout: `philip` (clean, up to date с `origin/philip`)
- `philip` е **21 комита назад** от `master`, **0 уникални** → `philip` е пълен ancestor на master. Нищо не е изгубено; просто не е ре-синкнат след PR #11. Ре-синк: `git checkout philip; git merge origin/master`.
- `alex` е **40 комита пред** `master`, `master` е **26 пред** `alex`
- Merge-base: `b709f6e`
- Алекс последно е мърджвал master в `6eddcaf` (отдавна)
- Локалният `alex` в тази работна директория е **143 комита назад** от `origin/alex` — игнорирай го, работи от `origin/alex`.

---

## Факти (не преоткривай)

### Какво носи Алекс
- Уроци **01–10 дигитализирани** + TTS/assets. **11 = само `.gitkeep`**, няма loader.
- Loaders: 01–10. Counts: 01=19, 02=14, 03=18, 04=10, 05=21, 06=7, 07=24, 08=12, 09=31, 10=8
- Нови B1 компоненти в `src/content/b1/components/` (домейнът му — OK)
- Нови префиксирани типове: `b1-illustrated-cards-grouped`, `b1-match-pairs-dragdrop`, `b1-grammar-table`, `b1-grammar-examples`, `b1-sort-to-columns`, `b1-info-highlight`
- `src/i18n/b1.ts`, `types.ts`, `exercise-components.ts`, `vocabulary-augment.d.ts`
- ~1300 asset файла (mp3/картинки) — не ги чети
- Няма тестове B1 (`B1_TEST_LOADERS` празен)

### Файлове ИЗВЪН B1 домейна (един)
`scripts/generate-tts.ts` — **+142/−14**. И **master също го е пипал** (3 комита). Реален конфликт.

Какво е пипнал Алекс в скрипта (НЕ мърджвай as-is):
1. Сменя **глобалния** `GEMINI_PROMPT` (би чул A1/A2 TTS при реген)
2. Твърдо кодира B1 `ttsPrompt` override-и в скрипта (трябва да са в content)
3. Импорт `expandVocabAbbreviations` от `@/lib/tts` — **функцията я няма** нито в master, нито в `src/lib` на alex (само локален блок в скрипта)
4. `READING_TEXT_EXCLUDE` за `lessonNum === '03'` / `l03-ex-31` (A1 риск)

**Решение по подразбиране:** при конфликт вземи **master** версията на `generate-tts.ts`. B1 MP3-тата вече са генерирани. Override-ите в content са follow-up, не блокер.

### Дребни конфликти в B1 content
Master е добавил само 3-редов `content-lint-disable no-free-writing` коментар в:
- `src/content/b1/lessons/b1-lesson-01/exercises.ts`
- `src/content/b1/lessons/b1-lesson-02/exercises.ts`

Алекс е преписал файловете **без** този коментар. Резолюция: съдържанието на Алекс + върни коментара ако lint пак пищи.

### Блокер #1 — renderer leak (по-важно от git конфликта)

`ExerciseRenderer.tsx` прави плосък merge:

```ts
const CUSTOM_RENDERERS = { ...A2_CUSTOM_RENDERERS, ...B1_CUSTOM_RENDERERS };
const CustomRenderer = CUSTOM_RENDERERS[exercise.type]; // БЕЗ проверка на нивото
```

Алекс override-ва **непрефиксирани** shared типове:
`table_fill`, `reading_text`, `dialogues`, `workbook_fill_blank`, `grammar_examples`, `grammar_table`

Защото B1 се spread-ва **след** A2, при мърдж B1 компонентите ще заменят:
- A1 `reading_text` / `dialogues` / `grammar_table` / …
- и вече съществуващите A2 варианти за `reading_text` + `grammar_table`

**Публичният домейн показва само A1, но leak-ът чупи A1 визуално.** Затова това е merge-блокер, не follow-up.

Вече на master (от Нина): A2 override-ва `reading_text` + `grammar_table` без префикс — A1 вече ползва A2 варианти за тези 2 типа. B1 го прави по-зле.

`InfoHighlightOnly.tsx` / `b1-info-highlight` — дефиниран, **не е регистриран**. Безобидно.

`vocabulary-augment.d.ts` — module augmentation за `voiceGender` на vocab. Оставя се (B1 файл).

### Какво НЕ е пипал Алекс (добре)
`src/components/**`, `src/lib/**`, `src/app/**`, `src/content/shared/**`, `registry.ts`, `ui.ts`, `package.json` — чисто.

### Gating
B1 е заключен на публичния домейн (`isLevelEnabledForHost`). След мърдж публичните потребители няма да видят B1 уроци — но **ще видят** счупен A1 ако renderer leak-ът мине.

### Loader регистрация — как се контролира какво вижда клиентът
`loadLesson(id)` връща `null` ако няма loader → страницата дава 404. Значи **какво е регистрирано в `B1_LESSON_LOADERS` решава какво е достъпно**, независимо кои файлове са в repo-то.

- master днес: loaders само `01, 02` (counts: 01=20, 02=14)
- alex: loaders `01–10`
- `B1_NAV_ITEMS` / `B1_LESSONS_METADATA` изброяват **всичките 11** и в двата клона

Следствие (заварено, не регресия): в nav се виждат 11 урока, а нерегистрираните дават 404. Отбележи го при smoke, но не е блокер за този мърдж.

### Активи — рискът „нещо да остане некачено“
- `.gitignore` **не** изключва `public/assets` — mp3 и картинки се комитват нормално.
- `.gitattributes`: `*.mp3` са **нарочно обикновени git blob-ове, не LFS** (иначе Vercel деплойва счупени pointer файлове). `*.wav` / `*.ogg` са LFS, но не се сервират.
- Затова **мърдж на цялото дърво не губи нищо**. Cherry-pick е този, който може да разедини content от неговите mp3-та.
- `content:lint` проверява само `imageUrl` / `flagUrl` за липсващи файлове. **НЕ проверява mp3** — TTS пътищата са по конвенция, не по поле. Липсващо аудио се лови само в браузъра (Фаза 4).
- Единственото, което не се вижда от тук: дали Алекс има непушнати неща локално. **Той трябва да потвърди** `git status` clean + всичко push-нато към `origin/alex`, преди Фаза 2.

---

## Решения (Philip, преди код)

| # | Въпрос | Препоръка |
|---|---|---|
| D1 | Клон за работа | `alex-merge` от `origin/alex`, после `merge master`. Не мърджвай в текущия стар `philip`. След успех: fast-forward `philip` = `master`, или PR `alex-merge` → `master`. |
| D2 | `generate-tts.ts` | **Master печели.** Не взимай промпта/override-ите на Алекс. |
| D3 | Renderer leak | **Първо** изолирай по ниво в `ExerciseRenderer` (Philip, 1 файл), **после** мърдж на alex. Така B1 override-ите остават B1-only и се оправя A2→A1 leak. |
| D4 | QA на 10-те урока сега? | **Не.** Мърджът е интеграция. Съдържателен QA = отделни чатове след като build е зелен. |
| D5 | Пипаме ли уроците на Алекс? | Не в този поток, освен lint-disable коментарите за L01/L02. |
| D6 | Само уроци 01–06? | **Мърджни всичко, регистрирай само 01–06.** Cherry-pick на 01–06 е капан — виж по-долу. |

### D6 — защо не cherry-pick на 01–06

Хронологията го изключва. Финалната шлифовка на **урок 05 и 06 е на върха на клона** (16–18 август), **след** като 07–10 вече са влезли:

```
22.07  L05 digitalise      23.07  L07      24.07  L08      10.08  L09
12.08  L10
13.08  L05 polish  ← след L10
14.08  L06 fix
16.08  L05 host corrections
16.08  L06 green-border tables
18.08  L06 grammar reference   ← върхът на клона
```

Няма момент в историята, в който „01–06 са готови, а 07–10 ги няма“. Освен това ~20 комита пипат **същите** споделени B1 файлове (`types.ts`, `components/`, `exercise-components.ts`, `i18n/b1.ts`), редувайки уроците. Cherry-pick на подмножество прескача междинните редакции на същите файлове → конфликт на почти всеки комит, и реален риск content да се разедини от своите mp3-та.

**Вместо това:** мърджни цялото дърво (всички файлове и активи влизат, нищо не се губи), а в `src/content/b1/index.ts` остави в `B1_LESSON_LOADERS` само `01–06` и съответните `B1_LESSON_EXERCISE_COUNTS`. Уроци 07–10 стоят в repo-то, недостъпни (404). По-късно всеки се пуска с **един ред** uncomment.

Бележка за Фаза 3: `next build` прави type-check на **целия** проект, включително нерегистрираните 07–10. Типова грешка в урок 09 пак ще счупи build-а — това е добре (валидира ги предварително), но да не изненада.

Counts за регистрация (от alex): 01=19, 02=14, 03=18, 04=10, 05=21, 06=7.
(master има 01=20 — версията на alex печели.)

**Терминология:** B1 няма урок 00 — започва от 01. „Уроци 0–6“ = **01–06, шест урока**.

---

## Фази (1 чат = 1 фаза)

Всеки агент: прочети „Факти“ + своята фаза. Спри. Обнови „Статус“ най-горе ако пипаш файла.

### Фаза 0 — този документ  · модел: евтин / текущият
Готово в planning чата. Не повтаряй git inventory.

### Фаза 1 — renderer isolation  · модел: **Sonnet**
**Преди** git merge на alex.

Файл: само `src/components/exercises/ExerciseRenderer.tsx` (Philip домейн).

Цел: lookup по ниво, не плосък merge. Псевдо:
- вземи level от `exercise.id` (`b1-…` → b1, `a2-…` → a2, иначе a1)
- търси първо в map-а на това ниво, иначе shared switch
- A2 `reading_text` override повече не удря A1
- след като alex се мърджне, B1 unprefixed override-и удрят само B1

Не пипай A2/B1 компоненти. Не чети уроци. После `npm run build`.

Промпт за нов чат:
```
Прочети само docs/HANDOFF-alex-merge.md секции „Факти“ и „Фаза 1“.
Направи renderer isolation в ExerciseRenderer.tsx по D3.
Не чети уроци. Не мърджвай клонове. После build.
```

### Фаза 2 — git merge  · модел: **Sonnet** (почти само shell)
Не започвай ако Фаза 1 не е в `master` или в базата, върху която мърджваш.

```
git fetch origin
git checkout master && git pull
git checkout -b alex-merge origin/alex
git merge master
```

Преди старта: Алекс потвърждава, че всичко му е push-нато към `origin/alex`.

Конфликти — очаквай:
1. `scripts/generate-tts.ts` → **ours/master** (цял файл от master)
2. `b1-lesson-01/exercises.ts` + `b1-lesson-02/exercises.ts` → съдържание alex + върни lint-disable коментара от master ако трябва

След резолването, по D6 — в `src/content/b1/index.ts`:
- `B1_LESSON_LOADERS`: остави `01–06`, коментирай `07, 08, 09, 10`
- `B1_LESSON_EXERCISE_COUNTS`: остави 01=19, 02=14, 03=18, 04=10, 05=21, 06=7
- **Не** пипай `B1_NAV_ITEMS` / `B1_LESSONS_METADATA` (фиксирани от syllabus-а)
- Файловете и активите на 07–10 остават мърджнати — само не се зареждат

Не push към `origin/alex`. Не commit-вай на `master`.

Промпт:
```
Прочети само docs/HANDOFF-alex-merge.md секции „Факти“, D1, D2, D6, „Фаза 2“.
Направи alex-merge по командите там. Резолни конфликтите по таблицата.
Регистрирай само уроци 01–06 в B1_LESSON_LOADERS.
Не пипай renderer. Не чети уроци.
```

### Фаза 3 — lint + build  · модел: **без AI / Sonnet само при грешки**
```
npm run content:lint -- --lesson b1-lesson-01
# … повтори за 02–06 (регистрираните)
npm run build
```
0 errors задължително. Warnings OK. Ако lint пищи за L01/L02 free-writing — върни disable коментара, не пренаписвай упражнения.

Build прави type-check и на нерегистрираните 07–10. Ако се счупи там — оправи **само** типовата грешка, не съдържанието.

Промпт:
```
Прочети само docs/HANDOFF-alex-merge.md Фаза 3.
Пусни content:lint за b1-lesson-01..06 и npm run build.
Поправи само това, което чупи lint/build. Не прави съдържателен review.
```

### Фаза 4 — димен smoke  · модел: **човек + евтин Sonnet само при бъг**
Браузър (домейн с B1 отключен, не публичния):
- 1 стар A1 урок (диалог + reading_text + grammar_table) — изглежда като преди
- 1 A2 урок със същите типове
- 2 B1 урока (напр. 01 и 06)
- **Аудио:** пусни по няколко mp3 в B1 01 и 06 (дума, граматичен ред, диалог, текст). Линтерът не проверява аудио — това е единствената проверка за липсващи mp3.
- Уроци 07–10 трябва да дават 404 (регистрирани са само 01–06)

Ако A1 се е сменил визуално → Фаза 1 не е минала правилно. Спри.

### Фаза 5 — PR  · модел: евтин
```
git push origin alex-merge
gh pr create --base master --head alex-merge
```
После Philip merge през GitHub. Алекс сам си rebase-ва `alex` върху новия master. **Никога** `git push origin alex`.

Промпт:
```
Прочети docs/HANDOFF-alex-merge.md Фаза 5.
Push alex-merge и отвори PR към master. Не мърджвай. Не push-вай към alex.
```

### Фаза 6 — follow-up (НЕ сега)
Отделни чатове, след като PR е в master:
- Ре-синк `philip` към новия master (виж „Клонове“)
- Съдържателен QA на уроци 01–06 — по 1 урок на чат
- Пускане на 07–10: QA на урок → uncomment 1 ред loader + count → PR
- Премести B1 TTS override-и от (отхвърления) скрипт в `ttsPrompt` полета в content — по 1 урок
- По желание: префиксирай B1 override типовете (`b1-reading-text` и т.н.) за да няма unprefixed ключове
- Регистрирай или изтрий мъртвия `InfoHighlightOnly`

---

## Какво НЕ прави никой агент в този поток
- Не чети `exercises.ts` / `content.ts` на 10-те урока
- Не генерирай TTS
- Не пипай `src/content/shared/**`, `ui.ts`, `registry.ts`
- Не push към `origin/alex` или `master`
- Не force-push
- Не „оправяй“ креативните B1 компоненти по време на мърджа — те са в неговия домейн и са безопасни **след** Фаза 1

---

## Статус
- [x] Inventory + план (2026-08-18)
- [ ] Алекс потвърждава, че всичко е push-нато към `origin/alex`
- [ ] D1–D3 + D6 потвърдени от Philip
- [ ] Фаза 1 renderer isolation
- [ ] Фаза 2 alex-merge + конфликти
- [ ] Фаза 3 lint + build
- [ ] Фаза 4 smoke
- [ ] Фаза 5 PR
