import { Box, Button, Typography, useTheme, Paper, Divider } from '@mui/material';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { CompletedCard } from '../../types/vocabulary.types';
import { useVocabularyStore } from '../../stores/vocabularyStore';
import { MAX_WRONG_ATTEMPTS } from '../../constants/constants';

interface CompletionScreenProps {
  totalCards: number;
  completedCards: CompletedCard[];
}

export function CompletionScreen({
  totalCards,
  completedCards,
}: CompletionScreenProps) {
  const onExitPractice = useVocabularyStore((state) => state.handleExitPractice);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Calculate comprehensive statistics FIRST (before useEffect)
  const cardsWithErrors = completedCards.filter(card => card.wrongCount > 0);
  const perfectCards = completedCards.filter(card => card.wrongCount === 0);
  const multipleReviewCycles = completedCards.filter(card => card.reviewCycleCount > 1);
  const totalAttemptsMade = completedCards.reduce((sum, card) => sum + card.totalAttempts, 0);
  const averageAttemptsPerCard = totalCards > 0 ? (totalAttemptsMade / totalCards).toFixed(1) : '0';
  
  // Calculate score based on unique cards (not cumulative attempts)
  const perfectCardsCount = perfectCards.length;
  const cardsWithErrorsCount = cardsWithErrors.length;
  const scorePercentage = totalCards > 0 ? Math.round((perfectCardsCount / totalCards) * 100) : 0;
  
  // Check if user got perfect or near-perfect score
  const isPerfect = scorePercentage === 100;
  const isExcellent = scorePercentage >= 90;

  // Sort cards by wrongCount in descending order (weakest first)
  const sortedWeakCards = [...completedCards]
    .filter(card => card.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .slice(0, 5);

  const worstCard = sortedWeakCards[0];
  
  // Sort cards with errors for detailed view (hide perfect cards)
  const cardsToShow = cardsWithErrors.sort((a, b) => b.wrongCount - a.wrongCount);

  // Fire confetti when component mounts if score is excellent
  useEffect(() => {
    if (isExcellent) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: ReturnType<typeof setInterval> = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isExcellent]);

  // Humorous messages for top 5 worst cards
  const humorousMessages = [
    "Your arch-nemesis has revealed itself 😈",
    "Houston, we have a memory problem 🚀😬",
    "This one's giving you a workout 💪😓",
    "Tricky little word, isn't it? 🔨😅",
    "Practice makes... better? 💪🤔",
  ];

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 8,
      }}
    >
      {/* Success Emoji - Large and Prominent for Perfect Score */}
      {isPerfect && (
        <Box
          sx={{
            fontSize: '120px',
            mb: 2,
            animation: 'bounce 1s ease-in-out infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          🎯
        </Box>
      )}
      
      {isExcellent && !isPerfect && (
        <Box
          sx={{
            fontSize: '100px',
            mb: 2,
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }}
        >
          🌟
        </Box>
      )}
      
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 2,
        }}
      >
        {isPerfect ? '🎯 Perfect Score!' : '🎉 Congratulations!'}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: 'text.secondary',
          mb: 2,
        }}
      >
        You've completed all vocabulary cards!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: 'text.primary',
          mb: 4,
        }}
      >
        Final Score: {perfectCardsCount} perfect out of {totalCards} cards ({scorePercentage}%
        accuracy)
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: 2,
        }}
      >
        {perfectCardsCount} card{perfectCardsCount !== 1 ? 's' : ''} mastered on first try · {cardsWithErrorsCount} card{cardsWithErrorsCount !== 1 ? 's' : ''} needed practice
      </Typography>

      {/* Statistics Overview */}
      <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 3,
          }}
        >
          📊 Session Statistics
        </Typography>
        
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {perfectCards.length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Perfect (First Try)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {cardsWithErrors.length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Needed Practice
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {multipleReviewCycles.length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Multiple Review Cycles
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {averageAttemptsPerCard}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Avg. Attempts/Card
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Weakest Cards Section */}
      {cardsWithErrors.length > 0 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 3,
            }}
          >
            📊 Your Top 5 Challenges
          </Typography>
          
          <Paper
            elevation={3}
            sx={{
              p: 3,
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              borderRadius: 3,
            }}
          >
            {sortedWeakCards.map((card, index) => (
              <Box key={card.item.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: index === 0 && worstCard.wrongCount > 2 
                      ? (isDark ? 'rgba(211, 47, 47, 0.2)' : 'rgba(211, 47, 47, 0.1)')
                      : 'transparent',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Amiri, Traditional Arabic, serif',
                        direction: 'rtl',
                        color: 'text.primary',
                      }}
                    >
                      {card.item.arabic}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary' }}
                    >
                      {card.item.english}
                    </Typography>
                    {humorousMessages[index] && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'error.main',
                          fontStyle: 'italic',
                          mt: 1,
                        }}
                      >
                        {humorousMessages[index]}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      ml: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: 'error.main',
                      }}
                    >
                      {card.wrongCount}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {card.wrongCount === 1 ? 'attempt' : 'attempts'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>
      )}

      {/* Detailed Card Statistics Table */}
      {cardsWithErrors.length > 0 && (
        <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 3,
            }}
          >
            📝 Cards That Needed Practice
          </Typography>
          
          <Paper
            elevation={3}
            sx={{
              p: 3,
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              borderRadius: 3,
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Header */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '2fr 1fr 1fr', sm: '2.5fr 1fr 1fr 1fr 1fr' },
                  gap: 2,
                  pb: 2,
                  borderBottom: `2px solid ${isDark ? '#333' : '#ddd'}`,
                  fontWeight: 'bold',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Word
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  Errors
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  Total
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textAlign: 'center', display: { xs: 'none', sm: 'block' } }}
                >
                  Cycles
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textAlign: 'center', display: { xs: 'none', sm: 'block' } }}
                >
                  Status
                </Typography>
              </Box>
              
              {/* Card Rows */}
              {cardsToShow.map((card, index) => (
                <Box
                  key={card.item.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '2fr 1fr 1fr', sm: '2.5fr 1fr 1fr 1fr 1fr' },
                    gap: 2,
                    py: 1.5,
                    px: 1,
                    borderBottom: index < cardsToShow.length - 1 ? `1px solid ${isDark ? '#2a2a2a' : '#eee'}` : 'none',
                    backgroundColor: card.wrongCount >= 5
                      ? (isDark ? 'rgba(211, 47, 47, 0.15)' : 'rgba(211, 47, 47, 0.08)')
                      : card.wrongCount >= 3
                      ? (isDark ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 152, 0, 0.05)')
                      : 'transparent',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'Amiri, Traditional Arabic, serif',
                        direction: 'rtl',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      {card.item.arabic}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {card.item.english}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: card.wrongCount >= 5 ? 'error.main' : card.wrongCount >= 3 ? 'warning.main' : 'info.main',
                    }}
                  >
                    {card.wrongCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: 'center', color: 'text.primary', fontWeight: 500 }}
                  >
                    {card.totalAttempts}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ 
                      textAlign: 'center', 
                      display: { xs: 'none', sm: 'block' },
                      fontWeight: 'bold',
                      color: card.reviewCycleCount > 0 ? 'error.main' : 'text.secondary',
                    }}
                  >
                    {card.reviewCycleCount}
                  </Typography>
                  <Box
                    sx={{
                      textAlign: 'center',
                      display: { xs: 'none', sm: 'flex' },
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {card.reviewCycleCount > 1 ? (
                      <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        ↻ Multi-Review
                      </Typography>
                    ) : card.completedInReview ? (
                      <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                        ↻ Review
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: 'info.main', fontWeight: 'bold' }}>
                        ⚠ Practice
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              💡 Tip: "Cycles" shows how many times a card was removed after {MAX_WRONG_ATTEMPTS} errors and reshown
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={onExitPractice}
        sx={{
          py: 2,
          px: 4,
          fontSize: '1.1rem',
          backgroundColor: isDark ? '#ffffff' : '#000000',
          color: isDark ? '#000000' : '#ffffff',
          '&:hover': {
            backgroundColor: isDark ? '#e0e0e0' : '#333333',
          },
        }}
      >
        Back to Vocabulary
      </Button>
    </Box>
  );
}
