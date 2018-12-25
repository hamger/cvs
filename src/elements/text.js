import Element from '../element'
import parseFont from '../utils/parse-font'
import { createCtx } from '../utils/utils'
import SvgPath from 'svg-path-to-canvas'

const tempCtx = createCtx()

// 测量文本的宽
const getTextWidth = (text, font) => {
  tempCtx.save()
  tempCtx.font = font
  let { width } = tempCtx.measureText(text)
  tempCtx.restore()
  return Math.round(width)
}

export default class Text extends Element {
  constructor (opt) {
    super(opt)
    this.setDefault({
      font: '16px Arial',
      textAlign: 'left'
    })
    this.setDefault({ lineHeight: parseFont(this.attr('font')).size * 1.2 })
    this.getOutline()
  }
  draw (ctx) {
    ctx.save()
    if (!this.cacheCtx) this.cacheDraw()
    ctx.drawImage(this.cacheCtx.canvas, this.attr('x'), this.attr('y'))
    ctx.restore()
  }
  cacheDraw () {
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    this.cacheCtx.textBaseline = 'middle'
    let left = 0,
      align = this.attr('textAlign')
    let x = this.attr('x')
    if (align === 'center') left = x + this.attr('w') / 2
    else if (align === 'right') left = x + this.attr('w')
    let lh = this.attr('lineHeight')
    this.setAttr(this.cacheCtx)
    this.attr('text')
      .split(/\n/)
      .forEach((line, index) => {
        if (this.attr('stroke')) this.cacheCtx.strokeText(line, left, (index + 0.5) * lh)
        else this.cacheCtx.fillText(line, left, (index + 0.5) * lh)
      })
  }
  getOutline () {
    const lines = this.attr('text').split(/\n/)
    let maxW = 0
    lines.forEach(line => {
      let lineW = getTextWidth(line, this.attr('font'))
      if (lineW > maxW) maxW = lineW
    })
    this.attr({ w: maxW, h: this.attr('lineHeight') * lines.length })
    this.outline = new SvgPath(
      `M ${this.attr('x')} ${this.attr('y')} h ${this.attr('w')} v ${this.attr(
        'h'
      )} h -${this.attr('w')} z`
    )
    this.setSvgAttr(this.outline)
    this.initialBounds = this.outline.bounds.slice()
    this.setForm(this.outline, true)
  }
}
