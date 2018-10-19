import easing from '../easing'
import Track from '../track'

export default class Elliptic extends Track {
  constructor (opt) {
    super(opt)
    this.defaultRadiusX = 100
    this.defaultRadiusY = 80
    this.defaultAngle = 360
  }
  loop (t) {
    if (typeof this.centerX !== 'number' || typeof this.centerY !== 'number') {
      throw Error('centerX|centerY参数类型错误')
    }
    const p2 = t / this.duration
    let p = 0
    if (this.retrace) {
      if (p2 <= 0.5) {
        // 贝塞尔函数涉及的占比比例，0<=p<=1
        p = easing[this.easing](p2 * 2)
      } else {
        let p3 = 1 - (p2 - 0.5) * 2
        // 防止折返后终点不在起点上
        if ((1 - p2) * this.duration < 80) p3 = 0
        p = easing[this.easing](p3)
      }
    } else {
      p = easing[this.easing](p2)
    }
    const speed = p * this.defaultAngle
    let angle
    if (this.direction === false) {
      angle = this.angle - speed
    } else {
      angle = this.angle + speed
    }
    const { x, y } = this.getPosition(this, angle)
    this.$ele.attr({
      x,
      y
    })
  }
  getPosition (ele, angle) {
    const relativeX = ele.relativeX || 0
    const relativeY = ele.relativeY || 0
    const centerX = ele.centerX
    const centerY = ele.centerY
    const radiusX = ele.radiusX || this.defaultRadiusX
    const radiusY = ele.radiusY || this.defaultRadiusY
    const x = centerX + radiusX * Math.cos(angle * Math.PI / 180) - relativeX
    const y = centerY + radiusY * Math.sin(angle * Math.PI / 180) - relativeY
    return { x, y }
  }
}
