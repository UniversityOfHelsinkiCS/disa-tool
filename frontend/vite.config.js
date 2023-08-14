import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  build: {
    // Relative to the root
    outDir: '../../backend/dist',
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      }
  }
},
  publicDir: '/',
  plugins: [
    react({
        // Use React plugin in all *.jsx and *.tsx files
        include: '**/*.{js,jsx,tsx}',
      }),
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.NODE_ENV  === 'production' ? 'DISA' : `DISA DEV`,
        },
      },
    }),
  ],
});