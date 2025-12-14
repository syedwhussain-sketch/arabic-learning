import { Dialog, DialogTitle, DialogContent, IconButton, Box, useTheme, Typography, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { BuildingBlock } from '../data/buildingBlocks';
import { renderStyledArabicText } from '../utils/arabicTextUtils';

interface BuildingBlockModalProps {
  open: boolean;
  onClose: () => void;
  block: BuildingBlock | null;
}

export function BuildingBlockModal({ open, onClose, block }: BuildingBlockModalProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!block) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: isDark ? '#1a1a1a' : '#ffffff',
          color: 'text.primary',
          borderRadius: 3,
          maxHeight: '90vh',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: isDark
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(255, 255, 255, 0.7)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {renderStyledArabicText(block.title, '2rem', isDark ? 'dark' : 'light')}
          </Box>
          <Chip
            label={block.kind}
            size="small"
            sx={{
              bgcolor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
              color: 'text.primary',
              fontWeight: 'bold',
            }}
          />
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              mb: 2,
            }}
          >
            {block.transliteration}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {block.short}
          </Typography>
        </Box>

        {block.details && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderRadius: 2,
              borderLeft: `4px solid ${isDark ? '#ffffff' : '#000000'}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                lineHeight: 1.8,
              }}
            >
              {block.details.split('**').map((part, index) =>
                index % 2 === 1 ? (
                  <Box key={index} component="strong" sx={{ fontWeight: 'bold' }}>
                    {renderStyledArabicText(part, '1.2em', isDark ? 'dark' : 'light')}
                  </Box>
                ) : (
                  renderStyledArabicText(part, '1em', isDark ? 'dark' : 'light')
                )
              )}
            </Typography>
          </Box>
        )}

        {block.examples && block.examples.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              💡 Examples
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {block.examples.map((example, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.primary',
                      mb: 1,
                      textAlign: 'right',
                      direction: 'rtl',
                    }}
                  >
                    {renderStyledArabicText(example.ar, '1.5em', isDark ? 'dark' : 'light')}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                    }}
                  >
                    {example.en}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
