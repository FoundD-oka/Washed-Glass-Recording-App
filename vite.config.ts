import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This ensures relative paths in the built files
  build: {
    outDir: 'docs', // Build directly to docs folder for GitHub Pages
  }
})
