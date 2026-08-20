import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/tabranij/",
  root: path.join(root, "pages"),
  publicDir: path.join(root, "public"),
  plugins: [tailwindcss(), viteReact()],
  resolve: {
    alias: { "@": path.join(root, "src") },
  },
  build: {
    outDir: path.join(root, "dist-pages"),
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
