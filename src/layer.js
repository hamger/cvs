import Element from './element'
import { getLocation, animFrame, cancelAnim, arrSort, isMobile } from './utils'
import { loadTexture } from './resource'
// import Timeline from './timeline'

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
    this.animateTime = 0 // 动画已进行的时间
    this.finishedAinmCount = 0 // 已完成动画的元素个数
    this.isPause = false // 动画是否被暂停
    Object.assign(this, { zIndex: 0, handleEvent: false }, opt)
    // this.timeline = new Timeline()
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
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.container.appendChild(canvas)
  }
  dispatchEvent (e, type) {
    let location = getLocation(this.canvas, e)
    let temp = null
    // 只触发点击区域最前面元素的监听事件
    this.descChildren.some(child => {
      if (!child.opt.visible || !child[type] || !child.drawPath) return false
      if (child.isCollision(location)) {
        temp = child
        return true
      }
    })
    if (temp) temp[type].call(temp, e)
  }
  [_addUnit] (element) {
    if (element instanceof Element) {
      this.children.push(element)
      arrSort(this.children, 'opt.zIndex')
      if (element.tracks.length) this.animChildren.push(element)
      this.descChildren.push(element)
      arrSort(this.descChildren, 'opt.zIndex', true)
    } else {
      throw Error('Function add only accept the instance of Element.')
    }
  }
  add (...elements) {
    elements.forEach(item => {
      item.ctx = this.ctx
      item.canvas = this.canvas
      this[_addUnit](item)
    })
  }
  [_removeUnit] (element) {
    this.children.some((item, index) => {
      if (item.id === element.id) {
        this.children.splice(index, 1)
        return true
      }
    })
    this.descChildren.some((item, index) => {
      if (item.id === element.id) {
        this.children.splice(index, 1)
        return true
      }
    })
    this.animChildren.some((item, index) => {
      if (item.id === element.id) {
        this.children.splice(index, 1)
        return true
      }
    })
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
  _getAnimateTime (time) {
    return time - this.initAnimateTime - this.pauseTime
  }
  animate () {
    this.startTime = new Date()
    if (this.initAnimateTime === 0) this.initAnimateTime = new Date()
    if (this.stopTime) this.pauseTime += this.startTime - this.stopTime

    var that = this
    animFrame(function loopUnit () {
      if (that.animChildren.length === that.finishedAinmCount) return
      that.stop = animFrame(loopUnit)
      that.clear()
      that.animateTime = that._getAnimateTime(new Date())
      that.animChildren.forEach(child => {
        if (child.finished) {
          that.finishedAinmCount++
          return
        }
        child.runTrack(that.animateTime)
      })
      that.draw()
    })
  }
  cancelAnimate () {
    this.stopTime = new Date()
    if (this.stop) cancelAnim(this.stop)
  }
  pauseAnimate () {
    if (this.isPause) this.animate()
    else this.cancelAnimate()
  }
  resetAnimate () {
    if (this.stop) cancelAnim(this.stop)
    this.initAnimateTime = 0
    this.pauseTime = 0
    this.animateTime = 0
    this.finishedAinmCount = 0
    this.isPause = false
    this.animChildren.forEach(child => {
      child.finished = false
      child.tracks.forEach(track => {
        track.reset && track.reset()
      })
    })
  }
}
export default Layer
