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
  draw () {
    let ctx = this.ctx
    ctx.save()
    if (this.cache) {
      ctx.drawImage(
        this.cacheCanvas,
        this.attr('x') - this.halfW,
        this.attr('y') - this.halfH
      )
    } else {
      this.drawUnit()
    }
    ctx.restore()
  }
  drawPath (cacheCtx) {
    let ctx = cacheCtx || this.ctx
    ctx.beginPath()
    if (cacheCtx) {
      if (this.attr('isSector')) ctx.moveTo(this.attr('x'), this.attr('y'))
      ctx.arc(
        this.halfW,
        this.halfH,
        this.attr('r'),
        (this.attr('startAngle') * Math.PI) / 180,
        (this.attr('endAngle') * Math.PI) / 180,
        this.attr('anticlockwise')
      )
      if (this.attr('isSector')) ctx.closePath()
    } else {
      if (this.attr('isSector')) ctx.moveTo(this.attr('x'), this.attr('y'))
      ctx.arc(
        this.attr('x'),
        this.attr('y'),
        this.attr('r'),
        (this.attr('startAngle') * Math.PI) / 180,
        (this.attr('endAngle') * Math.PI) / 180,
        this.attr('anticlockwise')
      )
      if (this.attr('isSector')) ctx.closePath()
    }
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.attr('r') + this.lw + this.p
    this.halfH = this.attr('r') + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
}
