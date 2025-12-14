import type { VocabularyItem } from '../data/vocabularyData';

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
