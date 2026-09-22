import { defineConfig } from 'vite';

export default defineConfig({
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
