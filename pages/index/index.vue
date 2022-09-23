<template>
  <div class="home">
    {{ config }}
  </div>
</template>

<script setup lang="ts">
import { getConfig } from '~/env/config'

const config = getConfig()
</script>

<style scoped lang="scss"></style>
