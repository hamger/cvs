import Element from '../element'
import Circle from './circle'
import Rect from './rect'
import SvgPath from 'svg-path-to-canvas'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
    var d = this.attr('path')
    if (typeof d === 'object') {
      let temp = ''
      if (d.type === 'rect') {
        temp = `M ${d.x} ${d.y} h ${d.w} v ${d.h} h ${-d.w} z`
      } else if (d.type === 'circle') {
        let r = []
        if (typeof d.r === 'number') r = [d.r, d.r]
        else r = d.r
        temp = `M ${d.cx - r[0]} ${d.cy - r[1]} A ${r[0]} ${r[1]} ${d.rotate} 0 1 ${d.cx - r[0]} ${d.cy - r[1]}`
      } else error('unexpected type of path.')
      d = temp
    }
    this.path = new SvgPath(d)
    this.outline = new SvgPath(d)
    this.setAttr(this.outline)
    this.setForm(this.outline, true)
    // this.drawOutline(this.outline, this.attr())
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
    this.setForm(this.path, true)
    if (this.attr('stroke')) this.path.to(ctx).stroke()
    else this.path.to(ctx).fill()
    ctx.restore()
  }
}

Path.Circle = Circle
Path.Rect = Rect

export default Path
