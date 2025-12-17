import type { VocabularyItem, VocabularyDataSource } from '../data/vocabularyData';

export type PracticeMode = 'arabic-to-english' | 'english-to-arabic' | null;
export type PracticeSize = 'random50' | 'custom' | 'all' | null;

export interface CardState {
  item: VocabularyItem;
  isFlipped: boolean;
  wrongCount: number; // Cumulative wrong attempts across all review cycles
  reviewCycleCount: number; // Number of times card was removed and reshown
}

export interface CompletedCard {
  item: VocabularyItem;
  wrongCount: number;
  totalAttempts: number; // Total number of attempts (correct + wrong)
  completedInReview: boolean; // Whether card was completed during review mode
  reviewCycleCount: number; // Number of times card was removed and reshown before completion
}

export interface VocabularySource {
  id: VocabularyDataSource;
  title: string;
  description: string;
  emoji: string;
  count: number;
  available: boolean;
}
