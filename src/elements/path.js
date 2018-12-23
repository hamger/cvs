import Element from '../element'
import SvgPath from 'svg-path-to-canvas'
import { rect2svg, circle2svg } from '../utils/toSvg'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
    var d = this.attr('d')
    if (typeof d === 'object') {
      if (d.type === 'rect') {
        d = rect2svg(d)
      } else if (d.type === 'circle') {
        d = circle2svg(d)
      } else error('unexpected type of path.')
    }
    this.d = d
    this.getOutline()
  }
  draw (ctx) {
    ctx.save()
    this.setAttr(ctx)
    if (this.attr('stroke')) this.outline.to(ctx).stroke()
    else this.outline.to(ctx).fill()
    ctx.restore()
  }
  getOutline () {
    this.outline = new SvgPath(this.d)
    this.setSvgAttr(this.outline)
    this.setForm(this.outline, true)
  }
}

export default Path
