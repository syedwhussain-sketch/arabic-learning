import { Box, Container, useTheme } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ProgressDashboard } from '../components/vocabulary/ProgressDashboard';
import { PracticeCard } from '../components/vocabulary/PracticeCard';
import { FocusedCardModal } from '../components/vocabulary/FocusedCardModal';
import { PracticeSetupDialogs } from '../components/vocabulary/PracticeSetupDialogs';
import { CompletionScreen } from '../components/vocabulary/CompletionScreen';
import { LandingScreen } from '../components/vocabulary/LandingScreen';
import { useVocabularyStore } from '../stores/vocabularyStore';

export function Vocabulary() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [gridRef] = useAutoAnimate();

  // Get state from store
  const isPracticing = useVocabularyStore((state) => state.isPracticing);
  const cards = useVocabularyStore((state) => state.cards);
  const correctCount = useVocabularyStore((state) => state.correctCount);
  const wrongCount = useVocabularyStore((state) => state.wrongCount);
  const totalCards = useVocabularyStore((state) => state.totalCards);
  const completedCards = useVocabularyStore((state) => state.completedCards);
  const focusedCardIndex = useVocabularyStore((state) => state.focusedCardIndex);
  const practiceMode = useVocabularyStore((state) => state.practiceMode);

  // Get actions from store
  const handleCardClick = useVocabularyStore((state) => state.handleCardClick);
  const handleAnswer = useVocabularyStore((state) => state.handleAnswer);

  const focusedCard = focusedCardIndex !== null ? cards[focusedCardIndex] : null;

  // Calculate statistics
  const totalAttempts = correctCount + wrongCount;
  const percentageCorrect =
    totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // If not practicing, show landing page
  if (!isPracticing) {
    return (
      <>
        <LandingScreen />
        <PracticeSetupDialogs />
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
        <ProgressDashboard />

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
