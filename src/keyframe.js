import { error, forObj } from './utils/utils'
import { Easings, getBezierEasing } from './utils/easing'
import colorString from 'color-string'

/**
 * 计算当前帧属性
 * @f: startFrame
 * @t: endFrame
 * @p: progress
 * @s: startOffset
 * @e: endOffset
 */
function calculate (f, t, p, s, e) {
  if (typeof f === 'number' && typeof t === 'number') {
    return f + ((p - s) / (e - s)) * (t - f)
  }
  if (p - s > e - p) return t
  return f
}

// 计算 offset
function calculateFramesOffset (keyframes) {
  keyframes = keyframes.slice(0)
  const firstFrame = keyframes[0],
    lastFrame = keyframes[keyframes.length - 1]

  // 第一帧和最后一帧的 offset 是固定的
  lastFrame.offset = 1
  firstFrame.offset = 0

  let offset = 0,
    offsetFrom = -1

  for (let i = 0; i < keyframes.length; i++) {
    const frame = keyframes[i]
    if (frame.offset != null) {
      const dis = i - offsetFrom
      if (dis > 1) {
        const delta = (frame.offset - offset) / dis
        for (let j = 0; j < dis - 1; j++) {
          keyframes[offsetFrom + j + 1].offset = offset + delta * (j + 1)
        }
      }
      offset = frame.offset
      offsetFrom = i
    }
    if (i > 0) {
      // 如果中间某个属性没有了，需要从前一帧复制过来
      // keyframes[i] = Object.assign({}, keyframes[i - 1], keyframes[i])
    }
  }

  return keyframes
}

const _timing = Symbol('timing'),
  _easing = Symbol('easing'),
  _keyframes = Symbol('keyframes'),
  _element = Symbol('element'),
  _cb = Symbol('cb')

export default class Keyframe {
  constructor (element, keyframes, timing, cb) {
    if (keyframes.length < 2) {
      error('keyframes need at least two items.')
    }
    if (Array.isArray(keyframes[0]) || typeof keyframes[0] === 'string') {
      let temp = {}
      if (typeof keyframes[0] === 'string') keyframes[0] = [keyframes[0]]
      keyframes[0].forEach(item => {
        if (item === 'offsetDistance') temp.offsetDistance = 0
        else temp[item] = element.attr(item)
      })
      keyframes[0] = temp
    }
    if (keyframes[0].fill || keyframes[0].stroke) {
      keyframes.forEach(item => {
        if (item.fill) item.fill = colorString.get.rgb(item.fill)
        if (item.stroke) item.stroke = colorString.get.rgb(item.stroke)
      })
    }
    // 支持 duration 省略传参
    if (typeof timing === 'number') timing = { duration: timing }
    if (timing.duration <= 0) {
      error('duration must a number that greater than 0.')
    }
    this[_timing] = Object.assign(
      {},
      { iterations: 1, easing: 'linear', delay: 0 },
      timing
    )
    const easingType = this[_timing].easing
    if (typeof easingType === 'string') this[_easing] = Easings[easingType]
    else if (Array.isArray(easingType) && easingType.length === 4) { this[_easing] = getBezierEasing(...easingType) } else error('easing must be a string or an array has four items')
    this[_keyframes] = calculateFramesOffset(keyframes)
    this[_element] = element
    this[_cb] = cb
    this.cbEmitCount = 0
  }
  currentFrame (p) {
    let res = {}
    let frames = this[_keyframes]
    frames.some((item, index) => {
      if (item.offset > p || item.offset === 1) {
        res.f = index === 0 ? item : frames[index - 1]
        res.t = item
        return true
      }
    })
    return res
  }
  result (p) {
    let { f, t } = this.currentFrame(p)
    let result = {}
    forObj(f, (key, val) => {
      if (/\b(offset)\b/.test(key)) return
      if (/\b(fill|stroke)\b/.test(key)) {
        result[key] = colorString.to.rgb([
          calculate(val[0], t[key][0], p, f.offset, t.offset),
          calculate(val[1], t[key][1], p, f.offset, t.offset),
          calculate(val[2], t[key][2], p, f.offset, t.offset),
          calculate(val[3], t[key][3], p, f.offset, t.offset)
        ])
      } else {
        result[key] = calculate(val, t[key], p, f.offset, t.offset)
      }
    })
    return result
  }
  run (t) {
    if (this.cbEmitCount === 2) return
    let p = (t - this[_timing].delay) / this[_timing].duration
    if (p >= 1 && this.cbEmitCount === 0) {
      // 保证最后一帧是终点
      this[_element].attr(this.handle(this.result(1)))
      this.cbEmitCount = 1
      return
    } else if (p >= 1 && this.cbEmitCount === 1) {
      this[_cb] && this[_cb].call(this[_element], this[_element])
      this.cbEmitCount = 2
      return
    }
    // this.cbEmitCount = 0
    p = this[_easing](p)
    this[_element].attr(this.handle(this.result(p)))
  }
  handle (obj) {
    if (obj.offsetDistance != null) {
      const len = this[_element].attr('offsetPath').getTotalLength()
      const [x, y] = this[_element]
        .attr('offsetPath')
        .getPointAtLength(len * obj.offsetDistance)
      obj.x = x
      obj.y = y
      delete obj.offsetDistance
    }
    return obj
  }
}
