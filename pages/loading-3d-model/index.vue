<template>
  <div ref="sceneRef"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
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

  // 添加文字
  const fontLoader = new FontLoader()
  const material = new THREE.MeshBasicMaterial({
    color: '#ff0000',
  })
  fontLoader.load(
    // new URL('three/examples/fonts/optimer_bold.typeface.json', import.meta.url).href,
    '/fonts/MicrosoftYaHeiRegular.json',
    function (font: any) {
      const geometry = new TextGeometry('加载一个蜘蛛模型', {
        font,
        size: 100,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 2,
        bevelSegments: 5,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(0.03, 0.03, 0.03)
      scene.add(mesh)
    },
  )

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
