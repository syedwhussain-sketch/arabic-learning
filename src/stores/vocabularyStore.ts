import { create } from 'zustand';
import type { PracticeMode, PracticeSize, CardState, CompletedCard } from '../types/vocabulary.types';
import type { VocabularyDataSource } from '../data/vocabularyData';
import { getPracticeCards, shuffleArray } from '../utils/vocabularyPracticeUtils';
import { MAX_WRONG_ATTEMPTS } from '../constants/constants';

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
  removedCards: CardState[]; // Cards removed after MAX_WRONG_ATTEMPTS
  isReviewMode: boolean; // Flag to indicate if we're reviewing removed cards

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
  removedCards: [],
  isReviewMode: false,

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
      // Don't set isPracticing yet - initializePractice will do it
      // Clear old session state immediately to prevent showing completion screen
      cards: [],
      correctCount: 0,
      wrongCount: 0,
      completedCards: [],
      removedCards: [],
      isReviewMode: false,
      focusedCardIndex: null,
    });
    // Initialize practice after setting size
    setTimeout(() => get().initializePractice(), 0);
  },

  handleModeSelect: (mode) => {
    set({
      practiceMode: mode,
      modeDialogOpen: false,
      // Don't set isPracticing yet - initializePractice will do it
      // Clear old session state immediately to prevent showing completion screen
      cards: [],
      correctCount: 0,
      wrongCount: 0,
      completedCards: [],
      removedCards: [],
      isReviewMode: false,
      focusedCardIndex: null,
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
    const { focusedCardIndex, cards, correctCount, wrongCount, completedCards, removedCards } = get();
    if (focusedCardIndex === null) return;

    const currentCard = cards[focusedCardIndex];
    set({ focusedCardIndex: null });

    setTimeout(() => {
      if (correct) {
        // Add to completed cards before removing from grid
        const { isReviewMode } = get();
        const newCompletedCards = [
          ...completedCards,
          {
            item: currentCard.item,
            wrongCount: currentCard.wrongCount,
            totalAttempts: currentCard.wrongCount + 1, // +1 for the correct attempt
            completedInReview: isReviewMode,
            reviewCycleCount: currentCard.reviewCycleCount,
          },
        ];

        // Remove the card from the grid
        const newCards = cards.filter((_, i) => i !== focusedCardIndex);
        
        // Check if we need to start review mode
        if (newCards.length === 0 && removedCards.length > 0) {
          // Start review mode with removed cards (keeping their cumulative wrongCount)
          const reviewCards = [...removedCards].map(card => ({
            ...card,
            isFlipped: false,
            // Keep wrongCount as is (cumulative)
            // Increment reviewCycleCount since we're showing it again
          }));
          set({
            completedCards: newCompletedCards,
            cards: reviewCards,
            correctCount: correctCount + 1,
            removedCards: [],
            isReviewMode: true,
          });
        } else {
          set({
            completedCards: newCompletedCards,
            cards: newCards,
            correctCount: correctCount + 1,
          });
        }
      } else {
        const newWrongCount = currentCard.wrongCount + 1;
        
        if (newWrongCount >= MAX_WRONG_ATTEMPTS) {
          // Remove card from active practice and add to removedCards
          // Increment reviewCycleCount since we're removing it
          const updatedCard = { 
            ...currentCard, 
            wrongCount: newWrongCount, 
            isFlipped: false,
            reviewCycleCount: currentCard.reviewCycleCount + 1,
          };
          const newCards = cards.filter((_, i) => i !== focusedCardIndex);
          const newRemovedCards = [...removedCards, updatedCard];
          
          // Check if we need to start review mode immediately
          if (newCards.length === 0 && newRemovedCards.length > 0) {
            // Start review mode with removed cards (keeping cumulative wrongCount)
            const reviewCards = newRemovedCards.map(card => ({
              ...card,
              isFlipped: false,
              // Keep wrongCount as is (cumulative)
            }));
            set({
              cards: reviewCards,
              wrongCount: wrongCount + 1,
              removedCards: [],
              isReviewMode: true,
            });
          } else {
            set({
              cards: newCards,
              wrongCount: wrongCount + 1,
              removedCards: newRemovedCards,
            });
          }
        } else {
          // Increment wrongCount for this specific card and unflip it
          const newCards = cards.map((card, i) => ({
            ...card,
            isFlipped: i === focusedCardIndex ? false : card.isFlipped,
            wrongCount: i === focusedCardIndex ? newWrongCount : card.wrongCount,
          }));

          // Shuffle the cards
          const shuffled = shuffleArray(newCards);
          set({
            cards: shuffled,
            wrongCount: wrongCount + 1,
          });
        }
      }
    }, 200);
  },

  handleExitPractice: () => {
    // Complete reset to initial state - as if page was just loaded
    set({
      // Practice setup state
      selectedSource: null,
      practiceSize: null,
      customCount: '100',
      sizeDialogOpen: false,
      modeDialogOpen: false,
      // Practice state
      practiceMode: 'arabic-to-english',
      isPracticing: false,
      cards: [],
      correctCount: 0,
      wrongCount: 0,
      focusedCardIndex: null,
      totalCards: 0,
      completedCards: [],
      removedCards: [],
      isReviewMode: false,
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
      removedCards: [],
      isReviewMode: false,
    });
  },

  initializePractice: () => {
    const { practiceMode, practiceSize, selectedSource, customCount } = get();
    if (practiceMode && practiceSize && selectedSource) {
      const practiceCards = getPracticeCards(practiceSize, selectedSource, customCount);
      const shuffled = practiceCards.map((item) => ({
        item,
        isFlipped: false,
        wrongCount: 0,
        reviewCycleCount: 0,
      }));
      set({
        cards: shuffled,
        totalCards: shuffled.length,
        correctCount: 0,
        wrongCount: 0,
        completedCards: [],
        removedCards: [],
        isReviewMode: false,
        isPracticing: true, // Set isPracticing here after cards are loaded
      });
    }
  },
}));
