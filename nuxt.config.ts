// https://v3.nuxtjs.org/api/configuration/nuxt.config
// 获取当前执行命令的自定义环境
// @ts-ignore
const ExcutingAnOrder = process.env.npm_lifecycle_script.split(' ')
const env = ExcutingAnOrder[ExcutingAnOrder.length - 1]

export default defineNuxtConfig({
  app: {
    baseURL: '/ht',
    head: {
      title: 'dht',
      titleTemplate: '%s - dht',
      // meta标签
      meta: [],
      // link方式引入的css或者文件
      // link: [{ rel: 'icon', type: 'image/x-icon', href: '/zl/favicon.ico' }],
      // script文件
      // script: [{ src: '/zl/easemob.js', defer: true }],
    },
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
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
})
