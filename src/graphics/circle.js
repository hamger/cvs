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
      this.drawUint()
    }
    ctx.restore()
  }
  drawUint (ctx2) {
    let ctx = ctx2 || this.ctx
    this.setAttr(ctx)
    this.drawPath(ctx2 || null)
    this.dye(ctx)
  }
  drawPath (ctx2) {
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      ctx.arc(this.halfW, this.halfH, this.opt.r, 0, Math.PI * 2)
    } else {
      ctx.arc(this.opt.x, this.opt.y, this.opt.r, 0, Math.PI * 2)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.opt.r + this.lw + this.p
    this.halfH = this.opt.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUint(this.cacheCanvas.getContext('2d'))
  }
}
