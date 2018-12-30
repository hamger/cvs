import { error } from './utils/utils'
import { Easings, getBezierEasing } from './utils/easing'
let id = 0

const _easing = Symbol('easing')

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
    const easingType = this.easing
    if (typeof easingType === 'string') this[_easing] = Easings[easingType]
    else if (Array.isArray(easingType) && easingType.length === 4) this[_easing] = getBezierEasing(...easingType)
    else error('easing must be a string or an array has four items')
  }
  calculatePercentage (p) {
    if (p > 1) return 1
    return this[_easing](p)
  }
}
