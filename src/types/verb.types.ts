// Verb category types

export interface VerbConjugation {
  pronoun: string;
  pronounArabic: string;
  // Explicit gender classification for styling and logic
  gender?: 'male' | 'female';
  past: string;
  pastEnglish?: string;
  present: string;
  presentEnglish?: string;
  negationPast: string;  // لَمْ
  negationPastEnglish?: string;
  negationFuture: string;  // لَنْ
  negationFutureEnglish?: string;
  negationJussive: string;  // لا (majzoom)
  negationJussiveEnglish?: string;
  imperative?: string;
  imperativeEnglish?: string;
  participle?: string;
  participleEnglish?: string;
  masdar?: string;  // المصدر
}

export interface VerbSubCategory {
  id: string;
  arabic: string;
  english: string;
  transliteration: string;
  page: string;
  verb: string;
  meaning: string;
  masdar: string;
  category?: string; // Category hierarchy (e.g., "المُعْتَلُّ الأَجْوَفُ الوَاوِيُّ")
  conjugations: VerbConjugation[];
  exampleSentences: {
    lam_male: string;
    lam_female: string;
    lan_male: string;
    lan_female: string;
    masdar: string;
  };
}

export interface VerbCategory {
  id: string;
  arabic: string;
  english: string;
  transliteration: string;
  explanation: string;
  subCategories: VerbSubCategory[];
}
