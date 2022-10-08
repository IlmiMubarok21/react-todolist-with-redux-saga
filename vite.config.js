import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@bootstrap': path.resolve(__dirname, 'src/bootstrap'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@pages': path.resolve(__dirname, 'src/pages')
    }
  },
  plugins: [react()]
})
