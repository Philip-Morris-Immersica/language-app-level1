export interface ModelOption {
  id: string;
  label: string;
  costPer1MInputUsd: number;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini (~$0.15/1M)', costPer1MInputUsd: 0.15 },
  { id: 'gpt-4o', label: 'GPT-4o (~$2.50/1M)', costPer1MInputUsd: 2.5 },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo (~$10/1M)', costPer1MInputUsd: 10 },
  // Add new models here — just add a row, no other changes needed
];

export const DEFAULT_MODEL = 'gpt-4o-mini';
