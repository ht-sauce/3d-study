// 开始一个场景
import * as THREE from 'three'
import { Camera } from 'three/src/Three'
// @ts-ignore
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FPS } from '@/utils/animation'

type WHFun = () => number
// 开始一个场景
export type StartSceneP = {
  sceneDom: HTMLElement
  camera: Camera | any
  w: WHFun
  h: WHFun
  frame?: number
  dpi?: number
}
export function startScene({
  sceneDom,
  camera,
  w,
  h,
  dpi = window.devicePixelRatio,
  frame = 60, // 帧率
}: StartSceneP) {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(dpi)
  renderer.setSize(w(), h())
  sceneDom?.appendChild(renderer.domElement)

  // 添加一个场景
  const scene = new THREE.Scene()

  // 光源
  const light = new THREE.AmbientLight(0xffffff) // soft white light
  scene.add(light)

  // 创建stats对象
  const stats = new Stats()
  // stats.domElement:web页面上输出计算结果,一个div元素，
  stats.domElement.style.left = 'unset'
  stats.domElement.style.right = '0px'
  sceneDom?.appendChild(stats.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  // 坐标系
  const axesHelper = new THREE.AxesHelper(window.innerHeight)
  scene.add(axesHelper)

  function onWindowResize() {
    camera.aspect = w() / h()
    camera.updateProjectionMatrix()

    renderer.setSize(w(), h())

    render()
  }

  function render() {
    stats.update() // 刷新事件
    renderer.render(scene, camera)
  }
  // 模型加载是异步的所以一开始模型没有加载出来
  const fps = new FPS(render, frame) // .raf()

  window.removeEventListener('resize', onWindowResize)
  window.addEventListener('resize', onWindowResize)

  return {
    renderer,
    scene,
    light,
    fps,
    stats,
    controls,
    axesHelper,
  }
}
