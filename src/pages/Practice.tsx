import { Box, Container, Typography, Card, CardContent, CardActionArea, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import type { ReactElement } from 'react';

interface PracticeOption {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  path: string;
  isAvailable: boolean;
}

export function Practice() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const practiceOptions: PracticeOption[] = [
    {
      id: 'vocabulary',
      title: '🎴 Vocabulary Practice',
      description: 'Practice Arabic vocabulary with flashcards. Test your knowledge of words and their meanings.',
      icon: <MenuBookIcon sx={{ fontSize: 48 }} />,
      path: '/practice/vocabulary',
      isAvailable: true,
    },
    {
      id: 'conjugation',
      title: '📝 Verb Conjugation Practice',
      description: 'Practice conjugating Arabic verbs across different tenses and pronouns. (Coming Soon)',
      icon: <SchoolIcon sx={{ fontSize: 48 }} />,
      path: '/practice/conjugation',
      isAvailable: false,
    },
  ];

  const handleOptionClick = (option: PracticeOption) => {
    if (option.isAvailable) {
      navigate(option.path);
    }
  };

  return (
    <Box
      id="containerPracticePage"
      sx={{
        minHeight: '100vh',
        bgcolor: isDark ? '#000000' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          id="boxPracticeHeader"
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            ✍️ Practice Arabic
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              maxWidth: '700px',
              mx: 'auto',
              px: 2,
            }}
          >
            Choose a practice mode to enhance your Arabic learning journey
          </Typography>
        </Box>

        {/* Practice Options Grid */}
        <Box
          id="boxPracticeOptionsGrid"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 0 },
          }}
        >
          {practiceOptions.map((option) => (
            <Card
              id={`cardPracticeOption-${option.id}`}
              key={option.id}
              elevation={3}
              sx={{
                bgcolor: isDark ? '#1e1e1e' : '#ffffff',
                border: `2px solid ${isDark ? '#333333' : '#e0e0e0'}`,
                borderRadius: 3,
                opacity: option.isAvailable ? 1 : 0.6,
                cursor: option.isAvailable ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                '&:hover': option.isAvailable
                  ? {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 12px 24px rgba(255,255,255,0.1)'
                        : '0 12px 24px rgba(0,0,0,0.15)',
                      borderColor: isDark ? '#ffffff' : '#000000',
                    }
                  : {},
              }}
            >
              <CardActionArea
                onClick={() => handleOptionClick(option)}
                disabled={!option.isAvailable}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 3, sm: 4 },
                  }}
                >
                  <Box
                    id={`boxPracticeOptionIcon-${option.id}`}
                    sx={{
                      mb: 2,
                      color: option.isAvailable
                        ? isDark
                          ? '#ffffff'
                          : '#000000'
                        : isDark
                        ? 'rgba(255,255,255,0.4)'
                        : 'rgba(0,0,0,0.4)',
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                      lineHeight: 1.6,
                    }}
                  >
                    {option.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Footer Note */}
        <Box
          id="boxPracticeFooter"
          sx={{
            textAlign: 'center',
            mt: { xs: 4, sm: 5, md: 6 },
            px: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              fontStyle: 'italic',
            }}
          >
            More practice modes coming soon!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
