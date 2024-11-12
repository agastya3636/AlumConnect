import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sih2024-iif3.onrender.com/',
        changeOrigin: true,
      }
    }
  }
})
