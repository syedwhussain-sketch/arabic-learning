import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '../stores/themeStore';
import { useVocabularyStore } from '../stores/vocabularyStore';

export function Navigation() {
  const location = useLocation();
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const resetVocabularyState = useVocabularyStore((state) => state.resetState);

  const handleNavClick = () => {
    // Reset vocabulary store when navigating away from vocabulary practice
    if (location.pathname === '/practice/vocabulary') {
      resetVocabularyState();
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
        color: mode === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <Toolbar>
        <Button
          component={Link}
          to="/"
          onClick={handleNavClick}
          sx={{
            mr: 2,
            color: 'inherit',
          }}
        >
          🏠 Home
        </Button>

        <Box sx={{ display: 'flex', gap: 1, mr: 'auto' }}>
          <Button
            component={Link}
            to="/verbs/table"
            onClick={handleNavClick}
            variant={location.pathname === '/verbs/table' ? 'contained' : 'text'}
            size="small"
            sx={{
              color: location.pathname === '/verbs/table'
                ? mode === 'dark' ? '#000000' : '#ffffff'
                : 'inherit',
              backgroundColor: location.pathname === '/verbs/table'
                ? mode === 'dark' ? '#ffffff' : '#000000'
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/verbs/table'
                  ? mode === 'dark' ? '#e0e0e0' : '#333333'
                  : mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            📚 Verb Categories
          </Button>
          <Button
            component={Link}
            to="/building-blocks"
            onClick={handleNavClick}
            variant={location.pathname === '/building-blocks' ? 'contained' : 'text'}
            size="small"
            sx={{
              color: location.pathname === '/building-blocks'
                ? mode === 'dark' ? '#000000' : '#ffffff'
                : 'inherit',
              backgroundColor: location.pathname === '/building-blocks'
                ? mode === 'dark' ? '#ffffff' : '#000000'
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/building-blocks'
                  ? mode === 'dark' ? '#e0e0e0' : '#333333'
                  : mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            🧱 Building Blocks
          </Button>
          <Button
            component={Link}
            to="/practice"
            onClick={handleNavClick}
            variant={location.pathname.startsWith('/practice') ? 'contained' : 'text'}
            size="small"
            sx={{
              color: location.pathname.startsWith('/practice')
                ? mode === 'dark' ? '#000000' : '#ffffff'
                : 'inherit',
              backgroundColor: location.pathname.startsWith('/practice')
                ? mode === 'dark' ? '#ffffff' : '#000000'
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname.startsWith('/practice')
                  ? mode === 'dark' ? '#e0e0e0' : '#333333'
                  : mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            📝 Practice
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          aria-label="toggle theme"
          onClick={toggleTheme}
          color="inherit"
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
