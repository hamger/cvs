// import { Matrix } from 'sprite-math'
import Matrix from './matrix'
import SvgPath from 'svg-path-to-canvas'

const _attr = Symbol('attr'),
  _temp = Symbol('store'),
  _subject = Symbol('subject'),
  _default = Symbol('default'),
  _props = Symbol('props')

function oneOrTwoValues (val) {
  if (!Array.isArray(val)) {
    return [val, val]
  }
  if (val.length === 1) {
    return [val[0], val[0]]
  }
  return val
}

export default class ElementAttr {
  constructor (subject) {
    this[_subject] = subject
    this[_default] = {}
    this[_attr] = {}
    this[_props] = {}
    this.setDefault({
      anchor: [0, 0],
      enableCache: false,
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      layoutX: 0,
      layoutY: 0,
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      display: '',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      zIndex: 0
    })
    this[_temp] = new Map() // save non-serialized values
    this.__extendAttributes = new Set()
  }

  setDefault (attrs, props = {}) {
    Object.assign(this[_default], attrs)
    Object.assign(this[_attr], attrs)
    const _p = {}
    Object.entries(props).forEach(([prop, getter]) => {
      _p[prop] = {
        get: getter.bind(this)
      }
    })
    Object.defineProperties(this[_attr], _p)
    Object.assign(this[_props], _p)
  }

  set (key, val) {
    if (val == null) {
      val = this[_default][key]
    }
    if (typeof val === 'object') {
      const oldVal = this[_attr][key]
      if (oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
        return
      }
    }
    this[_attr][key] = val
  }

  get (key) {
    return this[_attr][key]
  }

  set pos (val) {
    if (val == null) {
      val = [0, 0]
    }
    const [x, y] = val
    this.x = x
    this.y = y
  }

  get pos () {
    return [this.x, this.y]
  }

  set size (val) {
    if (val == null) {
      val = ['', '']
    }
    const [width, height] = val
    this.width = width
    this.height = height
  }

  get size () {
    return [this.width, this.height]
  }

  set transform (val) {
    /*
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      matrix: [1,0,0,1,0,0],
     */
    Object.assign(this[_attr], {
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0]
    })

    if (Array.isArray(val)) {
      this.set('transformMatrix', val)
    } else {
      this.set('transformMatrix', [1, 0, 0, 1, 0, 0])
      Object.entries(val).forEach(([key, value]) => {
        if (key === 'matrix' && Array.isArray(value)) {
          this.set('transformMatrix', new Matrix(value).m)
        } else {
          this[key] = value
        }
      })
    }
    console.log(123)
    console.log(this.get('transformMatrix'))
  }

  set transformOrigin (val) {
    this.set('transformOrigin', val)
  }

  set rotate (val) {
    const delta = this.get('rotate') - val
    this.set('rotate', val)
    const transform = new Matrix(this.get('transformMatrix')).rotate(-delta)
    this.set('transformMatrix', transform.m)
  }

  set scale (val) {
    val = oneOrTwoValues(val).map(v => {
      if (Math.abs(v) > 0.001) {
        return v
      }
      return 1 / v > 0 ? 0.001 : -0.001
    })
    const oldVal = this.get('scale') || [1, 1]
    const delta = [val[0] / oldVal[0], val[1] / oldVal[1]]
    this.set('scale', val)

    const transform = new Matrix(this.get('transformMatrix'))
    transform.scale(...delta)
    this.set('transformMatrix', transform.m)
  }

  set translate (val) {
    const oldVal = this.get('translate') || [0, 0]
    const delta = [val[0] - oldVal[0], val[1] - oldVal[1]]
    this.set('translate', val)
    const transform = new Matrix(this.get('transformMatrix'))
    transform.translate(...delta)
    this.set('transformMatrix', transform.m)
  }

  set skew (val) {
    const oldVal = this.get('skew') || [0, 0]
    const invm = new Matrix().skew(...oldVal).inverse()
    this.set('skew', val)
    const transform = new Matrix(this.get('transformMatrix'))
    transform.multiply(invm).skew(...val)
    this.set('transformMatrix', transform.m)
  }
}
