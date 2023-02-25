import path from "path";
import { defineConfig } from "vite";
import nodePolyfills from "vite-plugin-node-stdlib-browser";

export default defineConfig({
  base: "./",
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "monerium-sdk",
      //   formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [nodePolyfills()],
});
