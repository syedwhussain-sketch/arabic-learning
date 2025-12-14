import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Backdrop,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { vocabularyItems, type VocabularyItem } from '../data/vocabularyData';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type PracticeMode = 'arabic-to-english' | 'english-to-arabic' | null;

interface CardState {
  item: VocabularyItem;
  isFlipped: boolean;
}

export function Vocabulary() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [gridRef] = useAutoAnimate();

  // Practice state
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(null);
  const [modeDialogOpen, setModeDialogOpen] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [cards, setCards] = useState<CardState[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize cards when practice mode is selected
  useEffect(() => {
    if (practiceMode && isPracticing) {
      // Shuffle the cards
      const shuffled = shuffleArray(vocabularyItems).map((item) => ({
        item,
        isFlipped: false,
      }));
      setCards(shuffled);
      setCorrectCount(0);
    }
  }, [practiceMode, isPracticing]);

  const handleStartPractice = () => {
    setModeDialogOpen(true);
  };

  const handleModeSelect = (mode: PracticeMode) => {
    setPracticeMode(mode);
    setModeDialogOpen(false);
    setIsPracticing(true);
  };

  const handleCancelModeSelection = () => {
    setModeDialogOpen(false);
    setPracticeMode(null);
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

    setFocusedCardIndex(null);

    setTimeout(() => {
      if (correct) {
        // Remove the card from the grid
        const newCards = cards.filter((_, i) => i !== focusedCardIndex);
        setCards(newCards);
        setCorrectCount(correctCount + 1);
      } else {
        // Unflip the card
        const newCards = cards.map((card, i) => ({
          ...card,
          isFlipped: i === focusedCardIndex ? false : card.isFlipped,
        }));

        // Shuffle the cards - auto-animate will handle the animation
        const shuffled = shuffleArray(newCards);
        setCards(shuffled);
      }
    }, 200);
  };

  const handleExitPractice = () => {
    setIsPracticing(false);
    setPracticeMode(null);
    setCards([]);
    setCorrectCount(0);
    setFocusedCardIndex(null);
  };

  const totalCount = vocabularyItems.length;
  const focusedCard = focusedCardIndex !== null ? cards[focusedCardIndex] : null;

  // Color for vocabulary cards
  const getVocabColor = (category?: string) => {
    const colors = {
      'Common Nouns': { light: '#FFE5E5', dark: '#4A1F1F' },
      'People': { light: '#E5F4FF', dark: '#1F2F4A' },
      'Verbs': { light: '#E5FFE5', dark: '#1F4A1F' },
      'Adjectives': { light: '#FFF4E5', dark: '#4A3A1F' },
    };
    const colorPair = colors[category as keyof typeof colors] || {
      light: '#F0E5FF',
      dark: '#2F1F4A',
    };
    return isDark ? colorPair.dark : colorPair.light;
  };

  // If practicing, show practice view with card grid
  if (isPracticing) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          py: 6,
          backgroundColor: isDark ? '#000000' : '#ffffff',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: 'text.primary',
              }}
            >
              📚 Vocabulary Practice
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 2,
              }}
            >
              {practiceMode === 'arabic-to-english'
                ? 'Arabic → English'
                : 'English → Arabic'}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Progress: {correctCount} / {totalCount} correct
              </Typography>
              <Button onClick={handleExitPractice} variant="outlined" size="small">
                Exit Practice
              </Button>
            </Box>
          </Box>

          {cards.length > 0 ? (
            <Box
              ref={gridRef}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3,
                maxWidth: '1200px',
                mx: 'auto',
              }}
            >
              {cards.map((cardState, index) => {
                const { item } = cardState;
                const isFocused = focusedCardIndex === index;

                return (
                  <Box
                    key={item.id}
                    sx={{
                      position: 'relative',
                      opacity: isFocused ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <Paper
                      elevation={3}
                      onClick={() => handleCardClick(index)}
                      sx={{
                        position: 'relative',
                        p: 3,
                        cursor: 'pointer',
                        backgroundColor: getVocabColor(item.category),
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        border: `2px solid ${
                          isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }`,
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: 8,
                          borderColor: isDark
                            ? 'rgba(255,255,255,0.3)'
                            : 'rgba(0,0,0,0.3)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: isDark ? '#ffffff' : '#000000',
                            textAlign: 'center',
                            fontFamily:
                              practiceMode === 'arabic-to-english'
                                ? 'Amiri, Traditional Arabic, serif'
                                : 'inherit',
                            direction:
                              practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
                          }}
                        >
                          {practiceMode === 'arabic-to-english'
                            ? item.arabic
                            : item.english}
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          ) : (
            // Completion Message
            <Box
              sx={{
                textAlign: 'center',
                mt: 8,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                🎉 Congratulations!
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                You've completed all vocabulary cards correctly!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleExitPractice}
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
          )}
        </Container>

        {/* Focused Card Modal */}
        <Modal
          open={focusedCardIndex !== null}
          onClose={() => {}}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: {
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              maxWidth: '90vw',
              outline: 'none',
            }}
          >
            {focusedCard && (
              <Box
                sx={{
                  perspective: '1000px',
                  width: '100%',
                  height: '400px',
                }}
              >
                <Paper
                  elevation={24}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: focusedCard.isFlipped
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of Card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: getVocabColor(focusedCard.item.category),
                      borderRadius: 4,
                      p: 4,
                      border: `3px solid ${
                        isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#000000',
                        textAlign: 'center',
                        fontFamily:
                          practiceMode === 'arabic-to-english'
                            ? 'Amiri, Traditional Arabic, serif'
                            : 'inherit',
                        direction:
                          practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
                        mb: 2,
                      }}
                    >
                      {practiceMode === 'arabic-to-english'
                        ? focusedCard.item.arabic
                        : focusedCard.item.english}
                    </Box>
                  </Box>

                  {/* Back of Card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: getVocabColor(focusedCard.item.category),
                      borderRadius: 4,
                      p: 4,
                      border: `3px solid ${
                        isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                      }`,
                      gap: 3,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                      }}
                    >
                      Answer
                    </Typography>
                    <Box
                      sx={{
                        fontSize: '3.5rem',
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#000000',
                        textAlign: 'center',
                        fontFamily:
                          practiceMode === 'english-to-arabic'
                            ? 'Amiri, Traditional Arabic, serif'
                            : 'inherit',
                        direction:
                          practiceMode === 'english-to-arabic' ? 'rtl' : 'ltr',
                      }}
                    >
                      {practiceMode === 'english-to-arabic'
                        ? focusedCard.item.arabic
                        : focusedCard.item.english}
                    </Box>

                    {/* Answer Buttons - Only show when flipped */}
                    {focusedCard.isFlipped && (
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          mt: 3,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => handleAnswer(false)}
                          startIcon={<ThumbDownIcon />}
                          sx={{
                            py: 2,
                            px: 4,
                            fontSize: '1.2rem',
                            backgroundColor: '#f44336',
                            color: '#ffffff',
                            '&:hover': { backgroundColor: '#d32f2f' },
                          }}
                        >
                          Wrong
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => handleAnswer(true)}
                          startIcon={<ThumbUpIcon />}
                          sx={{
                            py: 2,
                            px: 4,
                            fontSize: '1.2rem',
                            backgroundColor: '#4caf50',
                            color: '#ffffff',
                            '&:hover': { backgroundColor: '#45a049' },
                          }}
                        >
                          Correct
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    );
  }

  // Landing page view
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        backgroundColor: isDark ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: 'text.primary',
              fontSize: { xs: '3rem', md: '4rem' },
            }}
          >
            📚 Vocabulary Practice
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6,
            }}
          >
            Master essential Arabic vocabulary with interactive flip cards. Click
            on each card to reveal the answer, then mark whether you got it right
            or wrong!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleStartPractice}
            sx={{
              py: 3,
              px: 8,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Practice
          </Button>
        </Box>
      </Container>

      {/* Practice Mode Selection Dialog */}
      <Dialog
        open={modeDialogOpen}
        onClose={handleCancelModeSelection}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Choose Practice Mode
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}
          >
            How would you like to practice?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleModeSelect('arabic-to-english')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            Arabic → English
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleModeSelect('english-to-arabic')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            English → Arabic
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleCancelModeSelection}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              borderColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#e0e0e0' : '#333333',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
