import Track from '../track'
import { error, tolerance } from '../utils/utils'

export default class Bezier extends Track {
  constructor (opt) {
    super(opt)
  }
  loop (t) {
    const p2 = t / this.duration
    if (p2 > 1) return
    let p = 0
    // 设置了折返的的情况
    if (this.retrace) {
      if (p2 <= 0.5) {
        // 贝塞尔函数涉及的占比比例，0<=p<=1
        p = this.calculatePercentage(p2 * 2)
      } else {
        let p3 = 1 - (p2 - 0.5) * 2
        // 防止折返后终点不在起点上
        if ((1 - p2) * this.duration < tolerance) p3 = 0
        p = this.calculatePercentage(p3)
      }
    } else {
      // 贝塞尔函数涉及的占比比例，0<=p<=1
      p = this.calculatePercentage(p2)
    }
    this.drawnode(p)
  }
  drawnode (p) {
    this.$ele.attr(bezierRule(this.points, p))
  }
}

// 贝塞尔曲线计算公式
function bezierRule (points, p) {
  let x = 0
  let y = 0
  const n = points.length - 1
  points.forEach(function (item, index) {
    const a = combination(n, index)
    const b = Math.pow(1 - p, n - index)
    const c = Math.pow(p, index)
    x += a * item.x * b * c
    y += a * item.y * b * c
  })
  return { x: x, y: y }
}

// 求解杨辉三角的第 i 行，第 j 列数值(从零开始计数)
function combination (i, j) {
  // 每行的第一个数和最后一个数为 1
  if (j === 0) return 1
  else if (i === j) return 1
  else return combination(i - 1, j - 1) + combination(i - 1, j)
}
