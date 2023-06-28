// requestAnimationFrame封装优化
export class FPS {
  oldRenderTime = 0
  frame = Math.floor(1000 / 60) // 默认60帧
  callback = () => {}
  constructor(
    callback: () => void, // 回调函数必须
    frame = 60, // 帧率，默认60帧
  ) {
    this.frame = Math.floor(1000 / frame)
    this.callback = callback
    this.raf() // 执行动画
  }

  // requestAnimationFrame处理
  raf = () => {
    window.requestAnimationFrame(this.raf)
    this.runAnimation()
  }

  // 运行动画
  runAnimation() {
    const interval = Date.now() - this.oldRenderTime

    if (interval >= this.frame) {
      this.callback()
      this.oldRenderTime = Date.now()
    }
  }
}
