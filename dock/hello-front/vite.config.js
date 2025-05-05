import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['app'],
    watch: {
      usePolling: true
    },
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true, 
    hmr: {
      host: '0.0.0.0', 
      port: 5173,
      clientPort: 5173
    }
  }
})