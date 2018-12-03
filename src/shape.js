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
  // 图形在组合中，采用相对于组合的定位
  // set group (val) {
  //   this.attr({x: val.attr('x') + this.attr('x')})
  //   this.attr({y: val.attr('y') + this.attr('y')})
  // }
}
