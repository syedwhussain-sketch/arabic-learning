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
  Chip,
} from '@mui/material';
import { vocabularyItems, getVocabularyCount } from '../../data/vocabulary';
import { useVocabularyStore } from '../../stores/vocabularyStore';

export function PracticeSetupDialogs() {
  const sizeDialogOpen = useVocabularyStore((state) => state.sizeDialogOpen);
  const customCount = useVocabularyStore((state) => state.customCount);
  const selectedSource = useVocabularyStore((state) => state.selectedSource);
  const practiceMode = useVocabularyStore((state) => state.practiceMode);
  const setCustomCount = useVocabularyStore((state) => state.setCustomCount);
  const setPracticeMode = useVocabularyStore((state) => state.setPracticeMode);
  const handleSizeSelect = useVocabularyStore((state) => state.handleSizeSelect);
  const handleCancelSizeSelection = useVocabularyStore((state) => state.handleCancelSizeSelection);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Get source-specific vocabulary count
  const sourceVocabCount = selectedSource ? getVocabularyCount(selectedSource) : vocabularyItems.length;

  // Get source display name with emoji
  const getSourceDisplay = () => {
    if (!selectedSource) return '';
    const sourceMap = {
      'medinabook1': { name: 'Medina Book 1', emoji: '📗' },
      'medinabook2': { name: 'Medina Book 2', emoji: '📘' },
      'medinabook3': { name: 'Medina Book 3', emoji: '📙' },
      'other': { name: 'Ten Lessons Of Arabic', emoji: '📕' },
    };
    const source = sourceMap[selectedSource];
    return `${source.emoji} ${source.name}`;
  };

  return (
    <>
      {/* Practice Size Selection Dialog */}
      <Dialog
        open={sizeDialogOpen}
        onClose={handleCancelSizeSelection}
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
          {selectedSource && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Chip
                label={getSourceDisplay()}
                sx={{
                  backgroundColor: isDark ? '#ffffff' : '#000000',
                  color: isDark ? '#000000' : '#ffffff',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  px: 1,
                }}
              />
            </Box>
          )}
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

          {/* Practice Mode Selection */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5, 
            justifyContent: 'center',
            mb: { xs: 2, sm: 2.5 },
          }}>
            <Chip
              label="🔤 Arabic → English"
              onClick={() => setPracticeMode('arabic-to-english')}
              sx={{
                px: 2,
                py: 2.5,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: practiceMode === 'arabic-to-english'
                  ? (isDark ? '#ffffff' : '#000000')
                  : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                color: practiceMode === 'arabic-to-english'
                  ? (isDark ? '#000000' : '#ffffff')
                  : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                border: practiceMode === 'arabic-to-english'
                  ? `2px solid ${isDark ? '#ffffff' : '#000000'}`
                  : `2px solid transparent`,
                '&:hover': {
                  backgroundColor: practiceMode === 'arabic-to-english'
                    ? (isDark ? '#e0e0e0' : '#333333')
                    : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'),
                  transform: 'scale(1.05)',
                },
              }}
            />
            <Chip
              label="📝 English → Arabic"
              onClick={() => setPracticeMode('english-to-arabic')}
              sx={{
                px: 2,
                py: 2.5,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: practiceMode === 'english-to-arabic'
                  ? (isDark ? '#ffffff' : '#000000')
                  : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                color: practiceMode === 'english-to-arabic'
                  ? (isDark ? '#000000' : '#ffffff')
                  : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                border: practiceMode === 'english-to-arabic'
                  ? `2px solid ${isDark ? '#ffffff' : '#000000'}`
                  : `2px solid transparent`,
                '&:hover': {
                  backgroundColor: practiceMode === 'english-to-arabic'
                    ? (isDark ? '#e0e0e0' : '#333333')
                    : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'),
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            {/* Random 50 Words Card */}
            <Card
              onClick={() => handleSizeSelect('random50')}
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
                      onChange={(e) => setCustomCount(e.target.value)}
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
                      inputProps={{ min: 1, max: sourceVocabCount }}
                    />
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => handleSizeSelect('custom')}
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
              onClick={() => handleSizeSelect('all')}
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
                      Challenge yourself with all {sourceVocabCount} words
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
            onClick={handleCancelSizeSelection}
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
