# QA Lesson 08 — Layer 1

## Lint summary

```
> tsx scripts/content-lint.ts --lesson 08

▸ lesson-08  (0 errors, 4 warnings)
  l08-ex-15  WARN [example-points-mismatch] Declares points=16 but counted 14 non-example blank(s).
  l08-ex-17  WARN [example-points-mismatch] Declares points=5 but counted 4 non-example blank(s).
  l08-ex-18  WARN [example-points-mismatch] Declares points=6 but counted 8 non-example blank(s).
  l08-ex-20  WARN [example-points-mismatch] Declares points=3 but counted 8 non-example blank(s).

Total: 0 errors, 4 warnings
```

---

## Blockers

| # | id | rule | проблем | source ред |
|---|---|---|---|---|
| B1 | l08-ex-15 | example-points-mismatch | points=16, реално 14 бланки (14 non-example sentences × 1 blank) | exercises.ts:489 |
| B2 | l08-ex-17 | example-points-mismatch | points=5, реално 4 бланки (голямата, умното, младата, високите) | exercises.ts:583 |
| B3 | l08-ex-18 | example-points-mismatch | points=6, реално 8 бланки (та + те + то + те,те + та,та + та) | exercises.ts:618 |
| B4 | l08-ex-20 | example-points-mismatch | points=3, реално 8 бланки (а:2 + б:3 + в:3) | exercises.ts:669 |
| B5 | l08-ex-24 | currency-rule | 'Имам 20 **лева** в _______.' → лева не се използва; трябва евро | exercises.ts:855 |
| B6 | l08-novi-dumi-01 | illustrated-cards-instruction | instruction:'Натиснете за произношение.' забранена за урок 2+; трябва `instruction: ''` | exercises.ts:29 |
| B7 | l08-novi-dumi-02 | illustrated-cards-instruction | същото — урок 8 е урок 2+ | exercises.ts:207 |
| B8 | l08-novi-dumi-03 | illustrated-cards-instruction | същото | exercises.ts:716 |
| B9 | l08-dialozi-01 | dialogue-id-format | sections ids `'а'`, `'б'` → трябва `'а.'`, `'б.'` (с точка, по конвенцията от types.ts) | exercises.ts:439, 448 |
| B10 | l08-dialozi-02 | dialogue-id-format | sections ids `'а'`, `'б'`, `'в'` → трябва `'а.'`, `'б.'`, `'в.'` | exercises.ts:546, 555, 564 |
| B11 | content.ts (l08-dialozi-2-v) | content-exercises-mismatch | Ролите на говорителите са разменени: Клиент/Продавач/Клиент → трябва Продавач/Клиент/Продавач. Логиката: Продавач пита „Как е якето?", Клиент отговаря „Малко е…", Продавач потвърждава „Да, разбира се." Това съответства и на voiceGender-ите в exercises.ts (male/female/male). | content.ts:45–51 |

---

## Warnings

