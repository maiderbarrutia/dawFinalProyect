import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { imagetools } from 'vite-imagetools'; 


export default defineConfig({
  base: '/',
  plugins: [
    react(),
    imagetools()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

