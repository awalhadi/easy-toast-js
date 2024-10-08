import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      formats: ["es", "umd"],
      //   add css and js entry files
      //   entry: "src/index.js",
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
});
