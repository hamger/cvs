import Element from '../element'

export default class Polygon extends Element {
  draw () {
    var ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    this.setGeneral()
    this.setLine()
    this.points.forEach((item, index) => {
      if (index === 0) ctx.moveTo(item[0], item[1])
      else ctx.lineTo(item[0], item[1])
    })
    if (this.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
}
