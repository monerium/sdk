import path from 'path';
import dts from 'vite-plugin-dts';

import { defineConfig } from 'vite';

const srcRoot = path.resolve(__dirname, './src/');

export default defineConfig({
  // cacheDir: '../../node_modules/.vite/sdk',
  build: {
    sourcemap: true,
    lib: {
      entry: `${srcRoot}/index.ts`,
      name: 'monerium-sdk',
      //   formats: ["es", "cjs", "umd", "iife"],
      fileName: 'index',
    },
    // rollupOptions: {
    //   external: ['crypto-js/enc-base64url', 'crypto-js/sha256'],
    // },
  },
  plugins: [
    dts({ rollupTypes: true }),
    // dts({
    //   entryRoot: 'src',
    //   tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
    //   skipDiagnostics: true,
    // }),
  ],
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
