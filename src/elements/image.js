import Element from '../element'
import { getMatrix } from '../utils/utils'
import { loadedResources } from '../utils/resource'
import SvgPath from 'svg-path-to-canvas'
// ctx.drawImage() 参数解释:
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
export default class Image extends Element {
  constructor (opt) {
    super(opt)
    this.image = loadedResources.get(this.attr('image'))
    this.w = this.attr('w') ? this.attr('w') : this.image.width
    this.h = this.attr('h') ? this.attr('h') : this.image.height
    this.outline = new SvgPath(
      `M ${0} ${0} h ${this.w} v ${this.h} h -${this.w} z`
    )
    this.getOutline()
  }
  draw (ctx) {
    this.drawImg(ctx)
  }
  drawImg (ctx = this.ctx) {
    ctx.save()
    this.setAttr(ctx)
    this.usePos(ctx)
    this.setForm(ctx)
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
  getOutline () {
    this.outline
      .restore()
      .save()
      .beginPath()
    var matrix = getMatrix(this.attr('pos'), this.attr('transform'))
    this.setSvgAttr(this.outline)
    this.outline.transform(...matrix)
  }
}
