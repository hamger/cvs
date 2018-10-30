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
    if (this.opt.borderRadius) this.drawRoundRect(ctx2 || null)
    else this.drawPath(ctx2 || null)
    this.dye(ctx)
  }
  drawPath (ctx2) {
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) ctx.rect(this.lw, this.lw, this.opt.w, this.opt.h)
    else ctx.rect(this.opt.x, this.opt.y, this.opt.w, this.opt.h)
  }
  drawRoundRect (ctx2) {
    const { x, y, w, h, borderRadius: r } = this.opt
    let ctx = ctx2 || this.ctx
    let posA = [x + r, y]
    let posB = [x + w, y]
    let posC = [x + w, y + h]
    let posD = [x, y + h]
    let posE = [x, y]
    ctx.beginPath()
    ctx.moveTo(posA[0], posA[1])
    ctx.arcTo(posB[0], posB[1], posC[0], posC[1], r)
    ctx.arcTo(posC[0], posC[1], posD[0], posD[1], r)
    ctx.arcTo(posD[0], posD[1], posE[0], posE[1], r)
    ctx.arcTo(posE[0], posE[1], posA[0], posA[1], r)
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.opt.w + this.lw * 2
    this.cacheCanvas.height = this.opt.h + this.lw * 2
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
