import Element from '../element'
import parseFont from '../utils/parse-font'
import { createCtx } from '../utils/utils'

// 测量文本的宽
const getTextWidth = (ctx, text, font) => {
  if (!ctx) return [0, 0]
  ctx.save()
  ctx.font = font
  let { width } = ctx.measureText(text)
  ctx.restore()
  return Math.round(width)
}

export default class Text extends Element {
  constructor (opt) {
    super(opt)
    this.setDefault({
      font: '16px Arial',
      textAlign: 'left'
    })
    this.setDefault({lineHeight: parseFont(this.attr('font')).size * 1.2})
  }
  draw (ctx) {
    ctx.beginPath()
    ctx.save()
    if (!this.cacheCtx) this.cacheDraw()
    // this.outline(ctx)
    // this.dye(ctx)
    ctx.drawImage(this.cacheCtx.canvas, this.attr('x'), this.attr('y'))
    ctx.restore()
  }
  outline (ctx) {
    ctx.beginPath()
    ctx.rect(this.attr('x'), this.attr('y'), this.attr('w'), this.attr('h'))
  }
  dyeText (ctx, text, x, y) {
    if (this.attr('stroke')) ctx.strokeText(text, x, y)
    else ctx.fillText(text, x, y)
  }
  cacheDraw () {
    const lines = this.attr('text').split(/\n/)
    let maxW = 0
    lines.forEach(line => {
      let lineW = getTextWidth(this.ctx, line, this.attr('font'))
      if (lineW > maxW) maxW = lineW
    })
    this.attr({
      w: maxW,
      h: this.attr('lineHeight') * lines.length
    })
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    let left = 0, align = this.attr('textAlign')
    let x = this.attr('x')
    if (align === 'center') left = x + this.attr('w') / 2
    else if (align === 'right') left = x + this.attr('w')
    let lh = this.attr('lineHeight')
    this.cacheCtx.textBaseline = 'middle'
    this.setAttr(this.cacheCtx)
    lines.forEach((line, index) => {
      this.dyeText(this.cacheCtx, line, left, (index + 0.5) * lh)
    })
  }
}
