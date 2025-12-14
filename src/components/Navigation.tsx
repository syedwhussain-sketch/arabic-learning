import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '../stores/themeStore';
import { Breadcrumbs } from './Breadcrumbs';

export function Navigation() {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: mode === 'dark' ? '#000000' : '#ffffff',
        color: mode === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs />
        </Box>

        <IconButton
          aria-label="toggle theme"
          onClick={toggleTheme}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
