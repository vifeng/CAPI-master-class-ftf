import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // resolvers: [
      //   // example of importing Vant
      //   (componentName) => {
      //     // where `componentName` is always CapitalCase
      //     if (componentName.startsWith("Vant"))
      //       return { name: componentName.slice(3), from: "vant" };
      //   },
      // ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
