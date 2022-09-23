<template>
  <div class="home">
    {{ config }}
  </div>
</template>

<script setup lang="ts">
import { getConfig } from '~/env/config'

const config = getConfig()

// localStorage.setItem('test', '11231')
//
// console.log(localStorage.getItem('test'))
</script>

<style scoped lang="scss"></style>
