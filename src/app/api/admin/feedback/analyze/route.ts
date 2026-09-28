import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { auditLog } from '@/lib/admin/audit';
import { db } from '@/db';
import { chatFeedbackTable } from '@/db/schema';
import { and, gte, lte, desc } from 'drizzle-orm';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { computeCostMicroUsd } from '@/lib/chat/availableModels';

// Cheap, fixed model for this on-demand summary — deliberately NOT the
// admin-configurable chat model (which may be a pricier flagship model picked
// for conversation quality). This route is manual/click-only, but still cheap
// by default so an accidental extra click never costs real money.
const ANALYZE_MODEL = 'gpt-4o-mini';
// Bounds the prompt size (and therefore cost) regardless of how much feedback
// accumulates in the selected period.
const MAX_COMMENTS = 300;

// Below this many comments there simply isn't enough signal to "analyse" —
// asking an LLM to summarise 1-2 comments is exactly what causes it to pad
// the answer with invented, generic-sounding filler. Skip the LLM call
// entirely (0 cost) and say so plainly instead.
const MIN_COMMENTS_FOR_ANALYSIS = 3;

const SYSTEM_PROMPT = `You analyse and SORT free-text feedback comments left by learners of a Bulgarian-language learning platform for refugees (UNHCR). Comments may be in any of: Bulgarian, Arabic, French, English, Persian, Ukrainian, Russian.

CRITICAL — do not violate these, they matter more than sounding complete:
- Base every single sentence STRICTLY on the comments given below. Never invent an issue, request, opinion, or theme that isn't actually expressed in at least one comment.
- Your job is primarily to GROUP and SORT the real comments by shared theme — not to generate generic advice about language-learning platforms.
- If the comments are too short, too few, or look like test/junk data (e.g. "тест", "test", "ok", random text) to contain real signal, say that plainly and stop — do not produce polished-looking sections anyway.
- A short, honest, possibly disappointing answer is always better than a longer fabricated one.

Respond in Bulgarian, in concise Markdown, with this structure:
## Обобщение
1-3 sentences describing what the comments actually contain, in plain terms. If there is no real signal (too few/too vague/test comments), say exactly that here and skip the rest.
## По теми
Only if at least 2 comments genuinely share a concrete theme: one bullet per theme, format "**Тема** (N коментара): резюме — цитат: '...'" using an actual short quote from a real comment. If no genuine shared theme exists across multiple comments, omit this section entirely (don't force one).
## Предложения
Only include this section if at least one comment explicitly implies or asks for a specific change. Each suggestion must reference which comment it's grounded in. If nothing in the comments supports a concrete suggestion, omit this whole section — never fill it with generic best-practice advice.
## Настроение
One short line: rough positive / neutral / negative split, based only on tone actually present in the comments — not a guess.`;

export async function POST(req: NextRequest) {
  // Restricted to admin/it (not viewer) — this endpoint spends real money,
  // unlike listing/marking-reviewed which are free reads.
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const body = await req.json().catch(() => null);
  const from = body?.from ? new Date(body.from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const to = body?.to ? new Date(body.to) : new Date();

  const rows = await db
    .select({
      comment: chatFeedbackTable.comment,
      language: chatFeedbackTable.language,
      createdAt: chatFeedbackTable.createdAt,
    })
    .from(chatFeedbackTable)
    .where(and(gte(chatFeedbackTable.createdAt, from), lte(chatFeedbackTable.createdAt, to)))
    .orderBy(desc(chatFeedbackTable.createdAt))
    .limit(MAX_COMMENTS);

  if (rows.length === 0) {
    return NextResponse.json({
      summary: '_Няма коментари за избрания период._',
      count: 0,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0,
    });
  }

  // Too few comments to meaningfully "analyse" — skip the LLM call entirely
  // (0 cost) instead of letting it pad out a fake-looking summary from 1-2
  // comments (this is exactly what caused hallucinated output before).
  if (rows.length < MIN_COMMENTS_FOR_ANALYSIS) {
    const preview = rows.map((r) => `„${r.comment.slice(0, 200)}"`).join(', ');
    return NextResponse.json({
      summary: `_Само ${rows.length} коментар(а) за избрания период — твърде малко за смислен анализ (минимум ${MIN_COMMENTS_FOR_ANALYSIS}). Съдържание: ${preview}_`,
      count: rows.length,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0,
    });
  }

  const config = await getActiveConfig();
  if (!config.apiKey) {
    return NextResponse.json({ error: 'No OpenAI API key configured' }, { status: 500 });
  }

  const digest = rows
    .map((r, i) => `${i + 1}. [${r.language}] ${r.comment.slice(0, 500)}`)
    .join('\n');

  const OpenAI = (await import('openai')).default;
  const openai = new OpenAI({ apiKey: config.apiKey });

  let summary = '';
  let tokensIn = 0;
  let tokensOut = 0;
  try {
    const completion = await openai.chat.completions.create({
      model: ANALYZE_MODEL,
      temperature: 0.3,
      max_tokens: 900,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Here are ${rows.length} feedback comment(s):\n\n${digest}` },
      ],
    });
    summary = completion.choices[0]?.message?.content?.trim() ?? '';
    tokensIn = completion.usage?.prompt_tokens ?? 0;
    tokensOut = completion.usage?.completion_tokens ?? 0;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `AI analysis failed: ${msg}` }, { status: 500 });
  }

  const costUsd = computeCostMicroUsd(ANALYZE_MODEL, tokensIn, tokensOut) / 1_000_000;

  await auditLog(auth.userId, 'analyzed_feedback', `${from.toISOString()}..${to.toISOString()}`, undefined, {
    count: rows.length,
    tokensIn,
    tokensOut,
    costUsd,
  });

  return NextResponse.json({ summary, count: rows.length, tokensIn, tokensOut, costUsd });
}
