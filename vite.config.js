import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          'icons': ['react-icons'],
        },
        // Ensure consistent chunk naming for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.(js|ts|jsx|tsx)$/, '') : 'chunk'
          return `${facadeModuleId}-[hash].js`
        },
        entryFileNames: 'entry-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash].[ext]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash].[ext]`
          }
          return `assets/[name]-[hash].[ext]`
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
  },
  // Optimize dependencies - ensure proper ESM/CJS interop
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@chakra-ui/react',
      '@chakra-ui/utils',
      'lodash.mergewith'
    ],
  },
  // Dedupe commonly used packages to avoid duplicates
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      'framer-motion',
      'lodash.mergewith'
    ],
  },
  server: {
    port: 5173,
    open: false
  }
})
