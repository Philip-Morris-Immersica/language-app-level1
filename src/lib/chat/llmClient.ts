import OpenAI from 'openai';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamOptions {
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface LLMClient {
  stream(messages: ChatMessage[], opts: StreamOptions): AsyncIterable<string>;
}

export class OpenAIClient implements LLMClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async *stream(messages: ChatMessage[], opts: StreamOptions): AsyncIterable<string> {
    const stream = await this.client.chat.completions.create({
      model: opts.model,
      temperature: opts.temperature,
      max_tokens: opts.maxTokens,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) yield delta;
    }
  }
}

let cachedClient: OpenAIClient | null = null;
let cachedKey = '';

export function getLLMClient(apiKey: string): OpenAIClient {
  if (!cachedClient || cachedKey !== apiKey) {
    cachedClient = new OpenAIClient(apiKey);
    cachedKey = apiKey;
  }
  return cachedClient;
}
