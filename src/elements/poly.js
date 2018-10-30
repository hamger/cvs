import Element from '../element'

export default class Polygon extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw (ctx) {
    ctx.save()
    if (this.cache) ctx.drawImage(this.cacheCanvas, this.minX, this.minY)
    else this.drawUint()
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
      this.opt.points.forEach((item, index) => {
        if (index === 0) ctx.moveTo(item.x - this.minX, item.y - this.minY)
        else ctx.lineTo(item.x - this.minX, item.y - this.minY)
      })
    } else {
      this.opt.points.forEach((item, index) => {
        if (index === 0) ctx.moveTo(item.x, item.y)
        else ctx.lineTo(item.x, item.y)
      })
    }
    if (!this.opt.stroke) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    let x = []
    let y = []
    this.opt.points.forEach(item => {
      x.push(item.x)
      y.push(item.y)
    })
    this.minX = Math.min(...x)
    this.minY = Math.min(...y)
    this.cacheCanvas.width = Math.max(...x) - this.minX
    this.cacheCanvas.height = Math.max(...y) - this.minY
    this.drawUint(this.cacheCanvas.getContext('2d'))
  }
}
