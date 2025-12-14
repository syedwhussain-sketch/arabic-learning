import { Box, Button, Typography, useTheme } from '@mui/material';

interface CompletionScreenProps {
  correctCount: number;
  totalCards: number;
  percentageCorrect: number;
  onExitPractice: () => void;
}

export function CompletionScreen({
  correctCount,
  totalCards,
  percentageCorrect,
  onExitPractice,
}: CompletionScreenProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
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
        Final Score: {correctCount} correct out of {totalCards} ({percentageCorrect}%
        accuracy)
      </Typography>
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
