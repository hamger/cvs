import Element from '../element'
import parseFont from '../utils/parse-font'
import { createCtx, getMatrix } from '../utils/utils'
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
  }
  draw (ctx) {
    ctx.save()
    ctx.transform(...this.attr('transformMatrix'))
    if (!this.cacheCtx) this.preload()
    ctx.drawImage(this.cacheCtx.canvas, 0, 0)
    ctx.restore()
  }
  preload () {
    this.setOutline()
    this.cacheCtx = createCtx(this.attr('w'), this.attr('h'))
    this.cacheCtx.textBaseline = 'middle'
    let left = 0,
      align = this.attr('textAlign')
    if (align === 'center') left = maxW
    else if (align === 'right') left = maxW / 2
    let lh = this.attr('lineHeight')
    this.setAttr(this.cacheCtx)
    this.lines.forEach((line, index) => {
      if (this.attr('fill')) { this.cacheCtx.fillText(line, left, (index + 0.5) * lh) }
      if (this.attr('stroke')) { this.cacheCtx.strokeText(line, left, (index + 0.5) * lh) }
    })
  }
  setOutline () {
    // if (this.outline && !this.needUpdate) return
    this.lines = this.attr('text').split(/\n/)
    let maxW = 0
    this.lines.forEach(line => {
      let lineW = getTextWidth(line, this.attr('font'))
      if (lineW > maxW) maxW = lineW
    })
    this.attr({ w: maxW, h: this.attr('lineHeight') * this.lines.length })
    this.outline = new SvgPath(
      `M 0 0 h ${this.attr('w')} v ${this.attr('h')} h -${this.attr('w')} z`
    )
    this.outline
      .restore()
      .save()
      .beginPath()
    this.setSvgAttr(this.outline)
    this.outline.transform(...this.attr('transformMatrix'))
  }
}
