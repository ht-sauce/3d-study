// https://v3.nuxtjs.org/api/configuration/nuxt.config
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 获取当前执行命令的自定义环境
const ExcutingAnOrder = process.env.npm_lifecycle_script.split(' ')
const env = ExcutingAnOrder[ExcutingAnOrder.length - 1]

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
    transpile: ['element-plus/es'],
  },
  components: true,
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass', ssr: true })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass', ssr: true })],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/theme/element-plus/rest.scss" as *;`,
        },
      },
    },
  },
})
