import Element from '../element'

export default class Arc extends Element {
  draw () {
    var ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    this.setGeneral()
    this.setLine()
    ctx.arc(
      this.x,
      this.y,
      this.r,
      (this.startAngle * Math.PI) / 180,
      (this.endAngle * Math.PI) / 180,
      !!this.anticlockwise
    )
    if (this.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
}
