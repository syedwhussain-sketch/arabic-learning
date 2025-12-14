import { Box, Container, Typography, useTheme } from '@mui/material';
import { getVocabularyCount } from '../../data/vocabulary';
import type { VocabularySource } from '../../types/vocabulary.types';
import { VocabularySourceCard } from './VocabularySourceCard';
import { useVocabularyStore } from '../../stores/vocabularyStore';

export function LandingScreen() {
  const onSourceSelect = useVocabularyStore((state) => state.handleSourceSelect);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Define available vocabulary sources
  const vocabularySources: VocabularySource[] = [
    {
      id: 'medinabook1',
      title: 'Medina Book 1',
      description: 'Essential vocabulary from the first Medina Arabic book',
      emoji: '📗',
      count: getVocabularyCount('medinabook1'),
      available: getVocabularyCount('medinabook1') > 0,
    },
    {
      id: 'medinabook2',
      title: 'Medina Book 2',
      description: 'Intermediate vocabulary from Medina Arabic Book 2',
      emoji: '📘',
      count: getVocabularyCount('medinabook2'),
      available: getVocabularyCount('medinabook2') > 0,
    },
    {
      id: 'medinabook3',
      title: 'Medina Book 3',
      description: 'Advanced vocabulary from Medina Arabic Book 3',
      emoji: '📙',
      count: getVocabularyCount('medinabook3'),
      available: getVocabularyCount('medinabook3') > 0,
    },
    {
      id: 'other',
      title: 'Ten Lessons Of Arabic',
      description: 'Core vocabulary from Ten Lessons Of Arabic series',
      emoji: '📕',
      count: getVocabularyCount('other'),
      available: getVocabularyCount('other') > 0,
    },
  ];

  return (
    <Box
      id="containerVocabLanding"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: isDark ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          id="headerVocabLanding"
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center',
            }}
          >
            📚 Vocabulary Practice
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              textAlign: 'center',
            }}
          >
            Choose a vocabulary source to begin practicing
          </Typography>
        </Box>

        {/* Source Cards Grid */}
        <Box
          id="gridSourceCards"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {vocabularySources.map((source) => (
            <VocabularySourceCard
              key={source.id}
              source={source}
              onClick={onSourceSelect}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
