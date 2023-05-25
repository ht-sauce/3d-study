<template>
  <div ref="sceneRef"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
const sceneRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  sceneRef.value?.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  const loader = new GLTFLoader()

  loader.load(
    '/可爱的蜘蛛/cute_spider__ccw.glb',
    function (gltf: any) {
      scene.add(gltf.scene)
    },
    undefined,
    function (error: ErrorEvent) {
      console.error(error)
    },
  )

  renderer.render(scene, camera)
})
</script>

<style scoped lang="scss"></style>
