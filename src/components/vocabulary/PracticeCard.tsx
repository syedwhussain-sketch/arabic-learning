import { Box, Paper, useTheme, Badge } from '@mui/material';
import type { CardState, PracticeMode } from '../../types/vocabulary.types';
import { getVocabColor } from '../../utils/vocabularyPracticeUtils';

interface PracticeCardProps {
  cardState: CardState;
  index: number;
  isFocused: boolean;
  practiceMode: PracticeMode;
  onCardClick: (index: number) => void;
}

export function PracticeCard({
  cardState,
  index,
  isFocused,
  practiceMode,
  onCardClick,
}: PracticeCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { item } = cardState;

  return (
    <Box
      sx={{
        position: 'relative',
        opacity: isFocused ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <Badge
        badgeContent={cardState.wrongCount > 0 ? cardState.wrongCount : null}
        color="error"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          width: '100%',
          '& .MuiBadge-badge': {
            fontSize: '1rem',
            height: '28px',
            minWidth: '28px',
            borderRadius: '50%',
            fontWeight: 'bold',
          },
        }}
      >
        <Paper
          elevation={3}
          onClick={() => onCardClick(index)}
          sx={{
            position: 'relative',
            p: 3,
            cursor: 'pointer',
            backgroundColor: getVocabColor(item.category, isDark),
            borderRadius: 4,
            transition: 'all 0.3s ease',
            border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            minHeight: '200px',
            width: '100%',
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
                fontFamily:
                  practiceMode === 'arabic-to-english'
                    ? 'Amiri, Traditional Arabic, serif'
                    : 'inherit',
                direction: practiceMode === 'arabic-to-english' ? 'rtl' : 'ltr',
              }}
            >
              {practiceMode === 'arabic-to-english' ? item.arabic : item.english}
            </Box>
          </Box>
        </Paper>
      </Badge>
    </Box>
  );
}
