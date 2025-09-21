import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["tests/contract/setup.ts"],
    include: [
      "tests/unit/**/*.ts",
      "tests/contract/**/*.test.ts",
      "packages/**/*.test.ts"
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage"
    }
  }
});
