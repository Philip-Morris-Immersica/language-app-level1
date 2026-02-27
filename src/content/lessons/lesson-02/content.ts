import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `Вторият урок ни отвежда на закуската — любимото начало на деня! Ще научите имената на храните и напитките, с които започвате сутринта: хляб, баница, кафе, чай и много други. Ще можете да кажете какво обичате и какво не обичате, какво искате и какво не искате.

Урокът включва нови думи с картинки, граматика за изразяване на предпочитания, диалози от кафе и кухня, и числителните от нула до десет.`,

  sections: [],

  dialogues: [
    {
      id: 'dialogue-breakfast-1',
      speakers: [
        { name: 'Учителка', text: 'Обичате ли кафе?' },
        { name: 'Амал', text: 'Да, обичам. А Вие?' },
        { name: 'Учителка', text: 'Аз също.' },
      ],
    },
    {
      id: 'dialogue-breakfast-2',
      speakers: [
        { name: 'Иван', text: 'Искаш ли сок?' },
        { name: 'Наталия', text: 'Да, искам. А кроасан?' },
        { name: 'Иван', text: 'Не, не искам.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'voda', bulgarian: 'вода', category: 'напитки' },
    { id: 'chay', bulgarian: 'чай', category: 'напитки' },
    { id: 'kafe', bulgarian: 'кафе', category: 'напитки' },
    { id: 'kapuchino', bulgarian: 'капучино', category: 'напитки' },
    { id: 'sok', bulgarian: 'сок', category: 'напитки' },
    { id: 'pryasno-mlyako', bulgarian: 'прясно мляко', category: 'напитки' },
    { id: 'kiselo-mlyako', bulgarian: 'кисело мляко', category: 'храни' },
    { id: 'sirene', bulgarian: 'сирене', category: 'храни' },
    { id: 'kashkaval', bulgarian: 'кашкавал', category: 'храни' },
    { id: 'maslo', bulgarian: 'масло', category: 'храни' },
    { id: 'hlyab', bulgarian: 'хляб', category: 'храни' },
    { id: 'filiya', bulgarian: 'филия', category: 'храни' },
    { id: 'banitsa', bulgarian: 'баница', category: 'храни' },
    { id: 'yaytse', bulgarian: 'яйце', category: 'храни' },
    { id: 'salam', bulgarian: 'салам', category: 'храни' },
    { id: 'zahar', bulgarian: 'захар', category: 'храни' },
    { id: 'med', bulgarian: 'мед', category: 'храни' },
  ],
};
