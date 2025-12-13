import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Divider,
  Paper,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ConjugationData } from '../types/tree.types';

interface ConjugationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  conjugations: ConjugationData | null;
}

export const ConjugationModal = ({
  open,
  onClose,
  title,
  conjugations,
}: ConjugationModalProps) => {
  if (!conjugations) return null;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const conjugationFields = [
    { label: 'Past Tense', labelAr: 'الماضي', value: conjugations.past },
    { label: 'Present Tense', labelAr: 'المضارع', value: conjugations.present },
    {
      label: 'Negation (Past)',
      labelAr: 'المنفي بلم',
      value: conjugations.negationPast,
    },
    {
      label: 'Negation (Future)',
      labelAr: 'المنفي بلن',
      value: conjugations.negationFuture,
    },
  ];

  if (conjugations.imperative) {
    conjugationFields.push({
      label: 'Imperative',
      labelAr: 'الأمر',
      value: conjugations.imperative,
    });
  }

  if (conjugations.participle) {
    conjugationFields.push({
      label: 'Active Participle',
      labelAr: 'اسم الفاعل',
      value: conjugations.participle,
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      dir="rtl"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {conjugationFields.map((field, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2.5,
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 2,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    minWidth: '120px',
                  }}
                >
                  {field.labelAr} ({field.label})
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  {field.value}
                </Typography>
              </Box>
            </Paper>
          ))}

          {conjugations.examples && (
            <>
              <Divider sx={{ my: 2 }} />
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  borderRadius: 2,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}
                >
                  أمثلة (Examples)
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {conjugations.examples.lam_male && (
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      <strong>لَمْ + مذكر مفرد:</strong>{' '}
                      {conjugations.examples.lam_male}
                    </Typography>
                  )}
                  {conjugations.examples.lam_female && (
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      <strong>لَمْ + مؤنث مفرد:</strong>{' '}
                      {conjugations.examples.lam_female}
                    </Typography>
                  )}
                  {conjugations.examples.lan_male && (
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      <strong>لَنْ + مذكر جمع:</strong>{' '}
                      {conjugations.examples.lan_male}
                    </Typography>
                  )}
                  {conjugations.examples.lan_female && (
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      <strong>لَنْ + مؤنث جمع:</strong>{' '}
                      {conjugations.examples.lan_female}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
