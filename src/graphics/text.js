import Element from '../element'

export default class Text extends Element {
  draw () {
    var ctx = this.ctx
    ctx.beginPath()
    ctx.save()
    this.setGeneral()
    this.setText()
    if (this.stroke) {
      ctx.strokeText(this.text, this.x, this.y)
    } else {
      ctx.fillText(this.text, this.x, this.y)
    }
    ctx.restore()
  }
}
