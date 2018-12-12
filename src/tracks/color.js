import easing from '../utils/easing'
import Track from '../track'

export default class Color extends Track {
  constructor (opt) {
    super(opt)
    this.colors = opt.colors
  }
  loop (t) {
    !this.colorMap && this.colorPalette(this.colors)
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
    const colorArr = this.colorMap
    const offset = (p * (colorArr.length / 4 - 1)).toFixed(0)
    this.$ele.attr({
      fill: 'rgba(' + [
        colorArr[offset * 4 + 0],
        colorArr[offset * 4 + 1],
        colorArr[offset * 4 + 2],
        colorArr[offset * 4 + 3]
      ] + ')'
    })
  }
  colorPalette (gradient) {
    let canvas = document.createElement('canvas')
    canvas.width = '1'
    canvas.height = '256'
    let ele = canvas.getContext('2d'),
      grad = ele.createLinearGradient(0, 0, 1, 256)
    gradient.forEach(function (item) {
      grad.addColorStop(item[0], item[1])
    })
    ele.fillStyle = grad
    ele.fillRect(0, 0, 1, 256)
    this.colorMap = ele.getImageData(0, 0, 1, 256).data
  }
}
