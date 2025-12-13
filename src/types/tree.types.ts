// Tree data structure types for Arabic verb tree

export interface ConjugationData {
  past: string;
  present: string;
  negationPast: string;
  negationFuture: string;
  imperative?: string;
  participle?: string;
  examples?: {
    lam_male?: string;
    lam_female?: string;
    lan_male?: string;
    lan_female?: string;
  };
}

export interface TreeLeaf {
  id: string;
  arabic: string;
  english: string;
  transliteration?: string;
  page?: string;
  example?: string;
  conjugations?: ConjugationData;
}

export interface TreeNode {
  id: string;
  arabic: string;
  english: string;
  transliteration?: string;
  children?: TreeLeaf[];
  // For nested nodes
  subNodes?: TreeNode[];
}

export interface TreeRoot {
  id: string;
  arabic: string;
  english: string;
  transliteration?: string;
  branches: TreeNode[];
}

// Sample tree data for demonstration
export const sampleTreeData: TreeRoot = {
  id: 'root',
  arabic: 'الفعل الثلاثي المجرد',
  english: 'Triliteral Bare Verb',
  transliteration: 'Al-Fi\'l al-Thulathi al-Mujarrad',
  branches: [
    {
      id: 'transitive',
      arabic: 'المتعدي',
      english: 'Transitive',
      transliteration: 'Al-Muta\'addi',
      children: [
        {
          id: 'trans-1',
          arabic: 'فَعَلَ يَفْعُلُ',
          english: 'fa\'ala yaf\'ulu',
          transliteration: 'fa\'ala yaf\'ulu',
          page: 'Page 12',
          example: 'نَصَرَ يَنْصُرُ',
          conjugations: {
            past: 'نَصَرَ',
            present: 'يَنْصُرُ',
            negationPast: 'لَمْ يَنْصُرْ',
            negationFuture: 'لَنْ يَنْصُرَ',
            imperative: 'اُنْصُرْ',
            participle: 'نَاصِرٌ',
          },
        },
        {
          id: 'trans-2',
          arabic: 'فَعَلَ يَفْعِلُ',
          english: 'fa\'ala yaf\'ilu',
          transliteration: 'fa\'ala yaf\'ilu',
          page: 'Page 15',
          example: 'ضَرَبَ يَضْرِبُ',
          conjugations: {
            past: 'ضَرَبَ',
            present: 'يَضْرِبُ',
            negationPast: 'لَمْ يَضْرِبْ',
            negationFuture: 'لَنْ يَضْرِبَ',
            imperative: 'اِضْرِبْ',
            participle: 'ضَارِبٌ',
          },
        },
        {
          id: 'trans-3',
          arabic: 'فَعَلَ يَفْعَلُ',
          english: 'fa\'ala yaf\'alu',
          transliteration: 'fa\'ala yaf\'alu',
          page: 'Page 18',
          example: 'فَتَحَ يَفْتَحُ',
          conjugations: {
            past: 'فَتَحَ',
            present: 'يَفْتَحُ',
            negationPast: 'لَمْ يَفْتَحْ',
            negationFuture: 'لَنْ يَفْتَحَ',
            imperative: 'اِفْتَحْ',
            participle: 'فَاتِحٌ',
          },
        },
      ],
    },
    {
      id: 'intransitive',
      arabic: 'اللازم',
      english: 'Intransitive',
      transliteration: 'Al-Lazim',
      children: [
        {
          id: 'intrans-1',
          arabic: 'فَعُلَ يَفْعُلُ',
          english: 'fa\'ula yaf\'ulu',
          transliteration: 'fa\'ula yaf\'ulu',
          page: 'Page 25',
          example: 'كَرُمَ يَكْرُمُ',
          conjugations: {
            past: 'كَرُمَ',
            present: 'يَكْرُمُ',
            negationPast: 'لَمْ يَكْرُمْ',
            negationFuture: 'لَنْ يَكْرُمَ',
            participle: 'كَرِيمٌ',
          },
        },
        {
          id: 'intrans-2',
          arabic: 'فَعِلَ يَفْعَلُ',
          english: 'fa\'ila yaf\'alu',
          transliteration: 'fa\'ila yaf\'alu',
          page: 'Page 28',
          example: 'فَرِحَ يَفْرَحُ',
          conjugations: {
            past: 'فَرِحَ',
            present: 'يَفْرَحُ',
            negationPast: 'لَمْ يَفْرَحْ',
            negationFuture: 'لَنْ يَفْرَحَ',
            participle: 'فَرِحٌ',
          },
        },
      ],
    },
    {
      id: 'both',
      arabic: 'المتعدي واللازم',
      english: 'Transitive & Intransitive',
      transliteration: 'Al-Muta\'addi wa Al-Lazim',
      children: [
        {
          id: 'both-1',
          arabic: 'فَعَلَ يَفْعُلُ',
          english: 'fa\'ala yaf\'ulu',
          transliteration: 'fa\'ala yaf\'ulu',
          page: 'Page 35',
          example: 'رَجَعَ يَرْجِعُ',
          conjugations: {
            past: 'رَجَعَ',
            present: 'يَرْجِعُ',
            negationPast: 'لَمْ يَرْجِعْ',
            negationFuture: 'لَنْ يَرْجِعَ',
            imperative: 'اِرْجِعْ',
            participle: 'رَاجِعٌ',
          },
        },
      ],
    },
  ],
};
