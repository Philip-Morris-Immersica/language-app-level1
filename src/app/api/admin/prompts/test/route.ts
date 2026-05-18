import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { getLLMClient } from '@/lib/chat/llmClient';

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req, 'it');
  if (isNextResponse(auth)) return auth;

  const { promptText, testMessage, temperature, model, maxTokens } = await req.json();
  if (!promptText || !testMessage) {
    return NextResponse.json({ error: 'promptText and testMessage required' }, { status: 400 });
  }

  const config = await getActiveConfig();
  if (!config.apiKey) {
    return NextResponse.json({
      error: 'No OpenAI API key configured. Open /admin → API Keys to add one (or set OPENAI_API_KEY in .env.local for local dev).',
    }, { status: 503 });
  }

  const llm = getLLMClient(config.apiKey);
  let response = '';
  try {
    for await (const chunk of llm.stream(
      [
        { role: 'system', content: promptText },
        { role: 'user', content: testMessage },
      ],
      {
        model: model ?? config.model,
        temperature: (temperature ?? 70) / 100,
        maxTokens: maxTokens ?? 500,
      },
    )) {
      if (chunk.type === 'text') response += chunk.value;
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error('[admin/prompts/test] LLM error:', err);
    return NextResponse.json({
      error: `LLM call failed: ${detail}`,
    }, { status: 502 });
  }

  if (!response.trim()) {
    return NextResponse.json({
      error: 'LLM returned an empty response. Check the model name and try again.',
    }, { status: 502 });
  }

  return NextResponse.json({ response });
}
