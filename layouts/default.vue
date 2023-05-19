<!--默认的全局布局文件-->
<template>
  <div class="layout">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
