// Al-Mudā'af (The Double Lettered Verb) category metadata
import type { VerbCategory } from '../../../types/verb.types';

export const almudaafMetadata: Omit<VerbCategory, 'subCategories'> = {
  id: 'mudaaf',
  arabic: 'المُضَاعَفُ',
  english: 'The Double Lettered Verb',
  transliteration: 'Al-Muḍā\'af',
  explanation: 'المُضَاعَفُ (double lettered verb): is a word having, as its root letters, two '+
  'letters of the same type. Example: سَبَّ\n\n'+
  'المُضَاعَفُ comes in four of the الثُّلاثِيُّ المُجَرَّد categories (أَبْوَاب):\n\n' +
  '\u202B(١) نَصَرَ      (٢) ضَرَبَ     (٣) سَمِعَ      (٤) كَرُمَ\u202C'
};
