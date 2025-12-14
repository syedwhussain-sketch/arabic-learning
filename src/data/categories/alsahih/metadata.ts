// Al-Sahih (The Strong/Sound Verb) category metadata
import type { VerbCategory } from '../../../types/verb.types';

export const alsahihMetadata: Omit<VerbCategory, 'subCategories'> = {
  id: 'sahih',
  arabic: '💪 الصَّحِيحُ',
  english: '💪 The Sound/Strong Verb',
  transliteration: 'As-Sahīh',
  explanation: 'الصَّحِيحُ (strong verb): is that word whose root letters do not '+
  'have a hamzah, any weak letters (و، ي) or two letters of the same type. '+
  'Example: بَذَلَ. الصَّحِيحُ comes in all six of the الثُّلاثِيُّ المُجَرَّد categories (أَبْوَاب):\n\n' +
  '\u202B١) نَصَرَ      ٢) ضَرَبَ     ٣) سَمِعَ      ٤) فَتَحَ      ٥) كَرُمَ      ٦) حَسِبَ\u202C\n\n' +
  '💡 Tip: For sahih verbs, only the middle letter (haraka/vowel) changes across the different categories. ' +
  'This is why we have different أَبْوَاب - they differ in the voweling of the middle radical.'
};
