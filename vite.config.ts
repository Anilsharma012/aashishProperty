import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ command }) => {
  const plugins = [react()];

  // Only run Express in dev mode
  if (command === 'serve') {
    plugins.push(expressPlugin());
  }

  return {
    root: 'client', // 👈 index.html is here
    plugins,
    build: {
      outDir: '../dist/spa', // 👈 build will be here
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './client'),     // 👉 @ -> client/
        '@shared': path.resolve(__dirname, './shared') // 👉 Optional shared folder
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});

// Express plugin for Vite dev mode
function expressPlugin(): Plugin {
  const { createServer } = require('./server'); // 👈 make sure this path exists
  return {
    name: 'express-plugin',
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
