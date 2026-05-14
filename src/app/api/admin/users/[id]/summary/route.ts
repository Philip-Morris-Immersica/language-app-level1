import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, isNextResponse } from '@/lib/admin/requireRole';
import { db } from '@/db';
import { usersTable, chatConversationsTable, chatMessagesTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getActiveConfig } from '@/lib/chat/getActiveConfig';
import { getLLMClient } from '@/lib/chat/llmClient';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req, 'admin');
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const userId = parseInt(id);

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const conversations = await db
    .select({ id: chatConversationsTable.id })
    .from(chatConversationsTable)
    .where(eq(chatConversationsTable.userId, userId))
    .orderBy(desc(chatConversationsTable.lastMessageAt))
    .limit(5);

  const allMessages: string[] = [];
  for (const conv of conversations) {
    const msgs = await db
      .select({ role: chatMessagesTable.role, content: chatMessagesTable.content })
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.conversationId, conv.id))
      .limit(20);
    for (const m of msgs) {
      if (m.role !== 'system') allMessages.push(`${m.role}: ${m.content}`);
    }
  }

  if (!allMessages.length) {
    return NextResponse.json({ summary: 'No conversations found for this user.' });
  }

  const config = await getActiveConfig();
  if (!config.apiKey) {
    return NextResponse.json({ error: 'No API key configured' }, { status: 503 });
  }

  const prompt = `Summarize the following chat conversations from a language learning app. The user is learning Bulgarian. Provide:
1. Main topics/questions asked
2. Apparent level of understanding
3. Areas where the user struggles
4. Overall engagement level

Conversations:
${allMessages.slice(0, 100).join('\n')}

Respond in English in 3-5 bullet points.`;

  const llm = getLLMClient(config.apiKey);
  let summary = '';
  for await (const chunk of llm.stream(
    [{ role: 'user', content: prompt }],
    { model: config.model, temperature: 0.3, maxTokens: 400 },
  )) {
    summary += chunk;
  }

  return NextResponse.json({ summary });
}
