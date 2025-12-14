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
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { vocabularyItems, type VocabularyItem } from '../data/vocabularyData';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type PracticeMode = 'arabic-to-english' | 'english-to-arabic' | null;
type PracticeSize = 'random50' | 'custom' | 'all' | null;

interface CardState {
  item: VocabularyItem;
  isFlipped: boolean;
}

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

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get practice cards based on size selection
  const getPracticeCards = (size: PracticeSize, count?: number): VocabularyItem[] => {
    const shuffled = shuffleArray(vocabularyItems);

    switch (size) {
      case 'random50':
        return shuffled.slice(0, Math.min(50, vocabularyItems.length));
      case 'custom':
        const customNum = count || parseInt(customCount) || 100;
        return shuffled.slice(0, Math.min(customNum, vocabularyItems.length));
      case 'all':
        return shuffled;
      default:
        return [];
    }
  };

  // Initialize cards when practice mode is selected
  useEffect(() => {
    if (practiceMode && isPracticing && practiceSize) {
      const practiceCards = getPracticeCards(practiceSize);
      const shuffled = practiceCards.map((item) => ({
        item,
        isFlipped: false,
      }));
      setCards(shuffled);
      setTotalCards(shuffled.length);
      setCorrectCount(0);
      setWrongCount(0);
    }
  }, [practiceMode, isPracticing, practiceSize]);

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

    setFocusedCardIndex(null);

    setTimeout(() => {
      if (correct) {
        // Remove the card from the grid
        const newCards = cards.filter((_, i) => i !== focusedCardIndex);
        setCards(newCards);
        setCorrectCount(correctCount + 1);
      } else {
        // Unflip the card and shuffle
        const newCards = cards.map((card, i) => ({
          ...card,
          isFlipped: i === focusedCardIndex ? false : card.isFlipped,
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
  };

  const focusedCard = focusedCardIndex !== null ? cards[focusedCardIndex] : null;

  // Color for vocabulary cards
  const getVocabColor = (category?: string) => {
    const colors = {
      'Common Nouns': { light: '#FFE5E5', dark: '#4A1F1F' },
      'People': { light: '#E5F4FF', dark: '#1F2F4A' },
      'Verbs': { light: '#E5FFE5', dark: '#1F4A1F' },
      'Adjectives': { light: '#FFF4E5', dark: '#4A3A1F' },
      'Animals': { light: '#F0E5FF', dark: '#2F1F4A' },
      'Objects': { light: '#E5FFFF', dark: '#1F4A4A' },
      'Food': { light: '#FFE5F0', dark: '#4A1F3A' },
    };
    const colorPair = colors[category as keyof typeof colors] || {
      light: '#F0E5FF',
      dark: '#2F1F4A',
    };
    return isDark ? colorPair.dark : colorPair.light;
  };

  // Calculate statistics
  const totalAttempts = correctCount + wrongCount;
  const percentageCorrect = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
  const remaining = cards.length;

  // Pie chart data
  const pieData = [
    { name: 'Correct', value: correctCount, color: '#4caf50' },
    { name: 'Wrong', value: wrongCount, color: '#f44336' },
    { name: 'Remaining', value: remaining, color: isDark ? '#424242' : '#e0e0e0' },
  ];

  // If practicing, show practice view with progress dashboard
  if (isPracticing) {
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
          <Paper
            elevation={3}
            sx={{
              mb: 2.5,
              p: 2,
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
              {/* Pie Chart */}
              <Box sx={{ width: { xs: '100%', md: '33%' }, height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={54}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                        border: `1px solid ${isDark ? '#444' : '#ddd'}`,
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Statistics - Compact Layout */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                  <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
                    <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {correctCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Correct
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
                    <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {wrongCount}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Wrong
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
                    <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="h6" sx={{ color: isDark ? '#90caf9' : '#1976d2', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {remaining}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Remaining
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
                    <CardContent sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="h6" sx={{ color: isDark ? '#ffa726' : '#f57c00', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {percentageCorrect}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Accuracy
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>

            {/* Bottom Info Bar */}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                {practiceMode === 'arabic-to-english' ? 'Arabic → English' : 'English → Arabic'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Progress: {correctCount} / {totalCards} completed
              </Typography>
              <Button onClick={handleExitPractice} variant="outlined" size="small">
                Exit Practice
              </Button>
            </Box>
          </Paper>

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
                        border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: 8,
                          borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
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
                            fontFamily: practiceMode === 'arabic-to-english' ? 'Amiri, Traditional Arabic, serif' : 'inherit',
                            direction: practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
                          }}
                        >
                          {practiceMode === 'arabic-to-english' ? item.arabic : item.english}
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
                Final Score: {correctCount} correct out of {totalCards} ({percentageCorrect}% accuracy)
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
                    transform: focusedCard.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                      border: `3px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#000000',
                        textAlign: 'center',
                        fontFamily: practiceMode === 'arabic-to-english' ? 'Amiri, Traditional Arabic, serif' : 'inherit',
                        direction: practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
                        mb: 2,
                      }}
                    >
                      {practiceMode === 'arabic-to-english' ? focusedCard.item.arabic : focusedCard.item.english}
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
                      border: `3px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                      gap: 2,
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

                    {/* Arabic */}
                    <Box
                      sx={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#000000',
                        textAlign: 'center',
                        fontFamily: 'Amiri, Traditional Arabic, serif',
                        direction: 'rtl',
                      }}
                    >
                      {focusedCard.item.arabic}
                    </Box>

                    {/* Transliteration */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        textAlign: 'center',
                      }}
                    >
                      {focusedCard.item.transliteration}
                    </Typography>

                    {/* English */}
                    <Box
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#000000',
                        textAlign: 'center',
                      }}
                    >
                      {focusedCard.item.english}
                    </Box>

                    {/* Answer Buttons - Only show when flipped */}
                    {focusedCard.isFlipped && (
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          mt: 2,
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

  // Landing page view with practice size selection
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
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            Master essential Arabic vocabulary with interactive flip cards
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
            }}
          >
            Available vocabulary: {vocabularyItems.length} words
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 500 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartPractice}
              sx={{
                py: 3,
                px: 6,
                fontSize: '1.3rem',
                fontWeight: 'bold',
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: isDark ? '#e0e0e0' : '#333333',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Practice
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Practice Size Selection Dialog */}
      <Dialog open={sizeDialogOpen} onClose={handleCancelSizeSelection} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Choose Practice Set
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}>
            How many words would you like to practice?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleSizeSelect('random50')}
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
            Random 50 Words
          </Button>
          <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type="number"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              label="Number of words"
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
              inputProps={{ min: 1, max: vocabularyItems.length }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => handleSizeSelect('custom')}
              sx={{
                py: 1.5,
                px: 3,
                fontSize: '1.1rem',
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',
                '&:hover': {
                  backgroundColor: isDark ? '#e0e0e0' : '#333333',
                },
              }}
            >
              Practice
            </Button>
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => handleSizeSelect('all')}
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
            Practice All Words ({vocabularyItems.length})
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleCancelSizeSelection}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              borderColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#e0e0e0' : '#333333',
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Practice Mode Selection Dialog */}
      <Dialog open={modeDialogOpen} onClose={handleCancelModeSelection} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Choose Practice Mode
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}>
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
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
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
