import type {
  Exercise,
  ImageLabelingExercise,
  IllustratedCardsExercise,
  DragToColumnsExercise,
  WordSearchExercise,
  GrammarVisualExercise,
  GrammarExamplesExercise,
} from '@/content/types';

// ⚠️ IMPORTANT: Follow the exact order from Main-Book-Lesson-2.pdf (see LESSON_STRUCTURE_02.md)
// The 'order' property must match the sequence in the textbook

export const exercises: Exercise[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 17
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 1: Упражнение 1 – Напишете думите под картинките
  {
    id: 'l02-ex-01',
    type: 'image_labeling',
    instruction: 'Напишете думите под картинките.',
    order: 1,
    points: 4,
    images: [
      { id: 'pizza',     imageUrl: '/assets/lesson-02/exercise-01-write-words/02-pizza.jpg',     correctLabel: 'пица' },
      { id: 'sandwich',  imageUrl: '/assets/lesson-02/exercise-01-write-words/01-sandwich.jpg',  correctLabel: 'сандвич' },
      { id: 'duner',     imageUrl: '/assets/lesson-02/exercise-01-write-words/03-duner.jpg',     correctLabel: 'дюнер' },
      { id: 'croissant', imageUrl: '/assets/lesson-02/exercise-01-write-words/04-croissant.jpg', correctLabel: 'кроасан' },
    ],
    options: ['дюнер', 'кроасан', 'пица', 'сандвич'],
  } as ImageLabelingExercise,

  // ORDER 2: НОВИ ДУМИ – Храни и напитки (NOT AN EXERCISE!)
  {
    id: 'l02-novi-dumi-01',
    type: 'illustrated_cards',
    title: 'НОВИ ДУМИ',
    instruction: 'Запознайте се с новите думи',
    order: 2,
    cards: [
      { id: 'voda',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/01-voda.jpg',          label: 'вода' },
      { id: 'chay',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/02-chay.jpg',          label: 'чай' },
      { id: 'kafe',          imageUrl: '/assets/lesson-02/novi-dumi-1-food/03-kafe.jpg',          label: 'кафе' },
      { id: 'kapuchino',     imageUrl: '/assets/lesson-02/novi-dumi-1-food/04-kapuchino.jpg',     label: 'капучино' },
      { id: 'sok',           imageUrl: '/assets/lesson-02/novi-dumi-1-food/05-sok.jpg',           label: 'сок' },
      { id: 'pryasno-mlyako', imageUrl: '/assets/lesson-02/novi-dumi-1-food/06-pryasno-mlyako.jpg', label: 'прясно мляко' },
      { id: 'kiselo-mlyako', imageUrl: '/assets/lesson-02/novi-dumi-1-food/07-kiselo-mlyako.jpg', label: 'кисело мляко' },
      { id: 'sirene',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/08-sirene.jpg',        label: 'сирене' },
      { id: 'kashkaval',     imageUrl: '/assets/lesson-02/novi-dumi-1-food/09-kashkaval.jpg',     label: 'кашкавал' },
      { id: 'maslo',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/10-maslo.jpg',         label: 'масло' },
      { id: 'hlyab',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/11-hlyab.jpg',         label: 'хляб' },
      { id: 'filiya',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/12-filiya.jpg',        label: 'филия' },
      { id: 'banitsa',       imageUrl: '/assets/lesson-02/novi-dumi-1-food/13-banitsa.jpg',       label: 'баница' },
      { id: 'yaytse',        imageUrl: '/assets/lesson-02/novi-dumi-1-food/14-yaytse.jpg',        label: 'яйце' },
      { id: 'salam',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/15-salam.jpg',         label: 'салам' },
      { id: 'zahar',         imageUrl: '/assets/lesson-02/novi-dumi-1-food/16-zahar.jpg',         label: 'захар' },
      { id: 'med',           imageUrl: '/assets/lesson-02/novi-dumi-1-food/17-med.jpg',           label: 'мед' },
    ],
  } as IllustratedCardsExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // СТРАНИЦА 18
  // ─────────────────────────────────────────────────────────────────────────

  // ORDER 3: Упражнение 2 – Подредете думите в двете колонки
  // TESTING: Click-based version with 8 items
  {
    id: 'l02-ex-02',
    type: 'drag_to_columns',
    instruction: 'Подредете думите в двете колонки.',
    order: 3,
    points: 8,
    items: [
      'чай', 'кафе', 'сок', 'мляко',
      'хляб', 'сирене', 'масло', 'яйце',
    ],
    columns: [
      {
        id: 'drinks',
        title: 'НАПИТКИ',
        icon: '🥤',
        correctItems: ['чай', 'кафе', 'сок', 'мляко'],
      },
      {
        id: 'food',
        title: 'ХРАНИ',
        icon: '🍽️',
        correctItems: ['хляб', 'сирене', 'масло', 'яйце'],
      },
    ],
  } as DragToColumnsExercise,

  // ORDER 4: Упражнение 3 – Намерете думите в матрицата
  {
    id: 'l02-ex-03',
    type: 'word_search',
    instruction: 'Колко думи можете да намерите?',
    order: 4,
    points: 7,
    letterString: 'СИРЕНЕММАСЛОПЛХПФИЛИЯЛЧАЙЯЦКЯМЕДЙАОБАНИЦАСИКАФЕКР',
    correctWords: ['СИРЕНЕ', 'МАСЛО', 'ФИЛИЯ', 'ЧАЙ', 'МЕД', 'БАНИЦА', 'КАФЕ'],
  } as WordSearchExercise,

  // ORDER 5: ГРАМАТИКА 1 – Какво е това? (NOT AN EXERCISE!)
  {
    id: 'l02-gramatika-01',
    type: 'grammar_visual',
    title: 'ГРАМАТИКА 1',
    instruction: 'Запознайте се с въпроса и отговора за предмети',
    order: 5,
    pronouns: [
      {
        pronoun: 'Какво е това?',
        imageUrl: '/assets/lesson-02/gramatika-1-kakvo-e-tova/kakvo-e-tova-banitsa.jpg',
        description: 'Това е баница.',
      },
    ],
  } as GrammarVisualExercise,

  // ORDER 6: Упражнение 4 – Какво е това? (8 храни)
  {
    id: 'l02-ex-04',
    type: 'image_labeling',
    instruction: 'Работете по двойки. Питайте и отговаряйте по модела: „– Какво е това? – Това е ___________."',
    order: 6,
    points: 8,
    images: [
      { id: 'pizza',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/01-pizza.jpg',     correctLabel: 'пица' },
      { id: 'croissant', imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/02-croissant.jpg', correctLabel: 'кроасан' },
      { id: 'banitsa',   imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/03-banitsa.jpg',   correctLabel: 'баница' },
      { id: 'hlyab',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/04-hlyab.jpg',     correctLabel: 'хляб' },
      { id: 'salam',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/05-salam.jpg',     correctLabel: 'салам' },
      { id: 'yaytse',    imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/06-yaytse.jpg',    correctLabel: 'яйце' },
      { id: 'zahar',     imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/07-zahar.jpg',     correctLabel: 'захар' },
      { id: 'med',       imageUrl: '/assets/lesson-02/exercise-04-kakvo-e-tova/08-med.jpg',       correctLabel: 'мед' },
    ],
    options: ['баница', 'захар', 'кроасан', 'мед', 'пица', 'салам', 'хляб', 'яйце'],
  } as ImageLabelingExercise,

  // ORDER 7: ГРАМАТИКА 2 – Обичам / не обичам (NOT AN EXERCISE!)
  {
    id: 'l02-gramatika-02',
    type: 'grammar_examples',
    title: 'ГРАМАТИКА 2',
    subtitle: 'Обичам / не обичам',
    instruction: 'Запознайте се с глагола обичам – всички лица',
    order: 7,
    examples: [
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/az-kafe-chay.jpg',
        text: 'Аз обичам кафе.',
        subtext: 'Аз не обичам чай.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/ti-voda-mlyako.jpg',
        text: 'Ти обичаш вода.',
        subtext: 'Ти не обичаш прясно мляко.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/toy-sok-kapuchino.jpg',
        text: 'Той обича сок.',
        subtext: 'Той не обича капучино.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/tya-maslo-sirene.jpg',
        text: 'Тя обича масло.',
        subtext: 'Тя не обича сирене.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/to-kiselo-mlyako-salam.jpg',
        text: 'То обича кисело мляко.',
        subtext: 'То не обича салам.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/nie-banitsa-kashkaval.jpg',
        text: 'Ние обичаме баница.',
        subtext: 'Ние не обичаме кашкавал.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/vye-hlyab-pitza.jpg',
        text: 'Вие обичате хляб.',
        subtext: 'Вие не обичате пица.',
      },
      {
        imageUrl: '/assets/lesson-02/gramatika-2-obicham/te-med-zahar.jpg',
        text: 'Те обичат мед.',
        subtext: 'Те не обичат захар.',
      },
    ],
  } as GrammarExamplesExercise,

  // ─────────────────────────────────────────────────────────────────────────
  // ФАЗА 2 (стр. 19-21) — TODO
  // ─────────────────────────────────────────────────────────────────────────
  // ORDER 8:  l02-gramatika-table-01  grammar_table    Сегашно време А група
  // ORDER 9:  l02-ex-05               fill_with_images  Следвайте модела
  // ORDER 10: l02-ex-06               word_order        Подредете думите
  // ORDER 11: l02-ex-07               character_preferences  Ева и Ангел
  // ORDER 12: l02-ex-08               dialogues (placeholder) pair work
  // ORDER 13: l02-gramatika-03        grammar_visual    Искам
  // ORDER 14: l02-ex-09               match_pairs       Свържете местоимения
  // ORDER 15: l02-ex-10               dialogues (placeholder) pair work
  // ORDER 16: l02-ex-11               character_preferences  Али и Сара
  // ORDER 17: l02-ex-12               dialogues (placeholder) pair work
  // ORDER 18: l02-gramatika-04        grammar_visual    Кафе с/без захар
  // ORDER 19: l02-ex-13               dialogues (placeholder) pair work
  // ORDER 20: l02-dialozi-01          dialogues         ДИАЛОЗИ а-д
  // ORDER 21: l02-ex-14               dialogues (placeholder) четене по двойки
  // ORDER 22: l02-ex-15               dialogues (placeholder) pair work
  // ORDER 23: l02-gramatika-05        grammar_visual    Има/Няма
  // ORDER 24: l02-ex-16               fill_in_blank     Какво има/няма на масата

  // ─────────────────────────────────────────────────────────────────────────
  // ФАЗА 3 (стр. 22-24) — TODO
  // ─────────────────────────────────────────────────────────────────────────
  // ORDER 25: l02-ex-17               reading_text (placeholder) рисуване кошница
  // ORDER 26: l02-gramatika-06        grammar_table     Род на съществителните
  // ORDER 27: l02-ex-18               match_pairs       един/една/едно
  // ORDER 28: l02-ex-19               dropdown_match    Поставете в колоната
  // ORDER 29: l02-gramatika-07        grammar_visual    Числителни 0-10
  // ORDER 30: l02-ex-20               reading_text (placeholder) свържи точките
  // ORDER 31: l02-ex-21               fill_in_blank     Напишете числото
  // ORDER 32: l02-ex-22               reading_text (placeholder) кръстословица
  // ORDER 33: l02-ex-23               multiple_choice   Оградете излишната дума
  // ORDER 34: l02-ex-24               fill_in_blank     Попълнете диалозите
  // ORDER 35: l02-ex-25               reading_text (placeholder) слушай и рисувай
  // ORDER 36: l02-ex-26               reading_text      ТЕКСТОВЕ – Амал и Наталия
  // ORDER 37: l02-ex-27               true_false        Вярно или грешно?
  // ORDER 38: l02-ex-29               fill_in_blank     Слушайте и попълнете

];
