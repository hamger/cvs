
import Element from '../element'
import SvgPath from 'svg-path-to-canvas'
import { rect2svg, circle2svg } from '../utils/toSvg'
import { error, getMatrix } from '../utils/utils'

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
    this.outline = new SvgPath(d)
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
    this.outline
      .restore()
      .save()
      .beginPath()
    var matrix = getMatrix(this.attr('pos'), this.attr('transform'))
    this.setSvgAttr(this.outline)
    this.outline.transform(...matrix)
  }
}

export default Path
