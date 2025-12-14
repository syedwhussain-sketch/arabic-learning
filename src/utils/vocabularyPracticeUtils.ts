import type { VocabularyItem } from '../data/vocabularyData';
import { vocabularyItems } from '../data/vocabularyData';
import type { PracticeSize } from '../types/vocabulary.types';

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get practice cards based on size selection
export const getPracticeCards = (
  size: PracticeSize,
  customCount?: string
): VocabularyItem[] => {
  const shuffled = shuffleArray(vocabularyItems);

  switch (size) {
    case 'random50':
      return shuffled.slice(0, Math.min(50, vocabularyItems.length));
    case 'custom':
      const customNum = parseInt(customCount || '100') || 100;
      return shuffled.slice(0, Math.min(customNum, vocabularyItems.length));
    case 'all':
      return shuffled;
    default:
      return [];
  }
};

// Color for vocabulary cards
export const getVocabColor = (category: string | undefined, isDark: boolean) => {
  const colors = {
    'Common Nouns': { light: '#FFE5E5', dark: '#4A1F1F' },
    'People': { light: '#E5F4FF', dark: '#1F2F4A' },
    'Verbs': { light: '#E5FFE5', dark: '#1F4A1F' },
    'Adjectives': { light: '#FFF4E5', dark: '#4A3A1F' },
    'Animals': { light: '#F0E5FF', dark: '#2F1F4A' },
    'Objects': { light: '#E5FFFF', dark: '#1F4A4A' },
    'Food': { light: '#FFE5F0', dark: '#4A1F3A' },
  };
  const colorPair = colors[category as keyof typeof colors] || {
    light: '#F0E5FF',
    dark: '#2F1F4A',
  };
  return isDark ? colorPair.dark : colorPair.light;
};
