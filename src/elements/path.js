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
    ctx.translate(this.path.bounds[0], this.path.bounds[1])
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  buffer () {
    const lw = this.attr('lineWidth') || 0
    this.setOutline()
    this.cacheCtx = createCtx(this.path.size[0] + 2 * (lw + 1), this.path.size[1] + 2 * (lw + 1))
    this.changeState(this.cacheCtx)
    this.cacheCtx.translate(-this.path.bounds[0] + (lw + 1), -this.path.bounds[0] + (lw + 1))
    if (this.attr('fill')) this.path.to(this.cacheCtx).fill()
    if (this.attr('stroke')) this.path.to(this.cacheCtx).stroke()
  }
  setOutline () {
    this.path = toSvg(this.attr('d'))
    this.outline = toSvg(this.attr('d'))
    this.outline
      .restore()
      .save()
      .beginPath()
    this.setSvgAttr(this.outline)
    this.outline.transform(...this.attr('lastMatrix'))
  }
}

export default Path
