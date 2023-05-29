<template>
  <div ref="canvasRef"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js'
import Stats from 'three/addons/libs/stats.module.js'
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js'
import { FPS } from '~/utils/animation'

const canvasRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  canvasRef.value?.appendChild(renderer.domElement)

  // 创建stats对象
  const stats = new Stats()
  // stats.domElement:web页面上输出计算结果,一个div元素，
  stats.domElement.style.left = 'unset'
  stats.domElement.style.right = '0px'

  canvasRef.value?.appendChild(stats.domElement)

  // 添加一个场景
  const scene = new THREE.Scene()

  // 坐标系
  const axesHelper = new THREE.AxesHelper(window.innerHeight)
  scene.add(axesHelper)

  // 相机
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(50, 50, 50)

  // 添加场景颜色
  // scene.background = new THREE.Color(0xcfcfcf)
  // 光源
  const light = new THREE.AmbientLight(0xffffff) // soft white light
  scene.add(light)

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

  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    render()
  }

  function render() {
    stats.update() // 刷新事件
    renderer.render(scene, camera)
  }
  // 模型加载是异步的所以一开始模型没有加载出来
  const fps = new FPS(render, 60) // .raf()

  window.addEventListener('resize', onWindowResize)
})
</script>
<style scoped lang="scss"></style>
