import { arrSort, remove, forObj } from './utils/utils'
import { loadTexture } from './utils/resource'
import Layer from './layer'
import Timeline from './utils/timeline'

const events = [
  'mousedown',
  'mouseup',
  'mousemove',
  'touchstart',
  'touchend',
  'touchmove',
  'click'
]

const _layers = Symbol('layers')

export default class Scene {
  constructor (opt) {
    this.container = document.getElementById(opt.containerId)
    this[_layers] = [] // 根据 zIndex 升序排列的图层
    this.timeline = new Timeline()
    events.forEach(event => this.delegateEvent(event))
  }

  async preload (obj) {
    const tasks = [],
      res = {}
    forObj(obj, (key, val) => {
      tasks.push(
        loadTexture(key, val).then(r => {
          res[key] = r
        })
      )
    })
    await Promise.all(tasks)
    return res
  }

  // 事件委托
  delegateEvent (type, receiver = this.container) {
    receiver.addEventListener(type, e => {
      const evtArgs = {
        type,
        originalEvent: e,
        stopDispatch () {
          this.terminated = true
        }
      }
      this[_layers].forEach(layer => {
        if (!layer.handleEvent) return
        layer.dispatchEvent(evtArgs)
      })
    })

    return true
  }
  // 添加一个 layer
  layer (opt = {}) {
    Object.assign(opt, { container: this.container })
    let layer = new Layer(opt)
    layer.timeline = this.timeline.fork()
    this[_layers].push(layer)
    arrSort(this[_layers], 'zIndex')
    return layer
  }
  // 删除一个 layer
  remove (layer) {
    if (layer) remove(this[_layers], layer)
    else this[_layers] = []
  }
}
