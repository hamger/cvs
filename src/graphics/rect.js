import Element from '../element'

export default class Rect extends Element {
  draw () {
    var ctx = this.ctx
    ctx.save()
    this.setGeneral()
    this.setLine()
    this.drawPath()
    if (this.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
  drawPath () {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.w, this.h)
  }
}
