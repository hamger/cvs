import Element from '../element'

export default class Arc extends Element {
  constructor (opt) {
    super(opt)
    this.defaultArrowAngle = 60
    this.defaultArrowLength = 10
    if (this.cache) this.cacheDraw()
  }
  draw (ctx) {
    ctx.save()
    if (this.cache) {
      ctx.drawImage(
        this.cacheCanvas,
        this.opt.x - this.halfW,
        this.opt.y - this.halfH
      )
    } else this.drawUnit()
    ctx.restore()
  }
  drawUnit (ctx2) {
    let ctx = ctx2 || this.ctx
    this.setAttr(ctx)
    this.drawPath(ctx2 || null)
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  drawPath (ctx2) {
    let ctx = ctx2 || this.ctx
    ctx.beginPath()
    if (ctx2) {
      ctx.arc(
        this.halfW,
        this.halfH,
        this.opt.r,
        (this.opt.startAngle * Math.PI) / 180,
        (this.opt.endAngle * Math.PI) / 180,
        !!this.opt.anticlockwise
      )
    } else {
      ctx.arc(
        this.opt.x,
        this.opt.y,
        this.opt.r,
        (this.opt.startAngle * Math.PI) / 180,
        (this.opt.endAngle * Math.PI) / 180,
        !!this.opt.anticlockwise
      )
    }
    if (this.attr('startArrow')) {
      const { angle, len } = this.attr('startArrow')
      this.drawArrow('start', angle, len)
    }
    if (this.attr('endArrow')) {
      const { angle, len } = this.attr('endArrow')
      this.drawArrow('end', angle, len)
    }
    if (!this.opt.stroke) ctx.closePath()
  }
  cacheDraw () {
    this.cacheCanvas = document.createElement('canvas')
    this.halfW = this.opt.r + this.lw + this.p
    this.halfH = this.opt.r + this.lw + this.p
    this.cacheCanvas.width = 2 * this.halfW
    this.cacheCanvas.height = 2 * this.halfH
    this.drawUnit(this.cacheCanvas.getContext('2d'))
  }
  drawArrow (pos, angle = this.defaultArrowAngle, len = this.defaultArrowLength) {
    const cx = this.attr('x')
    const cy = this.attr('y')
    const r = this.attr('r')
    const basicAngle = pos === 'end' ? this.attr('endAngle') : this.attr('startAngle')
    const basicArc = basicAngle * Math.PI / 180
    const basicPos = [cx + r * Math.cos(basicArc), cy + r * Math.sin(basicArc)]
    const a1Angle = pos === 'end' ? (basicAngle + angle + 180) * Math.PI / 180 : (basicAngle + angle) * Math.PI / 180
    const a2Angle = pos === 'end' ? (basicAngle - angle) * Math.PI / 180 : (basicAngle + 180 - angle) * Math.PI / 180
    const arrow1 = [basicPos[0] + len * Math.cos(a1Angle), basicPos[1] + len * Math.sin(a1Angle)]
    const arrow2 = [basicPos[0] + len * Math.cos(a2Angle), basicPos[1] + len * Math.sin(a2Angle)]

    this.ctx.moveTo(basicPos[0], basicPos[1])
    this.ctx.lineTo(arrow1[0], arrow1[1])
    this.ctx.moveTo(basicPos[0], basicPos[1])
    this.ctx.lineTo(arrow2[0], arrow2[1])
  }
}
