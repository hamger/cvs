import Element from '../element'
import Circle from './circle'
import Rect from './rect'
// import { delBlank } from '../utils/utils'
import SvgPath from 'svg-path-to-canvas'
class Path extends Element {
  constructor (opt) {
    super(opt)
    this.path = new SvgPath(this.attr('path'))
    this.drawPath(this.path, this.attr())
    this.path.restore()
  }
  drawPath (p, opt) {
    p.save().beginPath()
    for (let key in opt) {
      if (key === 'stroke') p.strokeStyle(opt[key])
      else if (key === 'fill') p.fillStyle(opt[key])
      else if (/\b(lineCap|lineJoin|lineWidth)\b/.test(key)) {
        if (Array.isArray(opt[key])) p[key](...opt[key])
        else p[key](opt[key])
      } else if (/\b(transform)\b/.test(key)) {
        opt[key].forEach(item => {
          const [type, val] = Object.entries(item)[0]
          if (/\b(translate|rotate|scale|skew|transform)\b/.test(type)) {
            if (Array.isArray(val)) p[type](...val)
            else p[type](val)
          }
        })
      }
    }
    this.center = this.path.center.slice()
    this.bounds = this.path.bounds.slice()
    this.d = this.path.d
  }
  draw (ctx) {
    ctx.save()
    this.drawPath(this.path, this.attr())
    if (this.attr('stroke')) this.path.to(ctx).stroke()
    else this.path.to(ctx).fill()
    this.center = this.path.center.slice()
    this.bounds = this.path.bounds.slice()
    this.path.restore()
    ctx.restore()
  }
  outline (ctx, { x, y }) {
    this.drawPath(this.path, this.attr())
    const isInpath = this.path.isPointInPath(x, y)
    this.path.restore()
    return isInpath
  }
}

Path.Circle = Circle
Path.Rect = Rect

export default Path
