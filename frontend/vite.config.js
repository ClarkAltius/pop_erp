import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // <--- fixes the port
    proxy: {
      '/api': {
        target: 'http://54.79.31.69:8080/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
