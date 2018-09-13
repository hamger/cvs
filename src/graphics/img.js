import Element from '../element'

// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Img extends Element {
  constructor (opt) {
    super(opt)
    if (this.cache) this.cacheDraw()
  }
  draw () {
    if (this.cache) {
      this.cacheDraw()
      this.ctx.drawImage(this.cacheCanvas, this.dx, this.dy)
    } else {
      this.drawImg()
    }
  }
  drawPath () {
    var ctx = this.ctx
    ctx.beginPath()
    ctx.rect(this.dx, this.dy, this.w, this.h)
  }
  drawImg (ctx2) {
    let ctx = ctx2 || this.ctx
    let img = this.img
    ctx.save()
    this.setGeneral()
    if (ctx2) {
      if (this.sw && this.sh) {
        ctx.drawImage(
          img,
          this.sx,
          this.sy,
          this.sw,
          this.sh,
          0,
          0,
          this.dw,
          this.dh
        )
      } else if (this.dw && this.dh) {
        ctx.drawImage(img, 0, 0, this.dw, this.dh)
      } else {
        ctx.drawImage(img, 0, 0)
      }
    } else {
      if (this.sw && this.sh) {
        ctx.drawImage(
          img,
          this.sx,
          this.sy,
          this.sw,
          this.sh,
          this.dx,
          this.dy,
          this.dw,
          this.dh
        )
      } else if (this.dw && this.dh) {
        ctx.drawImage(img, this.dx, this.dy, this.dw, this.dh)
      } else {
        ctx.drawImage(img, this.dx, this.dy)
      }
    }
    ctx.restore()
  }
  cacheDraw () {
    var img = this.img
    this.cacheCanvas = document.createElement('canvas')
    var cacheCtx = this.cacheCanvas.getContext('2d')
    this.w = this.dw ? this.dw : img.width
    this.h = this.dh ? this.dh : img.height
    this.cacheCanvas.width = this.w
    this.cacheCanvas.height = this.h
    this.drawImg(cacheCtx)
  }
}
