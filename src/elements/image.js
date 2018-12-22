import Element from '../element'
import { createCtx } from '../utils/utils'
import { loadedResources } from '../utils/resource'
import SvgPath from 'svg-path-to-canvas'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  constructor (opt) {
    super(opt)
    this.cacheDraw()
  }
  draw (ctx) {
    if (this.attr('cache')) {
      ctx.drawImage(this.cacheCtx.canvas, this.opt.x, this.opt.y)
    } else {
      this.drawImg(ctx)
    }
  }
  drawImg (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    let image = loadedResources.get(this.attr('image'))
    ctx.save()
    this.setAttr(ctx)
    this.setForm(this.outline, true)
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
    this.w = this.opt.w ? this.opt.w : this.opt.image.width
    this.h = this.opt.h ? this.opt.h : this.opt.image.height
    this.outline = new SvgPath(`M ${this.attr('x')} ${this.attr('y')} h ${this.attr('w')} v ${this.attr('h')} h -${this.attr('w')} z`)
    this.cacheCtx.width = this.w
    this.cacheCtx.height = this.h
    this.drawImg(this.cacheCtx)
  }
}
