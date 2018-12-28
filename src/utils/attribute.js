import Matrix from './matrix'
import SvgPath from 'svg-path-to-canvas'

function oneOrTwoValues (val) {
  if (!Array.isArray(val)) return [val, val]
  if (val.length === 1) return [val[0], val[0]]
  return val
}

const _ele = Symbol('ele')

export default class Attribute {
  constructor (ele) {
    Object.assign(this, {
      visible: true,
      // anchor: [0.5, 0.5],
      anchor: [0, 0],
      enableCache: false,
      _x: 0,
      _y: 0,
      opacity: 1,
      width: '',
      height: '',
      _rotate: 0,
      _scale: [1, 1],
      _translate: [0, 0],
      _skew: [0, 0],
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      zIndex: 0
    })
    this[_ele] = ele
    // console.log(ele)
    // console.log(ele.size())
    // this.transformMatrix[4] = this.anchor[0] * ele.size()[0]
    // this.transformMatrix[5] = this.anchor[1] * ele.size()[1]
  }

  get (key) {
    if (/\b(x|y|rotate|scale|skew|translate|offsetPath)\b/.test(key)) {
      key = `_${key}`
    }
    return this[key]
  }

  set transform (val) {
    if (Array.isArray(val) && val.length === 6) {
      this.transformMatrix = val
    } else {
      this.transformMatrix = [1, 0, 0, 1, 0, 0]
      Object.entries(val).forEach(([key, value]) => {
        if (key === 'matrix' && Array.isArray(value)) {
          this.transformMatrix = new Matrix(value).m
        } else {
          this[key] = value
        }
      })
    }
  }

  set rotate (val) {
    const delta = this._rotate - val
    this._rotate = val
    const transform = new Matrix(this.transformMatrix).rotate(-delta)
    this.transformMatrix = transform.m
  }

  set scale (val) {
    val = oneOrTwoValues(val).map(v => {
      if (Math.abs(v) > 0.001) return v
      return 1 / v > 0 ? 0.001 : -0.001
    })
    const oldVal = this._scale || [1, 1]
    const delta = [val[0] / oldVal[0], val[1] / oldVal[1]]
    this._scale = val
    const transform = new Matrix(this.transformMatrix)
    transform.scale(...delta)
    this.transformMatrix = transform.m
  }

  set translate (val) {
    val = oneOrTwoValues(val).map(v => {
      if (Math.abs(v) > 0.001) return v
      return 1 / v > 0 ? 0.001 : -0.001
    })
    const oldVal = this._translate || [0, 0]
    const delta = [val[0] - oldVal[0], val[1] - oldVal[1]]
    this._translate = val
    const transform = new Matrix(this.transformMatrix)
    transform.translate(...delta)
    this.transformMatrix = transform.m
  }

  set x (val) {
    const oldVal = this._x
    const delta = val - oldVal
    this._x = val
    const transform = new Matrix(this.transformMatrix)
    transform.translate(delta, 0)
    this.transformMatrix = transform.m
  }

  set y (val) {
    const oldVal = this._y
    const delta = val - oldVal
    this._y = val
    const transform = new Matrix(this.transformMatrix)
    transform.translate(0, delta)
    this.transformMatrix = transform.m
  }

  set skew (val) {
    val = oneOrTwoValues(val).map(v => {
      if (Math.abs(v) > 0.001) return v
      return 1 / v > 0 ? 0.001 : -0.001
    })
    const oldVal = this._skew || [0, 0]
    const invm = new Matrix().skew(...oldVal).inverse()
    this._skew = val
    const transform = new Matrix(this.transformMatrix)
    transform.multiply(invm).skew(...val)
    this.transformMatrix = transform.m
  }

  set offsetPath (val) {
    this._offsetPath = new SvgPath(val)
  }
}
