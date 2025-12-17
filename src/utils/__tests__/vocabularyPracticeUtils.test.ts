import { describe, it, expect, vi } from 'vitest';
import { shuffleArray, getVocabColor } from '../vocabularyPracticeUtils';
import type { VocabularyItem } from '../../data/vocabularyData';

describe('vocabularyPracticeUtils', () => {
  describe('shuffleArray', () => {
    it('should return an array of the same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.length).toBe(input.length);
    });

    it('should contain all original elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual(input.sort());
    });

    it('should not modify the original array', () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      shuffleArray(input);
      expect(input).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const input = [1];
      const result = shuffleArray(input);
      expect(result).toEqual([1]);
    });

    it('should shuffle array differently (statistical test)', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const shuffles = new Set();
      
      // Run multiple shuffles and check if we get different results
      for (let i = 0; i < 10; i++) {
        const result = shuffleArray(input);
        shuffles.add(result.join(','));
      }
      
      // Should have at least 2 different arrangements in 10 shuffles
      expect(shuffles.size).toBeGreaterThan(1);
    });
  });

  describe('getVocabColor', () => {
    it('should return light colors for light mode', () => {
      const color = getVocabColor('Common Nouns', false);
      expect(color).toBe('#FFE5E5');
    });

    it('should return dark colors for dark mode', () => {
      const color = getVocabColor('Common Nouns', true);
      expect(color).toBe('#4A1F1F');
    });

    it('should return colors for all defined categories', () => {
      const categories = ['Common Nouns', 'People', 'Verbs', 'Adjectives', 'Animals', 'Objects', 'Food'];
      
      categories.forEach(category => {
        const lightColor = getVocabColor(category, false);
        const darkColor = getVocabColor(category, true);
        
        expect(lightColor).toBeTruthy();
        expect(darkColor).toBeTruthy();
        expect(lightColor).not.toBe(darkColor);
      });
    });

    it('should return default color for undefined category', () => {
      const lightColor = getVocabColor('Unknown Category', false);
      const darkColor = getVocabColor('Unknown Category', true);
      
      expect(lightColor).toBe('#F0E5FF');
      expect(darkColor).toBe('#2F1F4A');
    });

    it('should return default color for undefined category parameter', () => {
      const lightColor = getVocabColor(undefined, false);
      const darkColor = getVocabColor(undefined, true);
      
      expect(lightColor).toBe('#F0E5FF');
      expect(darkColor).toBe('#2F1F4A');
    });
  });
});
