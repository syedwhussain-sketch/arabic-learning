import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { VerbsTableView } from './pages/VerbsTableView';
import { OtherTopics } from './pages/OtherTopics';
import { BuildingBlocksLanding } from './pages/BuildingBlocksLanding';
import { MedinaBook2 } from './pages/MedinaBook2';
import { Practice } from './pages/Practice';
import { Vocabulary } from './pages/Vocabulary';
import { useMemo, useState, useEffect } from 'react';

function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    try {
      const saved = window.localStorage.getItem('theme-mode');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem('theme-mode', mode);
    } catch {}
  }, [mode]);
  return { mode, setMode } as const;
}

function makeTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#000000' : '#ffffff' },
      secondary: { main: mode === 'light' ? '#000000' : '#ffffff' },
      background: {
        default: mode === 'light' ? '#ffffff' : '#000000',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: [
        'Verdana',
        'Amiri',
        'Traditional Arabic',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ].join(','),
    },
  });
}

function App() {
  const { mode, setMode } = useThemeMode();
  const theme = useMemo(() => makeTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Navigation mode={mode} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verbs/table" element={<VerbsTableView />} />
          <Route path="/other-topics" element={<OtherTopics />} />
          <Route path="/building-blocks" element={<BuildingBlocksLanding />} />
          <Route path="/building-blocks/medina-book-2" element={<MedinaBook2 />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/vocabulary" element={<Vocabulary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
