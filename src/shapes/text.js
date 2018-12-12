import Shape from '../shape'
import parseFont from '../utils/parse-font'

// 测量文本的宽高
const measureText = (ctx, text, font, lineHeight = '') => {
  if (!ctx) {
    return [0, 0]
  }
  ctx.save()
  ctx.font = font
  let { width } = ctx.measureText(text)
  ctx.restore()

  const { size } = parseFont(font)
  const height = lineHeight || size * 1.2
  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}

function lineHeight (font, lineHeight = '') {
  const { size } = parseFont(font)
  const height = lineHeight || size * 1.2
  return height
}

export default class Text extends Shape {
  constructor (opt) {
    super(opt)
  }
  draw (ctx) {
    ctx.beginPath()
    ctx.save()
    this.setAttr(ctx)
    this.drawText(ctx)
    ctx.restore()
  }
  drawText (ctx) {
    const lines = this.attr('text').split(/\n/)
    const h = lineHeight(this.attr('font'))
    let x = this.attr('x')
    let y = this.attr('y')
    lines.forEach(line => {
      this.dyeText(ctx, line, x, y)
      y += h
    })
  }
  dyeText (ctx, text, x, y) {
    if (this.attr('stroke')) ctx.strokeText(text, x, y)
    else ctx.fillText(text, x, y)
  }
}
