import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cabin: {
          DEFAULT: "#2b3a2f",
          accent: "#f2a65a",
          light: "#f7f4ef"
        }
      }
    }
  },
  plugins: []
};

export default config;
