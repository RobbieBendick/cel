import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site at /cel/, not the domain root.
  base: command === 'build' ? '/cel/' : '/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
}));
