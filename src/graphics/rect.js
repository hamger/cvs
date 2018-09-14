import Element from '../element'

export default class Rect extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(this.cacheCanvas, this.x, this.y)
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
      ctx.rect(0, 0, this.w, this.h)
    } else {
      ctx.rect(this.x, this.y, this.w, this.h)
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    var cacheCtx = this.cacheCanvas.getContext('2d')
    this.cacheCanvas.width = this.w
    this.cacheCanvas.height = this.h
    this.setGeneral(cacheCtx)
    this.setLine(cacheCtx)
    this.drawPath(cacheCtx)
    if (this.stroke) cacheCtx.stroke()
    else cacheCtx.fill()
  }
}
