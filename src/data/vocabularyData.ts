/**
 * Vocabulary Data Types
 *
 * Type definitions for vocabulary items.
 * Actual data is in the vocabulary/ subdirectory.
 */

export type VocabularyDataSource = 'medinabook1' | 'medinabook2' | 'medinabook3' | 'other';

export interface VocabularyItem {
  id: string;
  arabic: string;
  english: string;
  transliteration: string;
  category?: string;
  difficulty: number;
  datasource: VocabularyDataSource;
}

// Re-export everything from vocabulary/index.ts for convenience
export {
  vocabularyItems,
  getVocabularyBySource,
  getVocabularyByMultipleSources,
  getVocabularyById,
  getAllVocabularyItems,
  getVocabularyCount,
} from './vocabulary';
