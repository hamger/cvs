import easing from '../easing'
import Track from '../track'

export default class Bezier extends Track {
  constructor (opt) {
    super(opt)
    this.bezierNodes = [] // 绘制内部控制点的数组
    this.nextNodes = [] // 下一帧绘制的控制点
  }
  loop (p2) {
    // 设置了折返的的情况
    if (this.retrace) {
      let p = 0
      if (p2 <= 0.5) {
        // 贝塞尔函数涉及的占比比例，0<=p<=1
        p = easing[this.easing](p2 * 2)
        this.drawnode(this.nextNodes.length ? this.nextNodes : this.points, p)
      } else {
        let p3 = 1 - (p2 - 0.5) * 2
        // 防止折返后终点不在起点上
        if ((1 - p2) * this.duration < 80) p3 = 0
        p = easing[this.easing](p3)
        this.drawnode(this.nextNodes.length ? this.nextNodes : this.points, p)
      }
    } else {
      // 贝塞尔函数涉及的占比比例，0<=p<=1
      p = easing[this.easing](p2)
      this.drawnode(this.nextNodes.length ? this.nextNodes : this.points, p)
    }
  }
  drawnode (nodes, p) {
    if (!nodes.length) return
    if (nodes.length === 1) {
      this.bezierNodes.push(nodes[0])
      if (this.bezierNodes.length > 1) {
        let len = this.bezierNodes.length
        this.$ele.attr({
          x: this.bezierNodes[len - 1].x,
          y: this.bezierNodes[len - 1].y
        })
      }
    }
    this.nextNodes = []
    if (nodes.length) {
      for (let i = 0; i < nodes.length - 1; i++) {
        let arr = [
          {
            x: nodes[i].x,
            y: nodes[i].y
          },
          {
            x: nodes[i + 1].x,
            y: nodes[i + 1].y
          }
        ]
        this.nextNodes.push(getLocation(arr, p))
      }
    }
  }
}

// 通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
function getLocation (arr, p) {
  let x = 0,
    y = 0,
    n = arr.length - 1
  arr.forEach(function (item, index) {
    if (!index) {
      x += item.x * Math.pow(1 - p, n - index) * Math.pow(p, index)
      y += item.y * Math.pow(1 - p, n - index) * Math.pow(p, index)
    } else {
      x +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.x *
        Math.pow(1 - p, n - index) *
        Math.pow(p, index)
      y +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.y *
        Math.pow(1 - p, n - index) *
        Math.pow(p, index)
    }
  })
  return {
    x: x,
    y: y
  }
}

// 递归阶乘
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
