import Element from '../element'
import toSvg from '../utils/toSvg'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
    // 考虑线宽和 1 像素的图像截断
    this.p = Math.floor(this.attr('lineWidth') / 2) + 1
  }
  render (ctx) {
    ctx.save()
    ctx.translate(this.attr('x'), this.attr('y'))
    if (!this.cacheCtx || this.needUpdate) this.buffer()
    ctx.translate(this.outline.bounds[0] - this.p, this.outline.bounds[1] - this.p)
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  buffer () {
    this.setOutline()
    this.cacheCtx = createCtx(this.outline.size[0] + 2 * this.p, this.outline.size[1] + 2 * this.p)
    this.changeState(this.cacheCtx)
    this.cacheCtx.translate(-this.outline.bounds[0] + this.p, -this.outline.bounds[1] + this.p)
    if (this.attr('fill')) this.outline.to(this.cacheCtx).fill()
    if (this.attr('stroke')) this.outline.to(this.cacheCtx).stroke()
  }
  setOutline () {
    this.outline = toSvg(this.attr('d'))
    this.outline
      .restore()
      .save()
      .beginPath()
    if (this.attr('lineWidth')) this.outline.lineWidth(this.attr('lineWidth'))
    if (this.attr('lineCap')) this.outline.lineCap(this.attr('lineCap'))
    if (this.attr('lineJoin')) this.outline.lineJoin(this.attr('lineJoin'))
    this.outline.transform(...this.attr('lastMatrix'))
  }
}

export default Path
