import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

describe('Breadcrumbs', () => {
  const renderWithTheme = (component: React.ReactElement, initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <ThemeProvider theme={darkTheme}>
          {component}
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('should render home breadcrumb on root path', () => {
    renderWithTheme(<Breadcrumbs />, '/');
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should render breadcrumbs for verbs table path', () => {
    renderWithTheme(<Breadcrumbs />, '/verbs/table');
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Verb Categories')).toBeInTheDocument();
  });

  it('should render breadcrumbs for building blocks path', () => {
    renderWithTheme(<Breadcrumbs />, '/building-blocks');
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Building Blocks')).toBeInTheDocument();
  });

  it('should render breadcrumbs for practice path', () => {
    renderWithTheme(<Breadcrumbs />, '/practice');
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Practice')).toBeInTheDocument();
  });

  it('should render breadcrumbs with emojis', () => {
    const { container } = renderWithTheme(<Breadcrumbs />, '/');
    
    // Check that emojis are rendered (🏠 for Home)
    expect(container.textContent).toContain('🏠');
  });

  it('should render default breadcrumb for unknown path', () => {
    renderWithTheme(<Breadcrumbs />, '/unknown-route');
    
    // Should default to Home
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
