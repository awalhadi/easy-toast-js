import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      formats: ["es", "cjs"],
      entry: "src/index.js",
      name: "easyToast",
      fileName: (format) => `easy-toast.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
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
