// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  root: '.', // root me hi index.html hai
  plugins: [react()],
  build: {
    outDir: 'dist/spa', // as per your Netlify/pkg config
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
