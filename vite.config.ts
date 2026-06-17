import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/public": path.resolve(__dirname, "./public"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://app.j-one.in",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Keep statically imported shiki separate (dynamic langs already split)
            if (
              id.includes("shiki") &&
              !id.includes("@shikijs/langs") &&
              !id.includes("@shikijs/themes")
            ) {
              return "shiki-core";
            }
            // Core React vendor — check first to avoid circular deps
            if (
              id.includes("react-dom") ||
              id.includes("react/") ||
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }
            // Routing
            if (id.includes("react-router")) return "router-vendor";
            // Large charting lib
            if (id.includes("recharts")) return "recharts";
            // Animation
            if (id.includes("framer-motion")) return "framer-motion";
            // Form libraries
            if (
              id.includes("formik") ||
              id.includes("yup") ||
              id.includes("@hookform") ||
              id.includes("react-hook-form")
            ) {
              return "forms-vendor";
            }
            // Data / query layer
            if (id.includes("@tanstack/react-query")) return "query-vendor";
            // Radix UI components
            if (id.includes("@radix-ui")) return "radix-ui";
            // Country / phone
            if (
              id.includes("libphonenumber") ||
              id.includes("react-phone-number") ||
              id.includes("country-flag")
            ) {
              return "phone-vendor";
            }
            // Socket / real-time
            if (id.includes("socket.io")) return "socket-vendor";
            // lucide icons
            if (id.includes("lucide-react")) return "lucide";
            // Let Vite handle the rest naturally (avoids circular deps)
          }
        },
      },
    },
  },
})
