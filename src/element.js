// import Track from './track'
// import ElementAttr from './utils/elementAttr'
import Bezier from './tracks/bezier'
import Keyframe from './keyframe'
import { error } from './utils/utils'
import SvgPath from 'svg-path-to-canvas'

const _keyframeArr = Symbol('keyframeArr'),
  _trackArr = Symbol('trackArr'),
  _attr = Symbol('attribute')

const property = [
  'lineCap',
  'lineJoin',
  'lineWidth',
  'miterLimit',
  'font',
  'textAlign',
  'textBaseline',
  'globalAlpha',
  'shadowColor',
  'shadowBlur',
  'shadowOffsetX',
  'shadowOffsetY'
]

let id = 0
class Element {
  constructor (opt) {
    // this[_attr] = new ElementAttr(this)
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
      anchor: [0, 0],
      pos: [0, 0],
      transform: [],
      x: 0,
      y: 0
    })
    this.finished = false
    this[_keyframeArr] = []
    this[_trackArr] = []
  }
  get size () {
    return this.outline.size.slice()
  }
  get bounds () {
    return this.outline.bounds.map((item, index) => {
      return item
    })
  }
  get center () {
    return this.outline.center.map((item, index) => {
      return item
    })
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
  // 设置上下文属性
  setAttr (ctx) {
    const attrs = this.attr()
    for (let key in attrs) {
      let val = attrs[key]
      if (key === 'stroke') ctx.strokeStyle = val
      else if (key === 'fill') ctx.fillStyle = val
      else if (property.indexOf(key) > -1) ctx[key] = val
    }
  }
  setSvgAttr (outline) {
    const attrs = this.attr()
    if (attrs.lineWidth) outline.lineWidth(attrs.lineWidth)
    if (attrs.lineCap) outline.lineCap(attrs.lineCap)
    if (attrs.lineJoin) outline.lineJoin(attrs.lineJoin)
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
        let value = val(val)
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
  }
  on (eventType, callback) {
    this[eventType] = callback
  }
  off (eventType) {
    this[eventType] = null
  }
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
