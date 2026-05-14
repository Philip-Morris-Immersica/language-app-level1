import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminWelcomeMessageTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { HARDCODED_WELCOME_MESSAGES } from '@/lib/chat/welcomeMessages';
import type { SupportedLang } from '@/i18n/languages';

const DEFAULT_CHIPS: Record<SupportedLang, string[]> = {
  bg: ['Как можеш да ми помогнеш?', 'Дай ми примери', 'Какво означава тази дума?'],
  en: ['How can you help me?', 'Give me examples', 'What does this word mean?'],
  ar: ['كيف يمكنك مساعدتي؟', 'أعطني أمثلة', 'ماذا تعني هذه الكلمة؟'],
  fr: ['Comment peux-tu m\'aider ?', 'Donne-moi des exemples', 'Que veut dire ce mot ?'],
  fa: ['چطور می‌توانی کمکم کنی؟', 'مثال بده', 'این کلمه چه معنایی دارد؟'],
  uk: ['Як ти можеш мені допомогти?', 'Дай мені приклади', 'Що означає це слово?'],
  ru: ['Как ты можешь помочь?', 'Дай мне примеры', 'Что значит это слово?'],
};

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get('lang') ?? 'en') as SupportedLang;

  try {
    const rows = await db.select()
      .from(adminWelcomeMessageTable)
      .where(and(eq(adminWelcomeMessageTable.lang, lang), eq(adminWelcomeMessageTable.isActive, true)))
      .limit(1);

    const row = rows[0];
    const message = row?.text ?? HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES['en'];

    let chips: string[] = DEFAULT_CHIPS[lang] ?? DEFAULT_CHIPS['en'];
    if (row?.suggestionChips) {
      try { chips = JSON.parse(row.suggestionChips); } catch { /* use defaults */ }
    }

    return NextResponse.json({ message, chips });
  } catch {
    return NextResponse.json({
      message: HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES['en'],
      chips: DEFAULT_CHIPS[lang] ?? DEFAULT_CHIPS['en'],
    });
  }
}
