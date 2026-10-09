# Одит на процеса за Алекс — B2

Дата: 9 октомври 2026 г.

## Цел

Процесът трябва да позволява на Алекс да работи самостоятелно по един B2 урок,
без да:

- избира слаб модел за план;
- смесва няколко фази в дълъг чат;
- измисля липсващо съдържание;
- създава ненужни компоненти;
- изисква българска клавиатура;
- променя B1/shared/scripts;
- генерира TTS преди съдържанието да е готово;
- commit-ва чужди файлове.

## Оценка след корекциите

- Яснота за нетехнически потребител: **9/10**
- Git/file safety: **9.5/10**
- Качество на плана и урока: **9/10**
- TTS safety и повторна работа: **9.5/10**
- Икономия на Cursor токени: **9/10**
- Готовност за първи реален B2 урок: **8/10**

Последната оценка остава 8/10, защото все още няма реална
`b2-lesson-01` lesson папка, върху която да се тества целият процес от
source folder до браузър и TTS.

## Основни причини за B1 преправянията и новите защити

### Слаб или прекалено дълъг план

Преди: план с евтин модел, многочасов чат и непълен answer key.

Сега:

- Opus 5.5 High plan-only чат;
- source/client crosswalk;
- `READY/NOT READY`;
- точни accepted answers;
- планът се пази във файл;
- огромните уроци се делят на Sonnet batches.

### Прекалено свободно тълкуване на учебника

Преди: пропуснати елементи, измислено съдържание или погрешен тип.

Сега:

- client plan е отделна задължителна стъпка;
- ясна йерархия client → textbook → platform interaction;
- duplicate numbering и смислови конфликти блокират Build;
- очевидните typos се поправят и докладват, не се скриват.

### Ненужни или замърсяващи компоненти

Преди: нов компонент преди проверка на готовите варианти.

Сега:

1. shared template;
2. B2 template;
3. максимум два B1 примера;
4. нов `b2-*` type само с обосновка;
5. цялата реализация остава в B2 sandbox.
6. B1-style unprefixed overrides са забранени без Philip approval.
7. Нов component изисква UI translation/extraction review.

### Непълен урок, прикрит от exercise count

B1 показа, че index count може да е попълнен, въпреки че plan редове или
фактологични корекции липсват.

Сега final Build/QA сравнява всеки `_PLAN` `order + id` с реален object и
проверява клиентските дати, имена и бройки. MC distractors идват само от
textbook/client plan.

### Свободно писане

Преди: paper инструкцията понякога се пренася директно.

Сега:

- B2 също не изисква българска клавиатура;
- „Напишете“ се адаптира до dropdown, sentence builder, word order или
  друга selectable интеракция;
- content lint има B2 contract checks.

### TTS повторения и грешни гласове

Преди:

- docs и generator се разминават;
- TTS се пуска преди content freeze;
- един персонаж може да смени гласа си;
- скриптът skip-ва стар MP3 и корекцията не се чува.

Сега:

- read-only `tts:audit`;
- stable voice mapping по `speaker`;
- model/voice/job manifest;
- generator спира при audit errors;
- невалиден model flag се отхвърля;
- exact-file regeneration;
- content overrides вместо author script edits;
- човешкото прослушване остава задължително.

### Опасен commit

Преди: generic `commit`, GUI Sync или `sync.ps1` могат да включат чужди файлове.

Сега:

- кратка естествена commit/push заявка за текущия урок;
- branch трябва да е точно `alex`;
- explicit path allowlist;
- full-ID lint;
- audio audit/check при audio commit;
- отделни content и audio commits.

## Реален dry run: B2 Урок 1

Client plan-ът за „Природа“ доказа нуждата от:

- inline selection със stable occurrence IDs;
- free/ungraded underline mode;
- ungraded opinion choices;
- no-free-writing redesign на paper задачи;
- canonical reuse на текста за танцуващите мечки;
- duplicate-number detection;
- split build batches.

Добавени са:

- `b2-select-words-inline`;
- `b2-opinion-choice`;
- B2 templates;
- linter contracts за IDs, modes, points и options.

## Автоматични проверки

Изпълнени успешно:

- scoped ESLint за всички променени TS/TSX/MJS файлове;
- пълен content lint: 0 errors (35 заварени warnings);
- full-ID lint за B1 lesson;
- TTS audit върху B1 reference lesson;
- invalid TTS model rejection;
- `check:audio`: 5747 реални MP3 файла;
- production build: успешно, 59 static/dynamic routes.

`check:audio` беше оптимизиран от около 10 минути до около 12 секунди чрез
един Git batch query вместо отделен процес за всеки MP3.

Последният независим повторен одит потвърди поправките на Plan persistence,
branch/path gates, mode-specific commits, B2 scoring contracts, no-writing
policy, TTS generation gate и B1 completeness safeguards. Единственият
оперативен blocker е промените да бъдат commit-нати и merge-нати преди
in-place fast-forward обновяването на branch `alex`.

## Реален тест: b2-lesson-01 (9 октомври 2026)

Пълният цикъл без TTS беше изпълнен с точните команди и модели от manual-а:

- `/b2-plan` (Opus 5.5 High): `NOT READY` с 11 въпроса → решения → `READY`;
  256-редов план, 44 елемента, 3 batch-а.
- `/b2-build` ×3 (Sonnet 5.5 High, нов агент за всеки batch): 0 lint errors,
  44/44 реда от плана в кода.
- `/b2-review` (Sonnet): хвана пропуснато изречение от учебника (блокер) и
  3 места с неотчетени верни алтернативи — поправени с `/b2-fix`.
- Браузър: всички 44 елемента се рендират; inline selection, таблици с
  удебелени окончания и opinion choice работят.

Поправки, произлезли от теста:

- споделената `GrammarTable` не рендираше `**bold**` в клетките (A1 урок 5 в
  продукция показваше звездички) — поправено;
- нов `npm run source:extract` замества импровизираните скриптове за
  PDF/DOCX/снимки и ръчното цепене на PDF-а;
- `table_fill` точки = клетки (правилото казваше редове);
- конвенции за vocab ids, instruction keys, страници учебник/PDF.

Разход: тестовият урок струва повече от нормален, защото Opus нямаше
извличащ инструмент (писа и дебъгва скриптове), review сравняваше всеки текст
ръчно, а урокът е ~2× среден (44 елемента, 97 думи). Очакван нормален урок:
значително по-малко с готовия скрипт и SOURCE файловете.

## Оставащи рискове

1. Промените трябва да бъдат commit-нати, push-нати и merge-нати в `master`
   преди Алекс да обнови съществуващия си `alex` branch от `master`.
2. Първият реален `/b2-plan` трябва да се наблюдава като acceptance test.
3. След първия урок трябва да се добавят component tests/fixtures с реалните
   inline tokens и opinion questions.
4. Репото има заварени TypeScript грешки извън тази задача; Next build
   конфигурацията пропуска type validation. Новите файлове минават ESLint и
   production compilation.
5. Старите B1 TTS аудита показват legacy warnings (например `/` в spoken verb
   forms). Те са отделен B1 cleanup, не blocker за B2.
6. Audit не може да оцени ударение, темпо и емоция — слушането остава човешко.

## Препоръчан контрол след първия урок

След `b2-lesson-01` направете кратка ретроспекция:

- кои въпроси Opus е задал излишно;
- кои client-plan конфликти е пропуснал;
- колко Sonnet batches са били оптимални;
- кои TTS warnings са били полезни;
- дали manual-ът е бил достатъчен без помощ от Philip.

Променяйте правилата само по реална повтаряща се грешка, не след единичен
случай.
