import {
  Box,
  Modal,
  Paper,
  Backdrop,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import type { CardState, PracticeMode } from '../../types/vocabulary.types';
import { getVocabColor } from '../../utils/vocabularyPracticeUtils';

interface FocusedCardModalProps {
  focusedCard: CardState | null;
  practiceMode: PracticeMode;
  onAnswer: (correct: boolean) => void;
}

export function FocusedCardModal({
  focusedCard,
  practiceMode,
  onAnswer,
}: FocusedCardModalProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Modal
      open={focusedCard !== null}
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
                borderRadius: 4,
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
                  backgroundColor: getVocabColor(focusedCard.item.category, isDark),
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
                    direction: practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
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
                  backgroundColor: getVocabColor(focusedCard.item.category, isDark),
                  borderRadius: 4,
                  p: 4,
                  border: `3px solid ${
                    isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                  }`,
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
                      onClick={() => onAnswer(false)}
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
                      onClick={() => onAnswer(true)}
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
  );
}
