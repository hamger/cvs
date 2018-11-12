import easing from '../easing'
import Track from '../track'

export default class Round extends Track {
  constructor (opt) {
    super(opt)
    // this.activeAngle = opt.activeAngle || 360
    // this.angle = opt.angle || 0
    // this.relativeX = opt.relativeX || 0
    // this.relativeY = opt.relativeY || 0
    // this.r = opt.r || 100
    Object.assign(this, {
      activeAngle: 360,
      angle: 0,
      relativeX: 0,
      relativeY: 0,
      r: 100
    }, opt)
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
    const speed = p * this.activeAngle
    const move = () => {
      let angle
      if (this.anticlockwise === false) {
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
    if (!this.activeAngle || speed < this.activeAngle) move()
  }
  getPosition (ele, angle) {
    const relativeX = ele.relativeX
    const relativeY = ele.relativeY
    const centerX = ele.centerX
    const centerY = ele.centerY
    const r = ele.r
    let x = centerX + r * Math.cos(angle * Math.PI / 180) - relativeX
    let y = centerY + r * Math.sin(angle * Math.PI / 180) - relativeY
    return { x, y }
  }
}
