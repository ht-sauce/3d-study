框架形式的组件，框定页面整体结构，看情况需要使用
```vue
<!--默认的全局布局文件-->
<template>
  <slot />
  <!--  <div class="layout">-->
  <!--    <slot></slot>-->
  <!--  </div>-->
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>

```