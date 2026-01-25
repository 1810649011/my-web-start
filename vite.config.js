import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 9999, // 修改为你想要的端口
    open: true // 可选：自动打开浏览器
    // proxy: {
    //   '/api': {
    //     target: 'https://api.52vmy.cn',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //     configure: (proxy, options) => {
    //       // 可选：强制不缓存
    //       proxy.on('proxyReq', (proxyReq, req, res) => {
    //         proxyReq.setHeader('Cache-Control', 'no-cache')
    //       })
    //     }
    //   }
    // }
  }
})
