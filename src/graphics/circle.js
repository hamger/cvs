import Element from '../element'

export default class Circle extends Element {
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
    var ctx = this.ctx
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    if (!this.stroke) ctx.closePath()
  }
}
