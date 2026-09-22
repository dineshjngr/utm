import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html')
      }
    }
  },
  server: {
    port: 3333,
    host: '127.0.0.1',
    open: false
  },
  preview: {
    port: 3333,
    host: '127.0.0.1'
  }
});

