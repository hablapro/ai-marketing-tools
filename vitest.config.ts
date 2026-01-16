import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment for DOM testing
    environment: 'jsdom',

    // Global test setup files
    setupFiles: ['./src/__tests__/setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
      ],
      lines: 60,
      functions: 60,
      branches: 60,
      statements: 60,
    },

    // Test file patterns
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // Globals for test functions (no need to import describe, it, expect, etc.)
    globals: true,

    // Mock reset between tests
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,

    // Test timeout
    testTimeout: 10000,
  },

  // Path aliases matching tsconfig.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
