// https://v3.nuxtjs.org/api/configuration/nuxt.config

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
})
