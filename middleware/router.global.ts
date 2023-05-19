// to前往，form来源
export default defineNuxtRouteMiddleware(() => {
  // console.log(to, from)
  const route = useRoute()
  useHead({
    title: route.meta.title as string,
  })
})
