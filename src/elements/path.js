import Element from '../element'
import SvgPath from 'svg-path-to-canvas'
import { rect2svg, circle2svg } from '../utils/toSvg'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
  }
  render (ctx) {
    ctx.save()
    if (!this.cacheCtx || this.needUpdate) this.preload()
    ctx.translate(this.attr('x'), this.attr('y'))
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  preload () {
    const lw = this.attr('lineWidth')
    this.setOutline()
    this.cacheCtx = createCtx(this.bounds[2] + 2 * lw, this.bounds[3] + 2 * lw)
    this.setAttr(this.cacheCtx)
    this.cacheCtx.translate(lw, lw)
    if (this.attr('fill')) this.outline.to(this.cacheCtx).fill()
    if (this.attr('stroke')) this.outline.to(this.cacheCtx).stroke()
  }
  setOutline () {
    var d = this.attr('d')
    if (typeof d === 'object') {
      if (d.type === 'rect') {
        d = rect2svg(d)
      } else if (d.type === 'circle') {
        d = circle2svg(d)
      } else error('unexpected type of path.')
    }
    this.outline = new SvgPath(d)
    this.outline
      .restore()
      .save()
      .beginPath()
    this.setSvgAttr(this.outline)
    this.outline.transform(...this.attr('lastMatrix'))
  }
}

export default Path
