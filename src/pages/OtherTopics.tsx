import { Box, Container, Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConstructionIcon from '@mui/icons-material/Construction';

export function OtherTopics() {
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
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
            }}
          >
            ✏️ Other Topics
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            🎯 Explore additional Arabic learning resources and grammar concepts
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to="/building-blocks"
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
                    <AccountTreeIcon
                      sx={{
                        fontSize: 64,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
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
                    🏗️ Building Blocks
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    📚 Explore foundational Arabic grammar concepts from Medina Book 2,
                    Lesson 1. Interactive blocks showing particles, cases, sentence
                    types, and more! 🎓
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                opacity: 0.7,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <ConstructionIcon
                    sx={{
                      fontSize: 64,
                      color: 'text.secondary',
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
                    color: 'text.secondary',
                  }}
                >
                  🔜 More Coming Soon
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  📝 Grammar rules, 💬 vocabulary builders, 📰 reading exercises, and
                  more resources to enhance your Arabic learning journey. 🚀
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
