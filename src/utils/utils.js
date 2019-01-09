import Matrix from './matrix'
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

export function arrSort2 (arr, key, isDescend = false) {
  if (!arr.length) return arr
  arr.sort(function (a, b) {
    if (isDescend) return b.attr(key) - a.attr(key)
    else return a.attr(key) - b.attr(key)
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

// 按写入顺序遍历对象
export function forObj (obj, cb) {
  Object.entries(obj).forEach(item => {
    let [key, val] = item
    cb(key, val)
  })
}

// 获得变换矩阵
export function getMatrix (transforms) {
  let matrix = new Matrix()
  if (Array.isArray(transforms)) {
    matrix.multiply(transforms)
  } else if (typeof transforms === 'object') {
    Object.entries(transforms).forEach(([key, val]) => {
      if (/\b(scale|translate|skew)\b/.test(key)) {
        matrix[key](...oneOrTwoValues(val))
      } else if (key === 'rotate') {
        matrix[key](val)
      } else if (key === 'transform') {
        matrix.multiply(val)
      }
    })
  }
  return matrix.m
}

// 转化为二项数组
export function oneOrTwoValues (val) {
  if (!Array.isArray(val)) return [val, val]
  if (val.length === 1) return [val[0], val[0]]
  return val
}

export function getRelativePos (x, y, rx, ry) {
  return { x: x - rx, y: y - ry }
}

export function getFloatNum (str) {
  return str.split('%')[0] / 100
}
