import Element from './element'
import { getLocation, animFrame, cancelAnim, arrSort } from './utils'

class Cvs {
  constructor (opt) {
    this.container = opt.container
    this.children = [] // 根据 zIndex 升序排列的子元素
    this.descChildren = [] // 根据 zIndex 降序排列的子元素
    this.stop = null
    this.animateCount = 0
    this.initAnimateTime = 0
    this.pauseTime = 0
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
      if (temp) temp.click(e)
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
  add (element) {
    if (element instanceof Element) {
      element.ctx = this.ctx
      element.canvas = this.canvas
      this.children.push(element)
      arrSort(this.children, 'opt.zIndex')
      this.descChildren.push(element)
      arrSort(this.descChildren, 'opt.zIndex', true)
    } else {
      throw Error('Function add only accept the instance of Element.')
    }
  }
  remove (element) {
    if (element) {
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
    } else {
      this.children = []
      this.descChildren = []
    }
  }
  draw () {
    this.children.forEach(child => {
      if (child.opt.visible) {
        child.draw()
        this.move()
      }
    })
  }
  move () {
    this.children.forEach(child => {
      if (child.animate) child.animate()
    })
  }
  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
  _getAnimateTime (time) {
    // console.dir(this.pauseTime)
    return time - this.initAnimateTime - this.pauseTime
  }
  animate () {
    this.startTime = new Date()
    if (this.animateCount === 0) this.initAnimateTime = new Date()
    if (this.stopTime) this.pauseTime += this.startTime - this.stopTime
    this.animateCount++
    let self = this
    function func2 () {
      self.stop = animFrame(func2)
      self.clear()
      let curTime = new Date()
      self.children.forEach(child => {
        let idx = child.trackIndex
        if (child.tracks.length > idx) {
          let track = child.tracks[idx]
          let curAnimateTime = self._getAnimateTime(curTime)
          // console.log(child._trackDelay())
          if (
            curAnimateTime > child._trackDelay() &&
            curAnimateTime < child._trackDelay() + track.duration
          ) {
            console.log(curAnimateTime)
            track.loop()
          } else if (
            curAnimateTime >= child._trackDelay() + track.duration &&
            child.tracks[idx + 1]
          ) {
            child.trackIndex++
          }
        }
      })
      self.draw()
    }
    func2()
  }
  cancelAnimate () {
    this.stopTime = new Date()
    _getAnimateTime(false)
    cancelAnim(this.stop)
  }
}
export default Cvs
