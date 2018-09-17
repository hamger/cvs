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
        this.x - this.halfW,
        this.y - this.halfH
      )
    } else this.drawUnit()
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
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      ctx.arc(
        this.halfW,
        this.halfH,
        this.r,
        (this.startAngle * Math.PI) / 180,
        (this.endAngle * Math.PI) / 180,
        !!this.anticlockwise
      )
    } else {
      ctx.arc(
        this.x,
        this.y,
        this.r,
        (this.startAngle * Math.PI) / 180,
        (this.endAngle * Math.PI) / 180,
        !!this.anticlockwise
      )
    }
    if (!this.stroke) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.r + this.lw + this.p
    this.halfH = this.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
