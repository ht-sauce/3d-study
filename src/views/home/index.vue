<template>
  <div class="home">
    <template v-for="item in routerList" :key="item.path">
      <router-link :to="item.path" class="item-page" :title="item.meta?.title">
        <el-button type="primary">
          {{ item.meta?.title ?? item.path }}
        </el-button>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const routerList = router.options.routes
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.item-page {
  margin-bottom: 10px;
}
</style>
