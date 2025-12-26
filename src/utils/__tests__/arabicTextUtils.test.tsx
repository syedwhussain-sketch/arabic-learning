import { describe, it, expect } from 'vitest';
import { isArabic, isArabicRanges } from '../arabicTextUtils';

describe('arabicTextUtils', () => {
  describe('isArabic', () => {
    it('should return true for Arabic text', () => {
      expect(isArabic('العربية')).toBe(true);
      expect(isArabic('نَصَرَ')).toBe(true);
      expect(isArabic('المُعْتَلُّ')).toBe(true);
    });

    it('should return false for English text', () => {
      expect(isArabic('Hello')).toBe(false);
      expect(isArabic('English text')).toBe(false);
      expect(isArabic('123')).toBe(false);
    });

    it('should return true for mixed text containing Arabic', () => {
      expect(isArabic('Hello العربية')).toBe(true);
      expect(isArabic('نَصَرَ means "to help"')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isArabic('')).toBe(false);
    });

    it('should return false for numbers and special characters only', () => {
      expect(isArabic('123!@#')).toBe(false);
      expect(isArabic('   ')).toBe(false);
    });
  });

  describe('isArabicRanges', () => {
    it('should return true for Arabic text', () => {
      expect(isArabicRanges('العربية')).toBe(true);
      expect(isArabicRanges('نَصَرَ')).toBe(true);
    });

    it('should return false for English text', () => {
      expect(isArabicRanges('Hello')).toBe(false);
      expect(isArabicRanges('English text')).toBe(false);
    });

    it('should return true for mixed text containing Arabic', () => {
      expect(isArabicRanges('Hello العربية')).toBe(true);
    });
  });
});
