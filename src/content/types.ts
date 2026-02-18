// Exercise types matching real PDF content
export type ExerciseType = 
  | 'fill_in_blank'        // Most common - fill missing words
  | 'multiple_choice'      // Select/underline correct answer
  | 'match_pairs'          // Match left items with right items
  | 'word_order'           // Arrange words into sentences
  | 'verb_conjugation'     // Fill verb conjugation tables
  | 'image_labeling'       // Write words under images
  | 'illustrated_cards'    // Illustrated vocabulary cards with audio
  | 'syllable_blocks'      // Arrange syllables to form words
  | 'grammar_visual'       // Visual grammar explanation (pronouns, etc.)
  | 'number_writing'       // Write numbers as words
  | 'dialogue_reading'     // Read dialogues
  | 'text_comprehension'   // Read text and answer questions
  | 'listening';           // Audio exercises (future)

// Base exercise interface
export interface BaseExercise {
  id: string;
  type: ExerciseType;
  instruction: string;      // e.g., "Напишете личните местоимения."
  points?: number;          // For scoring
  order: number;
}

// Specific exercise interfaces
export interface FillInBlankExercise extends BaseExercise {
  type: 'fill_in_blank';
  sentences: {
    text: string;           // "Аз съм Мохамед."
    blanks: number[];       // Positions of blanks [2] = "съм"
    correctAnswers: string[]; // ["съм"]
    acceptableAnswers?: string[][]; // Multiple acceptable answers per blank
  }[];
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  questions: {
    question: string;
    options: string[];      // ["един", "една", "едно"]
    correctIndex: number;
  }[];
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'match_pairs';
  pairs: {
    id: string;
    left: string;
    correctRight: string;
  }[];
  shuffledRights?: string[]; // Optional pre-shuffled rights
}

export interface WordOrderExercise extends BaseExercise {
  type: 'word_order';
  questions: {
    words: string[];        // Shuffled words
    correctSentence: string; // Correct order
    hint?: string;
  }[];
}

export interface VerbConjugationExercise extends BaseExercise {
  type: 'verb_conjugation';
  verb: string;             // Base form
  conjugations: {
    pronoun: string;        // "Аз", "Ти", "Той/Тя/То", etc.
    correctForm: string;    // Correct conjugation
    isExample?: boolean;    // True if shown as example
  }[];
}

export interface ImageLabelingExercise extends BaseExercise {
  type: 'image_labeling';
  images: {
    id: string;
    imageUrl: string;
    correctLabel: string;
    acceptableLabels?: string[];
  }[];
  options: string[];           // List of options for dropdown/selection
  displayType?: 'flags' | 'default';  // For specific formatting
}

export interface NumberWritingExercise extends BaseExercise {
  type: 'number_writing';
  numbers: {
    numeral: string;        // "1", "5", "10"
    correctWord: string;    // "едно", "пет", "десет"
  }[];
}

export interface IllustratedCardsExercise extends BaseExercise {
  type: 'illustrated_cards';
  title: string;           // "НОВИ ДУМИ 1"
  audioUrl?: string;       // For "Listen" button
  cards: {
    id: string;
    imageUrl: string;      // Path to illustration
    label: string;         // "Добро утро!", "Здравей!" etc.
    audioUrl?: string;     // Individual audio for card
  }[];
  displayMode?: 'grid' | 'presentation';  // For different display modes
}

export interface DialogueReadingExercise extends BaseExercise {
  type: 'dialogue_reading';
  dialogues: {
    speaker?: string;       // Optional speaker name
    text: string;
  }[];
  questions?: {
    question: string;
    answer?: string;
  }[];
}

export interface TextComprehensionExercise extends BaseExercise {
  type: 'text_comprehension';
  text: string;
  questions: {
    question: string;
    type: 'yes_no' | 'fill_in' | 'multiple_choice';
    correctAnswer: string;
    options?: string[];     // For multiple choice
  }[];
}

export interface ListeningExercise extends BaseExercise {
  type: 'listening';
  audioUrl: string;
  questions: {
    question: string;
    correctAnswer: string;
    type: 'yes_no' | 'fill_in' | 'multiple_choice';
    options?: string[];
  }[];
}

export interface SyllableBlocksExercise extends BaseExercise {
  type: 'syllable_blocks';
  puzzles: {
    id: string;
    syllables: string[];     // ['-РИ-', '-Я', '-ГА-', '-БЪЛ-']
    correctWord: string;     // 'БЪЛГАРИЯ'
    hint?: string;
  }[];
}

