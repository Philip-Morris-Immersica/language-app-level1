# Generate TTS Audio for a Lesson

Use this command when you need to generate or regenerate TTS audio for a
lesson (или конкретни негови части).

**Прочети първо:** [.cursor/rules/tts-audio.mdc](mdc:.cursor/rules/tts-audio.mdc) — там е истината за всички правила, гласове, модели и
overrides. Тази команда е workflow-ът върху тях.

---

## Препоръчителен модел

- **Sonnet 4.6** — за всички TTS задачи (планиране + изпълнение). Не е нужен Opus.

---

## Какъв е урокът?

Преди да започнеш, попитай потребителя:

1. Кой урок? (напр. `lesson-10`, или test `test-lessons-7-8`)
2. Цялото съдържание ли се генерира за първи път, или само корекция?
3. Ако е корекция — кои части? (диалог N, нови думи N, граматика N, текст N)

---

## Workflow — 4 стъпки

### Стъпка 1 — PRE-CHECK на съдържанието

**Прегледай файла** `src/content/<level>/lessons/lesson-XX/exercises.ts`
(и `content.ts` ако генерираш за първи път). За **всеки** елемент провери:

#### A. Диалози (`type: 'dialogues'`)
- ✅ Всяка реплика има `voiceGender: 'male' | 'female'`?
- ✅ Всяка реплика **с цифри** има `ttsText` с думи? (виж таблицата в правилата)
- ✅ Всяка реплика **със съкращения** (НДК, жк, бул., св.) има `ttsText` с пълна форма?

#### B. Нови думи (`type: 'illustrated_cards'`)
- ✅ Всяка карта има `label`?
- ✅ Имена с известни проблемни ударения → добави в `ILLUSTRATED_CARD_FLASH_PROMPT_BY_ID`?

#### C. Граматика
- `grammar_table` — има ли цифри/съкращения в `rows[]`? → `GRAMMAR_TABLE_ROW_TTS_TEXT`
- `grammar_table` — има ли цифри в `notes[]`? → `ttsNotes` в `exercises.ts`
- `grammar_examples` — пълни изречения с числа → `ttsText` per example
- `grammar_examples` — субтекст с „м.р./ж.р./мн.ч." → **нищо** (маха се автоматично)

#### D. Текстове за четене (`type: 'reading_text'`)
- ✅ Има ли цифри в `paragraphs[]`? → `ttsParagraphs[]` с думи
- ✅ Има ли смесени гласове? → `paragraphVoiceGenders[]`
- ✅ Има ли flip-card images? → `ttsWordId` + `label` на всяка

#### E. Слушане (`listeningText`)
- ✅ Числата са с думи (няма override механизъм за listening)

**Ако намериш нещо за поправяне** — направи го с `StrReplace` (НЕ PowerShell за кирилица).

---

### Стъпка 2 — ИЗТРИЙ старите MP3-та (ако има)

**Това е критично.** Скриптът skip-ва съществуващи файлове. Ако смениш текст
без да изтриеш стария файл, генерирането няма ефект.

**За първоначално генериране** — пропусни тази стъпка.

**За корекция:**

```powershell
# Един диалог — целия
Remove-Item "public/assets/lesson-10/audio/tts/dialogues/l10-dialozi-02-*.mp3" -Force

# Една реплика
Remove-Item "public/assets/lesson-10/audio/tts/dialogues/l10-dialozi-02-а.-line-1.mp3" -Force

# Всички нови думи
Remove-Item "public/assets/lesson-10/audio/tts/words/*.mp3" -Force

# Един grammar row
Remove-Item "public/assets/lesson-10/audio/tts/grammar/l10-gramatika-01b-row-0.mp3" -Force

# Един reading_text (per-paragraph + full)
Remove-Item "public/assets/lesson-10/audio/tts/texts/l10-ex-21-*.mp3" -Force
```

Пълна таблица със съответствията промяна → файлове за триене има в
`tts-audio.mdc` → раздел „When to DELETE Old MP3s".

