import { Breadcrumbs as MuiBreadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { useVocabularyStore } from '../stores/vocabularyStore';
import type { VocabularyDataSource } from '../data/vocabularyData';

interface BreadcrumbRoute {
  path?: string; // Optional now, for dynamic non-route breadcrumbs
  label: string;
  emoji?: string;
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
  '/': [{ path: '/', label: 'Home', emoji: '🏠' }],
  '/verbs/table': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/verbs/table', label: 'Verb Categories', emoji: '📚' },
  ],
  '/building-blocks': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/building-blocks', label: 'Building Blocks', emoji: '🧱' },
  ],
  '/building-blocks/medina-book-2': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/building-blocks', label: 'Building Blocks', emoji: '🧱' },
    { path: '/building-blocks/medina-book-2', label: 'Medina Book 2', emoji: '📖' },
  ],
  '/practice': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/practice', label: 'Practice', emoji: '📝' },
  ],
  '/practice/vocabulary': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/practice', label: 'Practice', emoji: '📝' },
    { path: '/practice/vocabulary', label: 'Vocabulary Practice', emoji: '📚' },
  ],
  '/other-topics': [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/other-topics', label: 'Other Topics', emoji: '📋' },
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
    { path: '/', label: 'Home', emoji: '🏠' },
  ];

  // Add dynamic breadcrumbs based on context
  if (location.pathname === '/practice/vocabulary' && isPracticing && selectedSource) {
    // Add the vocabulary source as a dynamic breadcrumb (no path = not clickable)
    breadcrumbs = [
      ...breadcrumbs,
      { label: vocabularySourceLabels[selectedSource], emoji: '📖' },
    ];
  }

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      id="breadcrumbs-container"
      sx={{
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
        '& .MuiBreadcrumbs-separator': {
          color: isDark ? '#666' : '#999',
          mx: { xs: 0.5, sm: 1 },
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
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              {crumb.emoji && <span>{crumb.emoji}</span>}
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
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                color: isDark ? '#64b5f6' : '#1565c0',
              },
            }}
          >
            {crumb.emoji && <span>{crumb.emoji}</span>}
            {crumb.label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
