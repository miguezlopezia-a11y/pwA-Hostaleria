import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Replica lo real de craco.config.js (Fase B de la migración CRA→Vite):
// - alias "@" → src (webpack alias de craco)
// - entry src/main.jsx (paths.appIndexJs de craco): se materializa en el
//   <script type="module" src="/src/main.jsx"> del index.html raíz
// El eslint/watch de craco no aplica a Vite.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.js"],
    css: false,
  },
});
