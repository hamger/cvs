import Element from '../element'

export default class Text extends Element {
  constructor (opt) {
    super(opt)
    this.lineWidth = 1
    this.lineCount = 1
    this.fontSize = this.fontSize || 12
    this.fontFamily = this.fontFamily || 'sans-serif'
    this.fontStyle = this.fontStyle || 'normal'
    this.fontWeight = this.fontWeight || 'normal'
    this.fontVariant = this.fontVariant || 'normal'
  }
  draw () {
    var ctx = this.ctx
    ctx.beginPath()
    ctx.save()
    this.setGeneral()
    this.assembleFont()
    this.setText()
    var text
    if (this.stroke) {
      text = ctx.strokeText(this.text, this.x, this.y)
    } else {
      text = ctx.fillText(this.text, this.x, this.y)
    }
    this.textWidth = ctx.measureText(text).width
    ctx.restore()
  }
  assembleFont () {
    if (!this.font) {
      this.font = [
        this.fontStyle,
        this.fontVariant,
        this.fontWeight,
        this.fontSize + 'px',
        this.fontFamily
      ].join(' ')
    }
  }
  drawPath () {
    // var ctx = this.ctx
    // ctx.beginPath()
    // console.log(this)
    // ctx.rect(this.x, this.y, this.textWidth.toFixed(0), this.fontStyle)
  }
}
