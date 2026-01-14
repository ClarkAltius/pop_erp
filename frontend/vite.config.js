import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // <--- This line fixes the port
    proxy: {
      '/api': {
        target: 'http://localhost:9980',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
