import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "staticwebapp.config.json",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
    },
  },
});
