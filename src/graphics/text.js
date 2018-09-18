import Element from '../element'

export default class Text extends Element {
  constructor (opt) {
    super(opt)
    this.opt.lineWidth = 1
    this.opt.fontSize = this.opt.fontSize || 10
    this.opt.fontFamily = this.opt.fontFamily || 'sans-serif'
    this.opt.fontStyle = this.opt.fontStyle || 'normal'
    this.opt.fontWeight = this.opt.fontWeight || 'normal'
    this.opt.fontVariant = this.opt.fontVariant || 'normal'
  }
  draw () {
    var ctx = this.ctx
    ctx.beginPath()
    ctx.save()
    this.assembleFont()
    this.setAttr()
    this.setFunc()
    if (this.opt.stroke) {
      ctx.strokeText(this.opt.text, this.opt.x, this.opt.y)
    } else {
      ctx.fillText(this.opt.text, this.opt.x, this.opt.y)
    }
    ctx.restore()
  }
  assembleFont () {
    if (!this.opt.font) {
      this.opt.font = [
        this.opt.fontStyle,
        this.opt.fontVariant,
        this.opt.fontWeight,
        this.opt.fontSize + 'px',
        this.opt.fontFamily
      ].join(' ')
    }
  }
  drawPath () {}
}
