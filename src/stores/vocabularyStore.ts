import { create } from 'zustand';
import type { PracticeMode, PracticeSize, CardState, CompletedCard } from '../types/vocabulary.types';
import type { VocabularyDataSource } from '../data/vocabularyData';
import { getPracticeCards, shuffleArray } from '../utils/vocabularyPracticeUtils';

interface VocabularyState {
  // Practice setup state
  selectedSource: VocabularyDataSource | null;
  practiceSize: PracticeSize;
  customCount: string;
  sizeDialogOpen: boolean;
  modeDialogOpen: boolean;

  // Practice state
  practiceMode: PracticeMode;
  isPracticing: boolean;
  cards: CardState[];
  correctCount: number;
  wrongCount: number;
  focusedCardIndex: number | null;
  totalCards: number;
  completedCards: CompletedCard[];

  // Actions
  setSelectedSource: (source: VocabularyDataSource | null) => void;
  setPracticeSize: (size: PracticeSize) => void;
  setCustomCount: (count: string) => void;
  setSizeDialogOpen: (open: boolean) => void;
  setModeDialogOpen: (open: boolean) => void;
  
  handleSourceSelect: (sourceId: VocabularyDataSource) => void;
  handleSizeSelect: (size: PracticeSize) => void;
  handleModeSelect: (mode: PracticeMode) => void;
  handleCancelSizeSelection: () => void;
  handleCancelModeSelection: () => void;
  setPracticeMode: (mode: PracticeMode) => void;
  
  handleCardClick: (index: number) => void;
  handleAnswer: (correct: boolean) => void;
  handleExitPractice: () => void;
  resetState: () => void;
  
  initializePractice: () => void;
}

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  // Initial state
  selectedSource: null,
  practiceSize: null,
  customCount: '100',
  sizeDialogOpen: false,
  modeDialogOpen: false,
  practiceMode: 'arabic-to-english',
  isPracticing: false,
  cards: [],
  correctCount: 0,
  wrongCount: 0,
  focusedCardIndex: null,
  totalCards: 0,
  completedCards: [],

  // Simple setters
  setSelectedSource: (source) => set({ selectedSource: source }),
  setPracticeSize: (size) => set({ practiceSize: size }),
  setCustomCount: (count) => set({ customCount: count }),
  setSizeDialogOpen: (open) => set({ sizeDialogOpen: open }),
  setModeDialogOpen: (open) => set({ modeDialogOpen: open }),

  // Complex actions
  handleSourceSelect: (sourceId) => {
    set({
      selectedSource: sourceId,
      sizeDialogOpen: true,
    });
  },

  handleSizeSelect: (size) => {
    set({
      practiceSize: size,
      sizeDialogOpen: false,
      isPracticing: true,
    });
    // Initialize practice after setting size
    setTimeout(() => get().initializePractice(), 0);
  },

  handleModeSelect: (mode) => {
    set({
      practiceMode: mode,
      modeDialogOpen: false,
      isPracticing: true,
    });
    // Initialize practice after setting mode
    setTimeout(() => get().initializePractice(), 0);
  },

  handleCancelSizeSelection: () => {
    set({
      sizeDialogOpen: false,
      practiceSize: null,
      selectedSource: null,
    });
  },

  handleCancelModeSelection: () => {
    set({
      modeDialogOpen: false,
      practiceMode: 'arabic-to-english',
      practiceSize: null,
      selectedSource: null,
    });
  },

  setPracticeMode: (mode) => set({ practiceMode: mode }),

  handleCardClick: (index) => {
    const { focusedCardIndex, cards } = get();
    if (focusedCardIndex === null && !cards[index].isFlipped) {
      set({ focusedCardIndex: index });
      // Flip after a short delay for animation
      setTimeout(() => {
        const currentCards = get().cards;
        const newCards = [...currentCards];
        newCards[index] = { ...newCards[index], isFlipped: true };
        set({ cards: newCards });
      }, 300);
    }
  },

  handleAnswer: (correct) => {
    const { focusedCardIndex, cards, correctCount, wrongCount, completedCards } = get();
    if (focusedCardIndex === null) return;

    const currentCard = cards[focusedCardIndex];
    set({ focusedCardIndex: null });

    setTimeout(() => {
      if (correct) {
        // Add to completed cards before removing from grid
        const newCompletedCards = [
          ...completedCards,
          {
            item: currentCard.item,
            wrongCount: currentCard.wrongCount,
          },
        ];

        // Remove the card from the grid
        const newCards = cards.filter((_, i) => i !== focusedCardIndex);
        set({
          completedCards: newCompletedCards,
          cards: newCards,
          correctCount: correctCount + 1,
        });
      } else {
        // Increment wrongCount for this specific card and unflip it
        const newCards = cards.map((card, i) => ({
          ...card,
          isFlipped: i === focusedCardIndex ? false : card.isFlipped,
          wrongCount: i === focusedCardIndex ? card.wrongCount + 1 : card.wrongCount,
        }));

        // Shuffle the cards
        const shuffled = shuffleArray(newCards);
        set({
          cards: shuffled,
          wrongCount: wrongCount + 1,
        });
      }
    }, 200);
  },

  handleExitPractice: () => {
    set({
      isPracticing: false,
      practiceMode: null,
      practiceSize: null,
      selectedSource: null,
      cards: [],
      correctCount: 0,
      wrongCount: 0,
      focusedCardIndex: null,
      totalCards: 0,
      completedCards: [],
    });
  },

  resetState: () => {
    set({
      selectedSource: null,
      practiceSize: null,
      customCount: '100',
      sizeDialogOpen: false,
      modeDialogOpen: false,
      practiceMode: 'arabic-to-english',
      isPracticing: false,
      cards: [],
      correctCount: 0,
      wrongCount: 0,
      focusedCardIndex: null,
      totalCards: 0,
      completedCards: [],
    });
  },

  initializePractice: () => {
    const { practiceMode, isPracticing, practiceSize, selectedSource, customCount } = get();
    if (practiceMode && isPracticing && practiceSize && selectedSource) {
      const practiceCards = getPracticeCards(practiceSize, selectedSource, customCount);
      const shuffled = practiceCards.map((item) => ({
        item,
        isFlipped: false,
        wrongCount: 0,
      }));
      set({
        cards: shuffled,
        totalCards: shuffled.length,
        correctCount: 0,
        wrongCount: 0,
        completedCards: [],
      });
    }
  },
}));
