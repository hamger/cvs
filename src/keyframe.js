import { error } from './utils/utils'
import easing from './utils/easing'
/**
 * 计算当前帧属性
 * @form: startFrame
 * @to: endFrame
 * @p: progress
 * @s: startOffset
 * @e: endOffset
 */
function calculate (from, to, p, s, e) {
  if (typeof from === 'number' && typeof to === 'number') {
    return from + ((p - s) / (e - s)) * (to - from)
  }
  if (p - s > e - p) return to
  return from
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
      keyframes[i] = Object.assign({}, keyframes[i - 1], keyframes[i])
    }
  }

  return keyframes
}
// var a = calculateFramesOffset([
//   { x: 12 },
//   { x: 44 },
//   { x: 54 }
// ])
// console.log(a)

const _timing = Symbol('timing'),
  _keyframes = Symbol('keyframes'),
  _element = Symbol('element')

export default class Keyframe {
  constructor (element, keyframes, timing) {
    if (keyframes.length < 2) {
      error('keyframes need at least two items.')
    }
    if (Array.isArray(keyframes[0])) {
      let temp = {}
      keyframes[0].forEach(item => {
        temp[item] = element.attr(item)
      })
      keyframes[0] = temp
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

    this[_keyframes] = calculateFramesOffset(keyframes)
    this[_element] = element
  }
  currentFrame (p) {
    if (p >= 1) return false
    let res = {}
    let frames = this[_keyframes]
    frames.some((item, index) => {
      if (item.offset > p || item.offset === 1) {
        res.from = item
        res.to = frames[index - 1]
        return true
      }
    })
    return res
  }
  result (t) {
    const p = easing[this[_timing].easing](
      (t - this[_timing].delay) / this[_timing].duration
    )
    let curFrame = this.currentFrame(p)
    if (!curFrame) return false
    let result = {}
    for (let key in curFrame.from) {
      result[key] = calculate(
        curFrame.from[key],
        curFrame.to[key],
        p,
        curFrame.from.offset,
        curFrame.to.offset
      )
    }
    return result
  }
  run (t) {
    this[_element].attr(this.result(t))
  }
}
