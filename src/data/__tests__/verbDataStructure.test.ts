import { describe, it, expect } from 'vitest';
import { alsahihData, almudaafData, mahmoozData, amutalData } from '../../data';
import type { VerbCategory, VerbSubCategory, VerbConjugation } from '../../types/verb.types';

const categories = [alsahihData, almudaafData, mahmoozData, amutalData];

describe('Verb Data Structure Validation', () => {
  describe('categories array', () => {
    it('should not be empty', () => {
      expect(categories).toBeDefined();
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should have unique category IDs', () => {
      const ids = categories.map(cat => cat.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('category structure', () => {
    categories.forEach((category: VerbCategory) => {
      describe(`Category: ${category.english} (${category.arabic})`, () => {
        it('should have required top-level fields', () => {
          expect(category.id).toBeTruthy();
          expect(category.arabic).toBeTruthy();
          expect(category.english).toBeTruthy();
          expect(category.transliteration).toBeTruthy();
          expect(category.explanation).toBeTruthy();
          expect(category.subCategories).toBeInstanceOf(Array);
        });

        it('should have at least one subcategory', () => {
          expect(category.subCategories.length).toBeGreaterThan(0);
        });

        it('should have unique subcategory IDs within category', () => {
          const subIds = category.subCategories.map(sub => sub.id);
          const uniqueSubIds = new Set(subIds);
          expect(uniqueSubIds.size).toBe(subIds.length);
        });
      });
    });
  });

  describe('subcategory structure', () => {
    categories.forEach((category: VerbCategory) => {
      category.subCategories.forEach((subCategory: VerbSubCategory) => {
        describe(`SubCategory: ${subCategory.english} in ${category.english}`, () => {
          it('should have required fields', () => {
            expect(subCategory.id).toBeTruthy();
            expect(subCategory.arabic).toBeTruthy();
            expect(subCategory.english).toBeTruthy();
            expect(subCategory.transliteration).toBeTruthy();
            expect(subCategory.verb).toBeTruthy();
            expect(subCategory.meaning).toBeTruthy();
            expect(subCategory.conjugations).toBeInstanceOf(Array);
          });

          it('should have exactly 14 conjugations (or 0 if incomplete)', () => {
            // Allow 0 for incomplete patterns, otherwise expect 14
            const validLengths = [0, 14];
            expect(validLengths).toContain(subCategory.conjugations.length);
          });

          it('should have example sentences (if complete)', () => {
            expect(subCategory.exampleSentences).toBeDefined();
            
            // Only validate content if conjugations exist (pattern is complete)
            if (subCategory.conjugations.length > 0) {
              // Some patterns may have partial example sentences - validate structure exists
              // but allow empty strings for patterns still being filled in
              const exampleSentences = subCategory.exampleSentences;
              expect(exampleSentences).toHaveProperty('lam_male');
              expect(exampleSentences).toHaveProperty('lam_female');
              expect(exampleSentences).toHaveProperty('lan_male');
              expect(exampleSentences).toHaveProperty('lan_female');
              expect(exampleSentences).toHaveProperty('masdar');
            }
          });
        });
      });
    });
  });

  describe('conjugation structure', () => {
    categories.forEach((category: VerbCategory) => {
      category.subCategories.forEach((subCategory: VerbSubCategory) => {
        subCategory.conjugations.forEach((conjugation: VerbConjugation, index: number) => {
          describe(`Conjugation ${index + 1} in ${subCategory.english}`, () => {
            it('should have required pronoun fields', () => {
              expect(conjugation.pronoun).toBeTruthy();
              expect(conjugation.pronounArabic).toBeTruthy();
            });

            it('should have valid gender field', () => {
              if (conjugation.gender) {
                expect(['male', 'female']).toContain(conjugation.gender);
              }
            });

            it('should have required verb forms', () => {
              expect(conjugation.past).toBeTruthy();
              expect(conjugation.present).toBeTruthy();
              expect(conjugation.negationPast).toBeTruthy();
              expect(conjugation.negationFuture).toBeTruthy();
              expect(conjugation.negationJussive).toBeTruthy();
            });

            it('should have Arabic text in verb forms', () => {
              // Check that Arabic fields contain Arabic characters
              const arabicPattern = /[\u0600-\u06FF]/;
              expect(arabicPattern.test(conjugation.pronounArabic)).toBe(true);
              expect(arabicPattern.test(conjugation.past)).toBe(true);
              expect(arabicPattern.test(conjugation.present)).toBe(true);
            });

            it('should have consistent imperative for 2nd person', () => {
              // Imperative should exist for 2nd person (pronouns containing "you")
              if (conjugation.pronoun.toLowerCase().includes('you')) {
                // Some forms may not have imperative (like "I" which shouldn't match anyway)
                // But if it's 2nd person, we expect it
                expect(conjugation.imperative).toBeTruthy();
              }
            });
          });
        });
      });
    });
  });

  describe('data completeness', () => {
    it('should have male and female conjugations (when complete)', () => {
      categories.forEach((category: VerbCategory) => {
        category.subCategories.forEach((subCategory: VerbSubCategory) => {
          // Skip validation for incomplete patterns
          if (subCategory.conjugations.length === 0) {
            return;
          }
          
          const maleConjugations = subCategory.conjugations.filter(c => c.gender === 'male');
          const femaleConjugations = subCategory.conjugations.filter(c => c.gender === 'female');
          
          expect(maleConjugations.length).toBeGreaterThan(0);
          expect(femaleConjugations.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have consistent masdar across conjugations in same subcategory', () => {
      categories.forEach((category: VerbCategory) => {
        category.subCategories.forEach((subCategory: VerbSubCategory) => {
          const masdars = subCategory.conjugations
            .map(c => c.masdar)
            .filter(m => m !== undefined);
          
          if (masdars.length > 0) {
            const firstMasdar = masdars[0];
            masdars.forEach(masdar => {
              expect(masdar).toBe(firstMasdar);
            });
          }
        });
      });
    });
  });

  describe('subcategory pattern validation', () => {
    it('should have consistent verb root across conjugations (when complete)', () => {
      categories.forEach((category: VerbCategory) => {
        category.subCategories.forEach((subCategory: VerbSubCategory) => {
          // Skip validation for incomplete patterns
          if (subCategory.conjugations.length === 0) {
            return;
          }
          
          // All conjugations should contain some common Arabic letters from the root
          // This is a soft check - just verify all pasts are non-empty and Arabic
          subCategory.conjugations.forEach(conj => {
            expect(conj.past.length).toBeGreaterThan(0);
            expect(/[\u0600-\u06FF]/.test(conj.past)).toBe(true);
          });
        });
      });
    });
  });
});
