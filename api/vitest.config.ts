import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/prisma/**',
      '**/generated/**',
    ],
    coverage: {
      exclude: [
        'node_modules/**',
        'dist/**',
        'prisma/**',
        '**/*.generated.*',
        '**/generated/**',
      ],
    },
    globalSetup: ['./src/tests/global-setup.ts'],
    setupFiles: ['./src/tests/setup.ts'],
  },
});
