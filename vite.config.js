import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        'bulk-utm-builder': resolve(import.meta.dirname, 'bulk-utm-builder/index.html'),
        'utm-checker': resolve(import.meta.dirname, 'utm-checker/index.html'),
        'utm-parameters': resolve(import.meta.dirname, 'utm-parameters/index.html'),
        'utm-naming-conventions': resolve(import.meta.dirname, 'utm-naming-conventions/index.html'),
        'utm-builder-google-ads': resolve(import.meta.dirname, 'utm-builder/google-ads/index.html'),
        'utm-builder-facebook': resolve(import.meta.dirname, 'utm-builder/facebook/index.html'),
        'utm-builder-linkedin': resolve(import.meta.dirname, 'utm-builder/linkedin/index.html'),
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
