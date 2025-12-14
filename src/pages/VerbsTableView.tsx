import { Container, Box, Typography, Divider } from '@mui/material';
import { VerbCard } from '../components/VerbCard';
import { alsahihData, almudaafData, mahmoozData, amutalData } from '../data';

export function VerbsTableView() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        pb: 6,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box
          id="boxVerbCategoriesHeader"
          sx={{
            textAlign: 'center',
            mb: 4,
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
            📚 Arabic Verb Categories
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              px: 2,
            }}
          >
            Explore the different categories of Arabic verbs and their conjugation patterns
          </Typography>
        </Box>

        {/* Al-Sahih Verb Card */}
        <Box sx={{ mt: 4 }}>
          <VerbCard data={alsahihData} />
        </Box>

        {/* Al-Mudā'af Verb Card */}
        <Box sx={{ mt: -4 }}>
          <VerbCard data={almudaafData} />
        </Box>

        {/* Al-Mahmūz Verb Card */}
        <Box sx={{ mt: -4 }}>
          <VerbCard data={mahmoozData} />
        </Box>

        {/* Al-Mu'tall Verb Card */}
        <Box sx={{ mt: -4 }}>
          <VerbCard data={amutalData} />
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Footer Info */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Click on any verb pattern to see its full conjugation table
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
