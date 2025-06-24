// vite.config.ts - CORRECTED

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // 1. Set the base path for production assets
  base: '',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // 2. Specify the output directory to be your module's assets folder
    outDir: path.resolve(__dirname, 'assets'),
    
    rollupOptions: {
      // 3. Make output file names predictable and flat
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `index.chunk.js`,
        assetFileNames: `index.[ext]`
      }
    },
    emptyOutDir: true,
  },

  server: {
    port: 5173,
    proxy: {
      // 4. Add your custom odoo route to the proxy
      '/self_order': {
        target: 'http://localhost:8069',
        changeOrigin: true,
      },
      '/web': {
        target: 'http://localhost:8069',
        changeOrigin: true,
      },
      '/longpolling': {
        target: 'http://localhost:8069',
        changeOrigin: true,
      },
      '/session': {
        target: 'http://localhost:8069',
        changeOrigin: true,
      },
    }
  }
})