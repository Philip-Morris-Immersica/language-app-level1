// Exercise types matching real PDF content
export type ExerciseType = 
  | 'fill_in_blank'        // Most common - fill missing words
  | 'workbook_fill_blank'  // Workbook fill-in with dropdowns and 2-column layout
  | 'multiple_choice'      // Select/underline correct answer
  | 'match_pairs'          // Match left items with right items
  | 'dropdown_match'       // Match with dropdown selection
  | 'drag_to_columns'      // Drag items to correct columns (mobile-friendly)
  | 'letter_choice'        // Fill missing letters by clicking buttons
  | 'word_order'           // Arrange words into sentences
  | 'verb_conjugation'     // Fill verb conjugation tables
  | 'image_labeling'       // Write words under images
  | 'illustrated_cards'    // Illustrated vocabulary cards with audio
  | 'syllable_blocks'      // Arrange syllables to form words
  | 'word_search'          // Find words in letter string
  | 'grammar_visual'       // Visual grammar explanation (pronouns, etc.)
  | 'grammar_examples'     // Grammar with illustrated examples
  | 'grammar_table'        // Grammar table image + banner examples below
  | 'fill_with_images'     // Fill in blanks with flag images
  | 'dialogues'            // Dialogue sections with audio
  | 'dialogue_builder'     // Order scrambled sentences to form a dialogue
  | 'number_writing'       // Write numbers as words
  | 'dialogue_reading'     // Read dialogues
  | 'text_comprehension'   // Read text and answer questions
  | 'listening'            // Audio exercises (future)
  | 'reading_text'         // Reading text with optional audio
  | 'true_false'           // True/False sentences with ✓/✗ buttons
  | 'personal_choice'      // Interactive personal preference (no right/wrong)
  | 'connect_dots'         // Connect dots in order (snake-style alphabet sequence)
  | 'alphabet_maze'        // Interactive letter grid — tap letters in alphabetical order
  | 'table_fill';          // Dialogue paragraphs + fillable table cells (dropdowns)

// Grammar highlight info box — shown above exercise body as a green info panel (or below when grammarHighlightAfterBody)
export interface GrammarHighlight {
  textKey?: string;    // Key in UI_TRANSLATIONS (pre-translated on 7 languages)
  text?: string;       // Inline Bulgarian text (auto-translated via useTranslate)
  examples?: string[]; // Optional example sentences displayed below the text
  /** Spoken text per `examples[i]` (digits → words, cleaner pacing). Falls back to `examples[i]`. */
  exampleTtsTexts?: string[];
  /** When true, each example line is tappable for audio (`exerciseId` passed from ExerciseRenderer). */
  interactiveExamples?: boolean;
}

// Map label — overlaid text label on a map image
export interface MapLabel {
  x: number;    // percentage from left (0–100)
  y: number;    // percentage from top (0–100)
  name: string; // institution name in Bulgarian
}

// Map legend item — icon + name for the collapsible reference panel
export interface MapLegendItem {
  imageUrl: string;
  name: string;
}

// Base exercise interface
export interface BaseExercise {
  id: string;
  type: ExerciseType;
  title?: string;           // Optional display title, e.g. "НОВИ ДУМИ 1". Falls back to "УПРАЖНЕНИЕ N".
  instruction: string;      // e.g., "Напишете личните местоимения."
  instructionKey?: string;  // Key into UI_TRANSLATIONS for a pre-translated instruction (overrides dynamic translation).
  points?: number;          // For scoring
  order: number;
  voiceGender?: 'male' | 'female';
  grammarHighlight?: GrammarHighlight; // Optional green info box (above body by default; see grammarHighlightAfterBody)
  /** If true, `grammarHighlight` renders after the exercise component instead of before it. */
  grammarHighlightAfterBody?: boolean;
  mapLabels?: MapLabel[];              // If present, renders a labeled map above the exercise body
  mapLegend?: MapLegendItem[];         // Optional collapsible legend panel shown below the labeled map
}

