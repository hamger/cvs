let id = 0
export default class Element {
  constructor (opt) {
    this.id = id++
    this.execArr = []
    this.opt = {
      cache: false,
      visible: true,
      zIndex: 0
    }
    this.noHover = {}
    this.attr(opt)
    if (this.opt.cache) {
      // 为离屏 canvas 添加 padding ，使渲染更完整
      this.p = 2
      // 记录线条宽度，离屏渲染需要遇到
      this.lw = 0
      if (this.opt.stroke && this.opt.lineWidth) {
        this.lw = this.opt.lineWidth / 2
      }
    }
  }
  // 设置上下文属性
  setAttr (ctx2) {
    let ctx = ctx2 || this.ctx
    for (let key in this.opt) {
      if (key === 'opacity') ctx.globalAlpha = this.opt[key]
      else if (key === 'stroke') ctx.strokeStyle = this.opt[key]
      else if (key === 'fill') ctx.fillStyle = this.opt[key]
      else if (
        /(shadowColor|shadowBlur|shadowOffsetX|shadowOffsetY|lineCap|lineJoin|lineWidth|miterLimit|font|textAlign|textBaseline|globalCompositeOperation)/.test(
          key
        )
      ) {
        ctx[key] = this.opt[key]
      } else if (key === 'transform') {
        this.execArr.forEach(item => {
          let k = Object.keys(item)[0]
          let val = item[k]
          if (/(scale|translate|transform|setTransform)/.test(k)) {
            ctx[k](...val)
          }
          if (k === 'rotate') ctx[k]((val * Math.PI) / 180)
        })
      }
    }
  }
  // 填充或描边
  dye (ctx2) {
    let ctx = ctx2 || this.ctx
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  // 设置绘制属性
  attr (opt, isHover) {
    // 更新属性
    Object.assign(this.opt, opt)
    // 设置转换函数
    if (opt.transform) {
      this.execArr = []
      opt.transform.forEach(item => {
        this.execArr.push(item)
      })
    }
    // 由 hover 引起的属性变化，不更新 noHover
    if (isHover) return
    if (this.opt.hover) {
      for (let key in this.opt.hover) {
        this.noHover[key] = this.opt[key]
      }
    }
  }
  on (eventType, callback) {
    this[eventType] = callback
  }
  off (eventType) {
    this[eventType] = null
  }
  animate () {

  }
}
