import Element from './element'

export default class Shape extends Element {
  constructor (opt) {
    super(opt)
    this.originX = 0
    this.originY = 0
  }
  setOrigin (x, y) {
    this.originX = x
    this.originY = y
  }
  // 返回一个元素的克隆
  clone (opt = {}) {
    let Cons = this.constructor
    const options = Object.assign({}, this.opt, opt)
    return new Cons(options)
  }
  // 绘制单元
  drawUnit (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    this.setAttr(ctx)
    this.drawPath(ctx)
    this.dye(ctx)
  }
  // 图形在组合中，采用相对于组合的定位
  // set group (val) {
  //   this.attr({x: val.attr('x') + this.attr('x')})
  //   this.attr({y: val.attr('y') + this.attr('y')})
  // }
}
