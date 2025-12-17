import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useVocabularyStore } from '../../stores/vocabularyStore';

export function ProgressDashboard() {
  const correctCount = useVocabularyStore((state) => state.correctCount);
  const wrongCount = useVocabularyStore((state) => state.wrongCount);
  const cards = useVocabularyStore((state) => state.cards);
  const totalCards = useVocabularyStore((state) => state.totalCards);
  const practiceMode = useVocabularyStore((state) => state.practiceMode);
  const onExitPractice = useVocabularyStore((state) => state.handleExitPractice);
  
  const remaining = cards.length;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Calculate statistics
  const totalAttempts = correctCount + wrongCount;
  const percentageCorrect =
    totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // Bar chart data for correct/incorrect attempts
  const barData = [
    { name: 'Correct', value: correctCount, color: '#4caf50' },
    { name: 'Incorrect', value: wrongCount, color: '#f44336' },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 2.5,
        p: 2,
        backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'center',
        }}
      >
        {/* Bar Chart */}
        <Box sx={{ width: { xs: '100%', md: '33%' }, height: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDark ? '#fff' : '#000', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: isDark ? '#fff' : '#000', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                  border: `1px solid ${isDark ? '#444' : '#ddd'}`,
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Statistics - Compact Layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
              <CardContent
                sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#4caf50', fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  {correctCount}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  Correct
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
              <CardContent
                sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#f44336', fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  {wrongCount}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  Wrong
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
              <CardContent
                sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: isDark ? '#90caf9' : '#1976d2',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                  }}
                >
                  {remaining}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  Remaining
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }}>
              <CardContent
                sx={{ textAlign: 'center', p: 1, '&:last-child': { pb: 1 } }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: isDark ? '#ffa726' : '#f57c00',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                  }}
                >
                  {percentageCorrect}%
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.7rem' }}
                >
                  Accuracy
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Bottom Info Bar */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
          {practiceMode === 'arabic-to-english' ? 'Arabic → English' : 'English → Arabic'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Progress: {correctCount} / {totalCards} completed
        </Typography>
        <Button onClick={onExitPractice} variant="outlined" size="small">
          Exit Practice
        </Button>
      </Box>
    </Paper>
  );
}
