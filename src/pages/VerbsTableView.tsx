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
