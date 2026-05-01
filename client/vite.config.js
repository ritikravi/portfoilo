import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Dev proxy — only used locally
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
})
