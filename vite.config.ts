import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8043,
    proxy: {
      '/book-manager-es': {
        target: 'http://liujingxuandeMacBook-Pro.local',
        changeOrigin: true
      },
      '/book-manager': {
        target: 'http://liujingxuandeMacBook-Pro.local',
        changeOrigin: true
      },
      '/book-change-cuckoo': {
        target: 'http://liujingxuandeMacBook-Pro.local',
        changeOrigin: true
      }
    }
  }
})
