import easing from '../easing'
import Track from '../track'

export default class Round extends Track {
  constructor (opt) {
    super(opt)
    this.defaultR = 100
    this.defaultAngle = 360
  }
  loop (t) {
    if (!this.centerX || !this.centerY) {
      throw Error('centerX|centerY参数缺失')
    }
    const p2 = t / this.duration
    let p = easing[this.easing](p2)
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
    const r = ele.r || this.defaultR
    let x = centerX + r * Math.cos(angle * Math.PI / 180) - relativeX
    let y = centerY + r * Math.sin(angle * Math.PI / 180) - relativeY
    return { x, y }
  }
}
