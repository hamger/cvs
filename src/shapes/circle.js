import Shape from '../shape'
export default class Circle extends Shape {
  constructor (opt) {
    super(opt)
    if (typeof this.attr('startAngle') === 'number') this.opt.isSector = true
    this.opt = Object.assign(
      {
        startAngle: 0,
        endAngle: 360,
        anticlockwise: false
      },
      this.opt
    )
    if (this.attr('cache')) this.cacheDraw()
  }
  get origin () {
    if (this.attr('cache')) {
      return {
        x: this.attr('r') + this.lw + 1,
        y: this.attr('r') + this.lw + 1
      }
    } else {
      return {
        x: this.attr('x'),
        y: this.attr('y')
      }
    }
  }
  draw (ctx) {
    ctx.save()
    if (this.attr('cache')) {
      ctx.drawImage(
        this.cacheCanvas,
        this.attr('x') - this.origin.x,
        this.attr('y') - this.origin.y
      )
    } else {
      this.drawUnit(ctx)
    }
    ctx.restore()
  }
  drawPath (ctx) {
    ctx.beginPath()
    if (this.attr('isSector')) ctx.moveTo(this.origin.x, this.origin.y)
    ctx.arc(
      this.origin.x,
      this.origin.y,
      this.attr('r'),
      (this.attr('startAngle') * Math.PI) / 180,
      (this.attr('endAngle') * Math.PI) / 180,
      this.attr('anticlockwise')
    )
    if (this.attr('isSector')) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = 2 * this.origin.x
    this.cacheCanvas.height = 2 * this.origin.y
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
