import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      branches: 80,
      perFile: true,
    }
  },
});
