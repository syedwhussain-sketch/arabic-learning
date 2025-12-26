import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from '../themeStore';
import { act } from '@testing-library/react';

describe('themeStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    const { setMode } = useThemeStore.getState();
    act(() => {
      setMode('dark');
    });
  });

  describe('initial state', () => {
    it('should have dark mode as default', () => {
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      const { toggleTheme } = useThemeStore.getState();
      
      act(() => {
        toggleTheme();
      });
      
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('light');
    });

    it('should toggle from light to dark', () => {
      const { setMode, toggleTheme } = useThemeStore.getState();
      
      act(() => {
        setMode('light');
        toggleTheme();
      });
      
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('dark');
    });

    it('should toggle multiple times correctly', () => {
      const { toggleTheme } = useThemeStore.getState();
      
      act(() => {
        toggleTheme(); // light
        toggleTheme(); // dark
        toggleTheme(); // light
      });
      
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('light');
    });
  });

  describe('setMode', () => {
    it('should set mode to light', () => {
      const { setMode } = useThemeStore.getState();
      
      act(() => {
        setMode('light');
      });
      
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('light');
    });

    it('should set mode to dark', () => {
      const { setMode } = useThemeStore.getState();
      
      act(() => {
        setMode('light');
        setMode('dark');
      });
      
      const { mode } = useThemeStore.getState();
      expect(mode).toBe('dark');
    });
  });
});
