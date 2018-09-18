import Element from '../element'

export default class Polygon extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    var ctx = this.ctx
    ctx.save()
    if (this.cache) ctx.drawImage(this.cacheCanvas, this.minX, this.minY)
    else this.drawUint()
    ctx.restore()
  }
  drawUint (ctx2) {
    var ctx = ctx2 || this.ctx
    this.setAttr(ctx)
    this.drawPath(ctx2 || null)
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    var ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      this.opt.points.forEach((item, index) => {
        if (index === 0) ctx.moveTo(item[0] - this.minX, item[1] - this.minY)
        else ctx.lineTo(item[0] - this.minX, item[1] - this.minY)
      })
    } else {
      this.opt.points.forEach((item, index) => {
        if (index === 0) ctx.moveTo(item[0], item[1])
        else ctx.lineTo(item[0], item[1])
      })
    }
    if (!this.opt.stroke) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    let x = []
    let y = []
    this.opt.points.forEach(item => {
      x.push(item[0])
      y.push(item[1])
    })
    this.minX = Math.min(...x)
    this.minY = Math.min(...y)
    this.cacheCanvas.width = Math.max(...x) - this.minX
    this.cacheCanvas.height = Math.max(...y) - this.minY
    this.drawUint(this.cacheCanvas.getContext('2d'))
  }
}