export interface GrammarVisualExercise extends BaseExercise {
  type: 'grammar_visual';
  title: string;             // 'ГРАМАТИКА 1'
  subtitle?: string;         // 'Граматика – Лични местоимения (8)'
  pronouns: {
    pronoun: string;         // 'аз', 'ти', 'той', etc.
    imageUrl?: string;       // Optional image
    description?: string;    // Optional description
  }[];
}

// Union type for all exercises
export type Exercise = 
  | FillInBlankExercise 
  | MultipleChoiceExercise 
  | MatchPairsExercise 
  | WordOrderExercise
  | VerbConjugationExercise
  | ImageLabelingExercise
  | IllustratedCardsExercise
  | SyllableBlocksExercise
  | GrammarVisualExercise
  | NumberWritingExercise
  | DialogueReadingExercise
  | TextComprehensionExercise
  | ListeningExercise;

// Dialogue structure
export interface Dialogue {
  id: string;
  speakers: {
    name?: string;
    text: string;
  }[];
  translation?: string;
  notes?: string;
}

// Grammar section
export interface GrammarSection {
  id: string;
  title: string;
  explanation: string;
  examples: {
    bulgarian: string;
    translation?: string;
  }[];
  tables?: {
    headers: string[];
    rows: string[][];
  }[];
}

// Vocabulary item
export interface VocabularyItem {
  id: string;
  bulgarian: string;
  translation?: string;
  category?: string;
  imageUrl?: string;
  audioUrl?: string;
}

// Lesson content structure
export interface LessonContent {
  introduction?: string;    // Lesson introduction text
  sections: {
    id: string;
    title?: string;
    content: string;
    imageUrl?: string;
  }[];
  dialogues?: Dialogue[];
  grammar?: GrammarSection[];
  vocabulary?: VocabularyItem[];
  culturalNotes?: {
    id: string;
    title: string;
    content: string;
  }[];
}

// Complete lesson data
export interface LessonData {
  id: string;               // 'lesson-01'
  number: number;           // 1
  title: string;            // 'Здравейте'
  description: string;      // Communication goals
  grammarTopics: string[];  // ['Лични местоимения', 'Глагол съм']
  vocabulary: string[];     // Key vocabulary themes
  content: LessonContent;
  exercises: Exercise[];    // In-lesson exercises
  workbookExercises: Exercise[]; // Workbook exercises
}

// Test section
export interface TestSection {
  id: string;
  name: string;             // 'КОМПОНЕНТ СЛУШАНЕ'
  maxPoints: number;        // 8
  instructions?: string;
  exercises: Exercise[];
}

// Test data
export interface TestData {
  id: string;               // 'test-a1-1'
  number: number;           // 1
  afterLesson: number;      // 3 (test appears after lesson 3)
  title: string;            // 'Тест А1.1'
  totalPoints: number;      // Total possible points
  sections: TestSection[];  // Listening, Reading, Grammar, Writing
}

// Progress tracking types
export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  correct: boolean;
  attempts: number;
  lastAttempt: string;      // ISO date string
}

export interface LessonProgress {
  lessonId: string;
  contentViewed: boolean;
  exercisesProgress: ExerciseProgress[];
  workbookProgress: ExerciseProgress[];
  score: number;
  totalPossibleScore: number;
  completed: boolean;
  lastVisited: string;      // ISO date string
}

export interface TestProgress {
  testId: string;
  completed: boolean;
  score: number;
  maxScore: number;
  attempts: number;
  lastAttempt: string;      // ISO date string
  sectionScores: {
    sectionId: string;
    score: number;
    maxScore: number;
  }[];
}

export interface UserProgress {
  userId: string;           // Generated on first visit
  createdAt: string;        // ISO date string
  lastUpdated: string;      // ISO date string
  lessons: {
    [lessonId: string]: LessonProgress;
  };
  tests: {
    [testId: string]: TestProgress;
  };
  totalProgress: number;    // Percentage 0-100
}

// Answer validation types
export interface ValidationResult {
  correct: boolean;
  feedback?: string;
  score?: number;
}

// Lesson metadata for navigation
export interface LessonMetadata {
  id: string;
  number: number;
  title: string;
  hasTest: boolean;
  testId?: string;
}
