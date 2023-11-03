import path from 'path';
import { defineConfig } from 'vite';

const srcRoot = path.resolve(__dirname, '../src/');

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: `${srcRoot}/index.ts`,
      name: 'monerium-sdk',
      fileName: 'index',
    },
  },
  resolve: {
    alias: [
      {
        find: 'types',
        replacement: `${srcRoot}/types.ts`,
      },
      {
        find: 'utils',
        replacement: `${srcRoot}/utils.ts`,
      },
      {
        find: 'helpers',
        replacement: `${srcRoot}/helpers/index.ts`,
      },
    ],
  },
});
