import Element from './element'
import { tap, getLocation, animFrame } from './utils'

class Canvas {
  constructor (opt) {
    this.container = opt.container
    this.children = []
    this.clickChildren = []
    this.init()
    this.bind()
  }
  init () {
    var canvas = document.createElement('canvas')
    this.canvas = canvas
    this.container.appendChild(canvas)
    // 当屏幕被伸缩时，使画布依然充满整个元素
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    this.resize()
    window.onresize = this.resize.bind(this)
    this.ctx = canvas.getContext('2d')
  }
  resize () {
    this.width = this.canvas.width = this.container.clientWidth
    this.height = this.canvas.height = this.container.clientHeight
  }
  bind () {
    this.canvas.addEventListener('click', e => {
      let temp = null
      var location = getLocation(this.canvas, e)
      // 根据 zIndex 降序排列，因为只触发最前面元素的点击事件
      f.arrSort(this.clickChildren, 'zIndex', true).some(child => {
        if (!child.visible) return false
        child.drawPath()
        if (this.ctx.isPointInPath(location.x, location.y)) {
          temp = child
          return true
        }
      })
      if (temp) temp.click(e)
    })
    // this.canvas.addEventListener(tap.start, e => {})
  }
  add (element) {
    if (element instanceof Element) {
      element.ctx = this.ctx
      element.canvas = this.canvas
      this.children.push(element)
      if (element.click) this.clickChildren.push(element)
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
      if (element.click) {
        this.clickChildren.some((item, index) => {
          if (item.id === element.id) {
            this.children.splice(index, 1)
            return true
          }
        })
      }
    } else {
      this.children = []
      this.clickChildren = []
    }
  }
  draw () {
    this.clear()
    f.arrSort(this.children, 'zIndex').forEach(child => {
      if (child.visible) child.draw()
    })
  }
  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
  animate (func) {
    function func2 () {
      animFrame(func2)
      func()
    }
    this.anim = animFrame(func2)
  }
  cancelAnimate () {
    cancelAnimationFrame(this.anim)
  }
}
export default Canvas
