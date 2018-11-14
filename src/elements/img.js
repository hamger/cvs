import Element from '../element'
import {loadedResources} from '../resource'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Img extends Element {
  constructor (opt) {
    super(opt)
    if (loadedResources.has(this.opt.img)) {
      this.opt.img = loadedResources.get(this.opt.img)
    }
    if (this.cache) this.cacheDraw()
  }
  draw (ctx) {
    this.w = this.opt.w ? this.opt.w : this.opt.img.width
    this.h = this.opt.h ? this.opt.h : this.opt.img.height
    if (this.cache) {
      this.cacheDraw()
      ctx.drawImage(this.cacheCanvas, this.opt.x, this.opt.y)
    } else {
      this.drawUnit()
    }
  }
  drawPath (ctx) {
    ctx.beginPath()
    ctx.rect(this.opt.x, this.opt.y, this.w, this.h)
  }
  drawUnit (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    let img = this.opt.img
    ctx.save()
    this.setAttr(ctx)
    if (cacheCtx) {
      if (this.opt.sw && this.opt.sh) {
        ctx.drawImage(
          img,
          this.opt.sx,
          this.opt.sy,
          this.opt.sw,
          this.opt.sh,
          0,
          0,
          this.opt.w,
          this.opt.h
        )
      } else if (this.opt.w && this.opt.h) {
        ctx.drawImage(img, 0, 0, this.opt.w, this.opt.h)
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
          this.opt.x,
          this.opt.y,
          this.opt.w,
          this.opt.h
        )
      } else if (this.opt.w && this.opt.h) {
        ctx.drawImage(img, this.opt.x, this.opt.y, this.opt.w, this.opt.h)
      } else {
        ctx.drawImage(img, this.opt.x, this.opt.y)
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
