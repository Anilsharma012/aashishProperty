import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),  // ✅ POINT to client/
  build: {
    outDir: path.resolve(__dirname, "dist/spa"),  // ✅ Output to dist/spa
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
    },
  },
});
