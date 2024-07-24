import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig((_) => {
  const dev = process.argv.includes('--watch')
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: './src/main.ts',
        name: 'tree',
        fileName: () => 'main.js',
        formats: ['es', 'cjs', 'umd'],
      },
      emptyOutDir: true,
      sourcemap: dev ? 'inline' : false,
      rollupOptions: {
        output: {
          dynamicImportInCjs: false,
          inlineDynamicImports: true,
        },
      },
    },
  }
})