---

### Стъпка 3 — ГЕНЕРИРАЙ

```bash
npm run tts:generate -- --lesson 10 --model gemini
```

За тестове:
```bash
npm run tts:generate -- --test 7-8 --model gemini
```

**Параметри:**
- `--lesson XX` — номер на урок (`00` до `11`)
- `--test N` — суфикс на теста (`4`, `7-8`, `1-2-3`)
- `--model gemini` (default) или `--model chirp` (fallback)

Скриптът:
- Зарежда `content.ts` + `exercises.ts` за урока
- Колектира всички задачи (vocabulary, illustrated_cards, dialogues, grammar, текстове, listening, …)
- Skip-ва съществуващите файлове
- Генерира липсващите с правилния модел/глас по правилата
- Прави ~6.5s пауза между request-ите (Gemini лимит)

Очаквано време: ~6.5s × брой нови файлове. Един пълен урок = 5–15 минути.

---

### Стъпка 4 — ПРОВЕРКА

1. **В браузъра** — `npm run dev` → отвори урока → пусни всеки засегнат елемент
2. **Audio sanity check:**
   ```bash
   npm run check:audio
   ```
   Трябва да отпечата `✓ All N tracked *.mp3 files are real binaries`.
3. **Ако нещо звучи зле** — върни се на Стъпка 2: триеш този файл, оправяш override-а, генерираш пак. НЕ пускай скрипта без да си изтрил.

---

## Bug Patterns — Често Срещани

### „Звучи още старо след регенериране"
→ Не си изтрил MP3-то преди. Иди на Стъпка 2.

### „Чете цифрите вместо думи"
→ Липсва `ttsText` (диалог), `ttsParagraphs` (reading_text), `ttsNotes` (grammar_table) или override в `GRAMMAR_TABLE_ROW_TTS_TEXT`. Иди на Стъпка 1.A.

### „Чете го с грешен глас (мъжки/женски)"
→ Липсва `voiceGender` на репликата. Добави в `exercises.ts` → изтрий MP3 → генерирай.

### „В диалог има 3+ различни гласа"
→ Бъг с `FEMALE_VOICE_ALT` / `MALE_VOICE_ALT`. Тези ТРЯБВА да са alias към Achernar/Charon (не Autonoe/Achird/Despina). Провери в `generate-tts.ts` (редове ~36-42).

### „Думата звучи неестествено / грешно ударение"
→ Добави в подходящия Set в `generate-tts.ts`:
- vocabulary → `VOCAB_USE_PRO_IDS`
- illustrated_card → `ILLUSTRATED_CARD_FLASH_PROMPT_BY_ID`
- grammar_table row → `GRAMMAR_TABLE_PRO_ROWS`
- reading_text image → `READING_TEXT_IMAGE_STRESS_IDS`

После изтрий MP3-то и генерирай отново.

### „Чете „м.р." / „мъжки род" в грамар example"
→ Не би трябвало — `stripGrammarLabels()` ги маха. Ако се случва, добави етикета в `GRAMMAR_LABELS` Set в `generate-tts.ts`.

### „PowerShell счупи кирилицата в `generate-tts.ts`"
→ Не редактирай файла с `Set-Content` без `-Encoding UTF8`. Използвай `StrReplace` tool-а на агента или Node.js скрипт. Виж раздел „Editing Files with Cyrillic" в правилата.

---

## Cost Notes

- Един урок (~150 файла) = ~15–20 минути генериране
- Не пускай скрипта без да си направил Pre-check (Стъпка 1) — иначе ще генерираш грешни файлове и ще трябва да ги триеш и пускаш пак (двойно време + двойни tokens).
- При корекция на 1-2 файла — изтрий точно тях, не цялата папка.

---

## Когато си готов

- Покажи на потребителя кратко резюме: „Генерирани N файла, 0 грешки. Промени: …"
- Препоръчай тест в браузъра преди commit
- Не commit-вай преди потребителят да каже OK на звука
