import { Box } from '@mui/material';
import { VerbTreeCard } from '../components/VerbTreeCard';
import { alsahihData, almudaafData } from '../data';
import { useTheme } from '@mui/material/styles';

export function VerbsTreeView() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 4,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <VerbTreeCard data={alsahihData} isDark={isDark} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <VerbTreeCard data={almudaafData} isDark={isDark} />
      </Box>
    </Box>
  );
}
