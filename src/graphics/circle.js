import Element from '../element'

export default class Circle extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas,
        this.x - this.halfW,
        this.y - this.halfH)
    } else {
      this.drawUint()
    }
    ctx.restore()
  }
  drawUint (ctx2) {
    var ctx = ctx2 || this.ctx
    this.setGeneral(ctx)
    this.setLine(ctx)
    this.drawPath(ctx2 || null)
    if (this.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      ctx.arc(this.halfW, this.halfH, this.r, 0, Math.PI * 2)
    } else {
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.r + this.lw + this.p
    this.halfH = this.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUint(this.cacheCanvas.getContext('2d'))
  }
}
