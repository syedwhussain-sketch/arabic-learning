import { Box, Card, CardContent, Typography, Chip, useTheme } from '@mui/material';
import type { VocabularySource } from '../../types/vocabulary.types';
import type { VocabularyDataSource } from '../../data/vocabularyData';

interface VocabularySourceCardProps {
  source: VocabularySource;
  onClick: (sourceId: VocabularyDataSource) => void;
}

export function VocabularySourceCard({ source, onClick }: VocabularySourceCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      id={`containerSourceCard-${source.id}`}
      onClick={() => source.available && onClick(source.id)}
      sx={{
        cursor: source.available ? 'pointer' : 'not-allowed',
        opacity: source.available ? 1 : 0.6,
        borderRadius: 2,
        border: `2px solid ${
          isDark
            ? source.available
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(255,255,255,0.05)'
            : source.available
            ? 'rgba(0,0,0,0.15)'
            : 'rgba(0,0,0,0.05)'
        }`,
        backgroundColor: isDark
          ? source.available
            ? '#1e1e1e'
            : '#0a0a0a'
          : source.available
          ? '#ffffff'
          : '#f5f5f5',
        transition: 'all 0.3s ease',
        height: '100%',
        minHeight: { xs: '200px', sm: '220px', md: '240px' },
        display: 'flex',
        flexDirection: 'column',
        '&:hover': source.available
          ? {
              transform: 'translateY(-8px)',
              boxShadow: 8,
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            }
          : {},
      }}
    >
      <CardContent
        id={`contentSourceCard-${source.id}`}
        sx={{
          p: { xs: 2.5, sm: 3, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '100%',
          gap: 1.5,
        }}
      >
        {/* Emoji Icon */}
        <Box
          id={`emojiContainer-${source.id}`}
          sx={{
            fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' },
            mb: 0.5,
          }}
        >
          {source.emoji}
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            mb: 0.5,
          }}
        >
          {source.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.4,
            mb: 1,
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
          }}
        >
          {source.description}
        </Typography>

        {/* Word Count Chip */}
        {source.available ? (
          <Chip
            id={`chipCount-${source.id}`}
            label={`${source.count} words`}
            size="small"
            sx={{
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              fontWeight: 'bold',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: 24,
            }}
          />
        ) : (
          <Chip
            id={`chipComingSoon-${source.id}`}
            label="Coming Soon"
            size="small"
            sx={{
              backgroundColor: isDark ? '#333' : '#e0e0e0',
              color: 'text.secondary',
              fontWeight: 'bold',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: 24,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
