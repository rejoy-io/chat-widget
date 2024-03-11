// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'main1.js',
      name: 'MessageWidget',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
      },
    },
  },
});
