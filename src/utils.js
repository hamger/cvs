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

/**
 * 根据 key 获取对象中的值
 * @param {取值对象} obj
 * @param {描述键的字符串，支持链式键，如 a.b.c} key
 */
export function getVal (obj, key) {
  return key.split('.').reduce((obj, name) => obj[name], obj)
}
/**
 * 对数组进行排序
 * @param {需要处理的数组} arr
 * @param {处理对象数组时需要传入的每项的标记属性} key
 * @param {是否是降序，默认升序} isDescend
 */
export function arrSort (arr, key, isDescend) {
  // 对每项是对象的数组排序
  arr.sort(function (a, b) {
    if (isDescend) return getVal(b, key) - getVal(a, key)
    else return getVal(a, key) - getVal(b, key)
  })
  return arr
}

// 判断是否是移动端
export function isMobile () {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true
  } else {
    return false
  }
}

export const tap = {
  start: isMobile() ? 'touchstart' : 'mousedown',
  move: isMobile() ? 'touchmove' : 'mousemove',
  end: isMobile() ? 'touchend' : 'mouseup'
}

// 去除字符串多余空格，并将内部的多个空格转化为一个空格
export function delBlank (str) {
  var regEx = /\s+/g
  return str.trim().replace(regEx, ' ')
}
