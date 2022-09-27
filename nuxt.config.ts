// https://v3.nuxtjs.org/api/configuration/nuxt.config
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 获取当前执行命令的自定义环境
const ExcutingAnOrder = process.env.npm_lifecycle_script.split(' ')
const env = ExcutingAnOrder[ExcutingAnOrder.length - 1]

const lifecycle = process.env.npm_lifecycle_event
export default defineNuxtConfig({
  app: {
    baseURL: '/ht',
  },

  runtimeConfig: {
    // 不在public部分为仅在服务器下可用
    env,
    public: {
      env,
    },
  },
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : [],
  },
  vite: {
    plugins: [
      ElementPlus({ useSource: true, defaultLocale: 'zh-cn' }),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass', ssr: true })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass', ssr: true })],
      }),
    ],
  },
})
