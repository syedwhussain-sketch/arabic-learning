/**
 * Medina Book 2 — Lesson 1 Building Blocks
 *
 * This file contains the data for the building blocks visualization,
 * showing foundational Arabic concepts organized by lesson topics.
 */

export interface Example {
  ar: string;
  en: string;
}

export interface BuildingBlock {
  id: string;
  title: string;
  transliteration: string;
  kind: string;
  short: string;
  examples?: Example[];
  details?: string;
  emoji?: string;
}

export interface Floor {
  id: string;
  label: string;
  blockIds: string[];
  emoji?: string;
  book: number;
  lesson: number;
}

export const blocks: BuildingBlock[] = [

  // SENTENCE TYPES + PARTS
  {
    id: "jumlahIsmiyyah",
    title: "الجُمْلَةُ الاسْمِيَّةُ",
    transliteration: "al-jumlah al-ismiyyah",
    kind: "Sentence",
    short: "Nominal sentence: starts with a noun.",
    examples: [{ ar: "الكِتَابُ سَهْلٌ", en: "The book is easy." }],
    details: "A **nominal sentence** begins with a noun (mubtadaʾ) and is followed by information about it (khabar). It expresses a state or quality and doesn't require a verb.",
  },
  {
    id: "jumlahFiliyyah",
    title: "الجُمْلَةُ الفِعْلِيَّةُ",
    transliteration: "al-jumlah al-fiʿliyyah",
    kind: "Sentence",
    short: "Verbal sentence: starts with a verb.",
    examples: [{ ar: "خَرَجَ بِلَالٌ", en: "Bilāl went out." }],
    details: "A **verbal sentence** begins with a verb and describes an action. The typical word order is: verb - subject (fāʿil) - object (if any).",
  },
  {
    id: "mubtada",
    title: "المُبْتَدَأ",
    transliteration: "mubtadaʾ",
    kind: "Term",
    short: "The noun that begins the nominal sentence.",
    details: "The **mubtadaʾ** is the first element of a nominal sentence, typically in the nominative case (marfūʿ). It is what the sentence is about.",
    emoji: "🎬",
  },
  {
    id: "khabar",
    title: "الخَبَر",
    transliteration: "khabar",
    kind: "Term",
    short: "The second part of the nominal sentence (the information/news).",
    details: "The **khabar** is the predicate of a nominal sentence, providing information about the mubtadaʾ. It is also in the nominative case (marfūʿ).",
    emoji: "📰",
  },

  // 1) إِنَّ
  {
    id: "inna",
    title: "إِنَّ",
    transliteration: "inna",
    kind: "Particle",
    short: "Used at the beginning of a nominal sentence; signifies emphasis (indeed/surely/no doubt).",
    examples: [
      { ar: "الكِتَابُ سَهْلٌ → إِنَّ الكِتَابَ سَهْلٌ", en: "The book is easy → Indeed, the book is easy." },
    ],
    details: "**إِنَّ** is one of the emphasizing particles that changes the grammatical case of the subject (mubtadaʾ) from nominative to accusative. It adds emphasis meaning 'indeed' or 'surely'.",
    emoji: "‼️",
  },
  {
    id: "ismuInna",
    title: "اسْمُ إِنَّ",
    transliteration: "ismu inna",
    kind: "Term",
    short: "After إِنَّ: the mubtada is no longer called mubtadaʾ; it becomes ismu inna (and is manṣūb).",
    details: "When **إِنَّ** is used, the subject of the sentence is called **ismu inna** and takes the accusative case (manṣūb) instead of nominative.",
  },
  {
    id: "khabaruInna",
    title: "خَبَرُ إِنَّ",
    transliteration: "khabaru inna",
    kind: "Term",
    short: "After إِنَّ: the khabar is called khabaru inna.",
    details: "The predicate after **إِنَّ** is called **khabaru inna** and remains in the nominative case (marfūʿ).",
  },

  // 2) لَعَلَّ
  {
    id: "laalla",
    title: "لَعَلَّ",
    transliteration: "laʿalla",
    kind: "Particle",
    short: "One of the sisters of إِنَّ; grammatically acts like إِنَّ. Signifies hope or fear.",
    examples: [
      { ar: "الجَوُّ جَمِيلٌ → لَعَلَّ الجَوَّ جَمِيلٌ", en: "The weather is fine → I hope the weather is fine." },
      { ar: "المُدَرِّسُ مَرِيضٌ → لَعَلَّ المُدَرِّسَ مَرِيضٌ", en: "The teacher is sick → I'm afraid the teacher is sick." },
    ],
    details: "**لَعَلَّ** is one of the 'sisters of inna' (أخوات إِنَّ) and has the same grammatical effect. It expresses hope (in positive contexts) or fear/apprehension (in negative contexts).",
    emoji: "🤞",
  },

  // 3) ذُو
  {
    id: "dhu",
    title: "ذُو",
    transliteration: "dhū",
    kind: "Word",
    short: "Means 'having/possessing'. Always muḍāf; the following word is muḍāf ilayhi, therefore majrūr.",
    examples: [
      { ar: "ذُو مَالٍ", en: "possessing wealth (wealthy)" },
      { ar: "ذُو خُلُقٍ", en: "possessing manners (well-mannered)" },
      { ar: "ذُو عِلْمٍ", en: "possessing knowledge (learned)" },
    ],
    details: "**ذُو** means 'possessor of' or 'having' and is always used in a possessive construction (iḍāfah). The word following it must be in the genitive case (majrūr).",
    emoji: "👑",
  },
  {
    id: "dhat",
    title: "ذَات",
    transliteration: "dhāt",
    kind: "Word",
    short: "Feminine of ذُو.",
    examples: [{ ar: "بِلَالٌ ذُو عِلْمٍ، وَأُخْتُهُ ذَاتُ خُلُقٍ", en: "Bilāl is learned and his sister is well-mannered." }],
    details: "**ذَات** is the feminine form of ذُو and functions the same way, always requiring a genitive noun after it.",
  },
  {
    id: "dhuwoo",
    title: "ذَوُو",
    transliteration: "dhawū",
    kind: "Word",
    short: "Plural of ذُو.",
    examples: [{ ar: "هَؤُلَاءِ الطُّلَّابُ ذَوُو خُلُقٍ", en: "These students are well-mannered." }],
    details: "**ذَوُو** is the masculine plural form of ذُو, used when referring to multiple male possessors.",
  },
  {
    id: "dhawaat",
    title: "ذَوَات",
    transliteration: "dhawāt",
    kind: "Word",
    short: "Plural of ذَات.",
    examples: [{ ar: "هَؤُلَاءِ الطَّالِبَاتُ ذَوَاتُ خُلُقٍ", en: "These female students are well-mannered." }],
    details: "**ذَوَات** is the feminine plural form of ذَات, used when referring to multiple female possessors.",
  },
  {
    id: "mudaf",
    title: "مُضَاف",
    transliteration: "muḍāf",
    kind: "Term",
    short: "Construct/possessive structure: the first part (ذُو is always muḍāf in the lesson).",
    details: "The **muḍāf** is the first noun in a possessive construction (iḍāfah). It never takes the definite article (ال) or tanwīn.",
  },
  {
    id: "mudafIlayhi",
    title: "مُضَافٌ إِلَيْهِ",
    transliteration: "muḍāf ilayhi",
    kind: "Term",
    short: "The second part of the iḍāfah; it is majrūr.",
    details: "The **muḍāf ilayhi** is the second noun in a possessive construction and is always in the genitive case (majrūr).",
  },

  // 4) أَمْ and أَوْ
  {
    id: "am",
    title: "أَمْ",
    transliteration: "am",
    kind: "Particle",
    short: "Means 'or', but only in an interrogative sentence.",
    examples: [
      { ar: "أَأَنْتَ طَبِيبٌ أَمْ مُهَنْدِسٌ؟", en: "Are you a doctor or an engineer?" },
      { ar: "أَمِنْ فَرَنْسَا هُوَ أَمْ مِنْ أَلْمَانِيَا؟", en: "Is he from France or from Germany?" },
      { ar: "أَرَأَيْتَ بِلَالًا أَمْ حَامِدًا؟", en: "Did you see Bilāl or Ḥāmid?" },
    ],
    details: "**أَمْ** is used to express 'or' specifically in questions. It cannot be used in statements.",
    emoji: "❓",
  },
  {
    id: "aw",
    title: "أَوْ",
    transliteration: "aw",
    kind: "Particle",
    short: "In a non-interrogative sentence, أَوْ is used for 'or'.",
    examples: [
      { ar: "خُذْ هَذَا أَوْ ذَاكَ", en: "Take this or that." },
      { ar: "رَأَيْتُ ثَلَاثَةً أَوْ أَرْبَعَةً", en: "I saw three or four." },
      { ar: "خَرَجَ بِلَالٌ أَوْ حَامِدٌ", en: "Bilāl or Ḥāmid went out." },
    ],
    details: "**أَوْ** is used to express 'or' in statements (non-questions). It offers alternatives or approximations.",
  },

  // 5) NUMBERS
  {
    id: "miʾaah",
    title: "مِائَة",
    transliteration: "miʾah",
    kind: "Number",
    short: "'Hundred'. The alif in مِائَة is not pronounced (pronounced مِئَة).",
    examples: [{ ar: "مِائَةُ كِتَابٍ", en: "one hundred books" }],
    details: "**مِائَة** means 'hundred'. Note that the alif (ا) is written but silent. After مِائَة, the counted noun is singular and in the genitive case.",
    emoji: "💯",
  },
  {
    id: "alf",
    title: "أَلْف",
    transliteration: "alf",
    kind: "Number",
    short: "'Thousand'. After مِائَة and أَلْف, the counted noun (المَعْدُود) is singular majrūr.",
    examples: [
      { ar: "أَلْفُ رِيَالٍ", en: "one thousand riyals" },
      { ar: "هَذَا اللَّفَافُ بِأَلْفِ رِيَالٍ", en: "This wrap/package is for a thousand riyals." },
    ],
    details: "**أَلْف** means 'thousand'. Like مِائَة, the counted noun after it is singular and in the genitive case (majrūr).",
  },
  {
    id: "madud",
    title: "المَعْدُود",
    transliteration: "al-maʿdūd",
    kind: "Term",
    short: "The counted noun after numbers; here (after مِائَة / أَلْف) it is singular and majrūr.",
    details: "**المَعْدُود** is the grammatical term for the noun being counted. After مِائَة and أَلْف, it must be singular and in the genitive case.",
  },

  // 6) غَالٍ
  {
    id: "ghalin",
    title: "غَالٍ",
    transliteration: "ghālin",
    kind: "Word",
    short: "Means 'expensive'. In the lesson: actual form is غَالِيٌّ, but the yāʾ (and its ḍammah) is omitted and tanwīn shifts (ghāli-yu-n → ghāli-n).",
    examples: [{ ar: "هَذَا الكِتَابُ غَالٍ", en: "This book is expensive." }],
    details: "**غَالٍ** is an example of a defective noun (اسم منقوص) where the final yāʾ is dropped. The original form is غَالِيٌّ but it appears as غَالٍ in the nominative case.",
    emoji: "💰",
  },
];

export const floors: Floor[] = [
  {
    id: "row1",
    label: "",
    emoji: "",
    blockIds: ["mubtada", "khabar", "inna"],
    book: 2,
    lesson: 1,
  },
  {
    id: "row2",
    label: "",
    emoji: "",
    blockIds: ["laalla", "am", "miʾaah"],
    book: 2,
    lesson: 1,
  },
  {
    id: "row3",
    label: "",
    emoji: "",
    blockIds: ["ghalin", "dhu"],
    book: 2,
    lesson: 1,
  },
];

export function getBlockById(id: string): BuildingBlock | undefined {
  return blocks.find((block) => block.id === id);
}
