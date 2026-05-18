/**
 * OpenAI models we let admins pick in /admin/prompts.
 *
 * Costs are in USD per 1,000,000 tokens. Input and output are priced
 * separately. Verify against https://platform.openai.com/docs/pricing before
 * editing.
 *
 * IMPORTANT: `id` must be the EXACT OpenAI model identifier accepted by the
 * Chat Completions API. If a request fails with a 404 / "model not found",
 * the id here is wrong — update it.
 */
export interface ModelOption {
  id: string;
  label: string;
  costPer1MInputUsd: number;
  costPer1MOutputUsd: number;
  notes?: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  // GPT-5.x family (latest at time of writing, May 2026)
  { id: 'gpt-5.5', label: 'GPT-5.5 — best ($5/$30 per 1M)', costPer1MInputUsd: 5.0, costPer1MOutputUsd: 30.0, notes: 'Highest quality, most expensive' },
  { id: 'gpt-5.4', label: 'GPT-5.4 ($2.50/$15 per 1M)', costPer1MInputUsd: 2.5, costPer1MOutputUsd: 15.0 },
  { id: 'gpt-5.3', label: 'GPT-5.3 ($1.75/$14 per 1M)', costPer1MInputUsd: 1.75, costPer1MOutputUsd: 14.0 },

  // GPT-4 family
  { id: 'gpt-4o', label: 'GPT-4o ($2.50/$10 per 1M)', costPer1MInputUsd: 2.5, costPer1MOutputUsd: 10.0 },
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini ($0.15/$0.60 per 1M) — recommended', costPer1MInputUsd: 0.15, costPer1MOutputUsd: 0.6 },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo ($10/$30 per 1M)', costPer1MInputUsd: 10.0, costPer1MOutputUsd: 30.0 },
];

export const DEFAULT_MODEL = 'gpt-4o-mini';

/** Look up cost per 1M tokens for an arbitrary model id. Falls back to mini if unknown. */
export function getModelCost(modelId: string | null | undefined): { inputPer1M: number; outputPer1M: number } {
  const m = AVAILABLE_MODELS.find((x) => x.id === modelId);
  if (m) return { inputPer1M: m.costPer1MInputUsd, outputPer1M: m.costPer1MOutputUsd };
  const fallback = AVAILABLE_MODELS.find((x) => x.id === DEFAULT_MODEL)!;
  return { inputPer1M: fallback.costPer1MInputUsd, outputPer1M: fallback.costPer1MOutputUsd };
}

/**
 * Compute the cost of a single LLM call in MICRO-USD (1 USD = 1,000,000 micro).
 * We store cost in integer micro-USD so we can SUM without floating-point loss.
 */
export function computeCostMicroUsd(modelId: string | null | undefined, tokensIn: number, tokensOut: number): number {
  const { inputPer1M, outputPer1M } = getModelCost(modelId);
  // (tokens * usdPerMillion / 1_000_000) → usd, then * 1_000_000 → micro-usd
  // Simplifies to: tokens * usdPerMillion
  const micro = tokensIn * inputPer1M + tokensOut * outputPer1M;
  return Math.round(micro);
}
