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
    return NextResponse.json({ error: 'No API key configured' }, { status: 503 });
  }

  const llm = getLLMClient(config.apiKey);
  let response = '';
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
    response += chunk;
  }

  return NextResponse.json({ response });
}
