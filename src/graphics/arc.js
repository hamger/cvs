import Element from '../element'

export default class Arc extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r)
    } else {
      this.setGeneral()
      this.setLine()
      this.drawPath()
      if (this.stroke) ctx.stroke()
      else ctx.fill()
    }
    ctx.restore()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      let lineWidth = this.lineWidth || 1
      ctx.arc(
        this.r + lineWidth,
        this.r + lineWidth,
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
    var cacheCtx = this.cacheCanvas.getContext('2d')
    let lineWidth = this.lineWidth || 1
    this.cacheCanvas.width = 2 * (this.r + lineWidth)
    this.cacheCanvas.height = 2 * (this.r + lineWidth)
    cacheCtx.save()
    this.setGeneral(cacheCtx)
    this.setLine(cacheCtx)
    this.drawPath(cacheCtx)
    if (this.stroke) cacheCtx.stroke()
    else cacheCtx.fill()
    cacheCtx.restore()
  }
}
