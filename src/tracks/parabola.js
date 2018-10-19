import easing from '../easing'
import Track from '../track'

export default class Parabola extends Track {
  constructor (opt) {
    super(opt)
    this.defaultA = 0.0004
  }
  loop (t) {
    if (typeof this.endX !== 'number' || typeof this.endY !== 'number') {
      throw Error('endX|endY参数类型错误')
    }
    if (!this._s) this._s = this.endX - this.$ele.opt.x
    if (!this._sx) this._sx = this.$ele.opt.x
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
    const speed = p * this._s
    const _x = this._sx + speed
    const { x, y } = this.getPosition(this, _x)
    this.$ele.attr({
      x,
      y
    })
  }
  getPosition (ele, _x) {
    const sx = ele.$ele.opt.x
    const sy = ele.$ele.opt.y
    const endX = ele.endX
    const endY = ele.endY
    const relativeX = ele.relativeX || 0
    const relativeY = ele.relativeY || 0
    const a = this.defaultA
    if (!ele._b) ele._b = ((sy - endY) - a * (Math.pow(sx, 2) - Math.pow(endX, 2))) / (sx - endX)
    if (!ele._c) ele._c = sy - a * Math.pow(sx, 2) - ele._b * sx
    const b = ele._b
    const c = ele._c
    const x = _x - relativeX
    const y = (a * x * x + b * x + c) - relativeY
    return { x, y }
  }
}
