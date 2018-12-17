import BezierEasing from 'bezier-easing'
const bezierFuncCache = new Map()

function getBezierEasing (...value) {
  // 优先使用缓存中的数据
  let easing = bezierFuncCache.get(value)
  if (easing) return easing
  easing = BezierEasing(...value)
  bezierFuncCache.set(value, easing)
  return easing
}

const Easings = {
  linear (p) {
    return p
  },
  ease: getBezierEasing(0.25, 0.1, 0.25, 1),
  'ease-in': getBezierEasing(0.42, 0, 1, 1),
  'ease-out': getBezierEasing(0, 0, 0.58, 1),
  'ease-in-out': getBezierEasing(0.42, 0, 0.58, 1)
}

export { Easings, getBezierEasing }
