import Element from './element'
import { remove, error } from './utils'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.shapes = []
    this.isVirtual = true
  }
  append (...shapes) {
    shapes.forEach(shape => {
      shape.ctx = this.ctx
      shape.canvas = this.canvas
      shape.group = this
      if (shape instanceof Element) {
        this.shapes.push(shape)
        arrSort(this.shapes, 'opt.zIndex')
      } else {
        error('Function add only accept the instance of Element.')
      }
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
    console.log(this.attr('w'))
    if (this.attr('w') && this.attr('h')) {
      return true
    } else {
      return false
    }
  }
  draw () {
    let ctx = this.ctx
    ctx.save()
    this.drawPath()
    this.shapes.forEach(shape => {
      shape.drawUnit()
    })
    ctx.restore()
  }
  drawPath () {
    let ctx = this.ctx
    if (!this.isVirtual) {
      ctx.beginPath()
      ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
      ctx.clip()
    }
  }
}
