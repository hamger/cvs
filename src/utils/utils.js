// 获取相对于容器的坐标
export function getLocation (container, event) {
  let hastouch = 'ontouchstart' in window
  let e = event || window.event
  let x = hastouch ? e.targetTouches[0].pageX : e.clientX
  let y = hastouch ? e.targetTouches[0].pageY : e.clientY
  return {
    x: x - container.getBoundingClientRect().left,
    y: y - container.getBoundingClientRect().top
  }
}
/**
 * 删除 arr 中的某项
 */
export function remove (arr, item) {
  const idx = arr.findIndex(ele => ele.id === item.id)
  if (idx > -1) arr.splice(idx, 1)
}
/**
 * 获取 arr 中的某项
 */
export function getItem (arr, id) {
  const idx = arr.findIndex(ele => ele.id === id)
  return arr[idx]
}

// 报错提示
export function error (message) {
  throw Error('cvs: ' + message)
}

// // 四舍五入取整（将目标数字加上 0.5，然后对结果执行逐位运算以消除小数部分）
// export function int (num) {
//   let rounded
//   // With a bitwise or.
//   rounded = (0.5 + num) | 0
//   // A double bitwise not.
//   rounded = ~~(0.5 + num)
//   // Finally, a left bitwise shift.
//   rounded = (0.5 + num) << 0
//   return rounded
// }

// /**
//  * 去除字符串两侧的空格，内含的多个空格转化为一个空格
//  * @param {需要处理的字符串} str
//  */
// export function delBlank (str) {
//   let regEx = /\s+/g
//   return str.trim().replace(regEx, ' ')
// }

/**
 * 根据 key 获取对象中的值
 * @param {取值对象} obj
 * @param {描述键的字符串，支持链式键，如 a.b.c} key
 */
export function getValInObj (obj, key) {
  return key.split('.').reduce((obj, name) => obj[name], obj)
}

/**
 * 对数组进行排序
 * @param {需要处理的数组} arr
 * @param {处理对象数组时需要传入的每项的标记属性} key
 * @param {是否是降序，默认升序} isDescend
 */
export function arrSort (arr, key, isDescend = false) {
  if (!arr.length) return arr
  arr.sort(function (a, b) {
    if (isDescend) return getValInObj(b, key) - getValInObj(a, key)
    else return getValInObj(a, key) - getValInObj(b, key)
  })
  return arr
}

// 全局动画循环周期
export const period = 16
// 折返动画容错毫秒
export const tolerance = 50

// 开启动画循环
export const animFrame = (function () {
  return (
    requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    mozRequestAnimationFrame ||
    oRequestAnimationFrame ||
    msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, period)
    }
  )
})()

// 取消动画循环
export const cancelAnim = (function () {
  return (
    cancelAnimationFrame ||
    webkitCancelAnimationFrame ||
    mozCancelAnimationFrame ||
    msCancelAnimationFrame ||
    function (id) {
      clearTimeout(id)
    }
  )
})()

// 判断是否是移动端
export const isMobile = (() => {
  if (
    navigator.userAgent.match(
      /\b(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true
  } else {
    return false
  }
})()

const cacheCanvas = document.createElement('canvas')
// 创建 canvas 的上下文环境
export function createCtx (w, h) {
  let canvas = cacheCanvas.cloneNode()
  if (w) canvas.width = w
  if (h) canvas.height = h
  return canvas.getContext('2d')
}

// 循环遍历数组，vert 表示倒序遍历
export function forArr (arr, cb, vert) {
  const len = arr.length
  if (vert) {
    for (let i = len - 1; i > -1; i--) {
      cb(arr[i], i)
    }
  } else {
    for (let i = 0; i < len; i++) {
      cb(arr[i], i)
    }
  }
}

// 执行矩阵矩阵变换
export function transform (ctx, transforms, isOutline) {
  forArr(transforms, item => {
    let [key, val] = Object.entries(item)[0]
    if (/\b(scale|translate)\b/.test(key)) {
      if (typeof val === 'number') ctx[key](val, val)
      else ctx[key](...val)
    } else if (key === 'rotate') {
      if (isOutline) ctx[key](val)
      // else ctx[key](val * Math.PI / 180)
      else {
        ctx.transform(
          Math.cos((θ * Math.PI) / 180),
          Math.sin((θ * Math.PI) / 180),
          -Math.sin((θ * Math.PI) / 180),
          Math.cos((θ * Math.PI) / 180),
          0,
          0
        )
      }
    } else if (key === 'transform') {
      ctx[key](...val)
    } else if (key === 'skew') {
      const arr = [1, 0, 0, 1, 0, 0]
      if (typeof val === 'number') {
        arr[1] = arr[2] = val
      } else {
        arr[1] = val[0]
        arr[2] = val[1]
      }
      ctx.transform(...arr)
    }
  })
}

export function getRelativePos (x, y, rx, ry) {
  return { x: x - rx, y: y - ry }
}

export function getFloatNum (str) {
  return str.split('%')[0] / 100
}
