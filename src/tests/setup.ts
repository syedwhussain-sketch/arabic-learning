import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  // Cleanup if needed
});

// Mock localStorage for node environment
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
globalThis.localStorage = localStorageMock as Storage;
