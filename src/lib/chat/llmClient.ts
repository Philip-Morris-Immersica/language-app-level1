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

export interface UsageInfo {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * Discriminated chunks emitted by the stream:
 *   - { type: 'text', value }  — a piece of the assistant message text
 *   - { type: 'usage', value } — final token counts reported by the provider
 *
 * The 'usage' chunk arrives once, AFTER the last 'text' chunk. Callers should
 * accumulate text chunks for the response body and capture the 'usage' chunk
 * for accurate billing.
 */
export type StreamChunk =
  | { type: 'text'; value: string }
  | { type: 'usage'; value: UsageInfo };

export interface LLMClient {
  stream(messages: ChatMessage[], opts: StreamOptions): AsyncIterable<StreamChunk>;
}

export class OpenAIClient implements LLMClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async *stream(messages: ChatMessage[], opts: StreamOptions): AsyncIterable<StreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: opts.model,
      temperature: opts.temperature,
      max_tokens: opts.maxTokens,
      messages,
      stream: true,
      // Tell OpenAI to send a final chunk with the real prompt/completion token
      // counts. Without this we used to count stream chunks (totally wrong) and
      // estimate prompt tokens by chars/4 (also wrong). Now we use OpenAI's
      // own usage values for billing.
      stream_options: { include_usage: true },
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        yield { type: 'text', value: delta };
      }

      // OpenAI emits a final chunk where `choices` is empty and `usage` is
      // populated. Forward it to the caller so they can store real costs.
      if (chunk.usage) {
        yield {
          type: 'usage',
          value: {
            promptTokens: chunk.usage.prompt_tokens ?? 0,
            completionTokens: chunk.usage.completion_tokens ?? 0,
            totalTokens: chunk.usage.total_tokens ?? 0,
          },
        };
      }
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
