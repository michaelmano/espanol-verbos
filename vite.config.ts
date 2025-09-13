import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/espanol-verbos/',
  test: {
    environment: 'jsdom', // allows DOM APIs in tests
    globals: true, // enables describe/it/test without imports
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    exclude: [...configDefaults.exclude, 'dist/**'], // optional
  },
});
