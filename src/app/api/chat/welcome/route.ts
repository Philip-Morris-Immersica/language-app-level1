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

/**
 * GET /api/chat/welcome?lang=xx
 *
 * Returns the welcome message + suggestion chips for the chatbot.
 *
 * Strategy (matches the admin UI promise „Write in Bulgarian — translations
 * to all 7 languages happen automatically"):
 *
 *   1. Always look up the BG admin row — that is the source-of-truth that
 *      the admin actually edits.
 *   2. Also look up the requested-lang admin row — admins MAY override per
 *      language but currently the UI only edits BG, so this is usually null.
 *   3. Respond with:
 *        - `message` / `chips` for direct display when the user is on BG, OR
 *          when no admin customisation exists (per-lang HARDCODED fallback)
 *        - `messageSource` / `chipsSource` = the BG admin text, present only
 *          when admin has customised it AND the user is on a non-BG language.
 *          The client uses these to run client-side translation so the
 *          admin's custom text reaches all 7 languages.
 */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get('lang') ?? 'en') as SupportedLang;

  try {
    const [bgRows, langRows] = await Promise.all([
      db.select()
        .from(adminWelcomeMessageTable)
        .where(and(eq(adminWelcomeMessageTable.lang, 'bg'), eq(adminWelcomeMessageTable.isActive, true)))
        .limit(1),
      lang === 'bg' ? Promise.resolve([] as typeof adminWelcomeMessageTable.$inferSelect[])
        : db.select()
          .from(adminWelcomeMessageTable)
          .where(and(eq(adminWelcomeMessageTable.lang, lang), eq(adminWelcomeMessageTable.isActive, true)))
          .limit(1),
    ]);

    const bgRow = bgRows[0];
    const langRow = langRows[0];

    // Defensive trim: strips stray whitespace from chips/text already saved
    // in the DB before the PUT route started trimming on write.
    const trimChips = (raw: string): string[] | null => {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return null;
        return parsed
          .map((chip) => (typeof chip === 'string' ? chip.trim() : chip))
          .filter((chip): chip is string => typeof chip === 'string' && chip !== '');
      } catch {
        return null;
      }
    };

    let bgChips: string[] | null = null;
    if (bgRow?.suggestionChips) bgChips = trimChips(bgRow.suggestionChips);
    let langChips: string[] | null = null;
    if (langRow?.suggestionChips) langChips = trimChips(langRow.suggestionChips);

    // --- MESSAGE ---
    let message: string;
    let messageSource: string | null = null;
    if (lang === 'bg') {
      message = bgRow?.text.trim() ?? HARDCODED_WELCOME_MESSAGES.bg;
    } else if (langRow?.text) {
      // Admin explicitly customised this language → use it directly
      message = langRow.text.trim();
    } else if (bgRow?.text) {
      // Admin customised only BG → ask client to translate it
      message = HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES.en;
      messageSource = bgRow.text.trim();
    } else {
      message = HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES.en;
    }

    // --- CHIPS ---
    let chips: string[];
    let chipsSource: string[] | null = null;
    if (lang === 'bg') {
      chips = bgChips ?? DEFAULT_CHIPS.bg;
    } else if (langChips) {
      chips = langChips;
    } else if (bgChips) {
      // Admin set BG chips → translate client-side so they reach all 7 langs
      chips = DEFAULT_CHIPS[lang] ?? DEFAULT_CHIPS.en;
      chipsSource = bgChips;
    } else {
      chips = DEFAULT_CHIPS[lang] ?? DEFAULT_CHIPS.en;
    }

    return NextResponse.json({ message, chips, messageSource, chipsSource });
  } catch {
    return NextResponse.json({
      message: HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES.en,
      chips: DEFAULT_CHIPS[lang] ?? DEFAULT_CHIPS.en,
      messageSource: null,
      chipsSource: null,
    });
  }
}
