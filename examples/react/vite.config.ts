import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Run from the repo root with: npm run dev:react
export default defineConfig({
  plugins: [react()],
});
