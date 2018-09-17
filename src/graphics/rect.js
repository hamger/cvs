import Element from '../element'

export default class Rect extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas, this.x - this.ld, this.y - this.ld)
    } else {
      this.drawUnit()
    }
    ctx.restore()
  }
  drawUnit (ctx2) {
    let ctx = ctx2 || this.ctx
    this.setGeneral(ctx)
    this.setLine(ctx)
    this.setFunc(ctx)
    this.drawPath(ctx2 || null)
    if (this.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) ctx.rect(this.ld, this.ld, this.w, this.h)
    else ctx.rect(this.x, this.y, this.w, this.h)
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.ld = 0
    if (this.stroke && this.lineWidth) this.ld = this.lineWidth / 2
    this.cacheCanvas.width = this.w + this.ld * 2
    this.cacheCanvas.height = this.h + this.ld * 2
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
