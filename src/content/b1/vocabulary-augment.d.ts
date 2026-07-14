/**
 * B1 vocabulary TTS fields not yet in shared VocabularyItem.
 * Augments the shared type so lesson content.ts can set voiceGender per word.
 */
declare module '@/content/types' {
  interface VocabularyItem {
    /** TTS voice: Charon (male) or Achernar (female). Default: female. */
    voiceGender?: 'male' | 'female';
  }
}

export {};
