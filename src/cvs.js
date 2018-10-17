import Element from './element'
import { getLocation, animFrame, cancelAnim, arrSort } from './utils'

class Cvs {
  constructor (opt) {
    this.container = opt.container
    this.children = [] // 根据 zIndex 升序排列的子元素
    this.descChildren = [] // 根据 zIndex 降序排列的子元素
    this.animChildren = [] // 具有运动轨迹的子元素
    this.stop = null // 定时器
    this.initAnimateTime = 0 // 动画初始时间
    this.pauseTime = 0 // 暂定总时间
    this.animateTime = 0 // 动画已进行的时间
    this.finishedAinmCount = 0 // 已完成动画的元素个数
    this.init()
    this.bind()
  }
  init () {
    let canvas = document.createElement('canvas')
    this.width = canvas.width = this.container.clientWidth
    this.height = canvas.height = this.container.clientHeight
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.container.appendChild(canvas)
    // 将画布和上下文环境告知每一个子元素
    Element.prototype.ctx = this.ctx
    Element.prototype.canvas = this.canvas
  }
  bind () {
    this.canvas.addEventListener('click', e => {
      let temp = null
      let location = getLocation(this.canvas, e)
      // 只触发点击区域最前面元素的监听事件
      this.descChildren.some(child => {
        if (!child.opt.visible || !child.click) return false
        child.drawPath()
        if (this.ctx.isPointInPath(location.x, location.y)) {
          temp = child
          return true
        }
      })
      if (temp) temp.click.call(temp, e)
    })
    // 使用count记数，防止光标移动时重复操作
    let count = 0
    let count2 = 0
    let hoverEle = null
    this.canvas.addEventListener('mousemove', e => {
      let location = getLocation(this.canvas, e)

      // 实现鼠标移动到可点击区域时，光标变化
      let temp = null
      this.descChildren.some(child => {
        if (!child.opt.visible || !child.click) return false
        child.drawPath()
        if (this.ctx.isPointInPath(location.x, location.y)) {
          temp = child
          return true
        }
      })
      if (temp && count === 0) {
        this.canvas.style.cursor = 'pointer'
        count++
      }
      if (!temp && count === 1) {
        this.canvas.style.cursor = 'auto'
        count = 0
      }

      // 模拟 hover 事件监听
      let temp2 = { opt: {} }
      this.descChildren.some(child => {
        if (!child.opt.visible) return false
        child.drawPath()
        if (this.ctx.isPointInPath(location.x, location.y)) {
          temp2 = child
          return true
        }
      })
      if (temp2.opt.hover && count2 === 0) {
        temp2.attr(temp2.opt.hover, true)
        hoverEle = temp2
        count2++
        this.draw()
      }
      if (hoverEle && hoverEle.id !== temp2.id && count2 === 1) {
        hoverEle.attr(hoverEle.noHover, true)
        count2 = 0
        this.draw()
      }
    })
  }
  _addUnit (element) {
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
  add (element) {
    if (element instanceof Array) {
      element.forEach(item => {
        this._addUnit(item)
      })
    } else {
      this._addUnit(element)
    }
  }
  _removeUnit (element) {
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
  remove (element) {
    if (!element) {
      this.children = []
      this.descChildren = []
      this.animChildren = []
      return
    }
    if (element instanceof Array) {
      element.forEach(item => {
        this._removeUnit(item)
      })
    } else {
      this._removeUnit(element)
    }
  }
  draw () {
    this.children.forEach(child => {
      if (child.opt.visible) {
        child.draw()
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
    const loopUnit = () => {
      this.stop = animFrame(loopUnit)
      this.clear()
      this.animateTime = this._getAnimateTime(new Date())
      this.animChildren.forEach(child => {
        if (child.finished) {
          this.finishedAinmCount++
          return
        }
        child.runTrack(this.animateTime)
      })
      this.draw()
    }
    // 如果所有的动画已结束，停止循环
    if (this.animChildren.length === this.finishedAinmCount) return
    loopUnit()
  }
  cancelAnimate () {
    this.stopTime = new Date()
    if (this.stop) cancelAnim(this.stop)
  }
  resetAnimate () {
    if (this.stop) cancelAnim(this.stop)
    this.initAnimateTime = 0
    this.pauseTime = 0
    this.animateTime = 0
    this.finishedAinmCount = 0
    this.animChildren.forEach(child => {
      child.finished = false
      child.tracks.forEach(track => {
        track.reset && track.reset()
      })
    })
  }
}
export default Cvs
