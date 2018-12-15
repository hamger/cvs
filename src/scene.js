import { arrSort, remove } from './utils/utils'
import { loadTexture } from './utils/resource'
import Layer from './layer'
import Timeline from './utils/timeline'

export default class Scene {
  constructor (opt) {
    this.container = document.getElementById(opt.containerId)
    this.layers = [] // 根据 zIndex 升序排列的图层
    this.timeline = new Timeline()
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
    this.scene = document.createElement('div')
    this.scene.style.cssText = `position:relative;height:100%;width:100%;`
    this.container.appendChild(this.scene)
  }
  // 事件委托
  delegateEvents () {
    this.scene.addEventListener('click', e => {
      // 优先触发前面图层的事件
      this.layers.forEach(layer => {
        if (!layer.handleEvent) return
        layer.dispatchEvent(e, 'click')
      })
    })
    // 移动端没有 hover 事件
    // if (isMobile) return
    // // 使用count记数，防止光标移动时重复操作
    // let count = 0
    // let count2 = 0
    // let hoverEle = null
    // this.scene.addEventListener('mousemove', e => {
    //   let location = getLocation(this.scene, e)
    //   // 实现鼠标移动到可点击区域时，光标变化
    //   let temp = null
    //   this.descLayers.some(child => {
    //     if (!child.opt.visible || !child.click || !child.outline) return false
    //     child.outline.call(child, this.ctx)
    //     if (this.ctx.isPointInPath(location.x, location.y)) {
    //       temp = child
    //       return true
    //     }
    //   })
    //   if (temp && count === 0) {
    //     this.scene.style.cursor = 'pointer'
    //     count++
    //   }
    //   if (!temp && count === 1) {
    //     this.scene.style.cursor = 'auto'
    //     count = 0
    //   }

    //   // 模拟 hover 事件监听
    //   let temp2 = { opt: {} }
    //   this.descLayers.some(child => {
    //     if (!child.opt.visible || !child.outline) return false
    //     child.outline.call(child, this.ctx)
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
  // 添加一个 layer
  layer (opt = {}) {
    Object.assign(opt, { container: this.scene })
    let layer = new Layer(opt)
    layer.timeline = this.timeline.fork()
    this.layers.push(layer)
    arrSort(this.layers, 'zIndex')
    return layer
  }
  // 删除一个 layer
  remove (layer) {
    if (layer) {
      remove(this.layers, layer)
    } else {
      this.layers = []
    }
  }
}
