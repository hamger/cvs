import Element from '../element'
import Circle from './circle'
import Rect from './rect'
import SvgPath from 'svg-path-to-canvas'
import { error, createCtx } from '../utils/utils'

class Path extends Element {
  constructor (opt) {
    super(opt)
    this.outline = new SvgPath(this.attr('path'))
  }
  draw (ctx) {
    ctx.save()
    if (!this.cacheCtx) this.update()
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  update () {
    this.drawOutline(this.outline, this.attr())
    if (!this.cacheCtx) this.cacheCtx = createCtx(this.layer.width, this.layer.height)
    if (this.attr('stroke')) this.outline.to(this.cacheCtx).stroke()
    else this.outline.to(this.cacheCtx).fill()
  }
}

Path.Circle = Circle
Path.Rect = Rect

export default Path
