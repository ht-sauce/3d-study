<template>
  <el-config-provider :size="elementPlus.size" :z-index="elementPlus.zIndex" :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider, ID_INJECTION_KEY } from 'element-plus'

import locale from 'element-plus/lib/locale/lang/zh-cn'

const elementPlus = {
  zIndex: 2000,
  size: '', // 'small',
}

provide(ID_INJECTION_KEY, {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
})
</script>
<style lang="scss">
@use './theme/index.scss';
</style>
