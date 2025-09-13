// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// Export Vite + Vitest config
export default defineVitestConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    base: '/espanol-verbos/',
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
