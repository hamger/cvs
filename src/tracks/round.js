import Track from '../track'
import { getFloatNum, error } from '../utils/utils'

export default class Round extends Track {
  constructor (opt) {
    super(opt)
    Object.assign(this, {
      activeAngle: 360,
      relativeX: 0,
      relativeY: 0,
      anticlockwise: true,
    }, opt)
  }
  loop (t) {
    const { centerX, centerY } = this
    const x = this.$ele.attr('x')
    const y = this.$ele.attr('y')
    const ex = x - centerX
    const ey = y - centerY
    const initAngle = ex >= 0 ? Math.atan(ey / ex) * 180 / Math.PI : Math.atan(ey / ex) * 180 / Math.PI + 180
    const initR = Math.sqrt(Math.pow(ey, 2) + Math.pow(ex, 2))
    if (!this.angle) this.angle = initAngle
    if (!this.r) this.r = initR
    if (typeof this.centerX !== 'number' || typeof this.centerY !== 'number') {
      error('centerX|centerY参数类型错误')
    }
    const p2 = t / this.duration
    if (p2 > 1) return
    let p = 0
    if (this.retrace) {
      if (p2 <= 0.5) {
        // 贝塞尔函数涉及的占比比例，0<=p<=1
        p = this.calculatePercentage(p2 * 2)
      } else {
        let p3 = 1 - (p2 - 0.5) * 2
        // 防止折返后终点不在起点上
        if ((1 - p2) * this.duration < 80) p3 = 0
        p = this.calculatePercentage(p3)
      }
    } else {
      p = this.calculatePercentage(p2)
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
    const relativeX = typeof ele.relativeX === 'number' ? ele.relativeX : this.$ele.attr('w') * getFloatNum(ele.relativeX)
    const relativeY = typeof ele.relativeY === 'number' ? ele.relativeY : this.$ele.attr('h') * getFloatNum(ele.relativeY)
    const centerX = ele.centerX
    const centerY = ele.centerY
    const r = ele.r
    let x = centerX + r * Math.cos(angle * Math.PI / 180) - relativeX
    let y = centerY + r * Math.sin(angle * Math.PI / 180) - relativeY
    return { x, y }
  }
}
