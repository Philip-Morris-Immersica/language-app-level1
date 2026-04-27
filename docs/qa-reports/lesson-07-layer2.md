# QA Lesson 07 — Layer 2

**Дата:** 27.04.2026  
**Метод:** Статичен анализ (код + файлова система) + инспекция на компоненти  
**Layer 1 статус:** Blockers B1–B4 ✅ fixed; B5 ✅ partially fixed (2 consecutive, was 3); W1, W2, W4, W5, W7, W8 ✅ fixed; W6, W9 still open.

---

## Layer 1 Blockers — потвърден статус

| ID | Статус | Бележка |
|---|---|---|
| B1 `l07-ex-17` points=6→7 | ✅ FIXED | `points: 7` в exercises.ts |
| B2 `l07-ex-17` wrong example text (01-55) | ✅ FIXED | `text: 'Два без пет.'` |
| B3 `l07-ex-33` points=10→14 | ✅ FIXED | `points: 14` |
| B4 `l07-ex-33` verb-mismatch Напишете→Изберете | ✅ FIXED | instruction сега казва „Изберете" |
| B5 `l07-ex-35` 3 consecutive true | ✅ PARTIAL | Ред: F,T,F,T,F,T,T — само 2 consecutive в края |

---

## Функционални тестове

| id | T1 happy | T2 alt | T3 1 грешен | T4 isExample | T5 audio | T6 shuffle | T7 nav |
|---|---|---|---|---|---|---|---|
| l07-ex-01 | ✅ | — | ✅ | — | — | — | — |
| l07-novi-dumi-01 | — | — | — | — | ✅ | — | — |
| l07-ex-02 | ✅ | ✅ | ✅ | ✅ | — | — | — |
| l07-novi-dumi-02 | — | — | — | — | ✅ | — | — |
| l07-ex-03 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-04 | ✅ | — | ✅ | — | — | ✅ | — |
| l07-novi-dumi-03 | — | — | — | — | ✅ | — | — |
| l07-ex-05 | ✅ | — | ✅ | — | — | — | — |
| l07-gramatika-01 | — | — | — | — | ✅ | — | — |
| l07-ex-06 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-07 | ✅ | — | ✅ | ✅ | — | — | — |
| l07-dialozi-01 | — | — | — | — | ✅ | — | — |
| l07-novi-dumi-04 | — | — | — | — | ✅ | — | — |
| l07-ex-10 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-11 | ✅ | — | ✅ | — | — | — | — |
| l07-novi-dumi-05 | — | — | — | — | ✅ | — | — |
| l07-ex-12 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-13 | ✅ | — | — | — | — | — | — |
| l07-gramatika-02 | — | — | — | — | ✅ | — | — |
| l07-ex-14 | ✅ | — | — | — | — | — | — |
| l07-ex-15 | ✅ | ✅ | ✅ | ✅ | — | — | — |
| l07-gramatika-03 | — | — | — | — | ✅ | — | — |
| l07-ex-17 | ✅ | — | ✅ | ✅ | — | — | — |
| l07-gramatika-04 | — | — | — | — | ✅ | — | — |
| l07-ex-18 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-19 | ✅ | ✅ | ✅ | ✅ | — | — | — |
| l07-dialozi-02 | — | — | — | — | ✅ | — | — |
| l07-ex-22 | ✅ | ✅ | ✅ | ⚠️ | ✅ | — | — |
| l07-gramatika-05 | — | — | — | — | ✅ | — | — |
| l07-ex-23 | ✅ | ✅ | ✅ | — | — | — | — |
| l07-dialozi-03 | — | — | — | — | ✅ | — | — |
| l07-novi-dumi-06 | — | — | — | — | ✅ | — | — |
| l07-ex-26 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-27 | ✅ | ✅ | ✅ | — | — | — | — |
| l07-gramatika-06 | — | — | — | — | ✅ | — | — |
| l07-ex-28 | ✅ | — | ✅ | ✅ | — | — | — |
| l07-dialozi-04 | — | — | — | — | ✅ | — | — |
| l07-ex-31 | ✅ | ✅ | ✅ | — | — | — | — |
| l07-ex-32 | ✅ | — | ✅ | ❌ | — | — | — |
| l07-ex-33 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-34 | — | — | — | — | ✅ | — | — |
| l07-ex-35 | ✅ | — | ✅ | ❌ | — | — | — |
| l07-ex-36 | ✅ | ✅ | ✅ | — | — | — | — |

