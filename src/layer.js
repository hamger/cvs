import Element from './element'
import {
  getLocation,
  animFrame,
  cancelAnim,
  arrSort,
  forArr,
  remove,
  error
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
    Object.assign(this, { zIndex: 0, handleEvent: false }, opt)
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
    let canvas = document.createElement('canvas')
    canvas.style.cssText = `position: absolute; top: 0px; left: 0px;z-index:${
      this.zIndex
    }`
    this.width = canvas.width = this.container.clientWidth
    this.height = canvas.height = this.container.clientHeight
    this.ctx = canvas.getContext('2d')
    this.container.appendChild(canvas)
  }
  // 触发子元素的事件监听
  emitEvent (children, type) {
    forArr(children, child => {
      if (child.children && child.children.length > 0) {
        this.emitEvent(child.children, type)
      }
      if (!child.opt.visible || !child[type] || !child.outline) return
      if (child.isCollision(this.evt)) child[type].call(child, e)
    }, true)
  }
  // 分发事件
  dispatchEvent (e, type) {
    this.evt = getLocation(this.ctx.canvas, e)
    // zIndex 大的元素先触发监听事件，先子元素优先于父元素触发（冒泡机制）
    this.emitEvent(this.children, type)
  }
  // set tempEvent (val) {
  //   val.call(temp, e)
  // }
  append (...elements) {
    elements.forEach(child => {
      if (!(child instanceof Element)) {
        error('Function add only accept the instance of Element.')
      }
      child._layer = this
      child._ctx = this.ctx
      child._timeline = this.timeline.fork()
      this.children.push(child)
      arrSort(this.children, 'opt.zIndex')
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
      if (child.opt.visible) {
        child.draw.call(child, this.ctx)
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
