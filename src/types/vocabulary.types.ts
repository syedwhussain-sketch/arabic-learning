import type { VocabularyItem, VocabularyDataSource } from '../data/vocabularyData';

export type PracticeMode = 'arabic-to-english' | 'english-to-arabic' | null;
export type PracticeSize = 'random50' | 'custom' | 'all' | null;

export interface CardState {
  item: VocabularyItem;
  isFlipped: boolean;
  wrongCount: number;
}

export interface CompletedCard {
  item: VocabularyItem;
  wrongCount: number;
}

export interface VocabularySource {
  id: VocabularyDataSource;
  title: string;
  description: string;
  emoji: string;
  count: number;
  available: boolean;
}
