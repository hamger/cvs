import Element from '../element'
import {remove} from '../utils'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.shapes = []
  }
  append (...shapes) {
    shapes.forEach(item => {
      item.ctx = this.ctx
      item.canvas = this.canvas
      this[_addUnit](item)
    })
  }
  remove (...shapes) {
    if (shapes.length) {
      shapes.forEach(item => {
        remove(this.shapes, item)
      })
    } else {
      this.shapes = []
    }
  }
}
