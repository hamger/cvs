import Element from '../element'
import parseFont from '../utils/parse-font'
import { createCtx } from '../utils/utils'
import toSvg from '../utils/toSvg'

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
    if (!this.attr('lineHeight')) this.attr({lineHeight: parseFont(this.attr('font')).size * 1.2})
  }
  render (ctx) {
    ctx.save()
    ctx.translate(this.attr('x'), this.attr('y'))
    ctx.transform(...this.attr('lastMatrix'))
    this.changeState(ctx)
    if (!this.cacheCtx || this.needUpdate) this.buffer()
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  buffer () {
    this.setOutline()
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    this.cacheCtx.textBaseline = 'middle'
    let left = 0,
      align = this.attr('textAlign')
    if (align === 'center') left = this.attr('w') / 2
    else if (align === 'right') left = this.attr('w')
    let lh = this.attr('lineHeight')
    this.changeState(this.cacheCtx)
    this.cacheCtx.translate(left, 0)
    this.lines.forEach((line, index) => {
      if (this.attr('fill')) { this.cacheCtx.fillText(line, 0, (index + 0.5) * lh) }
      if (this.attr('stroke')) { this.cacheCtx.strokeText(line, 0, (index + 0.5) * lh) }
    })
  }
  setOutline () {
    this.lines = this.attr('text').split(/\n/)
    let maxW = 0
    this.lines.forEach(line => {
      let lineW = getTextWidth(line, this.attr('font'))
      if (lineW > maxW) maxW = lineW
    })
    this.attr({ w: maxW, h: this.attr('lineHeight') * this.lines.length })
    this.outline = toSvg(
      `M 0 0 h ${this.attr('w')} v ${this.attr('h')} h -${this.attr('w')} z`
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    if (this.attr('lineWidth')) this.outline.lineWidth(this.attr('lineWidth'))
    this.outline.transform(...this.attr('lastMatrix'))
  }
}
