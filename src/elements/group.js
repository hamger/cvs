import Element from '../element'
import { remove, arrSort, error, createCtx, getMatrix } from '../utils/utils'
import { rect2svg, circle2svg } from '../utils/toSvg'
import SvgPath from 'svg-path-to-canvas'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.children = []
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
    this.matrix = getMatrix(
      [this.attr('x'), this.attr('y')],
      this.attr('transform')
    )
    console.log(this.attr('x'))
    ctx.transform(...this.matrix)
    if (!this.cacheCtx || this.needUpdate) this.preload()
    if (this.attr('stroke')) {
      ctx.strokeStyle = this.attr('stroke')
      ctx.rect(0, 0, this.attr('w'), this.attr('h'))
      ctx.stroke()
    }
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  preload () {
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    if (this.attr('clip')) this.clip(this.cacheCtx)
    this.children.forEach(child => {
      child.draw.call(child, this.cacheCtx)
    })
    this.setOutline()
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
    this.clipPath = new SvgPath(d)
    this.clipPath
      .restore()
      .save()
      .beginPath()
    this.clipMatrix = getMatrix(
      [0, 0],
      this.attr('clip').transform || []
    )
    this.clipPath.transform(...this.clipMatrix)
    this.clipPath.to(ctx)
    ctx.clip()
  }
  setOutline () {
    this.outline = new SvgPath(
      `M ${0} ${0} h ${this.attr('w')} v ${this.attr('h')} h -${this.attr(
        'w'
      )} z`
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    this.outline.transform(...this.matrix)
  }
}
