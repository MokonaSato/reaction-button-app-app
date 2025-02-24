import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/chat': {
        target: 'https://reaction-button-app-server-741657062688.asia-northeast1.run.app',
        changeOrigin: true,
      },
      '/join': {
        target: 'https://reaction-button-app-server-741657062688.asia-northeast1.run.app',
        changeOrigin: true,
      },
      '/hello': {
        target: 'https://reaction-button-app-server-741657062688.asia-northeast1.run.app',
        changeOrigin: true,
      },
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
