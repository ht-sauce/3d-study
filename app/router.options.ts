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
    {
      path: '/draw-lines',
      component: () => import('~/pages/draw-lines/index.vue'),
      meta: {
        title: '画线',
      },
    },
    {
      path: '/loading-3d-model',
      component: () => import('~/pages/loading-3d-model/index.vue'),
      meta: {
        title: '载入3D模型',
      },
    },
  ],
}
