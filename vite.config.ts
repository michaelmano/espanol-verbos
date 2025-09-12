import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    environment: "jsdom", // allows DOM APIs in tests
    globals: true, // enables describe/it/test without imports
    setupFiles: "./vitest.setup.ts", // optional setup
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
