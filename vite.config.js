import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://backend-88w6.onrender.com',
      '/uploads': 'https://backend-88w6.onrender.com'
    }
  }
})