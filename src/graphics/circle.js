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
        0,
        Math.PI * 2
      )
    } else {
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    var cacheCtx = this.cacheCanvas.getContext('2d')
    let lineWidth = this.lineWidth || 1
    // +1 防止离屏画布过小
    this.cacheCanvas.width = 2 * (this.r + lineWidth) + 1
    this.cacheCanvas.height = 2 * (this.r + lineWidth) + 1
    cacheCtx.save()
    this.setGeneral(cacheCtx)
    this.setLine(cacheCtx)
    this.drawPath(cacheCtx)
    if (this.stroke) cacheCtx.stroke()
    else cacheCtx.fill()
    cacheCtx.restore()
  }
}
