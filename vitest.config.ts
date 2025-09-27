import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.{test,spec}.ts?(x)", "src/**/*.{test,spec}.ts?(x)"],
    setupFiles: [],
  },
});
