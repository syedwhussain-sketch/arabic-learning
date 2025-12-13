// Al-Mahmūz (The Hamzated Verb) category metadata
import type { VerbCategory } from '../../../types/verb.types';

export const mahmoozMetadata: Omit<VerbCategory, 'subCategories'> = {
  id: 'mahmooz',
  arabic: 'المَهْمُوزُ',
  english: 'The Hamzated Verb',
  transliteration: 'Al-Mahmūz',
  explanation: 'المَهْمُوزُ (hamzated verb): is a word having a hamzah as a root letter.\n\n'+
  'If the (فَاءُ كَلِمَة) has a hamzah, it is called مَهْمُوزُ الفَّاءِ . Example: أَخَذَ\n\n'+
  'If the (عَيْنُ كَلِمَة) has a hamzah, it is called مَهْمُوزُ العَيْنِ . Example: سَأَلَ\n\n'+
  'If the (لامُ كَلِمَة) has a hamzah, it is called مَهْمُوزُ اللَّامِ . Example: قَرَأَ\n\n'+
  'المَهْمُوزُ comes in several of the الثُّلاثِيُّ المُجَرَّد categories (أَبْوَاب).'
};
