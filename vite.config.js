import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative asset paths so it works hosted, on a subpath, and under file://
  server: { port: 5174, host: true },
})
