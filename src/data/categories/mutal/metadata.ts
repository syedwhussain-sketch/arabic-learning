// Al-Mu'tall (The Weak Verb) category metadata
import type { VerbCategory } from '../../../types/verb.types';

export const amutalMetadata: Omit<VerbCategory, 'subCategories'> = {
  id: 'mutal',
  arabic: 'المُعْتَلُّ',
  english: 'The Weak Verb',
  transliteration: "Al-Mu'tall",
  explanation: `المُعْتَلُّ (weak verb): is a verb that contains a weak letter in its original letters.
It has three types:

١) المِثَال (the resembling verb): is that verb whose فَاءُ الكَلِمَة is a weak letter.
Example: وَجَدَ. It is called الْمِثَالُ. If the weak letter is a (و) it is called الْمِثَالُ الوَاوِيُّ.
If it is a (ي) it is called الْمِثَالُ اليَائِيُّ.

٢) الأَجْوَفُ (the hollow verb): is that verb whose عَيْنُ الكَلِمَة is a weak letter.
Example: قَالَ. It is called الأَجْوَفُ. If the weak letter is a (و) it is called الأَجْوَفُ الوَاوِيُّ.
If it is a (ي) it is called الأَجْوَفُ اليَائِيُّ.

٣) النَّاقِصُ (the defective verb): is that verb whose لامُ الكَلِمَة is a weak letter.
Example: رَمَى. It is called النَّاقِصُ. If the weak letter is a (و) it is called النَّاقِصُ الوَاوِيُّ.
If it is a (ي) it is called النَّاقِصُ اليَائِيُّ.`,
};
