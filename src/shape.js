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
  set group (val) {
    console.log(val)
  }
}