| # | id | rule | бележка | source ред |
|---|---|---|---|---|
| W1 | l08-gramatika-01 | pdf-reference | subtitle съдържа `(10)` — номер на страница от PDF, трябва да се премахне | exercises.ts:467 |
| W2 | l08-gramatika-02 | pdf-reference | subtitle съдържа `(6)` — номер на страница от PDF, трябва да се премахне | exercises.ts:520 |
| W3 | l08-ex-11 | bold-terms (A5) | Терминът „нося" в инструкция не е болд: `'Изберете правилната форма на глагола нося.'` → `'…глагола **нося**.'` | exercises.ts:410 |
| W4 | l08-gramatika-01 | bold-terms (A5) | Термините в инструкция не са болд: `'Показателни местоимения — този, тази, това, тези.'` → `'…— **този**, **тази**, **това**, **тези**.'` | exercises.ts:468 |
| W5 | l08-ex-15 | bold-terms (A5) | Термините в инструкция не са болд: `'…правилната дума: този, тази, това или тези.'` → `'…**този**, **тази**, **това** или **тези**.'` | exercises.ts:488 |
| W6 | l08-ex-24 | title-format | title: `'Упражнение 24'` (lowercase) → `'УПРАЖНЕНИЕ 24'` — стандартът е CAPS | exercises.ts:813 |
| W7 | l08-ex-27 | title-format | title: `'Упражнение 27'` → `'УПРАЖНЕНИЕ 27'` | exercises.ts:901 |
| W8 | l08-ex-28 | title-format | title: `'Упражнение 28'` → `'УПРАЖНЕНИЕ 28'` | exercises.ts:940 |
| W9 | l08-ex-25 | non-standard-instruction | `'Прочетете текста. Извадете непознатите думи и проверете превода им в речника.'` — нестандартна инструкция + референция към речника. Стандарт за reading_text урок 3+: `'Изслушайте текста и след това го прочетете сами.'` | exercises.ts:879 |
| W10 | l08-ex-28 | non-standard-instruction | Същата нестандартна инструкция с референция към речника | exercises.ts:943 |
| W11 | l08-gramatika-01 | missing-instructionKey | Граматична секция без `instructionKey` — инструкцията с езикови термини трябва да е предварително преведена на 7 езика (правило A4: ЗАДЪЛЖИТЕЛНО за граматически секции) | exercises.ts:464 |
| W12 | l08-gramatika-02 | missing-instructionKey | Същото | exercises.ts:517 |
| W13 | l08-dialozi-02 (б, в) | tts-numbers | `'— Номер 46.'` и `'— Малко е. Може ли номер 48?'` съдържат цифри без `ttsText` override → TTS може да произнесе „четири шест" вместо „четиридесет и шест" | exercises.ts:560, 567 |
| W14 | l08-ex-18 | verb-mismatch | instruction `'Попълнете с правилния член…'` за dropdown упражнение → правилото е dropdown → „Изберете" | exercises.ts:620 |
| W15 | l08-ex-20 | dialogue-mismatch | listeningText за сек. а използва „Черната? Не, лилавата." докато l08-dialozi-02 сек. а има „Бялата? Не, червената." — различни цветове в двата текста | exercises.ts:675 |

---

## Suggestions

| # | id | бележка |
|---|---|---|
| S1 | l08-ex-01, l08-ex-03 | Инструкциите завършват с `?` а не с `.` — правилото казва „Завършват с точка." За personal_choice промптите е спорно, но технически нарушава правилото. |
| S2 | l08-ex-23 | За яйцето: `correctAnswer: 'бяло'` — кафявите яйца също са валидни. Помислете за `alternateCorrectAnswers: ['кафяво']` или за промяна на въпроса. |

---

## Passed checks

- Dialogue content (exercises.ts ↔ content.ts): диалози 1-а, 1-б, 2-а, 2-б — идентични ✓ (само 2-в има проблем с ролите — B11)
- Педагогическа последователност: НОВИ ДУМИ → упражнения → ГРАМАТИКА → практика — спазена ✓
- Граматика преди упражненията, които я прилагат: ГРАМАТИКА 1 (order 16) → упр. 15 (order 17); ГРАМАТИКА 2 (order 18) → упр. 17, 18, 20 ✓
- Отговори — граматичен род/форма: всички проверени и верни (този/тази/това/тези, форми на членуване) ✓
- listeningText числа с думи: „четиридесет и шест", „четиридесет и осем" ✓
- Кирилица в ids на диалозите: 'а', 'б', 'в' — кирилица ✓ (само точката липсва — B9, B10)
- voiceGender за всички dialogue lines: зададен ✓
- showDictionary на reading_text упражненията: true ✓
- Знамена (упр. 4): проверени цветовете — Сирия, Иран, Германия, Ирак, Украйна, Великобритания, Франция, ЕС — всички верни ✓
- Членуване на прилагателни (упр. 18): всички окончания проверени ✓
