import type { LessonContent } from '@/content/types';

export const content: LessonContent = {
  introduction: 'В този урок ще се научите как да се поздравявате и представяте на български език.',
  
  sections: [
    {
      id: 'greetings',
      title: 'Поздрави',
      content: `Основни поздрави в българския език:

• Здравейте - формално поздравяване
• Здрасти / Здравей - неформално поздравяване
• Добро утро! - сутрин (до обяд)
• Добър ден! - следобяд
• Добър вечер! - вечер
• Лека нощ! - преди лягане

За сбогуване:
• Довиждане - формално
• Чао - неформално`,
    },
    {
      id: 'personal-pronouns',
      title: 'Лични местоимения',
      content: `Личните местоимения в българския език:

Единствено число:
• Аз (I)
• Ти (you - singular, informal)
• Той (he)
• Тя (she)
• То (it)

Множествено число:
• Ние (we)
• Вие (you - plural or formal)
• Те (they)`,
    },
    {
      id: 'verb-to-be',
      title: 'Глагол СЪМ (to be)',
      content: `Спрежение на глагола "съм" в сегашно време:

• Аз съм
• Ти си
• Той/тя/то е
• Ние сме
• Вие сте
• Те са

Примери:
• Аз съм българин.
• Ти си учител.
• Той е от Сирия.
• Ние сме бежанци.
• Вие сте от България.
• Те са учители.`,
    },
  ],

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
