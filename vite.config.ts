import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// ✅ Yeh pura block ke baad define hoga expressPlugin()
export default defineConfig(({ command }) => {
  const plugins = [react()];

  // ✅ Only use expressPlugin in dev mode (not in Netlify build)
  if (command === 'serve') {
    plugins.push(expressPlugin());
  }

  return {
    root: '.', // index.html is in root
    plugins,
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
  };
});

// ✅ Ab yaha define karo function expressPlugin
function expressPlugin(): Plugin {
  const { createServer } = require('./server'); // make sure this path is correct
  return {
    name: 'express-plugin',
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
