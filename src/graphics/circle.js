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
      this.drawUint()
    }
    ctx.restore()
  }
  drawUint (ctx2) {
    var ctx = ctx2 || this.ctx
    this.setGeneral(ctx2)
    this.setLine(ctx2)
    this.drawPath(ctx2 || null)
    if (this.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      let lineWidth = this.lineWidth || 1
      ctx.arc(this.r + lineWidth, this.r + lineWidth, this.r, 0, Math.PI * 2)
    } else {
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    let lineWidth = this.lineWidth || 1
    // +1 防止离屏画布过小
    this.cacheCanvas.width = 2 * (this.r + lineWidth) + 1
    this.cacheCanvas.height = 2 * (this.r + lineWidth) + 1
    this.drawUint(this.cacheCanvas.getContext('2d'))
  }
}
