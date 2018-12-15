import Element from './element'
import { remove, arrSort, error, cacheCtx } from './utils/utils'

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
  get isVirtual () {
    // 没有大小的 group 视为虚拟组合
    if (this.attr('w') && this.attr('h')) return false
    else return true
  }
  draw (ctx) {
    ctx.save()
    if (!this.cacheCtx) this.cacheDraw()
    this.outline(ctx)
    ctx.drawImage(this.cacheCtx.canvas, this.attr('x'), this.attr('y'))
    ctx.restore()
  }
  outline (ctx) {
    if (!this.isVirtual) {
      ctx.beginPath()
      this.setAttr(ctx)
      ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
      this.dye(ctx)
      ctx.clip()
    }
  }
  cacheDraw () {
    this.cacheCtx = cacheCtx(this.ctx, this.attr('w'), this.attr('h'))
    this.children.forEach(child => {
      child.draw.call(child, this.cacheCtx)
    })
    // this.drawContent(this.cacheCtx, this)
  }
  drawContent (ctx, element) {
    element.children.forEach(child => {
      child.draw.call(child, ctx)
    })
    // if (element.children && element.children.length > 0) {
    //   element.children.forEach(child => {
    //     child.drawContent(ctx, child)
    //   })
    // } else {
    //   element.children.forEach(child => {
    //     child.draw.call(child, ctx)
    //   })
    // }
  }
}
