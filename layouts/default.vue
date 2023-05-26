<template>
  <div>
    <router-link to="/">
      <el-button v-if="route.path !== '/'" class="go-home" type="success" :icon="HomeFilled">
        首页
      </el-button>
    </router-link>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { HomeFilled } from '@element-plus/icons-vue'
const route = useRoute()
</script>
<style scoped lang="scss">
.go-home {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
