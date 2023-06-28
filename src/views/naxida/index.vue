<template>
  <div ref="canvasRef"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js'
import { startScene } from '@/utils/scene'
import { ref, onMounted } from 'vue'
const canvasRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const w = () => window.innerWidth
  const h = () => window.innerHeight

  // 相机
  const camera = new THREE.PerspectiveCamera(90, w() / h(), 1, 1000)
  camera.position.set(50, 50, 50)
  const { renderer, scene } = startScene({ sceneDom: canvasRef.value as HTMLElement, w, h, camera })

  // MMDLoader从MMD资源（例如PMD、PMX、VMD和VPD文件）中创建Three.js物体（对象）
  const loader = new MMDLoader()
  loader.load(
    '/yuanshen/纳西妲/纳西妲.pmx',
    function (mesh: any) {
      scene.add(mesh)
    },
    function (xhr: any) {
      // console.log('百分之：' + (xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('加载错误', error)
    },
  )
})
</script>
<style scoped lang="scss"></style>
