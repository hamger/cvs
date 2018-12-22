import Element from '../element'
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
        temp = `M ${d.cx - r[0]} ${d.cy - r[1]} a ${r[0]} ${r[1]} ${d.rotate || 0} 1 0 0 1 z`
        console.log(temp)
      } else error('unexpected type of path.')
      d = temp
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
