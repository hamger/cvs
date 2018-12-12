import Element from './element'
import Group from './group'
import {
  getLocation,
  animFrame,
  cancelAnim,
  arrSort,
  isMobile,
  remove,
  error
} from './utils/utils'
import { loadTexture } from './utils/resource'

const _addUnit = Symbol('addUnit')
const _removeUnit = Symbol('removeUnit')

let id = 0

class Layer {
  constructor (opt) {
    this.id = id++
    this.children = [] // 根据 zIndex 升序排列的子元素
    this.descChildren = [] // 根据 zIndex 降序排列的子元素
    this.animChildren = [] // 具有运动轨迹的子元素
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
  emitUnit (child, location, type, e) {
    if (!child.opt.visible || !child[type] || !child.drawPath) return false
    if (child.isCollision(location)) {
      child[type].call(child, e)
      return true
    }
  }
  dispatchEvent (e, type) {
    let location = getLocation(this.ctx.canvas, e)
    // 点击区域前面元素的先监听事件
    this.descChildren.forEach(child => {
      if (child instanceof Group) {
        child.shapes.forEach(shape => {
          this.emitUnit(shape, location, type, e)
        })
      } else {
        this.emitUnit(child, location, type, e)
      }
    })
  }
  // set tempEvent (val) {
  //   val.call(temp, e)
  // }
  [_addUnit] (element) {
    this.children.push(element)
    arrSort(this.children, 'opt.zIndex')
    if (element.tracks.length) this.animChildren.push(element)
    this.descChildren.push(element)
    arrSort(this.descChildren, 'opt.zIndex', true)
  }
  append (...elements) {
    elements.forEach(item => {
      if (!(item instanceof Element)) {
        error('Function add only accept the instance of Element.')
      }
      item.ctx = this.ctx
      item.layer = this.layer
      item.timeline = this.timeline.fork()
      this[_addUnit](item)
    })
  }
  [_removeUnit] (element) {
    remove(this.children, element)
    remove(this.descChildren, element)
    remove(this.animChildren, element)
  }
  remove (...elements) {
    if (elements.length) {
      elements.forEach(item => {
        this[_removeUnit](item)
      })
    } else {
      this.children = []
      this.descChildren = []
      this.animChildren = []
    }
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
      // console.log('global: ' + that.timeline.globalTime)
      // console.log('current: ' + that.timeline.currentTime)
      if (that.animChildren.length === that.finishedAinmCount) return
      that.stop = animFrame(loopUnit)
      that.clear()
      that.animChildren.forEach(child => {
        if (child.finished) {
          that.finishedAinmCount++
          return
        }
        child.runTrack()
      })
      that.draw()
    })
  }
  cancelAnimate () {
    if (this.stop) cancelAnim(this.stop)
  }
}
export default Layer
