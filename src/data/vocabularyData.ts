/**
 * Vocabulary Data for Arabic Learning
 *
 * This file contains vocabulary items for flip card practice.
 */

export interface VocabularyItem {
  id: string;
  arabic: string;
  english: string;
  transliteration: string;
  category?: string;
}

export const vocabularyItems: VocabularyItem[] = [
  {
    id: "door",
    arabic: "بَابٌ",
    english: "a door",
    transliteration: "bābun",
    category: "Common Nouns",
  },
  {
    id: "book",
    arabic: "كِتَابٌ",
    english: "a book",
    transliteration: "kitābun",
    category: "Common Nouns",
  },
  {
    id: "teacher",
    arabic: "مُدَرِّسٌ",
    english: "a teacher",
    transliteration: "mudarrisun",
    category: "People",
  },
  {
    id: "student",
    arabic: "طَالِبٌ",
    english: "a student",
    transliteration: "ṭālibun",
    category: "People",
  },
  {
    id: "house",
    arabic: "بَيْتٌ",
    english: "a house",
    transliteration: "baytun",
    category: "Common Nouns",
  },
];

export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyItems.find((item) => item.id === id);
}
