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
  }
  // 添加一个 layer
  layer (opt = {}) {
    Object.assign(opt, { scene: this.scene })
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
