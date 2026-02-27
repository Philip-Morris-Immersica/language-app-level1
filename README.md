# Български език за бежанци — A1

Interactive digital platform for learning Bulgarian, designed for refugees and migrants. A UNHCR initiative.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## Project Overview

- **11 lessons** covering A1 level content + **6 progressive tests**
- **19 interactive exercise types** (vocabulary cards, grammar sections, dialogues, fill-in-blank, matching, word order, and more)
- **7 UI languages**: Bulgarian (default), Arabic, English, French, Farsi, Ukrainian, Russian — with RTL support for Arabic and Farsi
- **Mobile-optimized**: touch-friendly, no drag-and-drop required, font size ≥16px
- **Authentication**: JWT + HTTP-only cookies (login/register)
- **Progress tracking**: localStorage (Neon DB schema ready for future migration)

---

## Architecture

```
src/
├── app/                         # Next.js 15 App Router
│   ├── layout.tsx               # Root layout (AppLayout, AuthProvider, LanguageProvider)
│   ├── page.tsx                 # Home page (guest + logged-in views)
│   ├── login/                   # Login/Register page
│   ├── lessons/[lessonId]/      # Dynamic lesson page
│   │   └── exercises/           # Workbook exercises page
│   └── api/auth/                # Login, register, logout, me
├── components/
│   ├── layout/                  # Header, Sidebar, LessonLayout, LessonNav
│   ├── exercises/               # 19 exercise components + ExerciseRenderer
│   └── ui/                      # shadcn/ui components
├── content/
│   ├── lessons/lesson-XX/       # metadata, content, exercises, workbook, index
│   ├── types.ts                 # All TypeScript interfaces
│   ├── index.ts                 # Central exports + lessonsMetadata
│   └── EXERCISE_TEMPLATES.ts   # Copy-paste templates for all exercise types
├── i18n/
│   ├── ui.ts                    # Static UI translations (all 7 languages)
│   ├── useT.ts                  # Hook for static UI strings
│   ├── useTranslate.ts          # Hook for dynamic content (Google Translate + localStorage cache)
│   └── LanguageContext.tsx      # Language state management
├── db/
│   ├── schema.ts                # Drizzle ORM schema (users, lessons, exercises, progress)
│   └── index.ts                 # Neon PostgreSQL connection
├── hooks/
│   └── useExercisePersistence.ts # Save/restore exercise state across navigations
└── lib/
    ├── progress.ts              # localStorage progress tracking (15+ functions)
    ├── validation.ts            # Answer validation with fuzzy matching
    └── scoring.ts               # Score calculation
```

---

## Design System

**Colors:**
- Primary green: `#8FC412` / hover `#7DAD0E`
- UNHCR blue: `#0279C3`
- Sidebar bg: `#F5F5F5` / active: `#EEF7C8`

**Typography:** Sofia Sans (Cyrillic subset, weights 300–700)

**Components:** shadcn/ui only — import from `@/components/ui/`

**Icons:** Lucide React only

---

## i18n System

Two-layer translation system:

| Layer | Hook | Coverage | Method |
|---|---|---|---|
| Static UI | `useT()` | Buttons, labels, navigation | Pre-translated in `ui.ts` |
| Dynamic content | `useTranslate()` | Exercise instructions, lesson titles | Google Translate API + localStorage cache |

**Rule:** Exercise content (words, sentences, correct answers) is always Bulgarian — never translated.

---

## Exercise Types (19 implemented)

### НОВИ ДУМИ
- `illustrated_cards` — vocabulary cards with images and audio

### ГРАМАТИКА
- `grammar_visual` — pronouns/characters in a grid
- `grammar_examples` — sentences with images
- `grammar_table` — conjugation/declension table

### ДИАЛОЗИ И ТЕКСТОВЕ
- `dialogues` — dialogue reading with audio or TTS
- `reading_text` — reading paragraphs with audio

### УПРАЖНЕНИЯ — Frequent
- `fill_in_blank` — fill missing words (text input)
- `workbook_fill_blank` — workbook fill-in with layout variants (`two-column`, `qa-split`, `qa-stacked`, `single`)
- `multiple_choice` — select correct answer (radio buttons)
- `dropdown_match` — match left items with dropdown
- `word_order` — arrange words into sentence

### УПРАЖНЕНИЯ — Less frequent
- `match_pairs` — tap-to-match pairs
- `letter_choice` — fill missing letters from given set
- `image_labeling` — label images with dropdown
- `syllable_blocks` — arrange syllables to form word
- `word_search` — find words in letter string
- `true_false` — true/false buttons per sentence
- `dialogue_builder` — reorder scrambled dialogue lines
- `fill_with_images` — fill blanks with flag images + verb selection

### Not yet implemented (placeholder)
- `verb_conjugation`, `number_writing`, `dialogue_reading`, `text_comprehension`, `listening`

---

## Adding a New Lesson

1. Create `src/content/lessons/lesson-XX/` with 5 files:
   - `metadata.ts` — id, number, title, description, grammarTopics, vocabulary
   - `content.ts` — introduction, dialogues, sections
   - `exercises.ts` — ALL lesson elements in PDF order (exercises + vocabulary + grammar + dialogues)
   - `workbook.ts` — workbook-only exercises
   - `index.ts` — re-exports as `lessonData`

2. Register in `src/content/index.ts` `lessonsMetadata` array

3. Add assets to `public/assets/lesson-XX/`

**Always use `EXERCISE_TEMPLATES.ts`** — copy the template for the needed type and fill in content only.

**ID naming:** `lesson-02`, `l02-ex-01`, `l02-wb-01`, `l02-novi-dumi-01`, `l02-gramatika-01`, `l02-dialozi-01`

---

## Lesson Status

| Lesson | Title | Status |
|---|---|---|
| lesson-01 | Здравейте | Complete |
| lesson-02 | Закуска | Metadata only |
| lesson-03 | В ресторанта | Metadata only (test after) |
| lesson-04 | В супермаркета. На пазара | Metadata only (test after) |
| lesson-05 | Градът и селото | Metadata only |
| lesson-06 | Моето семейство | Metadata only (test after) |
| lesson-07 | Денят и часът | Metadata only |
| lesson-08 | Цветове и дрехи | Metadata only (test after) |
| lesson-09 | Вкъщи | Metadata only |
| lesson-10 | На път | Metadata only (test after) |
| lesson-11 | Всеки ден | Metadata only (test after) |

---

## Database Commands

```bash
npm run db:push       # Push schema changes (development)
npm run db:generate   # Generate migration files
npm run db:migrate    # Run migrations
npm run db:studio     # Open Drizzle Studio (GUI)
npm run db:seed       # Seed with sample data
```

---

## Mobile Testing

```bash
# Find your local IP
ipconfig   # Windows

# Visit on mobile
http://YOUR_IP:3000
```

---

## Acknowledgments

- Original textbook: *Български език за бежанци — ниво A1* (Андонова, Събева, Загорова)
- Icons: lucide-react
- Components: shadcn/ui
