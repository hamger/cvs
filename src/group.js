import Element from './element'
import { remove, arrSort, error } from './utils'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.shapes = []
  }
  append (...shapes) {
    shapes.forEach(shape => {
      if (!(shape instanceof Element)) { error('Function add only accept the instance of Element.') }
      shape.group = this
      this.shapes.push(shape)
      arrSort(this.shapes, 'opt.zIndex')
    })
  }
  set ctx (val) {
    this._ctx = val
    this.shapes.forEach(shape => {
      shape.ctx = val
    })
  }
  remove (...shapes) {
    if (shapes.length) {
      shapes.forEach(shape => {
        remove(this.shapes, shape)
      })
    } else {
      this.shapes = []
    }
  }
  get isVirtual () {
    // 没有大小的 group 视为虚拟组合
    if (this.attr('w') && this.attr('h')) return false
    else return true
  }
  draw (ctx) {
    ctx.save()
    this.drawPath()
    this.shapes.forEach(shape => {
      shape.draw.call(shape, ctx)
    })
    ctx.restore()
  }
  drawPath (cacheCtx) {
    let ctx = cacheCtx || this._ctx
    if (!this.isVirtual) {
      ctx.beginPath()
      ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
      ctx.clip()
    }
  }
}
