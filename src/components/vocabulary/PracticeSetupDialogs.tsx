import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  useTheme,
} from '@mui/material';
import type { PracticeMode, PracticeSize } from '../../types/vocabulary.types';
import { vocabularyItems } from '../../data/vocabularyData';

interface PracticeSetupDialogsProps {
  sizeDialogOpen: boolean;
  modeDialogOpen: boolean;
  customCount: string;
  onCustomCountChange: (value: string) => void;
  onSizeSelect: (size: PracticeSize) => void;
  onModeSelect: (mode: PracticeMode) => void;
  onCancelSizeSelection: () => void;
  onCancelModeSelection: () => void;
}

export function PracticeSetupDialogs({
  sizeDialogOpen,
  modeDialogOpen,
  customCount,
  onCustomCountChange,
  onSizeSelect,
  onModeSelect,
  onCancelSizeSelection,
  onCancelModeSelection,
}: PracticeSetupDialogsProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      {/* Practice Size Selection Dialog */}
      <Dialog
        open={sizeDialogOpen}
        onClose={onCancelSizeSelection}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Choose Practice Set
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}
          >
            How many words would you like to practice?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onSizeSelect('random50')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            Random 50 Words
          </Button>
          <Box sx={{ width: '100%', display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type="number"
              value={customCount}
              onChange={(e) => onCustomCountChange(e.target.value)}
              label="Number of words"
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
              inputProps={{ min: 1, max: vocabularyItems.length }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => onSizeSelect('custom')}
              sx={{
                py: 1.5,
                px: 3,
                fontSize: '1.1rem',
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',
                '&:hover': {
                  backgroundColor: isDark ? '#e0e0e0' : '#333333',
                },
              }}
            >
              Practice
            </Button>
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onSizeSelect('all')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            Practice All Words ({vocabularyItems.length})
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onCancelSizeSelection}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              borderColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#e0e0e0' : '#333333',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Practice Mode Selection Dialog */}
      <Dialog
        open={modeDialogOpen}
        onClose={onCancelModeSelection}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Choose Practice Mode
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}
          >
            How would you like to practice?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onModeSelect('arabic-to-english')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            Arabic → English
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onModeSelect('english-to-arabic')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#000000' : '#ffffff',
              '&:hover': {
                backgroundColor: isDark ? '#e0e0e0' : '#333333',
              },
            }}
          >
            English → Arabic
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onCancelModeSelection}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              borderColor: isDark ? '#ffffff' : '#000000',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#e0e0e0' : '#333333',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
