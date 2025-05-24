import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'  // <-- important

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {           // <-- outside plugins array
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
