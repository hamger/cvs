import Element from '../element'

export default class Circle extends Element {
  draw () {
    var ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    this.setGeneral()
    this.setLine()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    if (this.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
}
