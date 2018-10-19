import Element from '../element'

export default class Rect extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw (ctx) {
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas, this.opt.x - this.lw, this.opt.y - this.lw)
    } else {
      this.drawUnit()
    }
    ctx.restore()
  }
  drawUnit (ctx2) {
    let ctx = ctx2 || this.ctx
    this.setAttr(ctx)
    this.drawPath(ctx2 || null)
    this.dye(ctx)
  }
  drawPath (ctx2) {
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) ctx.rect(this.lw, this.lw, this.opt.w, this.opt.h)
    else ctx.rect(this.opt.x, this.opt.y, this.opt.w, this.opt.h)
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.opt.w + this.lw * 2
    this.cacheCanvas.height = this.opt.h + this.lw * 2
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
