import Element from '../element'
import { createCtx } from '../utils/utils'
import { loadedResources } from '../utils/resource'
import SvgPath from 'svg-path-to-canvas'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  constructor (opt) {
    super(opt)
    this.update()
  }
  draw (ctx) {
    if (this.attr('cache')) {
      ctx.drawImage(this.cacheCtx.canvas, this.attr('x'), this.attr('y'))
    } else {
      this.drawImg(ctx)
    }
  }
  drawImg (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    ctx.save()
    this.setAttr(ctx)
    this.setForm(ctx)
    if (this.opt.sw && this.opt.sh) {
      ctx.drawImage(
        this.image,
        this.opt.sx,
        this.opt.sy,
        this.opt.sw,
        this.opt.sh,
        this.origin.x,
        this.origin.y,
        this.attr('w'),
        this.attr('h')
      )
    } else if (this.attr('w') && this.attr('h')) {
      ctx.drawImage(this.image, this.origin.x, this.origin.y, this.attr('w'), this.attr('h'))
    } else {
      ctx.drawImage(this.image, this.origin.x, this.origin.y)
    }
    ctx.restore()
  }
  update () {
    this.image = loadedResources.get(this.attr('image'))
    this.w = this.attr('w') ? this.attr('w') : this.image.width
    this.h = this.attr('h') ? this.attr('h') : this.image.height
    this.outline = new SvgPath(`M ${this.attr('x')} ${this.attr('y')} h ${this.w} v ${this.h} h -${this.w} z`)
    this.setSvgAttr(this.outline)
    this.setForm(this.outline, true)
    this.cacheCtx = createCtx(this.w, this.h)
    this.drawImg(this.cacheCtx)
  }
}
