import { Box, Container, Typography, Card, CardContent, CardActionArea, useTheme, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LockIcon from '@mui/icons-material/Lock';

interface BookCardData {
  id: string;
  book: number;
  title: string;
  subtitle: string;
  description: string;
  isAvailable: boolean;
  emoji: string;
  route: string;
}

const books: BookCardData[] = [
  {
    id: 'medina-book-1',
    book: 1,
    title: 'Medina Book 1',
    subtitle: 'Foundation of Arabic',
    description: 'Learn the basics of Arabic grammar and essential vocabulary.',
    isAvailable: false,
    emoji: '📘',
    route: '/building-blocks/medina-book-1',
  },
  {
    id: 'medina-book-2',
    book: 2,
    title: 'Medina Book 2',
    subtitle: 'Building Blocks of Grammar',
    description: 'Explore foundational concepts of Arabic grammar with interactive building blocks.',
    isAvailable: true,
    emoji: '📗',
    route: '/building-blocks/medina-book-2',
  },
  {
    id: 'medina-book-3',
    book: 3,
    title: 'Medina Book 3',
    subtitle: 'Advanced Grammar',
    description: 'Master advanced Arabic grammar concepts and complex sentence structures.',
    isAvailable: false,
    emoji: '📕',
    route: '/building-blocks/medina-book-3',
  },
];

export function BuildingBlocksLanding() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const handleCardClick = (book: BookCardData) => {
    if (book.isAvailable) {
      navigate(book.route);
    }
  };

  return (
    <Box
      id="containerBuildingBlocksLanding"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: isDark ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          id="headerBuildingBlocksLanding"
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
            🏗️ Arabic Building Blocks
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              textAlign: 'center',
              mb: 2,
            }}
          >
            💡 Tip: Click on an available book to explore its interactive building blocks and grammar concepts.
          </Typography>
        </Box>

        {/* Book Cards Grid */}
        <Box
          id="gridBooksContainer"
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
          {books.map((book) => (
            <Card
              key={book.id}
              id={`cardBook-${book.id}`}
              elevation={book.isAvailable ? 4 : 2}
              sx={{
                position: 'relative',
                borderRadius: 2,
                backgroundColor: isDark
                  ? book.isAvailable
                    ? '#1e1e1e'
                    : '#0a0a0a'
                  : book.isAvailable
                  ? '#ffffff'
                  : '#f5f5f5',
                border: `2px solid ${
                  isDark
                    ? book.isAvailable
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(255,255,255,0.05)'
                    : book.isAvailable
                    ? 'rgba(0,0,0,0.15)'
                    : 'rgba(0,0,0,0.05)'
                }`,
                opacity: book.isAvailable ? 1 : 0.6,
                transition: 'all 0.3s ease',
                '&:hover': book.isAvailable
                  ? {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                      borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                    }
                  : {},
              }}
            >
              <CardActionArea
                id={`actionAreaBook-${book.id}`}
                onClick={() => handleCardClick(book)}
                disabled={!book.isAvailable}
                sx={{
                  cursor: book.isAvailable ? 'pointer' : 'not-allowed',
                  height: '100%',
                  minHeight: { xs: '200px', sm: '220px', md: '240px' },
                }}
              >
                <CardContent
                  id={`contentBook-${book.id}`}
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {/* Lock Icon for unavailable books */}
                  {!book.isAvailable && (
                    <Box
                      id={`iconLockBook-${book.id}`}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                      }}
                    >
                      <LockIcon fontSize="small" />
                    </Box>
                  )}

                  {/* Book Emoji */}
                  <Box
                    id={`emojiBook-${book.id}`}
                    sx={{
                      fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' },
                      textAlign: 'center',
                      mb: 1,
                    }}
                  >
                    {book.emoji}
                  </Box>

                  {/* Book Title */}
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.5rem' },
                      textAlign: 'center',
                    }}
                  >
                    {book.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                      textAlign: 'center',
                    }}
                  >
                    {book.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {book.description}
                  </Typography>

                  {/* Status Chip */}
                  <Box
                    id={`chipContainerBook-${book.id}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1,
                      mt: 'auto',
                    }}
                  >
                    <Chip
                      icon={book.isAvailable ? <MenuBookIcon /> : <LockIcon />}
                      label={book.isAvailable ? 'Available' : 'Coming Soon'}
                      size="small"
                      sx={{
                        bgcolor: book.isAvailable
                          ? isDark
                            ? 'rgba(76, 175, 80, 0.2)'
                            : 'rgba(76, 175, 80, 0.1)'
                          : isDark
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.1)',
                        color: book.isAvailable
                          ? '#4caf50'
                          : isDark
                          ? 'rgba(255,255,255,0.5)'
                          : 'rgba(0,0,0,0.5)',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      }}
                    />
                    <Chip
                      label={`Book ${book.book}`}
                      size="small"
                      sx={{
                        bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        color: 'text.secondary',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>


      </Container>
    </Box>
  );
}
