import { Box, Container, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export function OtherTopics() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <ConstructionIcon
            sx={{
              fontSize: 80,
              color: 'text.secondary',
              mb: 3,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Other Topics
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Coming Soon
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            We're working on bringing you more Arabic learning resources including
            grammar rules, vocabulary lists, reading exercises, and interactive
            lessons. Stay tuned!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
