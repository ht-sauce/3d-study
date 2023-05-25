<template>
  <div ref="sceneRef"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FPS } from '~/utils/animation'
const sceneRef = ref<HTMLDivElement | null>(null)
onMounted(() => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  sceneRef.value?.appendChild(renderer.domElement)

  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 20, 200)
  // 场景
  const scene = new THREE.Scene()

  // 坐标系
  const axesHelper = new THREE.AxesHelper(window.innerHeight)
  scene.add(axesHelper)

  // 添加场景颜色
  scene.background = new THREE.Color(0xcfcfcf)
  // 光源
  const light = new THREE.AmbientLight(0xffffff) // soft white light
  scene.add(light)

  // 模型
  const loader = new GLTFLoader()
  loader.load(
    '/可爱的蜘蛛/cute_spider__ccw.glb',
    function (gltf: any) {
      const model = gltf.scene
      scene.add(model)
      model.scale.set(20, 20, 20)
    },
    undefined,
    function (error: ErrorEvent) {
      console.error(error)
    },
  )
  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render) // use if there is no animation loop
  // controls.minDistance = 2
  // controls.maxDistance = 20
  // controls.target.set(0, 0, -0.2)
  // controls.update()

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    render()
  }

  function render() {
    renderer.render(scene, camera)
  }
  // 模型加载是异步的所以一开始模型没有加载出来
  const fps = new FPS(render, 30) // .raf()

  window.addEventListener('resize', onWindowResize)
})
</script>

<style scoped lang="scss"></style>
