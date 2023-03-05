import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['tests/**/!(index.test).ts', '**/node_modules/**'],
    // include: ['tests/index.test.ts'],
    coverage: {
      branches: 80,
      perFile: true,
    },
  },
});
