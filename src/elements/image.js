import Element from '../element'
// import { createCtx } from '../utils/utils'
import { loadedResources } from '../utils/resource'
import SvgPath from 'svg-path-to-canvas'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  constructor (opt) {
    super(opt)
    this.getOutline()
  }
  draw (ctx) {
    this.drawImg(ctx)
  }
  drawImg (ctx = this.ctx) {
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
        this.attr('x'),
        this.attr('y'),
        this.attr('w'),
        this.attr('h')
      )
    } else if (this.attr('w') && this.attr('h')) {
      ctx.drawImage(this.image, this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
    } else {
      ctx.drawImage(this.image, this.attr('x'), this.attr('y'))
    }
    ctx.restore()
  }
  getOutline () {
    this.image = loadedResources.get(this.attr('image'))
    this.w = this.attr('w') ? this.attr('w') : this.image.width
    this.h = this.attr('h') ? this.attr('h') : this.image.height
    this.outline = new SvgPath(`M ${this.attr('x')} ${this.attr('y')} h ${this.w} v ${this.h} h -${this.w} z`)
    this.setSvgAttr(this.outline)
    this.setForm(this.outline, true)
  }
}
