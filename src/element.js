let id = 0
export default class Element {
  constructor (opt) {
    this.id = id++
    if (opt.zIndex === undefined) opt.zIndex = 0
    if (opt.visible === undefined) opt.visible = true
    Object.assign(this, opt)
  }
  // 设置绘制属性
  attr (opt) {
    Object.assign(this, opt)
  }
  addEventListener (eventType, callback) {
    this[eventType] = callback
  }
  removeEventListener (eventType) {
    this[eventType] = null
  }
  // 设置公共绘制样式
  setGeneral () {
    let ctx = this.ctx
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
  setLine () {
    let ctx = this.ctx
    if (this.lineWidth) ctx.lineWidth = this.lineWidth
    if (this.lineCap) ctx.lineCap = this.lineCap
    if (this.lineJoin) ctx.lineJoin = this.lineJoin
    if (this.lineLimit) ctx.lineLimit = this.lineLimit
  }
}
