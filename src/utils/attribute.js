import Matrix from './matrix'
import toSvg from './toSvg'
import { oneOrTwoValues } from './utils'

export default class Attribute {
  constructor () {
    Object.assign(this, {
      x: 0,
      y: 0,
      zIndex: 0,
      _rotate: 0,
      _scale: [1, 1],
      _translate: [0, 0],
      _skew: [0, 0],
      // anchorX: 0.5,
      // anchorY: 0.5,
      // anchor: [0, 0],
      lineWidth: 1,
      visible: true,
      enableCache: false,
      opacity: 1,
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      font: '16px Arial',
      textAlign: 'left'
    })
  }

  get (key) {
    if (/\b(rotate|scale|skew|translate|offsetPath)\b/.test(key)) { key = `_${key}` }
    return this[key]
  }

  get lastMatrix () {
    if (this.transformOrigin) {
      const transformOrigin = oneOrTwoValues(this.transformOrigin)
      const t = new Matrix()
      t.translate(...transformOrigin)
      t.multiply(this.transformMatrix)
      t.translate(...transformOrigin.map(v => -v))
      return t.m
    }
    return this.transformMatrix
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
    this._offsetPath = toSvg(val)
  }
}
