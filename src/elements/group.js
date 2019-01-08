import Element from '../element'
import { remove, arrSort2, error, createCtx, getMatrix } from '../utils/utils'
import toSvg from '../utils/toSvg'

export default class Group extends Element {
  constructor (opt) {
    super(opt)
    this.children = []
  }
  get isVirtual () {
    if (this.attr('w') && this.attr('h')) return false
    else return true
  }
  append (...children) {
    children.forEach(child => {
      if (!(child instanceof Element)) {
        error('Function group.append only accept the instance of Element.')
      }
      child.group = this
      this.children.push(child)
      arrSort2(this.children, 'zIndex')
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
  render (ctx) {
    ctx.save()
    ctx.translate(this.attr('x'), this.attr('y'))
    ctx.transform(...this.attr('lastMatrix'))
    this.changeState(ctx)
    if (this.isVirtual) {
      this.buffer(ctx)
    } else {
      if (!this.cacheCtx || this.needUpdate) this.buffer()
      ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    }
    ctx.restore()
  }
  buffer (ctx) {
    let context = null
    if (ctx) {
      context = ctx
    } else {
      this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
      context = this.cacheCtx
      this.setOutline()
    }
    if (this.attr('clip')) this.clip(context)
    if (this.attr('fill')) {
      context.fillStyle = this.attr('fill')
      context.rect(0, 0, this.attr('w'), this.attr('h'))
      context.fill()
    }
    if (this.attr('stroke')) {
      context.strokeStyle = this.attr('stroke')
      context.rect(0, 0, this.attr('w'), this.attr('h'))
      context.stroke()
    }
    this.children.forEach(child => {
      child.render.call(child, context)
    })
  }
  clip (ctx) {
    this.clipPath = toSvg(this.attr('clip'))
    this.clipPath
      .restore()
      .save()
      .beginPath()
    this.clipMatrix = getMatrix(this.attr('clip').transform)
    this.clipPath.transform(...this.clipMatrix)
    this.clipPath.to(ctx)
    ctx.clip()
  }
  setOutline () {
    this.outline = toSvg(
      `M ${0} ${0} h ${this.attr('w')} v ${this.attr('h')} h -${this.attr(
        'w'
      )} z`
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    this.outline.transform(...this.attr('lastMatrix'))
  }
}
