import Element from '../element'
import { createCtx } from '../utils/utils'
import { loadedResources } from '../utils/resource'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  // export default class Image extends element {
  constructor (opt) {
    super(opt)
    if (loadedResources.has(this.opt.image)) {
      this.opt.image = loadedResources.get(this.opt.image)
    }
    this.w = this.opt.w ? this.opt.w : this.opt.image.width
    this.h = this.opt.h ? this.opt.h : this.opt.image.height
    if (this.attr('cache')) this.cacheDraw()
  }
  draw (ctx) {
    if (this.attr('cache')) {
      ctx.drawImage(this.cacheCtx.canvas, this.opt.x, this.opt.y)
    } else {
      this.drawImg(ctx)
    }
  }
  outline (ctx) {
    ctx.beginPath()
    ctx.rect(this.opt.x, this.opt.y, this.w, this.h)
  }
  drawImg (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    let image = this.opt.image
    ctx.save()
    this.setAttr(ctx)
    if (this.opt.sw && this.opt.sh) {
      ctx.drawImage(
        image,
        this.opt.sx,
        this.opt.sy,
        this.opt.sw,
        this.opt.sh,
        this.origin.x,
        this.origin.y,
        this.opt.w,
        this.opt.h
      )
    } else if (this.opt.w && this.opt.h) {
      ctx.drawImage(image, this.origin.x, this.origin.y, this.opt.w, this.opt.h)
    } else {
      ctx.drawImage(image, this.origin.x, this.origin.y)
    }
    ctx.restore()
  }
  cacheDraw () {
    this.cacheCtx = createCtx(this.w, this.h)
    this.drawImg(this.cacheCtx)
  }
}
