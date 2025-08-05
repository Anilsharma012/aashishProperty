// vite.config.ts
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { createServer } from './server'; // 👈 make sure this file exists and exports createServer()

export default defineConfig(({ command }) => ({
  root: '.',
  plugins: [
    react(),
    ...(command === 'serve' ? [expressPlugin()] : []) // Only use during dev
  ],
  build: {
    outDir: 'dist/spa',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
}));

function expressPlugin(): Plugin {
  return {
    name: 'express-plugin',
    configureServer(server) {
      const app = createServer(); // 👈 must return Express instance
      server.middlewares.use(app);
    },
  };
}
