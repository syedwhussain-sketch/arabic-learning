import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PracticeMode } from '../../types/vocabulary.types';

interface ProgressDashboardProps {
  correctCount: number;
  wrongCount: number;
  remaining: number;
  totalCards: number;
  practiceMode: PracticeMode;
  onExitPractice: () => void;
}

export function ProgressDashboard({
  correctCount,
  wrongCount,
  remaining,
  totalCards,
  practiceMode,
  onExitPractice,
}: ProgressDashboardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Calculate statistics
  const totalAttempts = correctCount + wrongCount;
  const percentageCorrect =
    totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // Pie chart data
  const pieData = [
    { name: 'Correct', value: correctCount, color: '#4caf50' },
    { name: 'Wrong', value: wrongCount, color: '#f44336' },
    { name: 'Remaining', value: remaining, color: isDark ? '#424242' : '#e0e0e0' },
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
        {/* Pie Chart */}
        <Box sx={{ width: { xs: '100%', md: '33%' }, height: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={54}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                  border: `1px solid ${isDark ? '#444' : '#ddd'}`,
                  borderRadius: 8,
                }}
              />
            </PieChart>
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
