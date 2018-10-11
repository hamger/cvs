// 获取相对于容器的坐标
export function getLocation (container, event) {
  var hastouch = 'ontouchstart' in window
  var e = event || window.event
  var x = hastouch ? e.targetTouches[0].pageX : e.clientX
  var y = hastouch ? e.targetTouches[0].pageY : e.clientY
  return {
    x: x - container.getBoundingClientRect().left,
    y: y - container.getBoundingClientRect().top
  }
}

// 四舍五入取整（将目标数字加上 0.5，然后对结果执行逐位运算以消除小数部分）
export function int (num) {
  var rounded
  // With a bitwise or.
  rounded = (0.5 + num) | 0
  // A double bitwise not.
  rounded = ~~(0.5 + num)
  // Finally, a left bitwise shift.
  rounded = (0.5 + num) << 0
  return rounded
}

/**
 * 去除字符串两侧的空格，内含的多个空格转化为一个空格
 * @param {需要处理的字符串} str
 */
export function delBlank (str) {
  var regEx = /\s+/g
  return str.trim().replace(regEx, ' ')
}

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
export const period = 1000 / 60

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
