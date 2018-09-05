import Element from '../element'

export default class Rect extends Element {
  draw () {
    var ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    this.setGeneral()
    this.setLine()
    ctx.rect(this.x, this.y, this.w, this.h)
    if (this.stroke) ctx.stroke()
    else ctx.fill()
    ctx.restore()
  }
}
