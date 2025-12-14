import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { vocabularyItems } from '../../data/vocabularyData';

interface LandingScreenProps {
  onStartPractice: () => void;
}

export function LandingScreen({ onStartPractice }: LandingScreenProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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

          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 500 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onStartPractice}
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
    </Box>
  );
}
