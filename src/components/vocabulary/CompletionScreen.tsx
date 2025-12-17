import { Box, Button, Typography, useTheme, Paper, Divider } from '@mui/material';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { CompletedCard } from '../../types/vocabulary.types';
import { useVocabularyStore } from '../../stores/vocabularyStore';

interface CompletionScreenProps {
  correctCount: number;
  totalCards: number;
  percentageCorrect: number;
  completedCards: CompletedCard[];
}

export function CompletionScreen({
  correctCount,
  totalCards,
  percentageCorrect,
  completedCards,
}: CompletionScreenProps) {
  const onExitPractice = useVocabularyStore((state) => state.handleExitPractice);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Check if user got perfect or near-perfect score
  const isPerfect = percentageCorrect === 100;
  const isExcellent = percentageCorrect >= 90;

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

  // Sort cards by wrongCount in descending order (weakest first)
  const sortedWeakCards = [...completedCards]
    .filter(card => card.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .slice(0, 5); // Show top 5 weakest cards

  const worstCard = sortedWeakCards[0];

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
        Final Score: {correctCount} correct out of {totalCards} ({percentageCorrect}%
        accuracy)
      </Typography>

      {/* Weakest Cards Section */}
      {sortedWeakCards.length > 0 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 3,
            }}
          >
            📊 Your Weakest Cards
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
