// import Track from './track'
import Bezier from './tracks/bezier'
import Keyframe from './keyframe'
import { remove, error, createCtx, transform } from './utils/utils'
import SvgPath from 'svg-path-to-canvas'

const _keyframeArr = Symbol('keyframeArr'),
  _trackArr = Symbol('trackArr')

let id = 0
class Element {
  constructor (opt) {
    if (typeof opt.id === 'string') {
      this.id = opt.id
      delete opt.id
    } else this.id = id++
    this.opt = {
      cache: false,
      visible: true,
      zIndex: 0
    }
    if (this.opt.cache) {
      // 记录线条宽度，离屏渲染需要遇到
      this.lw = 0
      if (this.opt.stroke && this.opt.lineWidth) {
        this.lw = this.opt.lineWidth / 2
      }
    }
    this.attr(opt)
    this.setDefault({
      fill: '#000',
      anchorX: 0,
      anchorY: 0,
      x: 0,
      y: 0
    })
    this.finished = false
    this[_keyframeArr] = []
    this[_trackArr] = []
    // this.cacheCtx = createCtx()
  }
  get size () {
    const size = this.outline.size.slice()
    return {
      w: size[0],
      h: size[1]
    }
  }
  get pos () {
    const bounds = this.outline.bounds.slice()
    return {
      x: bounds[0],
      y: bounds[1]
    }
  }
  get center () {
    const center = this.outline.center.slice()
    return {
      x: center[0],
      y: center[1]
    }
  }
  rotate (outline, rotate) {
    console.log(this.size)
    console.log(this.pos)
    console.log(this.center)
    // outline.translate(
    //   -1 * this.attr('anchorX') * this.size.w,
    //   -1 * this.attr('anchorY') * this.size.h
    // )
    // outline.translate(
    //   this.center.x,
    //   this.center.y
    // )
    outline.translate(1 * this.center.x, 1 * this.center.y)
    outline.rotate(rotate)
    outline.translate(-1 * this.center.x, -1 * this.center.y)
  }
  set _ctx (val) {
    this.ctx = val
    if (this.children && this.children.length > 0) {
      this.children.forEach(child => {
        child._ctx = val
      })
    }
  }
  set _layer (val) {
    this.layer = val
    if (this.children && this.children.length > 0) {
      this.children.forEach(child => {
        child._layer = val
      })
    }
  }
  set _timeline (val) {
    this.timeline = val
    if (this.children && this.children.length > 0) {
      this.children.forEach(child => {
        child._timeline = val
      })
    }
  }
  get origin () {
    if (this.attr('cache')) {
      return {
        x: this.lw,
        y: this.lw
      }
    } else {
      return {
        x: this.attr('x'),
        y: this.attr('y')
      }
    }
  }
  // 返回一个元素的克隆
  clone (opt = {}) {
    let Cons = this.constructor
    const options = Object.assign({}, this.opt, opt)
    return new Cons(options)
  }
  setDefault (opt) {
    for (let key in opt) {
      if (!this.attr(key)) this.attr({ [key]: opt[key] })
    }
  }
  drawOutline (outline, opt) {
    outline
      .restore()
      .save()
      .beginPath()
    for (let key in opt) {
      let val = opt[key]
      if (key === 'stroke') outline.strokeStyle(val)
      else if (key === 'fill') outline.fillStyle(val)
      else if (/\b(lineCap|lineJoin|lineWidth)\b/.test(key)) {
        outline[key](val)
      } else if (/\b(transform)\b/.test(key)) {
        transform(outline, val, true)
      }
    }
  }
  setForm (ctx, isOutline) {
    if (isOutline) {
      ctx
        .restore()
        .save()
        .beginPath()
    }
    // if (this.opt.rotate) this.rotate(ctx, this.opt.rotate)
    if (this.opt.transform && this.opt.transform.length > 0) {
      transform(ctx, this.opt.transform, isOutline)
    }
  }
  // 设置上下文属性
  setAttr (ctx) {
    for (let key in this.opt) {
      let val = this.opt[key]
      this.setCommon(ctx, key, val)
      this.setText(ctx, key, val)
      this.setLine(ctx, key, val)
    }
  }
  setCommon (ctx, key, val) {
    if (key === 'opacity') ctx.globalAlpha = this.opt[key]
    else if (key === 'stroke') ctx.strokeStyle = this.opt[key]
    else if (key === 'fill') ctx.fillStyle = this.opt[key]
    else if (
      /\b(shadowColor|shadowBlur|shadowOffsetX|shadowOffsetY|globalCompositeOperation)\b/.test(
        key
      )
    ) {
      ctx[key] = val
    }
  }
  setText (ctx, key, val) {
    if (/\b(font|textAlign)\b/.test(key)) {
      ctx[key] = val
    }
  }
  setLine (ctx, key, val) {
    if (/\b(lineCap|lineJoin|lineWidth)\b/.test(key)) {
      ctx[key] = val
    }
  }
  // 填充或描边
  dye (ctx) {
    if (this.opt.stroke) ctx.stroke()
    else ctx.fill()
  }
  // 设置/获取绘制属性
  attr (opt) {
    if (!opt) return this.opt
    if (typeof opt === 'string') {
      return this.opt[opt]
    }
    for (let key in opt) {
      let val = opt[key]
      if (val instanceof Function) {
        // 支持函数设置
        let value = val(this.opt[key])
        this.opt[kay] = value
      } else {
        this.opt[key] = val
        if (key === 'offsetPath') this[key] = new SvgPath(val)
      }
    }
    // this.update()
  }
  // 判断是否点击在元素上
  isCollision ({ x, y }) {
    return this.outline.isPointInPath(x, y)
    // return this.ctx.isPointInPath(location.x, location.y)
  }
  on (eventType, callback) {
    this[eventType] = callback
  }
  off (eventType) {
    this[eventType] = null
  }
  // get state () {
  //   return false
  // }
  get animatable () {
    if (this[_trackArr].length > 0 || this[_keyframeArr].length > 0) return true
    else return false
  }
  keyframe (keyframes, timing) {
    this[_keyframeArr].push(new Keyframe(this, keyframes, timing))
    return this
  }
  track (type, options) {
    if (!/\b(line|bezier|round|ellipse)\b/.test(type)) {
      error('the type of track must be line, bezier, round or ellipse.')
    }
    let track = null
    if (type === 'bezier') track = new Bezier(options)
    track.$ele = this
    this[_trackArr].push(track)
    return this
  }
  animate () {
    var t = this.timeline.currentTime
    this[_keyframeArr].forEach(item => {
      item.run(t)
    })
    let res = this.getCurTrack(t)
    // 已执行完所有轨迹
    if (res.index === undefined) {
      this.finished = true
      return
    }
    // 轨迹处于延迟状态
    if (res.cycle === -1) return
    // 执行当前轨迹循环体，并传入已经运行的时间
    this[_trackArr][res.index].loop(res.time)
  }
  getCurTrack (animateTime) {
    let res = {}
    let a = 0
    let b = 0
    this[_trackArr].some((item, index) => {
      a = a + item.delay
      b = a + item.duration * item.iterationCount
      if (animateTime < a) {
        res.index = index
        res.cycle = -1
        return true
      } else if (animateTime >= a && animateTime <= b) {
        res.index = index
        if (item.duration === Infinity) {
          res.cycle = 0
          res.time = animateTime - a
        } else {
          res.cycle = Math.floor((animateTime - a) / item.duration)
          res.time = animateTime - a - res.cycle * item.duration
        }
        return true
      }
      a = b
    })
    /**
     * index: 处于第几个轨迹
     * time: 处于轨迹自身的什么阶段
     * cycle: 处于轨迹的第几次循环，-1 表示等待状态
     */
    return res
  }
}

export default Element