**Легенда:** ✅ pass (code verified) | ❌ fail (code verified) | ⚠️ suspected issue | — не се прилага или изисква live browser

---

## Визуални тестове

| id | V1 img load | V2 dimensions | V3 content match | V4 layout | V5 console | V6 design | V7 RTL |
|---|---|---|---|---|---|---|---|
| l07-ex-01 | ✅ | — | ✅ | — | — | — | — |
| l07-novi-dumi-01 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-02 | — | — | — | — | — | — | — |
| l07-novi-dumi-03 | ✅ | — | ✅ | — | — | — | — |
| l07-novi-dumi-04 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-11 | ✅ | — | ⚠️ | — | — | — | — |
| l07-novi-dumi-05 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-15 | ✅ | — | ✅ | — | — | — | — |
| l07-gramatika-03 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-17 | ✅ | — | ✅ | — | — | — | — |
| l07-gramatika-04 | ✅ | — | ⚠️ | — | — | — | — |
| l07-gramatika-05 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-26 | ✅ | — | ✅ | — | — | — | — |
| l07-gramatika-06 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-28 | — | — | — | — | — | ❌ | — |
| l07-ex-33 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-34 | ✅ | — | ✅ | — | — | — | — |
| l07-ex-35 | — | — | — | — | — | ✅ | — |

**Бележка:** V2, V4, V5, V7 изискват live browser с DevTools — не могат да бъдат верифицирани статично.  
V1 е верифициран чрез файлова система (53/53 jpg файла присъстват на диск). Аудио файлове: всички присъстват.

---

## Failed детайли

### ❌ T4-l07-ex-35 — TrueFalse не обработва isExample
- **Severity:** Blocker
- **Очаквано:** Sentence s1 (`isExample: true`) да се показва предварително попълнен и да НЕ се брои за scoring/allAnswered.
- **Реално:** `TrueFalse.tsx` итерира ВСИЧКИ sentences без изключение. `allAnswered` изисква студентът да отговори на s1. `handleCheck` брои s1 в `sentences.length` (= 8) вместо 7. Резултатът е scoring mismatch: `points: 7` но компонентът репортва до 8 точки.
- **Root cause:** `TrueFalseSentence` interface в `TrueFalse.tsx` (ред 10–14) и `TrueFalseExercise` в `types.ts` (ред 413–423) нямат `isExample?: boolean`. Компонентът не съдържа нито един `isExample` check.
- **Стъпки за възпроизвеждане:** Отвори l07-ex-35. Забележи: студентът трябва да натисне да/не на 8 твърдения (включително с1: "Ибрахим е бежанец от Сирия."). При 8/8 верни — резултат показва 8, не 7.
- **Screenshot:** не е наличен (изисква live browser)

---

### ❌ T4-l07-ex-32 — DropdownMatch не обработва isExample
- **Severity:** Blocker
- **Очаквано:** Question q0 (`isExample: true`, „Днес е 1 януари.") да се показва предварително попълнен и да НЕ се брои за scoring.
- **Реално:** `DropdownMatch.tsx` ред 82 филтрира само `q => q.options.length > 0`, не `isExample`. q0 има options (5 елемента), следователно влиза в `gradedQuestions`. Всички 6 въпроса се оценяват, но `points: 5`. При 6/6 верни — резултат е 6, не 5.
- **Root cause:** `DropdownQuestion` interface в `DropdownMatch.tsx` (ред 16–23) няма `isExample?: boolean`. Компонентът не обработва isExample изобщо.
- **Стъпки за възпроизвеждане:** Отвори l07-ex-32. Попълни всички 6 dropdown-а правилно → резултат показва 6, expected 5.
- **Screenshot:** не е наличен (изисква live browser)

---

### ❌ V6-l07-ex-28 — Инструкцията показва literal `**ОТИВАМ**` с видими asterisks
- **Severity:** Warning
- **Очаквано:** Инструкцията да показва „Напишете глагола ОТИВАМ в правилната форма." (или bold „**ОТИВАМ**") без видими asterisk символи.
- **Реално:** `exercise.instruction = 'Напишете глагола **ОТИВАМ** в правилната форма.'`. `ExerciseHeader` (ExerciseRenderer.tsx ред 59–61) рендерира `{displayInstruction}` като plain React text в `<p>` без markdown обработка. Резултат: потребителят вижда буквалните звездички `**ОТИВАМ**`.
- **Root cause:** `ExerciseHeader` не ползва markdown renderer (само `{displayInstruction}` в `<p>`). Когато Layer 1 W3 беше „поправен" с добавяне на `**...**`, не беше проверено дали renderer поддържа markdown.
- **Стъпки за възпроизвеждане:** Отвори l07-ex-28 → прочети инструкцията → видими `**ОТИВАМ**` с asterisks.
- **Screenshot:** не е наличен (изисква live browser)

