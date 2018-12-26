import Element from '../element'
import { remove, arrSort, error, createCtx, getMatrix } from '../utils/utils'
import { rect2svg, circle2svg } from '../utils/toSvg'
import SvgPath from 'svg-path-to-canvas'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.children = []
    this.setOutline()
  }
  append (...children) {
    children.forEach(child => {
      if (!(child instanceof Element)) {
        error('Function group.append only accept the instance of Element.')
      }
      this.children.push(child)
      arrSort(this.children, 'opt.zIndex')
    })
    return this
  }
  remove (...children) {
    if (children.length) {
      children.forEach(child => {
        remove(this.children, child)
      })
    } else this.children = []
  }
  draw (ctx) {
    ctx.save()
    ctx.strokeStyle = this.attr('stroke')
    ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
    ctx.stroke()
    ctx.translate(this.attr('x'), this.attr('y'))
    if (!this.cacheCtx) this.cacheDraw()
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  clip (ctx) {
    var d = this.attr('clip')
    if (typeof d === 'object') {
      if (d.type === 'rect') {
        d = rect2svg(d)
      } else if (d.type === 'circle') {
        d = circle2svg(d)
      } else error('unexpected type of path.')
    }
    this.outline = new SvgPath(d)
    this.outline
      .restore()
      .save()
      .beginPath()
    this.matrix = getMatrix(
      [0, 0],
      this.attr('clip').transform || []
    )
    this.outline.transform(...this.matrix)
    this.outline.to(ctx)
    ctx.clip()
  }
  cacheDraw () {
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    if (this.attr('clip')) this.clip(this.cacheCtx)
    this.children.forEach(child => {
      child.draw.call(child, this.cacheCtx)
    })
  }
  setOutline () {
    this.outline = new SvgPath(
      `M ${0} ${0} h ${this.attr('w')} v ${this.attr('h')} h -${this.attr(
        'w'
      )} z`
    )
    this.matrix = getMatrix(
      [this.attr('x'), this.attr('y')],
      this.attr('transform')
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    this.outline.transform(...this.matrix)
  }
}
