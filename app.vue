<template>
  <el-config-provider :size="elementPlus.size" :z-index="elementPlus.zIndex">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
<script setup lang="ts">
const elementPlus = {
  zIndex: 2000,
  size: 'small',
  // locale,
}
</script>
