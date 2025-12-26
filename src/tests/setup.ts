import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock canvas-confetti to prevent issues in CI
vi.mock('canvas-confetti', () => ({
  default: vi.fn(() => Promise.resolve()),
}));

// Mock recharts to prevent rendering issues in tests
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => children,
  PieChart: () => null,
  Pie: () => null,
  Cell: () => null,
  Legend: () => null,
  Tooltip: () => null,
}));
