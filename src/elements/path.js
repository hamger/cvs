import Element from '../element'
import SvgPath from 'svg-path-to-canvas'
import { rect2svg, circle2svg } from '../utils/toSvg'
import { error, getMatrix } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
    // this.preload()
  }
  draw (ctx) {
    ctx.save()
    this.matrix = getMatrix(
      [this.attr('x'), this.attr('y')],
      this.attr('transform')
    )
    if (!this.cacheCtx || this.needUpdate) this.preload()
    this.setAttr(ctx)
    if (this.attr('fill')) this.outline.to(ctx).fill()
    if (this.attr('stroke')) this.outline.to(ctx).stroke()
    ctx.restore()
  }
  preload () {
    var d = this.attr('d')
    if (typeof d === 'object') {
      if (d.type === 'rect') {
        d = rect2svg(d)
      } else if (d.type === 'circle') {
        d = circle2svg(d)
      } else error('unexpected type of path.')
    }
    this.d = d
    this.setOutline()
  }
  setOutline () {
    this.outline = new SvgPath(this.d)
    this.outline
      .restore()
      .save()
      .beginPath()
    this.setSvgAttr(this.outline)
    this.outline.transform(...this.matrix)
  }
}

export default Path
