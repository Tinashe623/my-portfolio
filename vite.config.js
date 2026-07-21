import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('react-router-dom')) {
              return 'router'
            }
            if (id.includes('@chakra-ui/react') || id.includes('@emotion') || id.includes('framer-motion')) {
              return 'ui'
            }
            if (id.includes('react-icons')) {
              return 'icons'
            }
          }
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
    ],
  },
  // Dedupe commonly used packages to avoid duplicates
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      'framer-motion',
    ],
  },
  server: {
    port: 5173,
    open: false
  }
})
