import Element from '../element'

export default class Circle extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    let ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas,
        this.opt.x - this.halfW,
        this.opt.y - this.halfH)
    } else {
      this.setAttr(ctx)
      this.drawPath()
      this.dye(ctx)
    }
    ctx.restore()
  }
  drawPath () {
    this.ctx.beginPath()
    this.ctx.arc(this.opt.x, this.opt.y, this.opt.r, 0, Math.PI * 2)
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.opt.r + this.lw + this.p
    this.halfH = this.opt.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    let cacheCtx = this.cacheCanvas.getContext('2d')
    this.setAttr(cacheCtx)
    cacheCtx.arc(this.halfW, this.halfH, this.opt.r, 0, Math.PI * 2)
    this.dye(cacheCtx)
  }
}
