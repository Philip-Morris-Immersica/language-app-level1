import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: `В първия урок ще направите най-важната крачка — ще се научите да се свързвате с хората около вас. Ще знаете как да поздравите, как да се представите и как да кажете откъде сте. Тези прости думи и изрази ще ви помогнат да се чувствате по-уверени в ежедневието — в магазина, на улицата, при лекар или в офис.

Урокът включва нови думи с картинки и звук, кратки упражнения и диалози от реалния живот. Всичко е стъпка по стъпка — спокойно и ясно.`,

  sections: [],

  dialogues: [
    {
      id: 'dialogue-1',
      speakers: [
        { name: 'Петър', text: 'Здравейте, аз съм Петър.' },
        { name: 'Амина', text: 'Здравейте, аз съм Амина. Приятно ми е!' },
        { name: 'Петър', text: 'Приятно ми е! Откъде сте?' },
        { name: 'Амина', text: 'Аз съм от Сирия. А вие?' },
        { name: 'Петър', text: 'Аз съм от България.' },
      ],
    },
  ],

  vocabulary: [
    { id: 'v1', bulgarian: 'здравейте', translation: 'hello (formal)', category: 'greetings' },
    { id: 'v2', bulgarian: 'довиждане', translation: 'goodbye', category: 'greetings' },
    { id: 'v3', bulgarian: 'приятно ми е', translation: 'nice to meet you', category: 'phrases' },
    { id: 'v4', bulgarian: 'откъде', translation: 'where from', category: 'questions' },
    { id: 'v5', bulgarian: 'българин/българка', translation: 'Bulgarian (person)', category: 'nationalities' },
    { id: 'v6', bulgarian: 'учител/учителка', translation: 'teacher', category: 'professions' },
  ],
};
