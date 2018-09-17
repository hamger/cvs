import Element from './element'
import { getLocation, animFrame } from './utils'

class Cvs {
  constructor (opt) {
    this.container = opt.container
    this.children = []
    this.eventChildren = {
      click: [],
      hover: []
    }
    this.init()
    this.bind()
  }
  init () {
    var canvas = document.createElement('canvas')
    this.width = canvas.width = this.container.clientWidth
    this.height = canvas.height = this.container.clientHeight
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.container.appendChild(canvas)
  }
  bind () {
    this.canvas.addEventListener('click', e => {
      let temp = null
      var location = getLocation(this.canvas, e)
      // 根据 zIndex 降序排列，因为只触发最前面元素的点击事件
      this.eventChildren.click.some(child => {
        if (!child.visible) return false
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
    let temp3 = null
    this.canvas.addEventListener('mousemove', e => {
      let temp = null
      var location = getLocation(this.canvas, e)
      // 实现鼠标移动到可点击区域时，光标变化
      this.eventChildren.click.some(child => {
        if (!child.visible) return false
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
      if (this.eventChildren.hover.length === 0) return
      let temp2 = null
      this.eventChildren.hover.some(child => {
        if (!child.visible) return false
        child.drawPath()
        if (this.ctx.isPointInPath(location.x, location.y)) {
          temp2 = child
          return true
        }
      })
      if (temp2 && count2 === 0) {
        console.log('inner')
        temp2.attr(temp2.hover, true)
        temp3 = temp2
        count2++
        console.log(temp2)
        this.draw()
      }
      if (!temp2 && count2 === 1) {
        console.log('outer')
        temp3.attr(temp3.noHover, true)
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
      f.arrSort(this.children, 'zIndex')
      if (element.click) {
        this.eventChildren.click.push(element)
        f.arrSort(this.eventChildren.click, 'zIndex', true)
      }
      if (element.hover) {
        this.eventChildren.hover.push(element)
        f.arrSort(this.eventChildren.hover, 'zIndex', true)
        console.log(this.eventChildren.hover)
      }
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
    console.log(123)
    this.clear()
    this.children.forEach(child => {
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
export default Cvs
