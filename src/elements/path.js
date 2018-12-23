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
    this.path = new SvgPath(d)
    this.outline = new SvgPath(d)
    this.setSvgAttr(this.outline)
    this.setForm(this.outline, true)
    // this.cacheCtx = createCtx()
  }
  draw (ctx) {
    ctx.save()
    this.update(this.ctx)
    // ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  update (ctx) {
    ctx.save()
    this.setAttr(ctx)
    this.setSvgAttr(this.path)
    this.setForm(this.path, true)
    if (this.attr('stroke')) this.path.to(ctx).stroke()
    else this.path.to(ctx).fill()
    ctx.restore()
  }
}

export default Path
