import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chakra-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
  },
})
