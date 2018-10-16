let id = 0
export default class Track {
  constructor (opt) {
    this.id = id++
    this.delay = 0
    this.duration = 0
    // 动画是否折返
    this.retrace = false
    // 配置的重复次数
    this.iterationCount = 1
    // 已重复次数
    this.cycleIndex = 0
    this.easing = 'linear'
    Object.assign(this, opt)
  }
}
