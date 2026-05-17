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
        target: "https://law.j-one.in",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increase warning limit to 1500kb
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split out big react libraries into their own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
            // Put other dependencies in a general vendor chunk
            return 'vendor';
          }
        }
      }
    }
  }
})
