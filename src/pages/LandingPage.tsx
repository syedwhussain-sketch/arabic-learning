import { Box, Container, Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { APP_VERSION } from '../constants/constants';

export function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 6,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            }}
          >
            📚 Arabic Learning Hub ✨
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            🎯 Master Arabic with Interactive Learning Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            🔍 Explore comprehensive verb conjugations, grammar patterns, and more
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/verbs/table"
                sx={{ height: '100%', p: { xs: 2, sm: 3 } }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: { xs: 48, sm: 56 },
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    📚
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1.5,
                      textAlign: 'center',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Verb Categories
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    }}
                  >
                    Interactive conjugation tables for Al-Sahih, Al-Mudā'af, Al-Mahmūz, and Al-Mu'tall
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/building-blocks"
                sx={{ height: '100%', p: { xs: 2, sm: 3 } }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: { xs: 48, sm: 56 },
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    🧱
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1.5,
                      textAlign: 'center',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Building Blocks
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    }}
                  >
                    Learn fundamental grammar concepts and sentence structures
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/practice"
                sx={{ height: '100%', p: { xs: 2, sm: 3 } }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: { xs: 48, sm: 56 },
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    📝
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1.5,
                      textAlign: 'center',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Practice
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    }}
                  >
                    Test your knowledge with interactive vocabulary exercises
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/other-topics"
                sx={{ height: '100%', p: { xs: 2, sm: 3 } }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: { xs: 48, sm: 56 },
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    📋
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1.5,
                      textAlign: 'center',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Other Topics
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.875rem' },
                    }}
                  >
                    Coming soon: Grammar rules, reading exercises, and more
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            Version {APP_VERSION}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
