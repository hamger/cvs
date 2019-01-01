import Element from '../element'
import { createCtx } from '../utils/utils'
import { loadedResources } from '../utils/resource'
import SvgPath from '../svgPath'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  constructor (opt) {
    super(opt)
  }
  render (ctx) {
    ctx.save()
    ctx.translate(this.attr('x'), this.attr('y'))
    ctx.transform(...this.attr('lastMatrix'))
    if (!this.cacheCtx) this.preload()
    this.changeState(ctx)
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  preload () {
    this.setOutline()
    this.cacheCtx = createCtx(this.w, this.h)
    this.drawImg(this.cacheCtx)
  }
  drawImg (ctx) {
    ctx.save()
    this.changeState(ctx)
    if (this.attr('sw') && this.attr('sh')) {
      ctx.drawImage(
        this.image,
        this.attr('sx'),
        this.attr('sy'),
        this.attr('sw'),
        this.attr('sh'),
        0,
        0,
        this.attr('w'),
        this.attr('h')
      )
    } else if (this.attr('w') && this.attr('h')) {
      ctx.drawImage(this.image, 0, 0, this.attr('w'), this.attr('h'))
    } else {
      ctx.drawImage(this.image, 0, 0)
    }
    ctx.restore()
  }
  setOutline () {
    // if (this.outline && !this.needUpdate) return
    this.image = loadedResources.get(this.attr('image'))
    this.w = this.attr('w') ? this.attr('w') : this.image.width
    this.h = this.attr('h') ? this.attr('h') : this.image.height
    this.outline = new SvgPath(
      `M ${0} ${0} h ${this.w} v ${this.h} h -${this.w} z`
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    this.outline.transform(...this.attr('lastMatrix'))
  }
}
