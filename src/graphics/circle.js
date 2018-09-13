import Element from '../element'
import { int } from '../utils'
export default class Circle extends Element {
  constructor (opt) {
    super(opt)
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCtx = this.cacheCanvas.getContext('2d')
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache === 0) this.cacheDraw()
    ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r)
    ctx.restore()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      let lineWidth = this.lineWidth || 1
      ctx.arc(int(this.r + lineWidth), int(this.r + lineWidth), int(this.r), 0, Math.PI * 2)
    } else {
      ctx.arc(int(this.x), int(this.y), int(this.r), 0, Math.PI * 2)
    }
  }
  cacheDraw () {
    let lineWidth = this.lineWidth || 1
    this.cacheCanvas.width = 2 * int(this.r + lineWidth)
    this.cacheCanvas.height = 2 * int(this.r + lineWidth)
    var cacheCtx = this.cacheCtx
    cacheCtx.save()
    this.setGeneral(cacheCtx)
    this.setLine(cacheCtx)
    this.drawPath(cacheCtx)
    if (this.stroke) cacheCtx.stroke()
    else cacheCtx.fill()
    cacheCtx.restore()
    this.cache++
  }
}
