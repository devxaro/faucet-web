import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;
  return {
    base: "/",
    build: {
      outDir: "build",
    },
    optimizeDeps: {
      include: ["@mui/material/Tooltip", "@emotion/styled"],
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      global: "window",
    },
    server: {
      host: true,
      port: 3000,
      sourcemap: true,
    },
  };
});
