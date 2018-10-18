import easing from '../easing'
import Track from '../track'

export default class Round extends Track {
  constructor (opt) {
    super(opt)
    this.defaultR = 100
    this.defaultAngle = 360
    this.test = 0
  }
  loop (t) {
    const p2 = t / this.duration
    const angle = this.angle + p2 * this.defaultAngle
    const { x, y } = this.getPosition(this, angle)
    this.$ele.attr({
      x,
      y
    })
  }
  getPosition (ele, angle) {
    const relativeX = ele.relativeX || 0
    const relativeY = ele.relativeY || 0
    const vpx = ele.vpx
    const vpy = ele.vpy
    const r = ele.r || this.defaultR
    let x = vpx + r * Math.cos(angle * Math.PI / 180) - relativeX
    let y = vpy + r * Math.sin(angle * Math.PI / 180) - relativeY
    return { x, y }
  }
}
