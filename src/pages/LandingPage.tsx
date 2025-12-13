import { Box, Container, Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 6,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(1200px 500px at 20% 0%, #18244a 0%, transparent 55%), radial-gradient(1200px 500px at 80% 0%, #2a1746 0%, transparent 55%), #0b0f19'
            : 'radial-gradient(1200px 500px at 20% 0%, #e3f2fd 0%, transparent 55%), radial-gradient(1200px 500px at 80% 0%, #f3e5f5 0%, transparent 55%), #ffffff',
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
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #3f51b5 0%, #5a67d8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Arabic Learning Hub
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            Master Arabic with Interactive Learning Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Explore comprehensive verb conjugations, grammar patterns, and more
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/verbs/tree"
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <MenuBookIcon
                      sx={{
                        fontSize: 64,
                        color: 'primary.main',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    Arabic Verb Conjugations
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    Interactive conjugation tables for Al-Sahih, Al-Mudā'af, and
                    other verb categories. Explore patterns with examples and full
                    conjugation breakdowns.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/other-topics"
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <MoreHorizIcon
                      sx={{
                        fontSize: 64,
                        color: 'secondary.main',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    Other Topics
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    Coming soon: Grammar rules, vocabulary builders, reading
                    exercises, and more resources to enhance your Arabic learning
                    journey.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
