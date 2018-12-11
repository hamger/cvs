import Element from './element'
import { remove, arrSort, error, cacheCtx } from './utils'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.shapes = []
  }
  append (...shapes) {
    shapes.forEach(shape => {
      if (!(shape instanceof Element)) {
        error('Function group.append only accept the instance of Element.')
      }
      shape.timeline = this.timeline.fork()
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
    if (!this.cacheCtx) this.cacheDraw()
    this.drawPath(ctx)
    ctx.drawImage(this.cacheCtx.canvas, this.attr('x'), this.attr('y'))
    ctx.restore()
  }
  drawPath (ctx) {
    if (!this.isVirtual) {
      ctx.beginPath()
      this.setAttr(ctx)
      ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
      this.dye(ctx)
      ctx.clip()
    }
  }
  cacheDraw () {
    this.cacheCtx = cacheCtx(this._ctx, this.attr('w'), this.attr('h'))
    this.drawShape(this.cacheCtx)
  }
  drawShape (ctx) {
    this.shapes.forEach(shape => {
      shape.draw.call(shape, ctx)
    })
  }
}
