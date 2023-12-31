/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './src/test/setup.ts',
    css: true,
    alias: [
      {
        find: "react-redux/es/exports",
        replacement: path.resolve(__dirname, "./node_modules/react-redux/lib/exports"),
      },
    ]
  },
});
