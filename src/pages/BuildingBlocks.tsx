import { useState } from 'react';
import { Box, Container, Typography, Paper, useTheme, Chip } from '@mui/material';
import { floors, getBlockById, type BuildingBlock } from '../data/buildingBlocks';
import { BuildingBlockModal } from '../components/BuildingBlockModal';
import { renderStyledArabicText } from '../utils/arabicTextUtils';

export function BuildingBlocks() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedBlock, setSelectedBlock] = useState<BuildingBlock | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBlockClick = (blockId: string) => {
    const block = getBlockById(blockId);
    if (block) {
      setSelectedBlock(block);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Color palette for different block types
  const getBlockColor = (kind: string) => {
    const colors = {
      Case: { light: '#FFE5E5', dark: '#4A1F1F' },
      Mark: { light: '#FFF4E5', dark: '#4A3A1F' },
      Sentence: { light: '#E5F4FF', dark: '#1F2F4A' },
      Term: { light: '#F0E5FF', dark: '#2F1F4A' },
      Particle: { light: '#E5FFE5', dark: '#1F4A1F' },
      Word: { light: '#FFE5F4', dark: '#4A1F3A' },
      Number: { light: '#FFFFE5', dark: '#4A4A1F' },
    };
    const colorPair = colors[kind as keyof typeof colors] || { light: '#E5E5E5', dark: '#2A2A2A' };
    return isDark ? colorPair.dark : colorPair.light;
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        backgroundColor: isDark ? '#000000' : '#ffffff',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
            }}
          >
            🏗️ Arabic Building Blocks
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >

          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Explore the foundational concepts of Arabic grammar. Each block represents a key
            concept — click on any block to learn more! 🎯
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: '1000px',
            mx: 'auto',
          }}
        >
          {floors.map((floor) => {
            const blocks = floor.blockIds.map(getBlockById).filter(Boolean) as BuildingBlock[];

            return (
              <Box
                key={floor.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 3,
                }}
              >
                {blocks.map((block) => (
                  <Paper
                    key={block.id}
                    elevation={3}
                    onClick={() => handleBlockClick(block.id)}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      backgroundColor: getBlockColor(block.kind),
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: 8,
                        borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '2.5rem',
                          fontWeight: 'bold',
                          color: isDark ? '#ffffff' : '#000000',
                          textAlign: 'center',
                          direction: 'rtl',
                          fontFamily: 'Amiri, Traditional Arabic, serif',
                        }}
                      >
                        {block.title}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: isDark ? '#cccccc' : '#333333',
                          fontStyle: 'italic',
                          fontSize: '1rem',
                        }}
                      >
                        {block.transliteration}
                      </Typography>
                      <Chip
                        label={block.kind}
                        size="small"
                        sx={{
                          fontSize: '0.8rem',
                          height: '24px',
                          bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                          color: isDark ? '#ffffff' : '#000000',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 3,
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderRadius: 3,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
            }}
          >
            📖 How to Use This Page
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              lineHeight: 1.8,
            }}
          >
            This building represents the structure of Arabic grammar concepts from Medina Book 2,
            Lesson 1. The <strong>foundation</strong> blocks at the bottom represent the most basic
            concepts (cases and marks), while higher levels build upon these foundations. Click any
            block to see detailed explanations and examples! 🎓
          </Typography>
        </Box>
      </Container>

      <BuildingBlockModal
        open={modalOpen}
        onClose={handleCloseModal}
        block={selectedBlock}
      />
    </Box>
  );
}
