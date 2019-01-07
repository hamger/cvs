import Element from './element'
import {
  animFrame,
  cancelAnim,
  arrSort2,
  forArr,
  remove,
  getItem,
  error,
  createCtx
} from './utils/utils'
import { loadTexture } from './utils/resource'

let id = 0

class Layer {
  constructor (opt) {
    this.id = id++
    this.children = [] // 根据 zIndex 升序排列的子元素
    this.stop = null // 定时器
    this.initAnimateTime = 0 // 动画初始时间
    this.pauseTime = 0 // 暂定总时间
    this.finishedAinmCount = 0 // 已完成动画的元素个数
    this.isPause = false // 动画是否被暂停
    Object.assign(this, { zIndex: 0, handleEvent: true }, opt)
    this.init()
  }

  async preload (obj) {
    const tasks = [],
      res = {}
    for (let key in obj) {
      tasks.push(
        loadTexture(key, obj[key]).then(r => {
          res[key] = r
        })
      )
    }
    await Promise.all(tasks)
    return res
  }
  init () {
    this.width = this.container.clientWidth
    this.height = this.container.clientHeight
    this.ctx = createCtx(this.width, this.height)
    this.ctx.canvas.style.cssText = `position: absolute; top: 0px; left: 0px;z-index:${
      this.zIndex
    }`
    this.container.appendChild(this.ctx.canvas)
  }
  element (id) {
    return getItem(this.children, id)
  }
  // 触发子元素的事件监听
  emitEvent (children, e) {
    forArr(
      children,
      child => {
        child.emit && child.emit(e)
        if (child.children && child.children.length > 0) {
          // 组合内的元素位置相对于组合计算
          e.x -= child.attr('x')
          e.y -= child.attr('y')
          this.emitEvent(child.children, e)
        }
      },
      true
    )
  }
  // 分发事件
  dispatchEvent (evtArgs) {
    let e = evtArgs.originalEvent
    const { left, top } = e.target.getBoundingClientRect()
    const { clientX, clientY } = e.changedTouches ? e.changedTouches[0] : e
    // zIndex 大的元素先触发监听事件，父元素优先于子元素触发
    this.emitEvent(
      this.children,
      Object.assign(evtArgs, {
        x: Math.round((clientX | 0) - left),
        y: Math.round((clientY | 0) - top)
      })
    )
  }
  append (...elements) {
    elements.forEach(child => {
      if (!(child instanceof Element)) {
        error('Function add only accept the instance of Element.')
      }
      child._layer = this
      child._ctx = this.ctx
      child._timeline = this.timeline.fork()
      this.children.push(child)
      arrSort2(this.children, 'zIndex')
    })
    return this
  }
  remove (...elements) {
    if (elements.length) {
      elements.forEach(child => {
        remove(this.children, child)
      })
    } else this.children = []
  }
  draw () {
    this.children.forEach(child => {
      if (child.attr('visible')) {
        child.render.call(child, this.ctx)
      }
    })
  }
  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
  animate () {
    var that = this
    animFrame(function loopUnit () {
      that.stop = animFrame(loopUnit)
      that.clear()
      forArr(that.children, child => {
        if (child.animatable) child.animate()
      })
      that.draw()
    })
  }
  cancelAnimate () {
    if (this.stop) cancelAnim(this.stop)
  }
}
export default Layer
