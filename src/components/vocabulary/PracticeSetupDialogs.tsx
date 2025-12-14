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
  Card,
  CardContent,
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
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: { xs: 1, sm: 2 },
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{ 
            textAlign: 'center', 
            fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
            fontWeight: 'bold', 
            pb: 0.5,
            pt: { xs: 1.5, sm: 2 },
          }}
        >
          📚 Choose Practice Set
        </DialogTitle>
        <DialogContent sx={{ pt: { xs: 1.5, sm: 2 }, pb: { xs: 1, sm: 2 } }}>
          <Typography
            variant="body2"
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 2, sm: 2.5 }, 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.95rem' },
            }}
          >
            How many words would you like to practice?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            {/* Random 50 Words Card */}
            <Card
              onClick={() => onSizeSelect('random50')}
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(219, 234, 254, 0.5)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(96, 165, 250, 0.3)' 
                    : '0 4px 12px rgba(59, 130, 246, 0.25)',
                  border: `2px solid ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`,
                  backgroundColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(219, 234, 254, 0.8)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                  <Typography sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>🎲</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        mb: 0.5,
                      }}
                    >
                      Practice with Random 50 Words
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Perfect for a quick practice session
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Custom Count Card */}
            <Card
              sx={{
                borderRadius: 3,
                border: `2px solid ${isDark ? 'rgba(251, 146, 60, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                backgroundColor: isDark ? 'rgba(251, 146, 60, 0.1)' : 'rgba(254, 243, 199, 0.5)',
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                    <Typography sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>🎯</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: { xs: '1rem', sm: '1.125rem' },
                          mb: 0.5,
                        }}
                      >
                        Practice with Custom Amount
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        How many words do you want to practice with?
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', pl: { xs: 0, sm: 5 } }}>
                    <TextField
                      type="number"
                      value={customCount}
                      onChange={(e) => onCustomCountChange(e.target.value)}
                      placeholder="10"
                      variant="outlined"
                      size="small"
                      sx={{
                        flex: 1,
                        maxWidth: { xs: '100px', sm: '120px' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          fontWeight: 'bold',
                        },
                      }}
                      inputProps={{ min: 1, max: vocabularyItems.length }}
                    />
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => onSizeSelect('custom')}
                      sx={{
                        py: { xs: 1, sm: 1.25 },
                        px: { xs: 2.5, sm: 3 },
                        borderRadius: 2,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 'bold',
                        minWidth: 'auto',
                        backgroundColor: isDark ? '#ffffff' : '#000000',
                        color: isDark ? '#000000' : '#ffffff',
                        '&:hover': {
                          backgroundColor: isDark ? '#e0e0e0' : '#333333',
                        },
                      }}
                    >
                      ▶️ Start
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Practice All Words Card */}
            <Card
              onClick={() => onSizeSelect('all')}
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                backgroundColor: isDark ? 'rgba(52, 211, 153, 0.1)' : 'rgba(209, 250, 229, 0.5)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(52, 211, 153, 0.3)' 
                    : '0 4px 12px rgba(16, 185, 129, 0.25)',
                  border: `2px solid ${isDark ? 'rgba(52, 211, 153, 0.5)' : 'rgba(16, 185, 129, 0.5)'}`,
                  backgroundColor: isDark ? 'rgba(52, 211, 153, 0.15)' : 'rgba(209, 250, 229, 0.8)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                  <Typography sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>🌟</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        mb: 0.5,
                      }}
                    >
                      Practice with All the Words
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Challenge yourself with all {vocabularyItems.length} words
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 1.5, sm: 2 }, pt: { xs: 1, sm: 1.5 } }}>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            onClick={onCancelSizeSelection}
            sx={{
              py: { xs: 1, sm: 1.25 },
              borderRadius: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#ffffff' : '#000000',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            ❌ Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Practice Mode Selection Dialog */}
      <Dialog
        open={modeDialogOpen}
        onClose={onCancelModeSelection}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: { xs: 1, sm: 2 },
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{ 
            textAlign: 'center', 
            fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
            fontWeight: 'bold', 
            pb: 0.5,
            pt: { xs: 1.5, sm: 2 },
          }}
        >
          🎨 Choose Practice Mode
        </DialogTitle>
        <DialogContent sx={{ pt: { xs: 1.5, sm: 2 }, pb: { xs: 1, sm: 2 } }}>
          <Typography
            variant="body2"
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 2, sm: 2.5 }, 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '0.95rem' },
            }}
          >
            How would you like to practice?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            {/* Arabic to English Card */}
            <Card
              onClick={() => onModeSelect('arabic-to-english')}
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(219, 234, 254, 0.5)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(96, 165, 250, 0.3)' 
                    : '0 4px 12px rgba(59, 130, 246, 0.25)',
                  border: `2px solid ${isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)'}`,
                  backgroundColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(219, 234, 254, 0.8)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                  <Typography sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>🔤</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        mb: 0.5,
                      }}
                    >
                      Arabic → English
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      See Arabic words and guess their English meanings
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>→</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* English to Arabic Card */}
            <Card
              onClick={() => onModeSelect('english-to-arabic')}
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `2px solid ${isDark ? 'rgba(167, 139, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
                backgroundColor: isDark ? 'rgba(167, 139, 250, 0.1)' : 'rgba(237, 233, 254, 0.5)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 4px 12px rgba(167, 139, 250, 0.3)' 
                    : '0 4px 12px rgba(139, 92, 246, 0.25)',
                  border: `2px solid ${isDark ? 'rgba(167, 139, 250, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`,
                  backgroundColor: isDark ? 'rgba(167, 139, 250, 0.15)' : 'rgba(237, 233, 254, 0.8)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                  <Typography sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>📝</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        mb: 0.5,
                      }}
                    >
                      English → Arabic
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      See English words and guess their Arabic translations
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>→</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 1.5, sm: 2 }, pt: { xs: 1, sm: 1.5 } }}>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            onClick={onCancelModeSelection}
            sx={{
              py: { xs: 1, sm: 1.25 },
              borderRadius: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              color: isDark ? '#ffffff' : '#000000',
              '&:hover': {
                borderColor: isDark ? '#ffffff' : '#000000',
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            ❌ Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