---

### ⚠️ T4-l07-ex-22 — Примерното изречение назовава „Петър" (не е в listeningText)
- **Severity:** Warning (от Layer 1 W6 — неоправен)
- **Очаквано:** Примерът да ползва персонаж, споменат в аудио текста (Мартин, Галя, Светла, Ани).
- **Реално:** `isExample: true` sentence: „В колко часа закусва Петър? | Петър закусва в седем и тридесет сутринта." Петър не фигурира в `listeningText`.
- **Стъпки за възпроизвеждане:** Отвори l07-ex-22 → прочети примера → студентите не могат да намерят Петър в аудио текста.

---

### ⚠️ V3-l07-gramatika-04 — Изображение за „следобед" с filename „prez-denya"
- **Severity:** Suggestion
- **Очаквано:** Изображение, ясно представящо „следобед" (afternoon).
- **Реално:** `01-prez-denya-rabotnik.jpg` (работник — „prez denya" = „during the day") се ползва за label **„следобед"**. Но `06-den-peyzazh.jpg` (пейзаж) се ползва за label **„през деня"**. Filename на изображението за „следобед" буквално казва „prez denya", докато истинският „prez denya" image е 06. Това е семантично объркване на две концепции.
- **Изисква визуална проверка:** Дали работникът на снимката е явно следобед? Или е произволна дневна сцена?

---

### ⚠️ V3-l07-ex-11 ред 3 — Снежен човек за „сняг + мъгла"
- **Severity:** Suggestion
- **Очаквано:** Изображение показващо едновременно сняг И мъгла.
- **Реално:** `03-snyag-snezhen-chovek.jpg` (снежен човек). Text казва „Вали сняг и има мъгла." Снежният човек ясно показва сняг, но мъглата не е визуално очевидна в сцена с снежен човек на открито. Студентите може да предположат „облаци" вместо „мъгла".
- **Изисква визуална проверка:** Дали мъглата е видима в конкретната снимка?

---

## Резюме на Layer 1 Warnings — статус

| W# | id | Статус |
|---|---|---|
| W1 illustrated_cards instruction | ✅ FIXED (вече `''`) |
| W2 l07-ex-04 syllable_blocks instruction | ✅ FIXED (стандартен текст) |
| W3 l07-ex-28 CAPS → bold | ❌ INCORRECTLY FIXED (добавени `**`, но renderer не поддържа markdown) |
| W4 l07-ex-34 instruction | ✅ FIXED |
| W5 l07-ex-35 instruction | ✅ FIXED |
| W6 l07-ex-22 Петър | ⚠️ OPEN (все още не е оправен) |
| W7 content.ts yugoisotk typo | ✅ FIXED |
| W8 content.ts utro/utre id | ✅ FIXED |
| W9 mixed number forms | ⚠️ OPEN (by design discussion) |
| S4 TrueFalseExercise no isExample | ❌ BUG CONFIRMED (вижда T4-l07-ex-35) |

---

## Аудио файлове — статус (V1/T5)

| Тип | Наличен |
|---|---|
| l07-ex-34-full.mp3 | ✅ |
| l07-ex-22.mp3 (listening) | ✅ |
| Всички dialogue line mp3-та (4 диалога × всички реплики) | ✅ |
| Grammar card mp3-та | ✅ |
| Word TTS mp3-та | ✅ |
| Text paragraph mp3-та (p-0 … p-4) | ✅ |

---

## Изображения — статус (V1)

