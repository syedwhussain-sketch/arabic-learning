import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, useTheme, Chip, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { floors, getBlockById, type BuildingBlock } from '../data/buildingBlocks';
import { BuildingBlockModal } from '../components/BuildingBlockModal';

const STORAGE_KEY = 'building-blocks-done';

export function BuildingBlocks() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedBlock, setSelectedBlock] = useState<BuildingBlock | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [doneBlocks, setDoneBlocks] = useState<Set<string>>(new Set());

  // Load done blocks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDoneBlocks(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Failed to load done blocks:', error);
    }
  }, []);

  // Save done blocks to localStorage whenever it changes
  const saveDoneBlocks = (blocks: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(blocks)));
    } catch (error) {
      console.error('Failed to save done blocks:', error);
    }
  };

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

  const toggleDone = (blockId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening modal when clicking done button
    const newDoneBlocks = new Set(doneBlocks);
    if (newDoneBlocks.has(blockId)) {
      newDoneBlocks.delete(blockId);
    } else {
      newDoneBlocks.add(blockId);
    }
    setDoneBlocks(newDoneBlocks);
    saveDoneBlocks(newDoneBlocks);
  };

  const isDone = (blockId: string) => doneBlocks.has(blockId);

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
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            🏗️ Arabic Building Blocks
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            }}
          >

          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              px: { xs: 2, sm: 0 },
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
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: { xs: 2, sm: 2.5, md: 3 },
                }}
              >
                {blocks.map((block) => (
                  <Paper
                    key={block.id}
                    elevation={3}
                    onClick={() => handleBlockClick(block.id)}
                    sx={{
                      p: { xs: 2, sm: 2.5, md: 3 },
                      cursor: 'pointer',
                      backgroundColor: getBlockColor(block.kind),
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      opacity: isDone(block.id) ? 0.5 : 1,
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: 8,
                        borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <IconButton
                      onClick={(e) => toggleDone(block.id, e)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: isDone(block.id) ? '#4caf50' : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#4caf50',
                          transform: 'scale(1.1)',
                        },
                      }}
                      size="small"
                    >
                      {isDone(block.id) ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" />
                      )}
                    </IconButton>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      {block.emoji && (
                        <Box
                          sx={{
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                            position: 'absolute',
                            top: { xs: 8, sm: 12, md: 16 },
                            left: { xs: 8, sm: 12, md: 16 },
                            opacity: 0.7,
                          }}
                        >
                          {block.emoji}
                        </Box>
                      )}
                      <Box
                        sx={{
                          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
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
                          fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                        }}
                      >
                        {block.transliteration}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
                        <Chip
                          label={`B${floor.book}L${floor.lesson}`}
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
                    </Box>
                  </Paper>
                ))}
              </Box>
            );
          })}
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
