import { Breadcrumbs as MuiBreadcrumbs, Typography, Link as MuiLink, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useVocabularyStore } from '../stores/vocabularyStore';
import HomeIcon from '@mui/icons-material/Home';
import type { VocabularyDataSource } from '../data/vocabularyData';

interface BreadcrumbRoute {
  path?: string; // Optional now, for dynamic non-route breadcrumbs
  label: string;
  icon?: React.ReactNode;
}

// Map vocabulary source IDs to display names
const vocabularySourceLabels: Record<VocabularyDataSource, string> = {
  medinabook1: 'Medina Book 1',
  medinabook2: 'Medina Book 2',
  medinabook3: 'Medina Book 3',
  other: 'Other Sources',
};

// Define route mappings for breadcrumbs
const routeMap: Record<string, BreadcrumbRoute[]> = {
  '/': [{ path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> }],
  '/verbs/table': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/verbs/table', label: 'Verb Categories' },
  ],
  '/building-blocks': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/building-blocks', label: 'Building Blocks' },
  ],
  '/building-blocks/medina-book-2': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/building-blocks', label: 'Building Blocks' },
    { path: '/building-blocks/medina-book-2', label: 'Medina Book 2' },
  ],
  '/practice': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/practice', label: 'Practice' },
  ],
  '/practice/vocabulary': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/practice', label: 'Practice' },
    { path: '/practice/vocabulary', label: 'Vocabulary Practice' },
  ],
  '/other-topics': [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
    { path: '/other-topics', label: 'Other Topics' },
  ],
};

export function Breadcrumbs() {
  const location = useLocation();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === 'dark';
  
  // Get vocabulary store state
  const selectedSource = useVocabularyStore((state) => state.selectedSource);
  const isPracticing = useVocabularyStore((state) => state.isPracticing);
  const resetVocabularyState = useVocabularyStore((state) => state.resetState);

  // Get breadcrumb items for current path
  let breadcrumbs = routeMap[location.pathname] || [
    { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: 16 }} /> },
  ];

  // Add dynamic breadcrumbs based on context
  if (location.pathname === '/practice/vocabulary' && isPracticing && selectedSource) {
    // Add the vocabulary source as a dynamic breadcrumb (no path = not clickable)
    breadcrumbs = [
      ...breadcrumbs,
      { label: vocabularySourceLabels[selectedSource] },
    ];
  }

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Box
      id="breadcrumbs-container"
      sx={{
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
        borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
        px: { xs: 2, sm: 3 },
        py: 1,
      }}
    >
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          '& .MuiBreadcrumbs-separator': {
            color: isDark ? '#666' : '#999',
          },
        }}
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const hasPath = crumb.path !== undefined;

          if (isLast || !hasPath) {
            // Last item or dynamic non-route item (no path)
            return (
              <Typography
                key={crumb.path || `dynamic-${index}`}
                id={`breadcrumb-current-${index}`}
                sx={{
                  color: isDark ? '#fff' : '#000',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {crumb.icon}
                {crumb.label}
              </Typography>
            );
          }

          // At this point, hasPath is true and crumb.path is defined
          return (
            <MuiLink
              key={crumb.path}
              component={Link}
              to={crumb.path!}
              id={`breadcrumb-link-${index}`}
              underline="hover"
              onClick={resetVocabularyState}
              sx={{
                color: isDark ? '#90caf9' : '#1976d2',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                '&:hover': {
                  color: isDark ? '#64b5f6' : '#1565c0',
                },
              }}
            >
              {crumb.icon}
              {crumb.label}
            </MuiLink>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}
