// import Track from './track'
import Attribute from './utils/attribute'
import Bezier from './tracks/bezier'
import Track from './track'
import Keyframe from './keyframe'
import { error, forObj } from './utils/utils'

const _keyframeArr = Symbol('keyframeArr'),
  _trackArr = Symbol('trackArr'),
  _attr = Symbol('attribute'),
  _events = Symbol('events'),
  _collisionState = Symbol('collisionState')

const property = [
  'lineCap',
  'lineJoin',
  'lineWidth',
  'miterLimit',
  'font',
  'textAlign',
  'textBaseline',
  'shadowColor',
  'shadowBlur',
  'shadowOffsetX',
  'shadowOffsetY'
]

const property2 = ['transform', 'translate', 'scale', 'skew', 'rotate', 'stroke', 'fill', 'transformOrigin']

let id = 0
class Element {
  constructor (opt) {
    this[_attr] = new Attribute()
    if (typeof opt.id === 'string') {
      this.id = opt.id
      delete opt.id
    } else this.id = id++
    forObj(opt, (key, val) => {
      this[_attr][key] = val
    })
    this[_keyframeArr] = []
    this[_trackArr] = []
    this[_events] = new Map()
    this[_collisionState] = false
    this.needUpdate = false
  }
  get size () {
    if (typeof this.isVirtual === 'boolean' && this.isVirtual) return
    if (!this.outline) this.setOutline()
    return this.outline.size.slice()
  }
  get center () {
    if (typeof this.isVirtual === 'boolean' && this.isVirtual) return
    if (!this.outline) this.setOutline()
    const x = this.attr('x'),
      y = this.attr('y')
    return this.outline.center.map((item, index) => {
      if (index % 2) return item + y
      else return item + x
    })
  }
  get bounds () {
    if (typeof this.isVirtual === 'boolean' && this.isVirtual) return
    if (!this.outline) this.setOutline()
    const x = this.attr('x'),
      y = this.attr('y')
    return this.outline.bounds.map((item, index) => {
      if (index % 2) return item + y
      else return item + x
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
    const options = Object.assign({}, this.attr(), opt)
    return new Cons(options)
  }
  // 改变上下文环境的状态
  changeState (ctx) {
    const attrs = this.attr()
    for (let key in attrs) {
      let val = attrs[key]
      if (key === 'stroke') ctx.strokeStyle = val
      else if (key === 'fill') ctx.fillStyle = val
      else if (key === 'opacity') ctx.globalAlpha = val
      else if (property.indexOf(key) > -1) ctx[key] = val
    }
  }
  // 设置/获取绘制属性
  attr (opt) {
    if (!opt) return this[_attr]
    if (typeof opt === 'string') return this[_attr].get(opt)
    this.needUpdate = false
    forObj(opt, (key, val) => {
      if (
        !/\b(x|y)\b/.test(key) && (property.indexOf(key) > -1 || property2.indexOf(key) > -1)
      ) {
        this.needUpdate = true
      }
      if (typeof val === 'function') {
        this[_attr][key] = val(this[_attr].get(key))
      } else if (typeof val === 'object') {
        this[_attr][key] = Object.assign({}, this[_attr].get(key) || {}, val)
      } else this[_attr][key] = val
    })
  }
  // 判断是否点击在元素上
  isCollision ({ x, y }) {
    return this.outline.isPointInPath(x - this.attr('x'), y - this.attr('y'))
  }
  on (eventType, callback) {
    this[_events].set(eventType, callback)
  }
  off (eventType) {
    this[_events].delete(eventType)
  }
  // 触发条件的判断，并执行响应
  emit (e) {
    if (!this.attr('visible')) return
    else if (e.type !== 'mousemove' && !this[_events].has(e.type)) return
    else if (
      e.type === 'mousemove' &&
      !this[_events].has(e.type) &&
      !this[_events].has('mouseenter') &&
      !this[_events].has('mouseleave')
    ) { return }
    const isCollision = this.isCollision(e)
    if (e.type === 'mousemove') {
      if (isCollision && !this[_collisionState]) {
        this[_collisionState] = true
        this[_events].has('mouseenter') && this[_events].get('mouseenter')(e)
      } else if (!isCollision && this[_collisionState]) {
        this[_collisionState] = false
        this[_events].has('mouseleave') && this[_events].get('mouseleave')(e)
      }
    }
    if (isCollision && this[_events].has(e.type)) {
      this[_events].get(e.type)(e)
    }
  }
  get animatable () {
    if (this[_trackArr].length > 0 || this[_keyframeArr].length > 0) return true
    else return false
  }
  keyframe (keyframes, timing, cb) {
    this[_keyframeArr].push(new Keyframe(this, keyframes, timing, cb))
    return this
  }
  track (type, options) {
    if (!/\b(line|bezier|round|ellipse|custom)\b/.test(type)) {
      error('the type of track must be line, bezier, round or ellipse.')
    }
    let track = null
    if (type === 'bezier') track = new Bezier(options)
    if (type === 'custom') track = new Track(options)
    track.$ele = this
    this[_trackArr].push(track)
    return this
  }
  animate () {
    var t = this.timeline.currentTime
    this[_keyframeArr].forEach(item => {
      item.run(t)
    })
    // let res = this.getCurTrack(t)
    // // 已执行完所有轨迹
    // if (res.index === undefined) {
    //   this.finished = true
    //   return
    // }
    // // 轨迹处于延迟状态
    // if (res.cycle === -1) return
    // // 执行当前轨迹循环体，并传入已经运行的时间
    // this[_trackArr][res.index].loop(res.time)
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
