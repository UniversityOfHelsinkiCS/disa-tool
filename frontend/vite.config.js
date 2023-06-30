import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  publicDir: '../public',
  rollupOptions: {
    external: ["react", "react-router", "react-router-dom", "react-redux"],
    output: {
      globals: {
        react: "React",
      },
    },
  },
  plugins: [
    react(
        {include: '**/*.{js,jsx,tsx}',}
    ),
    createHtmlPlugin({
      inject: {
        data: {
          title:  'Disa-tool',
        },
      },
    }),
  ],
  resolve: {
    fallback: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
},
  esbuild: {
    loader: "jsx",
    include: [
      // Add this for business-as-usual behaviour for .jsx and .tsx files
      "src/**/*.jsx",
      "src/**/*.tsx",
      "node_modules/**/*.jsx",
      "node_modules/**/*.tsx",

      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",

      // Add these lines to allow all .ts files to contain JSX
      "src/**/*.ts",
      "node_modules/**/*.ts",
    ],
  },
});