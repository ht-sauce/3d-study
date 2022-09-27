<template>
  <div class="home">
    <span>{{ config }}</span>
    <el-button type="primary" @click="testUpload">测试文件上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { getConfig } from '~/env/config'
import { selectFile } from '~/tool/file'

const config = getConfig()

async function testUpload() {
  try {
    const file = await selectFile()
    console.log(file)
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped lang="scss"></style>
