import { useState, useEffect } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { PracticeMode, PracticeSize, CardState, CompletedCard } from '../types/vocabulary.types';
import { getPracticeCards, shuffleArray } from '../utils/vocabularyPracticeUtils';
import { ProgressDashboard } from '../components/vocabulary/ProgressDashboard';
import { PracticeCard } from '../components/vocabulary/PracticeCard';
import { FocusedCardModal } from '../components/vocabulary/FocusedCardModal';
import { PracticeSetupDialogs } from '../components/vocabulary/PracticeSetupDialogs';
import { CompletionScreen } from '../components/vocabulary/CompletionScreen';
import { LandingScreen } from '../components/vocabulary/LandingScreen';

export function Vocabulary() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [gridRef] = useAutoAnimate();

  // Practice setup state
  const [practiceSize, setPracticeSize] = useState<PracticeSize>(null);
  const [customCount, setCustomCount] = useState<string>('100');
  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);

  // Practice state
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(null);
  const [modeDialogOpen, setModeDialogOpen] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [cards, setCards] = useState<CardState[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [totalCards, setTotalCards] = useState(0);
  const [completedCards, setCompletedCards] = useState<CompletedCard[]>([]);

  // Initialize cards when practice mode is selected
  useEffect(() => {
    if (practiceMode && isPracticing && practiceSize) {
      const practiceCards = getPracticeCards(practiceSize, customCount);
      const shuffled = practiceCards.map((item) => ({
        item,
        isFlipped: false,
        wrongCount: 0,
      }));
      setCards(shuffled);
      setTotalCards(shuffled.length);
      setCorrectCount(0);
      setWrongCount(0);
      setCompletedCards([]);
    }
  }, [practiceMode, isPracticing, practiceSize, customCount]);

  const handleStartPractice = () => {
    setSizeDialogOpen(true);
  };

  const handleSizeSelect = (size: PracticeSize) => {
    setPracticeSize(size);
    setSizeDialogOpen(false);
    setModeDialogOpen(true);
  };

  const handleModeSelect = (mode: PracticeMode) => {
    setPracticeMode(mode);
    setModeDialogOpen(false);
    setIsPracticing(true);
  };

  const handleCancelSizeSelection = () => {
    setSizeDialogOpen(false);
    setPracticeSize(null);
  };

  const handleCancelModeSelection = () => {
    setModeDialogOpen(false);
    setPracticeMode(null);
    setPracticeSize(null);
  };

  const handleCardClick = (index: number) => {
    if (focusedCardIndex === null && !cards[index].isFlipped) {
      setFocusedCardIndex(index);
      // Flip after a short delay for animation
      setTimeout(() => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], isFlipped: true };
        setCards(newCards);
      }, 300);
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (focusedCardIndex === null) return;

    const currentCard = cards[focusedCardIndex];
    setFocusedCardIndex(null);

    setTimeout(() => {
      if (correct) {
        // Add to completed cards before removing from grid
        setCompletedCards(prev => [...prev, {
          item: currentCard.item,
          wrongCount: currentCard.wrongCount,
        }]);
        
        // Remove the card from the grid
        const newCards = cards.filter((_, i) => i !== focusedCardIndex);
        setCards(newCards);
        setCorrectCount(correctCount + 1);
      } else {
        // Increment wrongCount for this specific card and unflip it
        const newCards = cards.map((card, i) => ({
          ...card,
          isFlipped: i === focusedCardIndex ? false : card.isFlipped,
          wrongCount: i === focusedCardIndex ? card.wrongCount + 1 : card.wrongCount,
        }));

        // Shuffle the cards
        const shuffled = shuffleArray(newCards);
        setCards(shuffled);
        setWrongCount(wrongCount + 1);
      }
    }, 200);
  };

  const handleExitPractice = () => {
    setIsPracticing(false);
    setPracticeMode(null);
    setPracticeSize(null);
    setCards([]);
    setCorrectCount(0);
    setWrongCount(0);
    setFocusedCardIndex(null);
    setTotalCards(0);
    setCompletedCards([]);
  };

  const focusedCard = focusedCardIndex !== null ? cards[focusedCardIndex] : null;

  // Calculate statistics
  const totalAttempts = correctCount + wrongCount;
  const percentageCorrect =
    totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
  const remaining = cards.length;

  // If not practicing, show landing page
  if (!isPracticing) {
    return (
      <>
        <LandingScreen onStartPractice={handleStartPractice} />
        <PracticeSetupDialogs
          sizeDialogOpen={sizeDialogOpen}
          modeDialogOpen={modeDialogOpen}
          customCount={customCount}
          onCustomCountChange={setCustomCount}
          onSizeSelect={handleSizeSelect}
          onModeSelect={handleModeSelect}
          onCancelSizeSelection={handleCancelSizeSelection}
          onCancelModeSelection={handleCancelModeSelection}
        />
      </>
    );
  }

  // If practicing, show practice view
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 4,
        backgroundColor: isDark ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="xl">
        {/* Progress Dashboard */}
        <ProgressDashboard
          correctCount={correctCount}
          wrongCount={wrongCount}
          remaining={remaining}
          totalCards={totalCards}
          practiceMode={practiceMode}
          onExitPractice={handleExitPractice}
        />

        {/* Practice Cards Grid */}
        {cards.length > 0 ? (
          <Box
            ref={gridRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 3,
              maxWidth: '1400px',
              mx: 'auto',
            }}
          >
            {cards.map((cardState, index) => (
              <PracticeCard
                key={cardState.item.id}
                cardState={cardState}
                index={index}
                isFocused={focusedCardIndex === index}
                practiceMode={practiceMode}
                onCardClick={handleCardClick}
              />
            ))}
          </Box>
        ) : (
          <CompletionScreen
            correctCount={correctCount}
            totalCards={totalCards}
            percentageCorrect={percentageCorrect}
            completedCards={completedCards}
            onExitPractice={handleExitPractice}
          />
        )}
      </Container>

      {/* Focused Card Modal */}
      <FocusedCardModal
        focusedCard={focusedCard}
        practiceMode={practiceMode}
        onAnswer={handleAnswer}
      />
    </Box>
  );
}
