import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://47.108.199.44:8081',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/capture': {
        // target: 'http://api.wxjilian.com/',
        target: 'http://47.108.199.44:8081',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/capture/, '/capture'),
      },
    },
  },
});
