import Element from './element'
import { getLocation, animFrame, cancelAnim, arrSort } from './utils'

class Cvs {
  constructor (opt) {
    this.container = opt.container
    this.children = [] // 根据 zIndex 升序排列的子元素
    this.descChildren = [] // 根据 zIndex 降序排列的子元素
    this.animChildren = [] // 具有运动轨迹的子元素
    this.stop = null
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
    let self = this
    function func () {
      self.stop = animFrame(func)
      self.clear()
      let curTime = new Date()
      self.animChildren.forEach(child => {
        let idx = child.trackIndex
        if (child.tracks.length > idx) {
          let track = child._curTrack()
          let curAnimateTime = self._getAnimateTime(curTime)
          if (curAnimateTime <= child._curTrackDelay()) {
            return false
          } else if (
            curAnimateTime > child._curTrackDelay() &&
            curAnimateTime < child._curTrackDelay() + track.duration
          ) {
            // 当前运动进度
            console.log(child._curTrackDelay())
            let p = (curAnimateTime - child._curTrackDelay()) / track.duration
            track.loop(p)
          } else if (track.iterationCount > track.cycleIndex + 1) {
            console.log('cycle:' + track.cycleIndex)
            track.cycleIndex++
          } else if (
            curAnimateTime >= child._curTrackDelay() + track.duration &&
            child.tracks[idx + 1]
          ) {
            console.log('trackIndex:' + track.cycleIndex)
            child.trackIndex++
          } else {
            console.log('finished:' + track.cycleIndex)
            child.finished = true
          }
        }
      })
      self.draw()
    }
    func()
  }
  cancelAnimate () {
    this.stopTime = new Date()
    cancelAnim(this.stop)
  }
}
export default Cvs
