import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      formats: ["es", "umd"],
      entry: "src/index.js",
      name: "easyToast",
      fileName: (format) => `easy-toast.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
      plugins: [],
    },
  },

  css: {
    postcss: "./postcss.config.js",
  },
});
