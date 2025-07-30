import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure relative paths for GitHub Pages or local file browsing
  build: {
    outDir: 'docs', // Output built files into docs folder for web_check branch
  },
})
