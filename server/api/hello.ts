/* /api/hello */

export default defineEventHandler((event) => {
  // get
  const query = useQuery(event)
  // post await useBody(event)
  return {
    api: 'hello word！戴海天测试get接口',
    query,
  }
})
