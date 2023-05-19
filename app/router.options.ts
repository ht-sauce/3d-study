import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      name: 'study',
      path: '/study',
      component: () => import('~/pages/study/index.vue'),
      meta: {
        title: '创建一个场景',
      },
    },
  ],
}
