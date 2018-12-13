import Shape from '../shape'
import parseFont from '../utils/parse-font'

// 测量文本的宽
const getTextWidth = (ctx, text, font) => {
  if (!ctx) return [0, 0]
  ctx.save()
  ctx.font = font
  let { width } = ctx.measureText(text)
  ctx.restore()
  return Math.round(width)
}

export default class Text extends Shape {
  constructor (opt) {
    super(opt)
    this.setDefault({
      font: '16px Arial',
      textAlign: 'left',
      text: ''
    })
    this.setDefault({lineHeight: parseFont(this.attr('font')).size * 1.2})
  }
  draw (ctx) {
    ctx.beginPath()
    ctx.save()
    if (!this.cacheCanvas) this.cacheDraw()
    // this.drawPath(ctx)
    // this.dye(ctx)
    ctx.drawImage(this.cacheCanvas, this.attr('x'), this.attr('y'))
    ctx.restore()
  }
  drawPath (ctx) {
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
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = this.attr('w')
    this.cacheCanvas.height = this.attr('h')
    this.cacheCtx = this.cacheCanvas.getContext('2d')
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
