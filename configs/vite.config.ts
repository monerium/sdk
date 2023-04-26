import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      name: 'monerium-sdk',
      //   formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.mjs';
        } else {
          return `index.${format}.js`;
        }
      },
    },
  },
});