**53/53 jpg файла присъстват на диск.** Нито едно изображение липсва.

---

## План за корекция

### 🟢 SAFE — единствено решение, готов за auto-fix

| # | id | проблем | точна промяна |
|---|---|---|---|
| S1 | `l07-ex-28` | Instruction съдържа `**ОТИВАМ**` с видими asterisks (renderer не поддържа markdown) | В `exercises.ts` ред 1201: `'Напишете глагола **ОТИВАМ** в правилната форма.'` → `'Напишете глагола ОТИВАМ в правилната форма.'` |

---

### 🟡 DECISION — 2+ опции, нужно е моето решение

| # | id | проблем | Опция А | Опция Б | Препоръка |
|---|---|---|---|---|---|
| D1 | `l07-ex-35` | `TrueFalse` component не поддържа `isExample` → s1 се брои като редовен въпрос; scoring shows 8 instead of 7 | **A: Оправи компонента** — добави `isExample?: boolean` в `TrueFalseSentence` interface и `TrueFalseExercise` type; добави filter в `allAnswered`, `handleCheck`, и рендери s1 като pre-filled gray row (подобно на WorkbookFillBlank) | **B: Премахни s1 от sentences масива** в exercises.ts и добави го като `model: { text: '...', isTrue: true }` (компонентът вече поддържа `model` prop и го показва като пример) | **B** — по-малка промяна, не засяга компонента; но проверете дали `model` prop достатъчно добре показва „пример с отговор" |
| D2 | `l07-ex-32` | `DropdownMatch` не поддържа `isExample` → q0 се брои като редовен въпрос; scoring shows 6 instead of 5 | **A: Оправи компонента** — добави `isExample?: boolean` в `DropdownQuestion` interface; в `handleSubmit` филтрирай `q => !q.isExample && q.options.length > 0`; рендери isExample въпроси като pre-filled locked row | **B: Премахни q0 от questions масива** в exercises.ts (points остава 5, останалите q1–q5 са 5 въпроса) | **B** — по-проста промяна, достатъчна само за l07; но ако и други уроци ползват `isExample` в DropdownMatch, предпочети A |
| D3 | `l07-gramatika-04` | Image `01-prez-denya-rabotnik.jpg` е залепена към label `'следобед'`, но filename казва „prez-denya" | **A: Запази** (работник = следобедна сцена; приемливо) | **B: Замени** с по-специфична следобедна снимка | Нужна е визуална проверка на конкретната снимка преди решение — вижте I1 |

---

### 🔴 INVESTIGATE — нужна допълнителна проверка

| # | id | какво да се провери | как |
|---|---|---|---|
| I1 | `l07-gramatika-04` `01-prez-denya-rabotnik.jpg` | Визуално: дали снимката показва ясно „следобедна" сцена (напр. следобеден слънчев светлина, след обяд обстановка) или е произволен „дневен" работник? | Отвори физически файла `/public/assets/lesson-07/27-gramatika-4-den-sutrin-obed/01-prez-denya-rabotnik.jpg` |
| I2 | `l07-ex-11` ред 3 `03-snyag-snezhen-chovek.jpg` | Дали мъглата е видима в снимката (снежен човек + мъгла)? Ако не — снимката не подкрепя очаквания отговор „мъгла" | Отвори `/public/assets/lesson-07/17-upr-11-kartinki-vreme/03-snyag-snezhen-chovek.jpg` |
| I3 | `l07-ex-22` example | Умишлено ли е избран „Петър" (тест на критично мислене: студентите трябва да разберат, че не са дадени данни за Петър)? Или е грешка от Layer 1 W6? | Провери с автора на съдържанието |
| I4 | V4/V5/V7 live | Layout overflow, console errors, RTL switch | Нужен live browser с DevTools; провери на 1280×720 и 375×667 |

---

## Финален статус

- **Функционални:** 2 блокера (T4-l07-ex-35, T4-l07-ex-32), 1 warning (T4-l07-ex-22)
- **Визуални:** 1 warning (V6-l07-ex-28), 2 suggestions pending investigation (V3 ×2)
- **Layer 1 фиксвания:** 9/11 оправени ✅; 2 все още отворени (W6, W9)
- **Аудио:** ✅ всички файлове налични
- **Изображения:** ✅ 53/53 присъстват
