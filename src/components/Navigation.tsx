import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewListIcon from '@mui/icons-material/ViewList';

interface NavigationProps {
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navigation({ mode, onToggleTheme }: NavigationProps) {
  const location = useLocation();

  const isVerbPage = location.pathname.includes('/verbs');

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar>
        <Button
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ mr: 2 }}
        >
          Home
        </Button>

        {isVerbPage && (
          <Box sx={{ display: 'flex', gap: 1, mr: 'auto' }}>
            <Button
              component={Link}
              to="/verbs/tree"
              variant={location.pathname === '/verbs/tree' ? 'contained' : 'text'}
              startIcon={<AccountTreeIcon />}
              size="small"
            >
              Tree View
            </Button>
            <Button
              component={Link}
              to="/verbs/table"
              variant={location.pathname === '/verbs/table' ? 'contained' : 'text'}
              startIcon={<ViewListIcon />}
              size="small"
            >
              Table View
            </Button>
          </Box>
        )}

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
