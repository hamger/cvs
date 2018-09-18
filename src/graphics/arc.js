import Element from '../element'

export default class Arc extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    let ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(
        this.cacheCanvas,
        this.opt.x - this.halfW,
        this.opt.y - this.halfH
      )
    } else this.drawUnit()
    ctx.restore()
  }
  drawUnit (ctx2) {
    let ctx = ctx2 || this.ctx
    this.setAttr(ctx)
    this.setFunc(ctx)
    this.drawPath(ctx2 || null)
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      ctx.arc(
        this.halfW,
        this.halfH,
        this.opt.r,
        (this.opt.startAngle * Math.PI) / 180,
        (this.opt.endAngle * Math.PI) / 180,
        !!this.opt.anticlockwise
      )
    } else {
      ctx.arc(
        this.opt.x,
        this.opt.y,
        this.opt.r,
        (this.opt.startAngle * Math.PI) / 180,
        (this.opt.endAngle * Math.PI) / 180,
        !!this.opt.anticlockwise
      )
    }
    if (!this.opt.stroke) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.opt.r + this.lw + this.p
    this.halfH = this.opt.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
