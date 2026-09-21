import type {
  Exercise,
  WorkbookFillBlankExercise,
} from '@/content/types';

export const workbookExercises: Exercise[] = [

  {
    id: 'l06-wb-01',
    type: 'workbook_fill_blank',
    instruction: 'Напишете прилагателните в правилната форма.',
    order: 1,
    points: 7,
    layout: 'single',
    sentences: [
      { text: 'Ивана е добра. (добър)', blanks: [], isExample: true },
      { text: 'Децата са _______ . (умен)', blanks: [0], correctAnswers: ['умни'] },
      { text: 'Момчето е _______ . (малък)', blanks: [0], correctAnswers: ['малко'] },
      { text: 'Бабата е _______ . (пълен)', blanks: [0], correctAnswers: ['пълна'] },
      { text: 'Жената е _______ . (нисък)', blanks: [0], correctAnswers: ['ниска'] },
      { text: 'Кафето е _______ . (черен)', blanks: [0], correctAnswers: ['черно'] },
      { text: 'Блоковете са _______ . (грозен)', blanks: [0], correctAnswers: ['грозни'] },
      { text: 'Семейството е _______ . (голям)', blanks: [0], correctAnswers: ['голямо'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l06-wb-02',
    type: 'workbook_fill_blank',
    instruction: 'Работете по модела. Напишете правилната форма (число + съществително).',
    order: 2,
    points: 8,
    layout: 'single',
    sentences: [
      { text: 'Мария има две деца. (2, дете)', blanks: [], isExample: true },
      { text: 'Колко _______ имаш? (брат)', blanks: [0], correctAnswers: ['братя'] },
      { text: 'Иванови имат _______ . (2, апартамент)', blanks: [0], correctAnswers: ['два апартамента'] },
      { text: 'В кафето има _______ . (4, мъж)', blanks: [0], correctAnswers: ['четирима мъже'] },
      { text: 'Искам _______ . (2, сандвич)', blanks: [0], correctAnswers: ['два сандвича'] },
      { text: 'Катя има _______ . (3, внук)', blanks: [0], correctAnswers: ['трима внуци'] },
      { text: 'Стефан има _______ в Пловдив. (2, дядо)', blanks: [0], correctAnswers: ['двама дядовци'] },
      { text: 'Петър има _______ . (2, син)', blanks: [0], correctAnswers: ['двама синове'] },
      { text: 'Колко _______ живеят в София? (човек)', blanks: [0], correctAnswers: ['души'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l06-wb-03',
    type: 'workbook_fill_blank',
    instruction: 'Напишете кратките притежателни местоимения.',
    order: 3,
    points: 6,
    layout: 'single',
    sentences: [
      { text: 'Аз имам брат. Брат ми е умен.', blanks: [], isExample: true },
      { text: 'Те имат много приятели. Приятелите _______ са добри.', blanks: [0], correctAnswers: ['им'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
      { text: 'Ти си омъжена. Откъде е мъжът _______ ?', blanks: [0], correctAnswers: ['ти'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
      { text: 'Ние имаме голямо семейство. Семейството _______ живее тук.', blanks: [0], correctAnswers: ['ни'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
      { text: 'Тя живее в малък апартамент. Къде е апартаментът _______ ?', blanks: [0], correctAnswers: ['й'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
      { text: 'Вие имате деца. Къде са децата _______ ?', blanks: [0], correctAnswers: ['ви'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
      { text: 'Той има дъщеря. Как се казва дъщеря _______ ?', blanks: [0], correctAnswers: ['му'], options: ['ми', 'ти', 'му', 'й', 'ни', 'ви', 'им'] },
    ],
  } as WorkbookFillBlankExercise,

  {
    id: 'l06-wb-04',
    type: 'workbook_fill_blank',
    instruction: 'Попълнете правилните форми на глаголите.',
    order: 4,
    points: 9,
    layout: 'single',
    sentences: [
      { text: 'Аз работя в банка. (работя)', blanks: [], isExample: true },
      { text: 'Вие _______ български? (уча)', blanks: [0], correctAnswers: ['учите'] },
      { text: 'Тя _______ Милена. (казвам се)', blanks: [0], correctAnswers: ['се казва'] },
      { text: 'Те _______ в Пловдив. (уча)', blanks: [0], correctAnswers: ['учат'] },
      { text: 'Ние _______ много. (работя)', blanks: [0], correctAnswers: ['работим'] },
      { text: 'Ти как _______ ? (казвам се)', blanks: [0], correctAnswers: ['се казваш'] },
      { text: 'Ние _______ в университет. (уча)', blanks: [0], correctAnswers: ['учим'] },
      { text: 'Те не _______ . (работя)', blanks: [0], correctAnswers: ['работят'] },
      { text: 'Как _______ той? (казвам се)', blanks: [0], correctAnswers: ['се казва'] },
      { text: 'Ти къде _______ ? (работя)', blanks: [0], correctAnswers: ['работиш'] },
    ],
  } as WorkbookFillBlankExercise,

];
