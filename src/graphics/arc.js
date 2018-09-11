import Element from '../element'

export default class Arc extends Element {
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
    ctx.arc(
      this.x,
      this.y,
      this.r,
      (this.startAngle * Math.PI) / 180,
      (this.endAngle * Math.PI) / 180,
      !!this.anticlockwise
    )
    if (!this.stroke) ctx.closePath()
  }
}
