import { getLocation, animFrame, cancelAnim, arrSort, isMobile } from './utils'
import { loadTexture } from './resource'
import Layer from './layer'
// import Timeline from './timeline'

const _addUnit = Symbol('addUnit')
const _removeUnit = Symbol('removeUnit')

class Cvs2 {
  constructor (opt) {
    if (typeof opt.container === 'string') {
      this.container = document.getElementById(opt.container)
    } else this.container = opt.container
    this.layers = new Map() // 根据 zIndex 升序排列的图层
    this.descLayers = [] // 根据 zIndex 降序排列的图层
    this.eventLayers = [] // 具有事件监听的图层
    this.animLayers = [] // 具有运动轨迹的图层
    this.stop = null // 定时器
    this.initAnimateTime = 0 // 动画初始时间
    this.pauseTime = 0 // 暂定总时间
    this.animateTime = 0 // 动画已进行的时间
    this.finishedAinmCount = 0 // 已完成动画的元素个数
    this.isPause = false // 动画是否被暂停
    // this.timeline = new Timeline()
    this.init()
    this.delegateEvents()
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
    let cvs = document.createElement('div')
    cvs.style.cssText = `position: relative;height:100%;width:100%;`
    this.width = cvs.style.width = this.container.clientWidth
    this.height = cvs.style.height = this.container.clientHeight
    this.cvs = cvs
    this.container.appendChild(cvs)
  }
  // 事件委托
  delegateEvents () {
    this.cvs.addEventListener('click', e => {
      let location = getLocation(this.cvs, e)
      console.log(location)
      // 优先触发前面图层的事件
      for (let [key, value] of this.layers) {
        if (!value.handleEvent) continue
        if (value.dispatchEvent(location)) return
      }
    })
    // 移动端没有 hover 事件
    // if (isMobile) return
    // // 使用count记数，防止光标移动时重复操作
    // let count = 0
    // let count2 = 0
    // let hoverEle = null
    // this.cvs.addEventListener('mousemove', e => {
    //   let location = getLocation(this.cvs, e)
    //   // 实现鼠标移动到可点击区域时，光标变化
    //   let temp = null
    //   this.descLayers.some(child => {
    //     if (!child.opt.visible || !child.click || !child.drawPath) return false
    //     child.drawPath.call(child, this.ctx)
    //     if (this.ctx.isPointInPath(location.x, location.y)) {
    //       temp = child
    //       return true
    //     }
    //   })
    //   if (temp && count === 0) {
    //     this.cvs.style.cursor = 'pointer'
    //     count++
    //   }
    //   if (!temp && count === 1) {
    //     this.cvs.style.cursor = 'auto'
    //     count = 0
    //   }

    //   // 模拟 hover 事件监听
    //   let temp2 = { opt: {} }
    //   this.descLayers.some(child => {
    //     if (!child.opt.visible || !child.drawPath) return false
    //     child.drawPath.call(child, this.ctx)
    //     if (this.ctx.isPointInPath(location.x, location.y)) {
    //       temp2 = child
    //       return true
    //     }
    //   })
    //   // 当光标在移出元素时
    //   if (temp2.opt.hover && count2 === 0) {
    //     this.clear()
    //     temp2.attr(temp2.opt.hover, true)
    //     hoverEle = temp2
    //     count2++
    //     this.draw()
    //   }
    //   // 当光标在移入元素时
    //   if (hoverEle && hoverEle.id !== temp2.id && count2 === 1) {
    //     this.clear()
    //     hoverEle.attr(hoverEle.noHover, true)
    //     count2 = 0
    //     this.draw()
    //   }
    // })
  }
  layer (opt = {}) {
    Object.assign(opt, {container: this.cvs})
    let layer = new Layer(opt)
    this.add(layer)
    return layer
  }
  add (layer) {
    var arr = Array.from(this.layers), arr2 = []
    arr.forEach(item => {
      arr2.push(item[1])
    })
    arr2.push(layer)
    this.layers.clear()
    // zIndex 大的先 set
    arrSort(arr2, 'zIndex', true).forEach(item => {
      this.layers.set(item.id, item)
    })
  }
  remove (...layers) {
    if (layers.length) {
      layers.forEach(layer => {
        this.layers.delete(layer.id)
      })
    } else {
      this.layers.clear()
    }
  }
}

export default Cvs2