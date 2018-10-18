import Element from '../element'

// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Img extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw (ctx) {
    this.w = this.opt.dw ? this.opt.dw : this.opt.img.width
    this.h = this.opt.dh ? this.opt.dh : this.opt.img.height
    if (this.cache) {
      this.cacheDraw()
      ctx.drawImage(this.cacheCanvas, this.opt.dx, this.opt.dy)
    } else {
      this.drawUnit()
    }
  }
  drawPath (ctx) {
    ctx.beginPath()
    ctx.rect(this.opt.dx, this.opt.dy, this.w, this.h)
  }
  drawUnit (ctx2) {
    let ctx = ctx2 || this.ctx
    let img = this.opt.img
    ctx.save()
    this.setAttr(ctx)
    if (ctx2) {
      if (this.opt.sw && this.opt.sh) {
        ctx.drawImage(
          img,
          this.opt.sx,
          this.opt.sy,
          this.opt.sw,
          this.opt.sh,
          0,
          0,
          this.opt.dw,
          this.opt.dh
        )
      } else if (this.opt.dw && this.opt.dh) {
        ctx.drawImage(img, 0, 0, this.opt.dw, this.opt.dh)
      } else {
        ctx.drawImage(img, 0, 0)
      }
    } else {
      if (this.opt.sw && this.opt.sh) {
        ctx.drawImage(
          img,
          this.opt.sx,
          this.opt.sy,
          this.opt.sw,
          this.opt.sh,
          this.opt.dx,
          this.opt.dy,
          this.opt.dw,
          this.opt.dh
        )
      } else if (this.opt.dw && this.opt.dh) {
        ctx.drawImage(img, this.opt.dx, this.opt.dy, this.opt.dw, this.opt.dh)
      } else {
        ctx.drawImage(img, this.opt.dx, this.opt.dy)
      }
    }
    ctx.restore()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.w
    this.cacheCanvas.height = this.h
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
