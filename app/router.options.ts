import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      path: '/',
      component: () => import('~/pages/index/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/create-one-scene',
      component: () => import('~/pages/create-one-scene/index.vue'),
      meta: {
        title: '创建一个场景',
      },
    },
  ],
}
