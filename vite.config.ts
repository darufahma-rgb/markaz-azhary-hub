import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => {
  const isServe = command === "serve";

  let port = 5173;
  if (isServe) {
    const rawPort = process.env.PORT;
    if (rawPort) {
      const parsed = Number(rawPort);
      if (!Number.isNaN(parsed) && parsed > 0) {
        port = parsed;
      }
    }
  }

  const basePath = process.env.BASE_PATH || "/";

  return {
    base: basePath,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
