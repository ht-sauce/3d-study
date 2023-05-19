// to前往，form来源
export default defineNuxtRouteMiddleware((to) => {
  useHead({
    title: to.meta.title as string,
  })
})