// Specific exercise interfaces
export interface FillInBlankExercise extends BaseExercise {
  type: 'fill_in_blank';
  freeText?: boolean; // When true, renders a single free-form text input per sentence
  sentences: {
    text: string;           // "Аз съм Мохамед."
    blanks: number[];       // Positions of blanks [2] = "съм"
    correctAnswers: string[]; // ["съм"] or list of all accepted values (for freeText mode)
    acceptableAnswers?: string[][]; // Multiple acceptable answers per blank
  }[];
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  questions: {
    question: string;
    imageUrl?: string;
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
  /** When false, hide the row index column (e.g. left column already shows "1", "2" …). Default true. */
  showLeftOrdinal?: boolean;
}

export interface WordOrderExercise extends BaseExercise {
  type: 'word_order';
  questions: {
    words: string[];        // Shuffled words
    correctSentence: string; // Correct order
    alternateCorrectSentences?: string[];
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
  subtitle?: string;       // Optional subtitle shown below title (auto-translated)
  /** Large zoomable illustration shown above the cards grid (e.g. house cross-section, table setting). */
  headerImageUrl?: string;
  /**
   * By default cards use up to 4 columns on large screens.
   * Use `3` for a symmetric grid (e.g. rows of three — typical for НОВИ ДУМИ).
   */
  cardsGridMaxCols?: 3;
  /** TTS voice for ALL cards in this exercise (e.g. 'male' when the entire block is narrated by a male character like Георги). Individual cards still default to Achernar unless this is set. */
  voiceGender?: 'male' | 'female';
  audioUrl?: string;       // For "Listen" button
  cards: {
    id: string;
    imageUrl: string;      // Path to illustration
    label: string;         // "Добро утро!", "Здравей!" etc.
    sublabels?: string[];  // Additional text lines (e.g., ["българин", "българка", "българи"])
    /** If true, TTS joins label + sublabels in one clip; default is label only (country name etc.). */
    ttsIncludeSublabels?: boolean;
    /** TTS-only text for this card (overrides label for audio; display text stays unchanged). */
    ttsLabel?: string;
    audioUrl?: string;     // Individual audio for card
    translations?: Record<string, string>;  // Pre-translations per language { en: 'Good morning!', ar: '...' }
  }[];
  displayMode?: 'grid' | 'presentation';  // For different display modes
  /** When true, cards render as compact text-only boxes (no images) — just the label. Header image still shown. */
  textOnly?: boolean;
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
  imageUrl?: string;
  columns?: number;
  puzzles: {
    id: string;
    syllables: string[];     // ['-РИ-', '-Я', '-ГА-', '-БЪЛ-']
    correctWord: string;     // 'БЪЛГАРИЯ'
    hint?: string;
    imageUrl?: string;
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

export interface WordSearchExercise extends BaseExercise {
  type: 'word_search';
  letterString: string;       // Legacy: 'ниетевиеазтойтоти' (used if grid absent)
  correctWords: string[];     // Legacy word list for old component
  distractorWords?: string[]; // Legacy distractor words
  hint?: string;
  // New 2D grid mode — when present, uses WordSearchGrid component
  grid?: string[][];          // Pre-generated 2D grid (uppercase Cyrillic)
  hiddenWords?: string[];     // Words hidden in the grid (used with grid)
  allowDiagonal?: boolean;    // Allow diagonal word placement
}

export interface GrammarExamplesExercise extends BaseExercise {
  type: 'grammar_examples';
  title: string;             // 'ГРАМАТИКА 2'
  subtitle?: string;         // 'Глагол СЪМ'
  disableTts?: boolean;      // Skip TTS on card click (for abbreviation cards etc.)
  /** Use Gemini Flash model for all cards in this exercise (better for isolated words). */
  ttsFlash?: boolean;
  /** Show a green Heart before `text` and a red HeartCrack before `subtext` (like/dislike cards, e.g. „обичам / не обичам“). */
  showLikeDislike?: boolean;
  examples: {
    imageUrl: string;
    text: string;            // 'Аз съм Мохамед.'
    subtext?: string;        // 'Аз съм от Сирия.'
    label?: string;          // Visual-only badge (e.g. 'Какъв — мъжки род') — not read by TTS
    lines?: string[];        // Multiple equal-weight lines (replaces text/subtext display when provided)
    translations?: Record<string, string>;
    /** TTS only: male (Charon) vs default female (Achernar). */
    voiceGender?: 'male' | 'female';
    /** TTS only: alternative text for audio (e.g. only the full word, not the abbreviation). Display text stays unchanged. */
    ttsText?: string;
    /** When true, the image opens in a fullscreen lightbox on click (used in non-hero multi-example grid). Hero mode (single image) is always zoomable. */
    zoomable?: boolean;
  }[];
}

export interface GrammarTableExercise extends BaseExercise {
  type: 'grammar_table';
  title: string;             // 'ГРАМАТИКА 5'
  subtitle?: string;         // 'Граматика – Сегашно време (12)'
  tableTitle?: string;       // 'Сегашно време – съм'
  columns?: string[];        // ['(+)', '(–)', '(?)']
  rows?: {
    pronoun: string;
    cells: string[];
    pronunciations?: Record<string, string>;
  }[];
  notes?: string[];          // Text notes shown below the table
  ttsNotes?: string[];       // TTS-only text for notes (overrides notes[] for audio; display unchanged)
  boldColumns?: number[];
  illustrations?: {
    imageUrl: string;
    singularLabel: string;
    pluralLabel: string;
    pluralCount?: number;    // how many times to repeat the image for plural (default 3)
  }[];
}

export interface FillWithImagesExercise extends BaseExercise {
  type: 'fill_with_images';
  modelText?: string;          // 'Аз съм Петър. Аз съм от България.'
  modelFlag?: string;
  sentences: {
    id: string;
    pronoun: string;         // 'Ти', 'Той', etc.
    name: string;            // 'Елена', 'Омар', etc.
    country: string;         // 'България', 'Сирия', etc.
    flagUrl: string;
    correctVerb1: string;    // First verb: 'си', 'е', etc.
    correctVerb2: string;    // Second verb: 'си', 'е', etc.
  }[];
  verbOptions: string[];     // ['съм', 'си', 'е', 'сме', 'сте', 'са']
  countryOptions: string[];  // List of countries for dropdown
}

export interface DialoguesExercise extends BaseExercise {
  type: 'dialogues';
  title: string;             // 'ДИАЛОЗИ 1'
  subtitle?: string;
  imageUrl?: string;
  /** Multiple illustration images shown side-by-side at the top (desktop: row, mobile: stack). */
  images?: string[];
  audioUrl?: string;
  sections: {
    id: string;              // 'а.', 'б.'
    imageUrl?: string;
    lines: {
      speaker?: string;
      /** TTS only: pick male/female voice (two males in a row use Charon + Fenrir). Not shown in UI. */
      voiceGender?: 'male' | 'female';
      text: string;
      /** TTS only: alternative text for audio (e.g. expand abbreviations). Display text stays unchanged. */
      ttsText?: string;
      translations?: Record<string, string>;
    }[];
  }[];
}

export interface DialogueBuilderExercise extends BaseExercise {
  type: 'dialogue_builder';
  title: string;
  imageUrl?: string;
  sections: {
    id: string;                  // 'а.', 'б.', etc.
    givenFirstLine: string;      // The locked first line shown to the user
    sentences: string[];         // All sentences in CORRECT order (first = givenFirstLine)
    alternateOrders?: string[][]; // Additional valid orderings (each array = full sentence list)
  }[];
}

export interface DropdownMatchExercise extends BaseExercise {
  type: 'dropdown_match';
  /** Опционална референтна снимка (напр. карта от учебника). */
  imageUrl?: string;
  /** Опционален текст за слушане — рендира зелен бутон „Слушай" над въпросите. */
  listeningText?: string;
  /** Масив от снимки с подписи, показвани над въпросите. */
  images?: {
    imageUrl: string;
    label: string;
  }[];
  questions: {
    id: string;
    /** Текстова подсказка (показва се само ако няма leftImageUrl). */
    left: string;
    /** Снимка вместо текстова подсказка — потребителят вижда картинката и избира думата. */
    leftImageUrl?: string;
    options: string[];
    correctAnswer: string;
    alternateCorrectAnswers?: string[];
    /** Ако true — въпросът е пример: показва се с готов отговор и не се брои за точки. */
    isExample?: boolean;
  }[];
}

export interface DragToColumnsExercise extends BaseExercise {
  type: 'drag_to_columns';
  imageUrl?: string;              // Optional reference image shown above the exercise
  items: string[];              // Items to drag (e.g., "чай", "кафе", "сирене")
  columns: {
    id: string;                 // Column identifier (e.g., "drinks", "food")
    title: string;              // Display title (e.g., "НАПИТКИ", "ХРАНИ")
    icon?: string;              // Optional emoji/icon
    correctItems: string[];     // Items that belong in this column
  }[];
}

export interface WorkbookFillBlankExercise extends BaseExercise {
  type: 'workbook_fill_blank';
  layout?: 'two-column' | 'qa-split' | 'qa-stacked' | 'single';
  /** Override the automatic mid-point split for two-column layout. Useful when items fall into two
   *  semantically distinct groups (e.g. months 0-11 on the left, days 12-18 on the right). */
  columnSplitAt?: number;
  /** When true, skip the automatic "N." numbering prefix in front of each sentence.
   *  Useful when the sentence text itself already represents the numbering (e.g. names of months/days). */
  hideSentenceNumbers?: boolean;
  /** Optional captions rendered above the two columns when layout='two-column'. */
  columnLabels?: { left?: string; right?: string };
  /** Опционална снимка (напр. карта за упр. 19). */
  imageUrl?: string;
  /** Множество снимки, показвани един до друг (напр. две къщи за сравнение). */
  images?: { imageUrl: string; label?: string }[];
  listeningText?: string;
  sentences: {
    text: string;
    blanks: number[];
    correctAnswers: string[];
    acceptableAnswers?: string[][];
    options?: string[] | string[][];
    isExample?: boolean;
    images?: string[];
  }[];
}

export interface LetterChoiceExercise extends BaseExercise {
  type: 'letter_choice';
  puzzles: {
    id: string;
    word: string;              // 'Д_Б_Р'
    correctLetters: string[];  // ['О', 'Ъ'] - only these letters shown (no extras)
    availableLetters?: string[]; // Deprecated - component uses correctLetters only
  }[];
}

export interface ReadingTextExercise extends BaseExercise {
  type: 'reading_text';
  subtitle?: string;
  /** One MP3 for entire text; omit when using per-paragraph TTS + sequential „Слушай“ only. */
  audioUrl?: string;
  textTitle?: string;         // Bold heading rendered above paragraphs
  images?: {
    imageUrl: string;
    label: string;
    /** Stem for `words/{ttsWordId}.mp3` in the lesson TTS folder (flip-card audio). */
    ttsWordId?: string;
    /** Optional per-language translation for `label` (keys: ar, en, …). When `hideText` + images, click toggles; falls back to auto-translate. */
    labelTranslations?: Record<string, string>;
  }[];
  /** Image grid as flip cards (picture front, word on back); use with `images[].ttsWordId` for TTS. */
  imageFlashcards?: boolean;
  paragraphs: string[];
  /** Parallel to `paragraphs`: alternative TTS-friendly text for each paragraph (e.g. spell out "€/кг." as "евро за килограм"). When set, TTS uses this text instead of `paragraphs`, but the displayed text remains unchanged. */
  ttsParagraphs?: string[];
  /** Parallel to `paragraphs`: per-paragraph TTS voice (Gemini). If set with same length as paragraphs, `-full.mp3` is not generated. */
  paragraphVoiceGenders?: ('male' | 'female')[];
  paragraphTranslations?: Record<string, string>[];
  showDictionary?: boolean;
  hideText?: boolean;
  noTranslation?: boolean;
  checklist?: {
    instruction: string;
    items: { id: string; text: string; isTrue: boolean }[];
  };
}

export interface TrueFalseExercise extends BaseExercise {
  type: 'true_false';
  /** Опорна снимка (напр. карта от учебника). */
  imageUrl?: string;
  model?: { text: string; isTrue: boolean };
  sentences: {
    id: string;
    text: string;
    isTrue: boolean;
    /** Ако true — твърдението е пример: показва се с готов отговор и не се брои за точки. */
    isExample?: boolean;
  }[];
}

export interface PersonalChoiceExercise extends BaseExercise {
  type: 'personal_choice';
  title: string;
  imageUrls?: string[];
  model?: {
    question: string;
    positiveAnswer: string;
    negativeAnswer: string;
  };
  blankOptions: string[];
  items: {
    id: string;
    question: string;
    positiveTemplate: string;
    negativeTemplate: string;
    positiveBlank: string;
    negativeBlank: string;
  }[];
}

export interface ConnectDotsExercise extends BaseExercise {
  type: 'connect_dots';
  dots: {
    id: string;
    label: string;
    position: number;
  }[];
}

export interface AlphabetMazeExercise extends BaseExercise {
  type: 'alphabet_maze';
  grid: string[][];
  correctPath: { row: number; col: number }[];
  startImageUrl?: string;
  endImageUrl?: string;
}

export interface TableFillExercise extends BaseExercise {
  type: 'table_fill';
  paragraphs: {
    speaker?: string;
    text: string;
    imageUrl?: string;
  }[];
  /** Per paragraph TTS voice (Gemini Pro); same length as `paragraphs` when set */
  paragraphVoiceGenders?: ('male' | 'female')[];
  tables: {
    name: string;
    columns: string[];
    rows: {
      label: string;
      cells: {
        correctAnswers: string[];
        options: string[];
      }[];
    }[];
  }[];
}

// Union type for all exercises
export type Exercise = 
  | FillInBlankExercise
  | WorkbookFillBlankExercise
  | MultipleChoiceExercise 
  | MatchPairsExercise 
  | DropdownMatchExercise
  | DragToColumnsExercise
  | LetterChoiceExercise
  | WordOrderExercise
  | VerbConjugationExercise
  | ImageLabelingExercise
  | IllustratedCardsExercise
  | SyllableBlocksExercise
  | WordSearchExercise
  | GrammarVisualExercise
  | GrammarExamplesExercise
  | GrammarTableExercise
  | FillWithImagesExercise
  | DialoguesExercise
  | DialogueBuilderExercise
  | NumberWritingExercise
  | DialogueReadingExercise
  | TextComprehensionExercise
  | ListeningExercise
  | ReadingTextExercise
  | TrueFalseExercise
  | PersonalChoiceExercise
  | ConnectDotsExercise
  | AlphabetMazeExercise
  | TableFillExercise;

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
  translations?: Record<string, string>;
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
    title: string | Record<string, string>;
    content: string | Record<string, string>;
  }[];
  grammarReference?: {
    id: string;
    title: Record<string, string>;
    content: Record<string, string>;
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
  introText?: string;       // Intro paragraph shown before exercises
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
