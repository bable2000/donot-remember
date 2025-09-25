import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
import viteDts from 'vite-plugin-dts'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    cssInjectedByJs(),
    viteDts({
      entryRoot: './src',
      outDir: './type',
      tsconfigPath: './tsconfig.app.json',
      // cleanVueFileName: true,
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'modules',
    lib: {
      formats: ['es'],
      entry: './src/ElementPlus/index.vue'
    },
    rollupOptions: {
      output: { entryFileNames: 'index.js' },
      external: [
        'vue',
        '@ant-design/icons-vue',
        '@element-plus/icons-vue',
        'ant-design-vue',
        'element-plus',
        /^element-plus\//,
        'lodash-es',
        'lodash-unified',
        '@vueuse/core',
        '@vue/shared'
      ]
      // plugins: [externalGlobals({ vue: 'Vue' })]
    }
  }
})
