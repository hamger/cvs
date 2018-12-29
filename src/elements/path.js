import Element from '../element'
import SvgPath from 'svg-path-to-canvas'
import { rect2svg, circle2svg } from '../utils/toSvg'
import { error } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
  }
  render (ctx) {
    ctx.save()
    if (!this.cacheCtx) this.preload()
    this.setAttr(ctx)
    ctx.translate(this.attr('x'), this.attr('y'))
    if (this.attr('fill')) this.outline.to(ctx).fill()
    if (this.attr('stroke')) this.outline.to(ctx).stroke()
    ctx.restore()
  }
  preload () {
    this.setOutline()
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
    // this.outline.translate(this.attr('x'), this.attr('y'))
  }
}

export default Path
