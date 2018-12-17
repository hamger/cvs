import { Easings, getBezierEasing } from './utils/easing'
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
    this.easing = 'linear'
    Object.assign(this, opt)
  }
  calculatePercentage (p) {
    const easingType = this.easing
    if (typeof easingType === 'string') return Easings[easingType](p)
    else if (Array.isArray(easingType)) return getBezierEasing(easingType)(p)
    else error('easing must be string or array')
  }
}
