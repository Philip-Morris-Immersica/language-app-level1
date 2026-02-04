# Български език за мигранти A1

Interactive digital textbook for learning Bulgarian language at A1 level, designed specifically for refugees and migrants.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` (or the port shown in terminal)

## 📚 Project Overview

This is a fully interactive Bulgarian language learning platform with:

- **11 lessons** covering A1 level content
- **~800 interactive exercises** (workbook + in-lesson)
- **6 progressive tests** placed strategically after lessons
- **Mobile-optimized** touch-friendly interface
- **Progress tracking** via local storage
- **Beautiful UI** inspired by the Bolt prototype

## 🏗️ Architecture

### Folder Structure

```
src/
├── app/                      # Next.js app router pages
│   ├── layout.tsx           # Root layout with AppLayout
│   ├── page.tsx             # Home page with course overview
│   └── lessons/[lessonId]/  # Dynamic lesson routes
│       ├── page.tsx         # Main lesson content
│       └── exercises/       # Workbook exercises
├── components/
│   ├── layout/              # Header, Sidebar, Navigation
│   ├── exercises/           # Reusable exercise components
│   │   ├── FillInBlank.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── MatchPairs.tsx
│   │   ├── WordOrder.tsx
│   │   └── ExerciseRenderer.tsx
│   └── ui/                  # shadcn/ui components
├── content/                 # All lesson content (easy to edit!)
│   ├── lessons/
│   │   ├── lesson-01/
│   │   │   ├── metadata.ts
│   │   │   ├── content.ts
│   │   │   ├── workbook.ts
│   │   │   └── index.ts
│   │   └── ... (lesson-02 through lesson-11)
│   ├── tests/               # Test data files
│   ├── types.ts             # TypeScript interfaces
│   └── index.ts             # Central exports
└── lib/
    ├── progress.ts          # Local storage progress tracking
    ├── validation.ts        # Answer validation utilities
    └── scoring.ts           # Scoring calculations
```

## 🎨 Design System

### Colors (Bolt Theme)

- Primary Green: `#6B8E23`
- Primary Hover: `#556B1E`
- Primary Dark: `#4A5D23`
- Secondary Light: `#F5F8E8`
- Secondary Border: `#C9D99E`

### Typography

- Main font: **Sofia Sans** (with Cyrillic support)
- Weights: 300, 400, 500, 600, 700

### Mobile Optimization

- ✅ Touch-friendly buttons (min 48x48px)
- ✅ No drag-and-drop required (tap-to-select alternative)
- ✅ Responsive sidebar (drawer on mobile)
- ✅ Font size ≥ 16px (prevents iOS zoom)
- ✅ Single column layouts on small screens

## 📝 Content Management

### Adding a New Lesson

1. Create folder: `src/content/lessons/lesson-XX/`
2. Create files:
   - `metadata.ts` - lesson info, title, topics
   - `content.ts` - main lesson text, dialogues, grammar
   - `workbook.ts` - workbook exercises
   - `index.ts` - exports all data

3. Update `src/content/index.ts` with lesson metadata

### Exercise Types

Currently implemented:

1. **Fill in Blank** - Most common, fill missing words
2. **Multiple Choice** - Select correct answer  
3. **Match Pairs** - Match left items with right items
4. **Word Order** - Arrange words into sentences

To be implemented:

5. Verb Conjugation
6. Image Labeling
7. Number Writing
8. Dialogue Reading
9. Text Comprehension
10. Listening (with audio)

## 🗄️ Database Schema

Using Drizzle ORM with Neon PostgreSQL:

- `usersTable` - User accounts
- `lessonsTable` - Lesson metadata
- `exercisesTable` - All exercises
- `userProgressTable` - Exercise completion tracking
- `lessonProgressTable` - Lesson completion tracking

**Current**: Local storage for progress
**Future**: Migration to Neon DB for multi-device sync

## 🎯 Progress Tracking

Functions available in `src/lib/progress.ts`:

```typescript
// User management
initializeUser()

// Lesson progress
getLessonProgress(lessonId)
markLessonContentViewed(lessonId)
markLessonCompleted(lessonId, score, maxScore)

// Exercise progress
saveExerciseProgress(lessonId, exerciseId, correct, isWorkbook)

// Test results
getTestProgress(testId)
saveTestResults(testId, score, maxScore, sectionScores)

// Overall progress
getTotalProgress()
getCompletedLessonsCount()
getCompletedTestsCount()
```

## 🧪 Testing on Mobile

To test on mobile devices:

1. Start dev server: `npm run dev`
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. On mobile, visit: `http://YOUR_IP:3000`

Or use browser dev tools:

- Chrome: F12 → Toggle device toolbar
- Firefox: F12 → Responsive design mode

## 📦 Dependencies

### Core

- Next.js 15.5 - React framework
- React 18 - UI library
- TypeScript - Type safety

### UI Components

- shadcn/ui - Component library
- Tailwind CSS - Styling
- lucide-react - Icons

### Database (future)

- Drizzle ORM - Type-safe database toolkit
- @neondatabase/serverless - Neon PostgreSQL

## 🔄 Development Workflow

### Starting Development

```bash
npm run dev
```

### Database Commands (when using Neon)

```bash
# Push schema changes to database
npm run db:push

# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

## 📖 Lesson Content Status

- ✅ **Lesson 1**: Здравейте - COMPLETED (sample)
- 🔲 **Lesson 2**: Закуска - To be added
- 🔲 **Lesson 3**: В ресторанта - To be added
- 🔲 **Lesson 4**: В супермаркета. На пазара - To be added
- 🔲 **Lesson 5**: Градът и селото - To be added
- 🔲 **Lesson 6**: Моето семейство - To be added
- 🔲 **Lesson 7**: Денят и часът - To be added
- 🔲 **Lesson 8**: Цветове и дрехи - To be added
- 🔲 **Lesson 9**: Вкъщи - To be added
- 🔲 **Lesson 10**: На път - To be added
- 🔲 **Lesson 11**: Всеки ден - To be added

## 🎓 Next Steps

### High Priority

1. **Content Entry**: Add remaining lessons 2-11
2. **Test System**: Implement test viewer and scoring
3. **Images**: Extract and optimize images from PDF
4. **Mobile Testing**: Test on real devices

### Medium Priority

1. **Additional Exercise Types**: Implement remaining 6 types
2. **Audio**: Add pronunciation audio for vocabulary
3. **Listening Exercises**: Implement audio playback
4. **Answer Keys**: Add toggleable answer displays

### Future Enhancements

1. **Backend Migration**: Move from local storage to Neon DB
2. **User Authentication**: Add login/signup
3. **Teacher Dashboard**: View student progress
4. **Gamification**: Points, badges, achievements
5. **PWA**: Offline mode capability
6. **Multi-language Interface**: Support Arabic, English

## 🤝 Contributing

To add content to lessons:

1. Navigate to `src/content/lessons/lesson-XX/`
2. Edit the appropriate file (metadata, content, or workbook)
3. Follow the TypeScript types defined in `src/content/types.ts`
4. Test locally with `npm run dev`

## 📄 License

This project is for educational purposes, designed for refugees and migrants learning Bulgarian.

## 🙏 Acknowledgments

- Original PDF textbook: "Български език за бежанци - ниво A1"
- Authors: Маргарита Андонова, Радост Събева, Жана Загорова
- UI inspiration: Bolt.new prototype
- Icons: lucide-react
- Components: shadcn/ui

---

**Built with ❤️ for refugees and migrants learning Bulgarian**
