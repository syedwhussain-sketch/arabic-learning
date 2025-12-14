import { Dialog, DialogTitle, DialogContent, IconButton, Box, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { renderStyledArabicText } from '../utils/arabicTextUtils';

interface MarkdownModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: string;
}

export function MarkdownModal({ open, onClose, title, content }: MarkdownModalProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Helper function to process text nodes with Arabic styling
  const processText = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return renderStyledArabicText(children, '1.5em', isDark ? 'dark' : 'light');
    }
    return children;
  };

  // Custom components for rendering markdown elements with beautiful styling
  const components: Components = {
    h1: ({ children }) => (
      <Box sx={{ fontSize: '2rem', fontWeight: 'bold', mb: 2, mt: 3, color: 'text.primary' }}>
        {processText(children)}
      </Box>
    ),
    h2: ({ children }) => (
      <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2, mt: 3, color: 'text.primary' }}>
        {processText(children)}
      </Box>
    ),
    h3: ({ children }) => (
      <Box sx={{ fontSize: '1.25rem', fontWeight: 'bold', mb: 1.5, mt: 2, color: 'text.primary' }}>
        {processText(children)}
      </Box>
    ),
    p: ({ children }) => (
      <Box sx={{ mb: 2, lineHeight: 1.8, color: 'text.primary' }}>
        {processText(children)}
      </Box>
    ),
    ul: ({ children }) => (
      <Box component="ul" sx={{ mb: 2, pl: 3, color: 'text.primary' }}>
        {children}
      </Box>
    ),
    ol: ({ children }) => (
      <Box component="ol" sx={{ mb: 2, pl: 3, color: 'text.primary' }}>
        {children}
      </Box>
    ),
    li: ({ children }) => (
      <Box component="li" sx={{ mb: 0.5, lineHeight: 1.6 }}>
        {processText(children)}
      </Box>
    ),
    table: ({ children }) => (
      <Box sx={{ overflowX: 'auto', mb: 3 }}>
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
            borderRadius: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    ),
    thead: ({ children }) => (
      <Box
        component="thead"
        sx={{
          bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        {children}
      </Box>
    ),
    tbody: ({ children }) => (
      <Box component="tbody">
        {children}
      </Box>
    ),
    tr: ({ children }) => (
      <Box
        component="tr"
        sx={{
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
          '&:last-child': {
            borderBottom: 'none',
          },
        }}
      >
        {children}
      </Box>
    ),
    th: ({ children }) => (
      <Box
        component="th"
        sx={{
          p: 1.5,
          textAlign: 'left',
          fontWeight: 'bold',
          color: 'text.primary',
        }}
      >
        {processText(children)}
      </Box>
    ),
    td: ({ children }) => (
      <Box
        component="td"
        sx={{
          p: 1.5,
          textAlign: 'left',
          color: 'text.primary',
        }}
      >
        {processText(children)}
      </Box>
    ),
    code: ({ inline, children }: any) => (
      <Box
        component={inline ? 'code' : 'pre'}
        sx={{
          bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          p: inline ? 0.5 : 2,
          px: inline ? 1 : 2,
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.9em',
          display: inline ? 'inline' : 'block',
          mb: inline ? 0 : 2,
          overflowX: 'auto',
          color: 'text.primary',
        }}
      >
        {processText(children)}
      </Box>
    ),
    blockquote: ({ children }) => (
      <Box
        sx={{
          borderLeft: `4px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
          pl: 2,
          py: 1,
          mb: 2,
          fontStyle: 'italic',
          color: 'text.secondary',
        }}
      >
        {children}
      </Box>
    ),
    hr: () => (
      <Box
        component="hr"
        sx={{
          border: 'none',
          borderTop: `2px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
          my: 3,
        }}
      />
    ),
    strong: ({ children }) => (
      <Box component="strong" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        {processText(children)}
      </Box>
    ),
    em: ({ children }) => (
      <Box component="em" sx={{ fontStyle: 'italic' }}>
        {processText(children)}
      </Box>
    ),
  };

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
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
            pb: 2,
          }}
        >
          <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</Box>
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
      )}
      <DialogContent
        sx={{
          pt: 3,
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 2,
          },
        }}
      >
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
}
