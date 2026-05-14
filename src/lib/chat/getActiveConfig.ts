import { db } from '@/db';
import { adminPromptsTable, adminApiKeysTable, adminWelcomeMessageTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { HARDCODED_WELCOME_MESSAGES } from './welcomeMessages';
import { DEFAULT_MODEL } from './availableModels';
import type { SupportedLang } from '@/i18n/languages';

export interface ActiveChatConfig {
  basePrompt: string | null;
  levelPrompt: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey: string | null;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const CONFIG_CACHE = new Map<string, CacheEntry<ActiveChatConfig>>();
const WELCOME_CACHE = new Map<string, CacheEntry<string>>();
const CACHE_TTL_MS = 60_000;

function isFresh<T>(entry: CacheEntry<T> | undefined): entry is CacheEntry<T> {
  return !!entry && entry.expiresAt > Date.now();
}

export async function getActiveConfig(level?: string): Promise<ActiveChatConfig> {
  const cacheKey = level ?? 'base';
  const cached = CONFIG_CACHE.get(cacheKey);
  if (isFresh(cached)) return cached.value;

  const scopes = level ? ['base', level] : ['base'];

  const [prompts, keyRows] = await Promise.all([
    db.select().from(adminPromptsTable).where(
      and(eq(adminPromptsTable.isActive, true))
    ),
    db.select({ encryptedKey: adminApiKeysTable.encryptedKey })
      .from(adminApiKeysTable)
      .where(and(eq(adminApiKeysTable.provider, 'openai'), eq(adminApiKeysTable.isActive, true)))
      .limit(1),
  ]);

  const baseRow = prompts.find((p) => p.scope === 'base');
  const levelRow = level ? prompts.find((p) => p.scope === level) : null;

  let apiKey: string | null = null;
  if (keyRows[0]) {
    try {
      const { decryptKey } = await import('../admin/cryptoKeys');
      apiKey = await decryptKey(keyRows[0].encryptedKey);
    } catch {
      // crypto not set up yet — fall through to env fallback
    }
  }

  const config: ActiveChatConfig = {
    basePrompt: baseRow?.promptText ?? null,
    levelPrompt: levelRow?.promptText ?? null,
    model: baseRow?.model ?? DEFAULT_MODEL,
    temperature: (baseRow?.temperature ?? 70) / 100,
    maxTokens: baseRow?.maxTokens ?? 1000,
    apiKey: apiKey ?? process.env.OPENAI_API_KEY ?? null,
  };

  CONFIG_CACHE.set(cacheKey, { value: config, expiresAt: Date.now() + CACHE_TTL_MS });
  return config;
}

export async function getWelcomeMessage(lang: SupportedLang): Promise<string> {
  const cached = WELCOME_CACHE.get(lang);
  if (isFresh(cached)) return cached.value;

  try {
    const rows = await db.select({ text: adminWelcomeMessageTable.text, isActive: adminWelcomeMessageTable.isActive })
      .from(adminWelcomeMessageTable)
      .where(and(eq(adminWelcomeMessageTable.lang, lang), eq(adminWelcomeMessageTable.isActive, true)))
      .limit(1);

    const text = (rows[0] as { text?: string })?.text ?? HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES['en'];
    WELCOME_CACHE.set(lang, { value: text, expiresAt: Date.now() + CACHE_TTL_MS });
    return text;
  } catch {
    return HARDCODED_WELCOME_MESSAGES[lang] ?? HARDCODED_WELCOME_MESSAGES['en'];
  }
}

export function invalidateConfigCache() {
  CONFIG_CACHE.clear();
  WELCOME_CACHE.clear();
}
