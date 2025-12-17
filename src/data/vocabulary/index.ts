/**
 * Vocabulary Data - Barrel Export
 *
 * Centralized export for all vocabulary sources with utility functions
 */

import type { VocabularyItem, VocabularyDataSource } from '../vocabularyData';
import { medinaBook1Vocabulary } from './medinabook1.data';
import { medinaBook2Vocabulary } from './medinabook2.data';

// Future imports (when data is added):
// import { medinaBook3Vocabulary } from './medinabook3.data';

/**
 * All vocabulary items combined from all sources
 */
const allVocabularyItems: VocabularyItem[] = [
  ...medinaBook1Vocabulary,
  ...medinaBook2Vocabulary,
  // ...medinaBook3Vocabulary,  // Uncomment when available
];

/**
 * Filtered vocabulary items (excludes Prepositions, Names, Countries, Cities)
 * This matches the original vocabularyItems export behavior
 */
export const vocabularyItems = allVocabularyItems.filter(
  (item) =>
    item.category !== "Prepositions" &&
    item.category !== "Names" &&
    item.category !== "Countries" &&
    item.category !== "Cities"
);

/**
 * Get vocabulary items from a specific datasource
 * @param source - The datasource to filter by
 * @returns Array of vocabulary items from the specified source
 */
export function getVocabularyBySource(source: VocabularyDataSource): VocabularyItem[] {
  return vocabularyItems.filter((item) => item.datasource === source);
}

/**
 * Get vocabulary items from multiple datasources
 * @param sources - Array of datasources to include
 * @returns Array of vocabulary items from all specified sources
 *
 * @example
 * // Get vocab from both medinabook1 and medinabook2
 * const vocab = getVocabularyByMultipleSources(['medinabook1', 'medinabook2']);
 */
export function getVocabularyByMultipleSources(sources: VocabularyDataSource[]): VocabularyItem[] {
  return vocabularyItems.filter((item) => sources.includes(item.datasource));
}

/**
 * Get a vocabulary item by its ID
 * @param id - The ID of the vocabulary item
 * @returns The vocabulary item, or undefined if not found
 */
export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyItems.find((item) => item.id === id);
}

/**
 * Get all unfiltered vocabulary items (includes Prepositions, Names, Countries, Cities)
 * @returns All vocabulary items without filtering
 */
export function getAllVocabularyItems(): VocabularyItem[] {
  return allVocabularyItems;
}

/**
 * Get count of vocabulary items by source
 * @param source - Optional datasource to count. If omitted, returns total count
 * @returns Number of vocabulary items
 */
export function getVocabularyCount(source?: VocabularyDataSource): number {
  if (source) {
    return getVocabularyBySource(source).length;
  }
  return vocabularyItems.length;
}
