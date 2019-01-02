import Element from '../element'
import toSvg from '../utils/toSvg'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
  }
  render (ctx) {
    ctx.save()
    ctx.translate(this.attr('x'), this.attr('y'))
    ctx.transform(...this.attr('lastMatrix'))
    if (!this.cacheCtx || this.needUpdate) this.buffer()
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  buffer () {
    const lw = this.attr('lineWidth') || 0
    this.setOutline()
    this.cacheCtx = createCtx(this.size[0] + 2 * (lw + 1), this.size[1] + 2 * (lw + 1))
    this.changeState(this.cacheCtx)
    this.cacheCtx.translate(-this.bounds[0] + (lw + 1), -this.bounds[0] + (lw + 1))
    if (this.attr('fill')) this.outline.to(this.cacheCtx).fill()
    if (this.attr('stroke')) this.outline.to(this.cacheCtx).stroke()
  }
  setOutline () {
    this.outline = toSvg(this.attr('d'))
    this.outline
      .restore()
      .save()
      .beginPath()
    this.setSvgAttr(this.outline)
  }
}

export default Path
