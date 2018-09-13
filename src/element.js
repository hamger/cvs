let id = 0
export default class Element {
  constructor (opt) {
    this.id = id++
    this.cache = false
    this.visible = true
    if (opt.zIndex === undefined) opt.zIndex = 0
    Object.assign(this, opt)
  }
  // 设置绘制属性
  attr (opt) {
    Object.assign(this, opt)
  }
  on (eventType, callback) {
    this[eventType] = callback
  }
  off (eventType) {
    this[eventType] = null
  }
  // 设置公共绘制样式
  setGeneral (ctx2) {
    // let ctx = this.ctx
    let ctx = ctx2 || this.ctx
    if (this.stroke) ctx.strokeStyle = this.stroke
    if (this.fill) ctx.fillStyle = this.fill
    if (this.shadowColor) ctx.shadowColor = this.shadowColor
    if (this.shadowBlur) ctx.shadowBlur = this.shadowBlur
    if (this.shadowOffsetX) ctx.shadowOffsetX = this.shadowOffsetX
    if (this.shadowOffsetY) ctx.shadowOffsetY = this.shadowOffsetY
    if (this.opacity) ctx.globalAlpha = this.opacity
    if (this.globalCompositeOperation) {
      ctx.globalCompositeOperation = this.globalCompositeOperation
    }
  }
  setLine (ctx2) {
    // let ctx = this.ctx
    let ctx = ctx2 || this.ctx
    if (this.lineWidth) ctx.lineWidth = this.lineWidth
    if (this.lineCap) ctx.lineCap = this.lineCap
    if (this.lineJoin) ctx.lineJoin = this.lineJoin
    if (this.lineLimit) ctx.lineLimit = this.lineLimit
  }
  setText (ctx2) {
    // let ctx = this.ctx
    let ctx = ctx2 || this.ctx
    if (this.font) ctx.font = this.font
    if (this.textAlign) ctx.textAlign = this.textAlign
    if (this.textBaseline) ctx.textBaseline = this.textBaseline
  }
  // 圆周运动
  circling (opt) {
    const relativeX = opt.relativeX || 0
    const relativeY = opt.relativeY || 0
    const vpx = opt.vpx
    const vpy = opt.vpy
    const r = opt.r || 100
    const speed = opt.speed || 0.05
    this.x = vpx + r * Math.cos(this.angle) - relativeX
    this.y = vpy + r * Math.sin(this.angle) - relativeY
    this.angle += speed
  }
  // 椭圆运动
  elliptic (opt) {
    const relativeX = opt.relativeX || 0
    const relativeY = opt.relativeY || 0
    const vpx = opt.vpx
    const vpy = opt.vpy
    const radiusX = opt.radiusX || 100
    const radiusY = opt.radiusY || 80
    const speed = opt.speed || 0.05
    this.angle += speed
    this.x = vpx + radiusX * Math.cos(this.angle) - relativeX
    this.y = vpy + radiusY * Math.sin(this.angle) - relativeY
  }
  // 匀速直线运动
  line (opt) {
    const endX = opt.endX
    const endY = opt.endY
    const time = opt.time
    let k, b
    if (!this.record) {
      k = (endY - this.y) / (endX - this.x)
      b = endY - k * endX
      let distanceX = endX - this.x
      let speedX = (distanceX / time * 16)
      this.record = {
        speedX,
        k,
        b
      }
    } else {
      k = this.record.k
      b = this.record.b
    }
    if (Math.abs(this.x - endX) > Math.abs(this.record.speedX)) {
      this.x += this.record.speedX
      this.y = k * this.x + b
    } else {
      this.x = endX
      this.y = endY
    }
  }
}
