import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';

interface NavigationProps {
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navigation({ mode, onToggleTheme }: NavigationProps) {
  const location = useLocation();

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
          startIcon={<HomeIcon />}
          sx={{
            mr: 2,
            color: 'inherit',
          }}
        >
          Home
        </Button>

        <Box sx={{ display: 'flex', gap: 1, mr: 'auto' }}>
          <Button
            component={Link}
            to="/verbs/table"
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
            to="/vocabulary"
            variant={location.pathname === '/vocabulary' ? 'contained' : 'text'}
            size="small"
            sx={{
              color: location.pathname === '/vocabulary'
                ? mode === 'dark' ? '#000000' : '#ffffff'
                : 'inherit',
              backgroundColor: location.pathname === '/vocabulary'
                ? mode === 'dark' ? '#ffffff' : '#000000'
                : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === '/vocabulary'
                  ? mode === 'dark' ? '#e0e0e0' : '#333333'
                  : mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            🎴 Vocabulary
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          aria-label="toggle theme"
          onClick={onToggleTheme}
          color="inherit"
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
