import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@maptiler') || id.includes('maplibre') || id.includes('leaflet')) {
            return 'mapping-engine'; // Puts all map code in one separate file
          }
        }
      }
    }
  }
})