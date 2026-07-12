import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // One package, multiple entry points (see package.json "exports").
      entry: {
        index: "src/index.ts", // React (default entry)
        core: "src/core/index.ts", // framework-agnostic core
        vue: "src/vue/index.ts", // Vue wrapper
        element: "src/element/index.ts", // <crt-effect> Web Component
      },
      formats: ["es", "cjs"],
      // The package is `"type": "module"`, so `.js` is ESM and `.cjs` is
      // CommonJS. Using a plain `.cjs.js` name would make Node parse the CJS
      // build as ESM and break every `require()` consumer.
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
      // Keep the legacy stylesheet filename so existing
      // `vault66-crt-effect/dist/vault66-crt-effect.css` imports still resolve.
      cssFileName: "vault66-crt-effect",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "vue"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          vue: "Vue",
        },
      },
    },
  },
});
