<template>
  <div class="index">
    <template v-for="item in routerList" :key="item.path">
      <nuxt-link :to="item.path" style="margin: 10px">
        <el-button type="primary">{{ item.meta.title ?? item.path }}</el-button>
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
const router = useRouter()

const routerList = router.options.routes
</script>
<style scoped lang="scss">
.index {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
</style>
