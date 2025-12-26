import { afterEach, vi, beforeAll } from 'vitest';

// Setup runs once before all tests
beforeAll(() => {
  // Mock localStorage for all environments with proper return values
  const storage = new Map<string, string>();
  const localStorageMock = {
    getItem: vi.fn((key: string) => storage.get(key) || null),
    setItem: vi.fn((key: string, value: string) => { storage.set(key, value); }),
    removeItem: vi.fn((key: string) => { storage.delete(key); }),
    clear: vi.fn(() => { storage.clear(); }),
    length: 0,
    key: vi.fn((index: number) => Array.from(storage.keys())[index] || null),
  };
  globalThis.localStorage = localStorageMock as Storage;
});

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
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
